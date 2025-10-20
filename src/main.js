import http from 'http';
import fs from "fs";
import { OpenAiClient } from './middlewares/openai.js';
import { OpenRouterClient } from './middlewares/openrouter.js';
import 'dotenv/config';

console.log(process.env.OPENAI_API_KEY)
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const server = http.createServer(async (req, res) => {
  const chosenLlm = process.env.LLM;

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const { query } = JSON.parse(body);

      if (chosenLlm = "OPENROUTER") {
        const openRouterClient = new OpenRouterClient();

        // const queryEmbedding = await getOpenRouterEmbeddings(client, query);
        // const relevantEmbeddings = retrieveRelevantDocs(queryEmbedding.data[0].embedding, embeddings);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } else if (chosenLlm = "OPENAI") {
        const openAiClient = new OpenAiClient();

        await openAiClient.getEmbeddings(query);
        const reply = openAiClient.getOpenaiResponse()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));