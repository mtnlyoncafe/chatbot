const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    const data = await response.json();
    const gptMessage = data.choices[0]?.message?.content || 'Không có phản hồi từ GPT.';
    res.json({ message: gptMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Lỗi: Không thể kết nối máy chủ.' });
  }
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("✅ Server is running! Welcome to your chatbot.");
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
