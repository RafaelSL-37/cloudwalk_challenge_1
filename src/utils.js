export async function getEmbeddings(client, query) {
    client.embeddings.create({
        model: "text-embedding-3-small",
        input: query
    });
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, x, i) => sum + x * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0));
  const normB = Math.sqrt(b.reduce((sum, x) => sum + x * x, 0));
  return dot / (normA * normB);
}

export function retrieveRelevantDocs(queryEmbedding, docs, k = 3) {
  return docs
    .map(d => ({ ...d, score: cosineSimilarity(queryEmbedding, d.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}