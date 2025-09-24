// /api/chat.js
export default async function handler(req, res) {
  // Chỉ cho POST
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method Not Allowed' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Tin nhắn không hợp lệ.' });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ reply: 'Thiếu OPENAI_API_KEY trên server.' });
  }

  try {
    const oai = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        // 🔧 Chọn model chắc chắn có (ví dụ):
        // 'gpt-4o-mini' hoặc 'chatgpt-4o-latest'
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      })
    });

    // Nếu API báo lỗi, trả nguyên văn để dễ debug
    const raw = await oai.text();
    if (!oai.ok) {
      let errMsg = 'OpenAI error';
      try {
        const ej = JSON.parse(raw);
        errMsg = ej?.error?.message || raw;
      } catch { errMsg = raw; }
      return res.status(502).json({ reply: `Lỗi AI: ${errMsg}` });
    }

    // OK → parse & bóc tách an toàn
    let data = {};
    try { data = JSON.parse(raw); } catch {}
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      'Không có phản hồi từ mô hình.';

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Lỗi khi gọi OpenAI:', err);
    return res.status(500).json({ reply: 'Lỗi máy chủ.' });
  }
}
