export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { message } = req.body;
    res.status(200).json({ reply: `Xin chào! Tôi đã nhận được: "${message}"` });
  } else {
    res.status(405).json({ error: 'Phương thức không được hỗ trợ' });
  }
}
