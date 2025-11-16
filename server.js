const express = require('express');
const cors = require('cors');
const { sessions, conversations } = require('./mockData');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/sessions', (req, res) => res.json(sessions));

app.get('/api/new-chat', (req, res) => {
  const id = uuidv4();
  const title = `Session ${sessions.length + 1}`;
  const newSession = { id, title, createdAt: new Date().toISOString() };
  sessions.unshift(newSession);
  conversations[id] = [];
  res.json({ sessionId: id, title });
});

app.get('/api/session/:id', (req, res) => {
  const id = req.params.id;
  res.json(conversations[id] || []);
});

app.post('/api/chat/:id', (req, res) => {
  const id = req.params.id;
  const { question } = req.body || {};
  if (!question) return res.status(400).json({ error: 'question required' });

  const response = {
    text: `Mock answer for: "${question}"`,
    table: [
      { metric: 'Metric A', value: Math.floor(Math.random() * 100) },
      { metric: 'Metric B', value: Math.floor(Math.random() * 100) },
      { metric: 'Metric C', value: Math.floor(Math.random() * 100) }
    ],
    timestamp: new Date().toISOString()
  };

  if (!conversations[id]) conversations[id] = [];
  conversations[id].push({ question, response, timestamp: new Date().toISOString() });

  setTimeout(() => res.json(response), 200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
