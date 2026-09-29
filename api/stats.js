// Vercel serverless function: giấu key JSONBin ở phía server (đọc từ biến môi trường)
const BIN = process.env.JSONBIN_BIN_ID;
const ACCESS = process.env.JSONBIN_ACCESS_KEY;
const MASTER = process.env.JSONBIN_MASTER_KEY; // tuỳ chọn, ưu tiên dùng ACCESS_KEY

const URL_BIN = "https://api.jsonbin.io/v3/b/" + BIN;
const auth = MASTER ? { "X-Master-Key": MASTER } : { "X-Access-Key": ACCESS };

async function read() {
  const r = await fetch(URL_BIN + "/latest?meta=false", { headers: auth });
  if (!r.ok) throw new Error("JSONBin đọc lỗi " + r.status);
  const d = await r.json();
  const rec = d.record || d;
  return { likes: Math.max(0, +rec.likes || 0), views: Math.max(0, +rec.views || 0) };
}

async function write(d) {
  const r = await fetch(URL_BIN, {
    method: "PUT",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify(d)
  });
  if (!r.ok) throw new Error("JSONBin ghi lỗi " + r.status);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!BIN || !(ACCESS || MASTER)) {
    return res.status(500).json({ error: "Thiếu JSONBIN_BIN_ID hoặc JSONBIN_ACCESS_KEY" });
  }
  try {
    if (req.method === "GET") return res.status(200).json(await read());

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const d = await read();
      if (body.action === "view") d.views += 1;
      else if (body.action === "like") d.likes += 1;
      else if (body.action === "unlike") d.likes = Math.max(0, d.likes - 1);
      else return res.status(400).json({ error: "action không hợp lệ" });
      await write(d);
      return res.status(200).json(d);
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: "Lỗi khi gọi JSONBin" });
  }
};
