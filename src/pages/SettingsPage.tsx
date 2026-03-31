import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchIndustries } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";

export default function SettingsPage() {
  const { settings, setSettings } = useSettings();

  const industriesQuery = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
    staleTime: 60 * 60 * 1000,
  });

  const industries = industriesQuery.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configuración del producto (se guarda en este navegador).
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-5">
        <div>
          <label className="text-xs text-gray-500">Industria</label>
          <select
            className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            value={settings.industryCategory || ""}
            onChange={(e) => {
              setSettings({ ...settings, industryCategory: e.target.value });
              toast.success("Industria guardada");
            }}
          >
            <option value="">(Sin industria)</option>
            <option value="decentralized-finance-defi">DeFi</option>
            <option value="artificial-intelligence">Artificial Intelligence</option>
            <option value="gaming">Gaming</option>
            <option value="real-world-assets-rwa">Real World Assets (RWA)</option>
            {industries.length > 0 && <option disabled>────────</option>}
            {industries.map((i) => (
              <option key={i.category_id} value={i.category_id}>
                {i.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-600 mt-2">
            Por ahora las "industrias" vienen de categorías públicas de CoinGecko.
            Si el cliente necesita otra taxonomía, la mapeamos.
          </p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Moneda</label>
          <select
            className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            value={settings.vsCurrency}
            onChange={(e) => {
              setSettings({ ...settings, vsCurrency: e.target.value });
              toast.success("Moneda guardada");
            }}
          >
            <option value="usd">USD</option>
            <option value="mxn">MXN</option>
            <option value="eur">EUR</option>
          </select>
        </div>

        {industriesQuery.isError && (
          <p className="text-xs text-red-400">
            No se pudieron cargar industrias. Intenta recargar.
          </p>
        )}
      </div>
    </div>
  );
}
