import 'dotenv/config';
import { getSystemPrompt } from "../utils";
import axios from 'axios';

export class OpenRouterClient {
    constructor() {
        this.url = 'https://openrouter.ai/api/v1/chat/completions';
        this.embeddings = {};
        this.headers = {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    async getResponse(query){
        const data = {
            "model": "deepseek/deepseek-chat:free",
            "messages": [
                { role: 'system', content: getSystemPrompt() },
                { role: "user", "content": `Context:\n${embedding}\n\nQuestion: ${query}` }
            ]
        }

        const { response } = await axios.post(this.url, this.headers, data);

        console.log(response)

        return response;
    }
    
    async getEmbeddings() {
        const data = {
            "model": "deepseek/deepseek-chat:free", //TODO: FIND DEEPSEEK EMBEDDINGS FREE
            "messages": [
                { role: 'system', content: getSystemPrompt() },
                { role: "user", "content": `Context:\n${embedding}\n\nQuestion: ${query}` }
            ]
        }

        const { response } = await axios.post(this.url, this.headers, data);

        return response;
    }
}