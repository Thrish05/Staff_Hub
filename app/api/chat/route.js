import { NextResponse } from 'next/server';
import { client } from '@/lib/db';
import { getOllamaResponse } from '@/lib/ollama';

export async function POST(req) {
  try {
    const { prompt, faculty_id } = await req.json();
    if (!prompt || !faculty_id) {
      return NextResponse.json({ error: 'Missing prompt or faculty_id' }, { status: 400 });
    }

    // Get similar data from all tables
    const contextChunks = await getSimilarChunks(faculty_id, prompt);

    // Prepare final input for the LLM
    const finalPrompt = `
      Use the following faculty-specific context to answer the question:
      
      === CONTEXT START ===
      ${contextChunks.join('\n\n')}
      === CONTEXT END ===

      QUESTION: ${prompt}
    `;

    const answer = await getOllamaResponse(finalPrompt);

    return NextResponse.json({ response: answer });

  } catch (err) {
    console.error('[CHAT_ERROR]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
