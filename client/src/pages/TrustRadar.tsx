import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Ban,
  Check,
  Compass,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import VelvetNav from "@/components/VelvetNav";
import DsnTokenPanel from "@/components/DsnTokenPanel";

const profiles = [
  {
    alias: "Luna-17",
    role: "Mistress / guida",
    match: 92,
    vibe: "rituali lenti",
    boundaries: "solo chat interna · niente foto",
    color: "from-[#7d385f] to-[#26142e]",
  },
  {
    alias: "NodoCalmo",
    role: "sub / esploratore",
    match: 86,
    vibe: "aftercare",
    boundaries: "stop immediato · check-in",
    color: "from-[#3f5b6b] to-[#171b2b]",
  },
  {
    alias: "VellutoNero",
    role: "Mistress / guida",
    match: 78,
    vibe: "enigmi e presenza",
    boundaries: "testo soltanto · ritmo lento",
    color: "from-[#66502a] to-[#24182c]",
  },
];

export default function TrustRadar() {
  const [role, setRole] = useState<"Mistress / guida" | "sub / esploratore">(
    "sub / esploratore"
  );
  const [intensity, setIntensity] = useState("bassa");
  const [scan, setScan] = useState(0);
  const [activeInvite, setActiveInvite] = useState<string | null>(null);
  const [pledgeActive, setPledgeActive] = useState(false);
  const visibleProfiles = useMemo(
    () => profiles.filter(profile => profile.role !== role),
    [role]
  );

  const runScan = () => {
    setScan(value => value + 1);
    toast.success("Radar aggiornato", {
      description: "Sono mostrati solo alias di gioco con confini compatibili.",
    });
  };

  const invite = (alias: string) => {
    setActiveInvite(alias);
    toast("Invito in bozza", {
      description: `${alias} riceverà una richiesta nella messaggistica interna. Nessun contatto esterno.`,
    });
  };

  return (
    <div className="velvet-shell min-h-screen">
      <VelvetNav />
      <main className="container max-w-6xl py-12 md:py-16">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Game room / 07</p>
            <h1 className="display-font mt-3 text-5xl text-white md:text-7xl">
              Radar della <span className="text-[#e2a0bd]">fiducia.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#bcaeba]">
              Un gioco narrativo tra adulti verificati: scegli un ruolo di
              fantasia, dichiara i tuoi confini e trova una connessione
              compatibile. Qui la servitù è solo fiction, mai una condizione
              reale.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#d7b46a]/25 bg-[#190e22] px-5 py-4">
            <ShieldCheck size={20} className="text-[#d7b46a]" />
            <div>
              <p className="text-sm font-extrabold text-white">
                Privacy by design
              </p>
              <p className="text-xs text-[#a998a6]">
                Alias, chat interna, uscita sempre visibile.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9">
          <DsnTokenPanel />
        </div>

        <section className="mt-5 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-3xl border border-[#d7b46a]/20 bg-[#190e22] p-6 md:p-7">
            <div className="flex items-center gap-3">
              <Compass className="text-[#d7b46a]" size={19} />
              <div>
                <p className="section-kicker">Imposta la scena</p>
                <h2 className="mt-1 text-2xl font-extrabold text-white">
                  Il tuo profilo di gioco
                </h2>
              </div>
            </div>
            <label className="mt-7 block text-xs font-extrabold uppercase tracking-[.12em] text-[#a998a6]">
              Ruolo fiction
            </label>
            <div className="mt-3 grid gap-2">
              {["Mistress / guida", "sub / esploratore"].map(item => (
                <button
                  key={item}
                  onClick={() => setRole(item as typeof role)}
                  className={`rounded-2xl border p-4 text-left text-sm font-extrabold transition ${role === item ? "border-[#d7b46a] bg-[#d7b46a]/10 text-[#f1d58f]" : "border-white/10 text-[#c9bac6] hover:border-white/25"}`}
                >
                  {item}
                  <span className="mt-1 block text-xs font-normal text-[#958493]">
                    Nessun titolo reale, nessun obbligo fuori dal gioco.
                  </span>
                </button>
              ))}
            </div>
            <label className="mt-7 block text-xs font-extrabold uppercase tracking-[.12em] text-[#a998a6]">
              Intensità narrativa
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {["bassa", "media", "teatrale"].map(item => (
                <button
                  key={item}
                  onClick={() => setIntensity(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-extrabold ${intensity === item ? "border-[#e2a0bd] bg-[#e2a0bd]/10 text-[#f1bfd2]" : "border-white/10 text-[#a998a6] hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-[#70b7a1]/25 bg-[#70b7a1]/[.08] p-4 text-sm leading-6 text-[#c6e5d9]">
              <div className="flex gap-3">
                <LockKeyhole
                  size={17}
                  className="mt-1 shrink-0 text-[#8fd3bd]"
                />
                <p>
                  Il gioco non richiede numeri, foto, posizione o passaggio a un
                  telefono. Qualsiasi richiesta di contatto esterno può essere
                  segnalata.
                </p>
              </div>
            </div>
            <button
              onClick={runScan}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d7b46a] py-3 text-xs font-extrabold text-[#0b0908] hover:bg-[#f1d58f]"
            >
              <RefreshCw size={15} /> Scansiona compatibilità{" "}
              {scan > 0 && `· ${scan}`}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-kicker">Segnali compatibili</p>
                <h2 className="mt-1 text-2xl font-extrabold text-white">
                  Connessioni disponibili
                </h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#a998a6]">
                {intensity} · alias only
              </span>
            </div>
            {visibleProfiles.map(profile => (
              <article
                key={profile.alias}
                className="rounded-3xl border border-white/10 bg-[#120b19] p-5 transition hover:border-[#d7b46a]/35"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${profile.color}`}
                  >
                    <span className="display-font text-2xl text-white">
                      {profile.alias[0]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-white">
                        {profile.alias}
                      </h3>
                      <span className="flex items-center gap-1 rounded-full bg-[#70b7a1]/10 px-2 py-1 text-[10px] font-extrabold text-[#9ad9c4]">
                        <BadgeCheck size={12} /> verificato
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#b2a1af]">
                      {profile.role} · {profile.vibe}
                    </p>
                    <p className="mt-3 text-sm text-[#d0c1cc]">
                      {profile.boundaries}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-[#f1d58f]">
                      {profile.match}%
                    </p>
                    <p className="text-[10px] uppercase tracking-[.12em] text-[#958493]">
                      fit
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => invite(profile.alias)}
                    className="flex items-center gap-2 rounded-full bg-[#d7b46a] px-4 py-2 text-xs font-extrabold text-[#0b0908]"
                  >
                    <MessageCircle size={14} />{" "}
                    {activeInvite === profile.alias
                      ? "Invito inviato"
                      : "Invita in chat"}
                  </button>
                  <button
                    onClick={() =>
                      toast("Confini visibili", {
                        description:
                          "Prima di ogni scena si confermano limiti, parola di sicurezza e aftercare.",
                      })
                    }
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-extrabold text-[#ded2dc] hover:bg-white/10"
                  >
                    Vedi confini
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl border border-[#e2a0bd]/20 bg-[#1d1020] p-6">
            <div className="flex items-start gap-3">
              <HeartHandshake className="mt-1 text-[#e2a0bd]" size={20} />
              <div>
                <p className="section-kicker">Patto di gioco</p>
                <h2 className="mt-1 text-2xl font-extrabold text-white">
                  Giuramento di lealtà alla scena
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#c9bac6]">
                  «Scelgo di partecipare con lealtà alla storia condivisa e di
                  rispettare la persona dietro ogni alias. Posso fermarmi,
                  cambiare idea o revocare questo patto in qualsiasi momento. Il
                  patto è fiction, non è esclusivo, non è un contratto e non
                  crea doveri verso Red Velvet o verso una Mistress.»
                </p>
              </div>
            </div>
            <label className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm text-[#ded2dc]">
              <input
                type="checkbox"
                checked={pledgeActive}
                onChange={event => setPledgeActive(event.target.checked)}
                className="mt-1 accent-[#d7b46a]"
              />
              <span>
                Attivo il patto facoltativo per questa sessione di gioco.
              </span>
            </label>
            {pledgeActive && (
              <p className="mt-3 flex items-center gap-2 text-xs text-[#9ad9c4]">
                <Check size={14} /> Patto attivo solo in questa esperienza.
                Revoca disponibile qui sotto.
              </p>
            )}
          </div>
          <div className="rounded-3xl border border-[#ef7185]/20 bg-[#1b0d16] p-6">
            <div className="flex items-center gap-3">
              <TriangleAlert className="text-[#ef9aa9]" size={19} />
              <h2 className="font-extrabold text-white">
                Uscita e segnalazione
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#c9b5c0]">
              Pass, mute, blocco e report interrompono la scena. Nessuna
              penalità per chi si ritira.
            </p>
            <div className="mt-5 grid gap-2">
              <button
                onClick={() => {
                  setPledgeActive(false);
                  toast.success("Patto revocato", {
                    description:
                      "La scena è terminata e non è stato inviato alcun contatto esterno.",
                  });
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[#ef7185]/35 py-2.5 text-xs font-extrabold text-[#f0b2be]"
              >
                <Ban size={14} /> Revoca e chiudi scena
              </button>
              <button
                onClick={() =>
                  toast("Safety team avvisato", {
                    description:
                      "La segnalazione demo è stata registrata senza condividere dati di contatto.",
                  })
                }
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-2.5 text-xs font-extrabold text-[#ded2dc]"
              >
                <Users size={14} /> Segnala comportamento
              </button>
            </div>
          </div>
        </section>
        <p className="mt-6 flex items-center gap-2 text-xs text-[#887985]">
          <Sparkles size={14} className="text-[#d7b46a]" /> Tutti i partecipanti
          sono adulti, verificati e responsabili delle proprie scelte. Il gioco
          non sostituisce relazioni, assistenza o consenso informato.
        </p>
      </main>
    </div>
  );
}
