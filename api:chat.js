import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Trả lời nếu có người kiểm tra bằng GET (trình duyệt)
  if (req.method === 'GET') {
    return res.status(200).send('✅ Chatbot is alive. Use POST to interact with it.');
  }

  // Chỉ chấp nhận POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '❌ Only POST requests are allowed' });
  }

  // Lấy message từ body
  const userMessage = req.body.message;
  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ reply: '❗ Tin nhắn không hợp lệ.' });
  }

  // Thay API Key bằng của bạn
  const OPENAI_API_KEY = 'process.env.OPENAI_API_KEY';

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Bạn là trợ lý chatbot.' },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();

    if (data.error) {
      return res.status(500).json({ reply: `⚠️ Lỗi từ OpenAI: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content || 'Không có phản hồi từ chatbot.';
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: `❌ Lỗi server: ${error.message}` });
  }
}
