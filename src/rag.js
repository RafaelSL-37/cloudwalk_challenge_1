import fs from "fs";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const files = ["cloudwalk_mission.txt", "cloudwalk_products.txt"];

let documents = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const chunks = text.match(/[\s\S]{1,800}/g); // simple chunking (max 800 chars)
  
  for (const chunk of chunks) {
    const embedding = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk
    });
    documents.push({
      text: chunk,
      embedding: embedding.data[0].embedding
    });
  }
}

// Save embeddings
fs.writeFileSync("embeddings.json", JSON.stringify(documents, null, 2));