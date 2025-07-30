import fetch from 'node-fetch';

export default async function handler(req, res) {
  const OPENAI_API_KEY = "sk-REPLACE-WITH-YOUR-KEY";
  const userMessage = req.body.message;

  if (!userMessage || typeof userMessage !== "string") {
    return res.status(400).json({ reply: "Tin nhắn không hợp lệ." });
  }

  try {
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7
      })
    });

    const data = await gptResponse.json();
    const reply = data.choices?.[0]?.message?.content || "Không có phản hồi từ GPT.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Lỗi GPT:", error);
    res.status(500).json({ reply: "Lỗi máy chủ GPT." });
  }
}
