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

export function getSystemPrompt(){
  return `
      You are an expert assistant for CloudWalk, a Brazilian fintech company.
      You answer questions about:
      - What CloudWalk is
      - Its products, such as InfinitePay
      - Its mission and values
      - How its technology, services, and vision impact businesses
      You reply in clear natural language (optionally Markdown), with factual, concise, and friendly explanations.
      If asked something unrelated to CloudWalk, politely redirect the user to CloudWalk topics.
  `;
}