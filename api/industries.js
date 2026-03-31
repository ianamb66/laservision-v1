// Vercel Serverless Function (Node)
// Devuelve lista de "industrias" (categorías) desde CoinGecko.

module.exports = async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/categories/list";
    const r = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": "lasarvision-v1/1.0",
      },
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      res.setHeader("Cache-Control", "no-store");
      return res
        .status(r.status)
        .json({ ok: false, error: "upstream_error", detail: text.slice(0, 500) });
    }

    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({ ok: true, data });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
};
