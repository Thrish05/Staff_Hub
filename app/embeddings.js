import { Client } from 'pg';
import axios from 'axios';


// PostgreSQL client setup
const client = new Client({
    user: 'dinesh',
    host: 'localhost',
    database: 'faculty',
    password: 'dinesh123',
    port: 5432,
});

const EMBEDDING_DIM = 768;
const OLLAMA_URL = 'http://localhost:11434/api/embeddings';
const MODEL_NAME = 'nomic-embed-text';

async function run() {
    try {
        await client.connect();
        console.log("🟢 Connected to PostgreSQL");

        // Drop and recreate embedding column
        await client.query(`ALTER TABLE faculty_professional DROP COLUMN IF EXISTS embedding;`);
        await client.query(`ALTER TABLE faculty_professional ADD COLUMN embedding vector(${EMBEDDING_DIM});`);

        // Fetch faculty rows
        const result = await client.query(`
      SELECT faculty_id, department, designation, qualification, specialization, expertise_in_subjects,
             phd_guideship, no_of_scholars, experience_years, research_papers_count, patents_count,
             fdp_attended_count, award_achievement_activity
      FROM faculty_professional
    `);

        for (const row of result.rows) {
            const faculty_id = row.faculty_id;

            const text = Object.values(row)
                .slice(1) // skip faculty_id
                .filter(Boolean)
                .join(", ");

            const embedding = await getEmbedding(text);
            const vectorStr = `[${embedding.join(',')}]`;

            if (!embedding) {
                console.warn(`⚠️ Skipping faculty_id ${faculty_id} due to embedding error`);
                continue;
            }

            await client.query(
                `UPDATE faculty_professional SET embedding = $1 WHERE faculty_id = $2`,
                [vectorStr, faculty_id]
            );

            console.log(`✅ Stored embedding for faculty_id: ${faculty_id}`);
        }

        console.log("✅ All embeddings stored successfully.");
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await client.end();
        console.log("🔴 PostgreSQL connection closed");
    }
}

async function getEmbedding(text) {
    try {
        const response = await axios.post(OLLAMA_URL, {
            model: MODEL_NAME,
            prompt: text
        });

        const embedding = response.data.embedding;

        if (!Array.isArray(embedding) || embedding.length !== EMBEDDING_DIM) {
            throw new Error("Invalid embedding length or type");
        }

        return embedding;
    } catch (error) {
        console.error("🚫 Embedding error:", error.message);
        return null;
    }
}

run();
