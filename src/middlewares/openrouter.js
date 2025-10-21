import 'dotenv/config';
import { getSystemPrompt } from "../utils";
import axios from 'axios';
import { retrieveRelevantDocs } from '../utils'

export class OpenRouterClient {
    constructor() {
        this.url = 'https://openrouter.ai/api/v1/chat/completions';
        this.relevantEmbeddings = '';
        this.headers = {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    async getResponse(query){
        const data = {
            "model": "deepseek/deepseek-chat:free", //ALTERNATIVE: deepseek/deepseek-chat-v3.1:free
            "messages": [
                { role: 'system', content: getSystemPrompt() },
                { role: "user", "content": `Context:\n${this.embeddings}\n\nQuestion: ${query}` }
            ]
        }

        const { response } = await axios.post(this.url, this.headers, data);

        console.log(response)

        return response;
    }
    
    async getEmbeddings(query) {
        const embeddings = JSON.parse(fs.readFileSync("embeddings.json", "utf8"));

        const data = {
            "model": "deepseek/deepseek-chat:free", //TODO: embedding model, use ready made embedding if not possible
            "messages": [
                { role: 'system', content: getSystemPrompt() },
                { role: "user", "content": `Context:\n${embedding}\n\nQuestion: ${query}` }
            ]
        }

        const { queryEmbeddings } = await axios.post(this.url, this.headers, data);

        console.lot(queryEmbeddings);

        this.relevantEmbeddings = retrieveRelevantDocs(queryEmbeddings, embeddings);
    }
}