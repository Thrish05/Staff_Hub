import axios from 'axios';

const OLLAMA_HOST = 'http://localhost:11434';

export async function getEmbedding(query) {
  const response = await axios.post(`${OLLAMA_HOST}/api/embeddings`, {
    model: 'llama3', // or 'mxbai-embed-large' if available
    prompt: query
  });
  return response.data.embedding;
}

// export async function generateAnswer(prompt) {
//   const response = await axios.post(`${OLLAMA_HOST}/api/generate`, {
//     model: 'llama3',
//     prompt,
//     stream: false,
//   });
//   return response.data.response.trim();
// }