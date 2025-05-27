import { Pool } from 'pg';
import axios from 'axios';

// Configuration
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'faculty',
    password: 'root',
    port: 5432
});

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return Response.json({ error: 'No message provided' }, { status: 400 });
        }

        // 1. Get embedding
        const embedding = await generateEmbedding(message);

        // 2. Vector search
        const results = await vectorSearch(embedding);

        // 3. Generate response
        const answer = await generateResponse(message, results);

        return Response.json({ answer });
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Helper functions
async function generateEmbedding(text) {
    try {
        const response = await axios.post(`${OLLAMA_HOST}/api/embeddings`, {
            model: 'nomic-embed-text',
            prompt: text
        });

        const embedding = response.data.embedding;

        if (!embedding || !Array.isArray(embedding)) {
            throw new Error('Invalid embedding response');
        }

        if (embedding.length !== 768) {
            throw new Error(`Dimension mismatch: Expected 768, got ${embedding.length}`);
        }

        return embedding;
    } catch (error) {
        console.error('Embedding error:', error.message);
        return new Array(768).fill(0);
    }
}

async function vectorSearch(embedding) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(
            `SELECT faculty_id, name, department, designation, specialization, expertise_in_subjects,
                embedding <=> $1::vector AS distance
                FROM faculty_professional
                WHERE embedding IS NOT NULL
                ORDER BY embedding <=> $1::vector
                LIMIT 3;`,
            [JSON.stringify(embedding)]
        );
        return rows;
    } finally {
        client.release();
    }
}

async function generateResponse(query, context) {
    const formattedContext = context.map((c, i) =>
        `FACULTY ${i + 1}:
     Name: ${c.name}
     Department: ${c.department}
     Designation: ${c.designation}
     Specialization: ${c.specialization}
     Expertise: ${c.expertise_in_subjects}`
    ).join('\n\n');

    try {
        const res = await axios.post(`${OLLAMA_HOST}/api/chat`, {
            model: 'llama3.2',
            messages: [
                {
                    role: 'system',
                    content: `### ROLE ###\nYou are a college faculty database assistant.\nAnswer the user query using ONLY the context provided.\n\n### CONTEXT ###\n${formattedContext}\n\n### RULES ###\n1. Do not mention being an AI.\n2. If no answer is found, respond with: No relevant information found.\n3. Be descriptive. Dont try to bold stuff`
                },
                { role: 'user', content: query }
            ],
            stream: false
        });

        return res.data.message?.content || "No relevant information found";
    } catch (error) {
        console.error('Generation error:', error.response?.data || error.message);
        return "Unable to retrieve information";
    }
}