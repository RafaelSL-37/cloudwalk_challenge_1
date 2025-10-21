import http from 'http';
import { OpenAiClient } from './middlewares/openai.js';
import { OpenRouterClient } from './middlewares/openrouter.js';
import 'dotenv/config';

const server = http.createServer(async (req, res) => {
  const chosenLlm = process.env.LLM;

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const { query } = JSON.parse(body);

      if (chosenLlm = "OPENROUTER") {
        const openRouterClient = new OpenRouterClient();

        await openRouterClient.getEmbeddings(query);
        const reply = await openRouterClient.getResponse(query);

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