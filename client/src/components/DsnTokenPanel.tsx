import { useCallback, useEffect, useState } from "react";
import {
  ExternalLink,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

const PAIR_ADDRESS = "0x04c3be465e530b0a7617b197a91fcd990154027f";
const PAIR_URL = `https://dexscreener.com/polygon/${PAIR_ADDRESS}`;
const API_URL = `https://api.dexscreener.com/latest/dex/pairs/polygon/${PAIR_ADDRESS}`;

type DexPair = {
  chainId?: string;
  dexId?: string;
  pairAddress?: string;
  baseToken?: { name?: string; symbol?: string };
  quoteToken?: { symbol?: string };
  priceUsd?: string;
  priceChange?: { h24?: number };
  liquidity?: { usd?: number };
  volume?: { h24?: number };
  fdv?: number;
  url?: string;
};

function money(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 8 : 0,
  }).format(value);
}

function percent(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export default function DsnTokenPanel() {
  const [pair, setPair] = useState<DexPair | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(API_URL, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`DexScreener ${response.status}`);
      const payload = (await response.json()) as { pairs?: DexPair[] };
      setPair(payload.pairs?.[0] ?? null);
    } catch {
      setPair(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const name = pair?.baseToken?.name ?? "DSN";
  const symbol = pair?.baseToken?.symbol ?? "DSN";
  const sourceUrl = pair?.url ?? PAIR_URL;

  return (
    <section
      className="rounded-3xl border border-[#d7b46a]/20 bg-[#190e22] p-6 md:p-7"
      aria-labelledby="dsn-market-title"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="section-kicker">Token rail / Polygon</p>
          <h2
            id="dsn-market-title"
            className="mt-1 text-2xl font-extrabold text-white"
          >
            {name} <span className="text-[#d7b46a]">${symbol}</span>
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-5 text-[#a998a6]">
            Dati pubblici in sola lettura dal pair collegato. Questo pannello
            non custodisce fondi, non firma transazioni e non rappresenta
            consulenza finanziaria.
          </p>
        </div>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-extrabold text-[#ded2dc] hover:border-[#d7b46a]/50 hover:text-white"
        >
          Apri pair <ExternalLink size={13} />
        </a>
      </div>
      {loading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-[#bbaab8]">
          <LoaderCircle size={16} className="animate-spin text-[#d7b46a]" />{" "}
          Aggiornamento dati pubblici…
        </div>
      ) : error || !pair ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ef7185]/25 bg-[#ef7185]/[.08] p-4 text-sm text-[#f0b3be]">
          <span className="flex items-center gap-2">
            <TriangleAlert size={16} /> Dati temporaneamente non disponibili. Il
            link al pair resta consultabile.
          </span>
          <button
            onClick={() => void load()}
            className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-extrabold text-[#ded2dc]"
          >
            <RefreshCw size={13} /> Riprova
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Prezzo", money(Number(pair.priceUsd))],
              ["24h", percent(pair.priceChange?.h24)],
              ["Liquidità", money(pair.liquidity?.usd)],
              ["Volume 24h", money(pair.volume?.h24)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[.035] p-4"
              >
                <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#958493]">
                  {label}
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#958493]">
            <span>
              Rete:{" "}
              <strong className="text-[#d9cbd5]">
                {pair.chainId ?? "polygon"}
              </strong>
            </span>
            <span>
              DEX:{" "}
              <strong className="text-[#d9cbd5]">{pair.dexId ?? "—"}</strong>
            </span>
            <span>
              FDV: <strong className="text-[#d9cbd5]">{money(pair.fdv)}</strong>
            </span>
            <span className="flex items-center gap-1 text-[#9ad9c4]">
              <ShieldCheck size={13} /> Read-only
            </span>
          </div>
        </>
      )}
    </section>
  );
}
