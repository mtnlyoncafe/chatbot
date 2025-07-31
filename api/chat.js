export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Thiếu nội dung tin nhắn." });
    }
    // Trả lời mặc định (có thể thay bằng AI sau)
    return res.status(200).json({ reply: `Bạn vừa nói: "${message}". Tôi đang xử lý yêu cầu.` });
  } else {
    return res.status(405).json({ reply: "Chỉ hỗ trợ POST" });
  }
}
