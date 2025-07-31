export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Chỉ hỗ trợ POST request' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Bạn là trợ lý chatbot thân thiện.' },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error('Lỗi gọi OpenAI:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
}
