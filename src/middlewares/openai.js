import { getSystemPrompt } from "../utils";
import 'dotenv/config';
import { OpenAI } from 'openai';

export class OpenAiClient {
    constructor() {
        this.key = process.env.OPENAI_API_KEY;
        this.relevantEmbeddings = null;
    }

    async getOpenaiResponse(query, embedding){
        const client = new OpenAI({ apiKey: this.key });

        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: getSystemPrompt() },
                { role: 'user', content: `Context:\n${this.embeddings}\n\nQuestion: ${query}` }
            ]
        });

        return completion.choices[0].message.content;
    }

    async getEmbeddings(query) {
        const embeddings = JSON.parse(fs.readFileSync("embeddings.json", "utf8"));
        
        const queryEmbeddings = (await client.embeddings.create({
            model: "text-embedding-3-small",
            input: query,
        })).data[0].embedding;

        this.relevantEmbeddings = retrieveRelevantDocs(queryEmbeddings, embeddings)
    }
}