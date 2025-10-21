import ollama from 'ollama';
import fs from "fs";

export class OllamaClient {
    constructor() {}

    async getEmbeddings(chunk) {
        const response = await ollama.embed({
            model: 'embeddinggemma:300m',
            input: chunk,
        });

        console.log(response.embeddings);

        return response.embeddings;
    }

    async generateRAG() {
        const files = ["cloudwalk_mission.txt", "cloudwalk_products.txt", "cloudwalk_values.txt"];
        const documents = [];
        
        for (const file of files) {
          const text = fs.readFileSync(`src/content/${file}`, "utf8");
          const chunks = text.match(/[\s\S]{1,800}/g);
          
          for (const chunk of chunks) {
            const embedding = await getEmbeddings(chunk);
        
            console.log(embedding)
        
            documents.push({
                text: chunk,
                embedding: embedding.data[0].embedding
            });
          }
        }
        
        fs.writeFileSync("embeddings.json", JSON.stringify(documents, null, 2));
    }
}