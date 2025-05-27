import { pool } from './db.js';

export async function searchSimilarDocuments(userEmbedding, topK = 5) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        project_title AS title,
        project_description AS content, 
        co_principal_investigator AS investigators,
        year_of_award AS year,
        amount_sanctioned AS amount,
        embedding <#> $1 AS similarity
      FROM project_details
      ORDER BY similarity DESC
      LIMIT $2
    `, [JSON.stringify(userEmbedding), topK]);

    return result.rows.map(row => ({
      ...row,
      // Format the content for better context
      content: `Title: ${row.title}\nDescription: ${row.content}\nInvestigators: ${row.investigators}\nYear: ${row.year}\nAmount: ${row.amount}`
    }));
  } finally {
    client.release();
  }
}