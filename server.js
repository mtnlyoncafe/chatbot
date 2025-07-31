
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage || typeof userMessage !== 'string') {
        return res.status(400).json({ reply: 'Tin nhắn không hợp lệ.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'Không có phản hồi.';
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ reply: 'Lỗi máy chủ.' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running! Welcome to your chatbot.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
