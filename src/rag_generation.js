import fs from "fs";
import OpenAI from "openai";
import { getEmbeddings } from "./utils";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const files = ["cloudwalk_mission.txt", "cloudwalk_products.txt", "cloudwalk_values.txt", "infinitepay_features.txt"];

let documents = [];

for (const file of files) {
  const text = fs.readFileSync(`content/${file}`, "utf8");
  const chunks = text.match(/[\s\S]{1,800}/g); // simple chunking (max 800 chars)
  
  for (const chunk of chunks) {
    const embedding = await getEmbeddings(client, chunk);

    documents.push({
      text: chunk,
      embedding: embedding.data[0].embedding
    });
  }
}

// Save embeddings
fs.writeFileSync("embeddings.json", JSON.stringify(documents, null, 2));