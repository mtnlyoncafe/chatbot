export default async function handler(req, res) {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Tin nhắn không hợp lệ.' });
  }

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o", // dùng model nhanh hơn
        messages: [{ role: "user", content: message }],
        temperature: 0.5,
        max_tokens: 600
      })
    });


    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || 'Không có phản hồi';
    res.status(200).json({ reply });

  } catch (err) {
    console.error('Lỗi khi gọi OpenAI:', err);
    res.status(500).json({ reply: 'Lỗi máy chủ' });
  }
}
