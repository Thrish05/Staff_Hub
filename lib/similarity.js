import { client } from './db.js';
import { getEmbedding } from './embed.js';

export async function getSimilarChunks(faculty_id, prompt, topK = 8) {
  const embedding = await getEmbedding(prompt);
  if (!embedding) return [];

  const sources = [
    'project_details',
    'phd_details',
    'fdp_details',
    'patent_details',
    'research_details'
  ];

  const results = [];

  for (const table of sources) {
    let idColumn = 'faculty_id';
    if (table === 'project_details' || table === 'phd_details' || table === 'fdp_details') {
      idColumn = 'faculty_name';
    }

    const query = `
      SELECT *, 1 - (embedding <=> $1) AS similarity
      FROM ${table}
      WHERE ${idColumn} = $2 AND embedding IS NOT NULL
      ORDER BY embedding <=> $1
      LIMIT ${topK}
    `;

    const { rows } = await client.query(query, [embedding, faculty_id]);
    for (const row of rows) {
      // Format into readable string
      const formatted = Object.entries(row)
        .filter(([k]) => k !== 'embedding' && k !== 'similarity')
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      results.push(formatted);
    }
  }

  return results;
}
