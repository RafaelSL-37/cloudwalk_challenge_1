import http from 'http';
import { OpenAI } from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `
    You are an expert assistant for CloudWalk, a Brazilian fintech company.
    You answer questions about:
    - What CloudWalk is
    - Its products, such as InfinitePay
    - Its mission and values
    - How its technology, services, and vision impact businesses
    You reply in clear natural language (optionally Markdown), with factual, concise, and friendly explanations.
    If asked something unrelated to CloudWalk, politely redirect the user to CloudWalk topics.
`;

//TODO: RAG

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const { message } = JSON.parse(body);
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ]
      });
      
      const reply = completion.choices[0].message.content;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ reply }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));