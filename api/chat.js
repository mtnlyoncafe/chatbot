export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Bắt buộc để CORS preflight OK
  }

  if (req.method === 'POST') {
    const { message } = req.body;

    // Trả lời mẫu để test
    return res.status(200).json({
      reply: `AI PMC trả lời: Bạn vừa hỏi "${message}"`
    });
  }

  // Nếu không phải POST
  return res.status(405).json({ message: 'Chỉ hỗ trợ POST' });
}
