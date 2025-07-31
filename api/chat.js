export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    res.status(200).json({ reply: "Xin chào! Tôi là Chatbot PMC. Bạn vừa nói: " + message });
  } else {
    res.status(405).json({ error: "Chỉ hỗ trợ POST." });
  }
}
