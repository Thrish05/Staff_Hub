
const { Client } = require("pg");
const axios = require("axios");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODEL = process.env.EMBED_MODEL;

// Universal embedding helper
async function getEmbedding(text) {
  try {
    const res = await axios.post(`${OLLAMA_URL}/api/embeddings`, {
      model: 'nomic-embed-text:latest',
      prompt: text,
    });
    
    if (!res.data.embedding || !Array.isArray(res.data.embedding)) {
      throw new Error('Invalid embedding format');
    }
    
    return res.data.embedding;
  } catch (err) {
    console.error("Embedding error:", err.response?.data || err.message);
    return null;
  }
}

// // Embed: Research
// async function embedResearchDetails() {
//   const select = `SELECT faculty_id, scopus_research_id, title, journal_name, publication_date FROM research_details WHERE embedding IS NULL`;
//   const update = `UPDATE research_details SET embedding = $1 WHERE scopus_research_id = $2`;

//   const { rows } = await client.query(select);
//   for (const row of rows) {
//     const text = `Research titled "${row.title}" published in ${row.journal_name} on ${row.publication_date} by faculty id of ${row.faculty_id}`;
//     const embedding = await getEmbedding(text);
    
//     if (embedding)
//       await client.query(update, [embedding, row.scopus_research_id]);
//   }
//   console.log("✅ Embedded: research_details");
// }

// // Embed: FDP
// async function embedFdpDetails() {
//   const select = `SELECT fdp_name, faculty_id, fdp_category FROM fdp_details WHERE embedding IS NULL`;
//   const update = `UPDATE fdp_details SET embedding = $1 WHERE fdp_name = $2 AND faculty_id = $3`;

//   const { rows } = await client.query(select);
//   for (const row of rows) {
//     const text = `${row.faculty_name} attended FDP titled "${row.fdp_name}" in the domain of ${row.fdp_category}`;
//     const embedding = await getEmbedding(text);
//     const formattedVector = `[${embedding.join(',')}]`;
//     if (formattedVector)
//       await client.query(update, [formattedVector, row.fdp_name, row.faculty_id]);
//   }
//   console.log("✅ Embedded: fdp_details");
// }

// // Embed: Patents
// async function embedPatentDetails() {
//   const select = `SELECT patent_id, title, faculty_id, description FROM patent_details WHERE embedding IS NULL`;
//   const update = `UPDATE patent_details SET embedding = $1 WHERE patent_id = $2`;

//   const { rows } = await client.query(select);
//   for (const row of rows) {
//     const text = `Patent Details: Title: ${row.title}. Description: ${row.description} Submitted by the faculty of id: ${row.faculty_id}`;
//     const embedding = await getEmbedding(text);
//     const formattedVector = `[${embedding.join(',')}]`;
//     if (formattedVector) await client.query(update, [formattedVector, row.patent_id]);
//   }
//   console.log("✅ Embedded: patent_details");
// }

// Embed: Projects
async function embedProjectDetails() {
  const select = `SELECT faculty_id, project_title, name_of_faculty, funding_agency, year_of_award 
                 FROM project_details 
                 WHERE embedding IS NULL`;
  const update = `UPDATE project_details 
                  SET embedding = $1::vector 
                  WHERE faculty_id = $2`;

  const { rows } = await client.query(select);
  
  for (const row of rows) {
    const text = `${row.name_of_faculty} of id: ${row.faculty_id}, did a project titled "${row.project_title}" 
                  funded by ${row.funding_agency} in ${row.year_of_award}`;
    
    const embedding = await getEmbedding(text);
    
    if (embedding) {
      
      const vectorStr = `[${embedding.join(',')}]`;
      
      await client.query(update, [vectorStr, row.faculty_id]);
      console.log(`✅ Embedded project: ${row.project_title}`);
    }
  }
  console.log("✅ Completed embedding project_details");
}

// // Embed: PhDs
// async function embedPhdDetails() {
//   const select = `SELECT registration_number, scholar_name, faculty_id, supervisor_name, status FROM phd_details WHERE embedding IS NULL`;
//   const update = `UPDATE phd_details SET embedding = $1 WHERE registration_number = $2`;

//   const { rows } = await client.query(select);
//   for (const row of rows) {
//     const text = `PhD scholar ${row.scholar_name} under supervisor ${row.supervisor_name}, current status: ${row.status} is held by ${row.scholar_name} with the faculty id of ${row.faculty_id}`;
//     const embedding = await getEmbedding(text);
//     const formattedVector = `[${embedding.join(',')}]`;
//     if (formattedVector)
//       await client.query(update, [formattedVector, row.registration_number]);
//   }
//   console.log("✅ Embedded: phd_details");
// }

// Run all
async function main() {
  await client.connect();

  // await embedResearchDetails();
  // await embedFdpDetails();
  // await embedPatentDetails();
  await embedProjectDetails();
  // await embedPhdDetails();

  await client.end();
  console.log("🎉 FDP embeddings updated.");
}

main();
