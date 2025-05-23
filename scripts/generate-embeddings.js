require("dotenv").config();
const { Client } = require("pg");
const axios = require("axios");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODEL = process.env.EMBED_MODEL || "mini-lm";

// Universal embedding helper
async function getEmbedding(text) {
  try {
    const res = await axios.post(`${OLLAMA_URL}/api/embeddings`, {
      model: MODEL,
      prompt: text,
    });
    return res.data.embedding;
  } catch (err) {
    console.error("Embedding error:", err.response?.data || err.message);
    return null;
  }
}

// Embed: Research
async function embedResearchDetails() {
  const select = `SELECT scopus_research_id, title, journal_name, publication_date FROM research_details WHERE embedding IS NULL`;
  const update = `UPDATE research_details SET embedding = $1 WHERE scopus_research_id = $2`;

  const { rows } = await client.query(select);
  for (const row of rows) {
    const text = `Research titled "${row.title}" published in ${row.journal_name} on ${row.publication_date}`;
    const embedding = await getEmbedding(text);
    if (embedding)
      await client.query(update, [embedding, row.scopus_research_id]);
  }
  console.log("✅ Embedded: research_details");
}

// Embed: FDP
async function embedFdpDetails() {
  const select = `SELECT fdp_name, faculty_name FROM fdp_details WHERE embedding IS NULL`;
  const update = `UPDATE fdp_details SET embedding = $1 WHERE fdp_name = $2 AND scholar_name = $3`;

  const { rows } = await client.query(select);
  for (const row of rows) {
    const text = `${row.faculty_name} attended FDP titled "${row.fdp_name}"`;
    const embedding = await getEmbedding(text);
    if (embedding)
      await client.query(update, [embedding, row.fdp_name, row.faculty_name]);
  }
  console.log("✅ Embedded: fdp_details");
}

// Embed: Patents
async function embedPatentDetails() {
  const select = `SELECT patent_id, title, description FROM patent_details WHERE embedding IS NULL`;
  const update = `UPDATE patent_details SET embedding = $1 WHERE patent_id = $2`;

  const { rows } = await client.query(select);
  for (const row of rows) {
    const text = `Patent: ${row.title}. Description: ${row.description}`;
    const embedding = await getEmbedding(text);
    if (embedding) await client.query(update, [embedding, row.patent_id]);
  }
  console.log("✅ Embedded: patent_details");
}

// Embed: Projects
async function embedProjectDetails() {
  const select = `SELECT project_title, name_of_faculty, funding_agency, year_of_award FROM project_details WHERE embedding IS NULL`;
  const update = `UPDATE project_details SET embedding = $1 WHERE project_title = $2 AND name_of_faculty = $3`;

  const { rows } = await client.query(select);
  for (const row of rows) {
    const text = `${row.name_of_faculty} did a project titled "${row.project_title}" funded by ${row.funding_agency} in ${row.year_of_award}`;
    const embedding = await getEmbedding(text);
    if (embedding)
      await client.query(update, [embedding, row.project_title, row.name_of_faculty]);
  }
  console.log("✅ Embedded: project_details");
}

// Embed: PhDs
async function embedPhdDetails() {
  const select = `SELECT registration_number, scholar_name, supervisor_name, status FROM phd_details WHERE embedding IS NULL`;
  const update = `UPDATE phd_details SET embedding = $1 WHERE registration_number = $2`;

  const { rows } = await client.query(select);
  for (const row of rows) {
    const text = `PhD scholar ${row.scholar_name} under supervisor ${row.supervisor_name}, current status: ${row.status}`;
    const embedding = await getEmbedding(text);
    if (embedding)
      await client.query(update, [embedding, row.registration_number]);
  }
  console.log("✅ Embedded: phd_details");
}

// Run all
async function main() {
  await client.connect();

  await embedResearchDetails();
  await embedFdpDetails();
  await embedPatentDetails();
  await embedProjectDetails();
  await embedPhdDetails();

  await client.end();
  console.log("🎉 All embeddings updated.");
}

main();
