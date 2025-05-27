export function buildPrompt(contextChunks, userQuery) {
  const context = contextChunks.join('\n\n---\n\n');
  return `
  You are an expert research assistant. Use the following project details to answer the question.
  If you don't know the answer, say "I couldn't find that information in the project database."

  Available Projects:
  ${context}

  Question: ${userQuery}

  Provide a concise answer and mention relevant project details when applicable.
  Answer:`.trim();
}