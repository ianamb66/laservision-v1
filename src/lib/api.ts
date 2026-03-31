export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
};

export async function fetchMarkets(params?: {
  ids?: string;
  category?: string;
  vs_currency?: string;
}): Promise<MarketCoin[]> {
  const url = new URL("/api/markets", window.location.origin);
  if (params?.ids) url.searchParams.set("ids", params.ids);
  if (params?.category) url.searchParams.set("category", params.category);
  if (params?.vs_currency) url.searchParams.set("vs_currency", params.vs_currency);

  const r = await fetch(url.toString());
  const json = await r.json();
  if (!r.ok || !json?.ok) throw new Error(json?.error || "fetch_failed");
  return json.data as MarketCoin[];
}

export type Industry = { category_id: string; name: string };

export async function fetchIndustries(): Promise<Industry[]> {
  const url = new URL("/api/industries", window.location.origin);
  const r = await fetch(url.toString());
  const json = await r.json();
  if (!r.ok || !json?.ok) throw new Error(json?.error || "fetch_failed");
  return (json.data ?? []) as Industry[];
}
