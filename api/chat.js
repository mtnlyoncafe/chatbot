export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://pmctuannguyen.com"); // <-- QUAN TRỌNG!
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { message } = req.body;
    res.status(200).json({
      reply: `AI PMC trả lời: Bạn vừa hỏi "${message}"`
    });
  } else {
    res.status(405).json({ message: "Chỉ hỗ trợ POST" });
  }
}
