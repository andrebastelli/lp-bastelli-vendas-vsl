import { useEffect, useMemo, useState } from "react";
import bastelliLogo from "@/assets/bastelli-logo.png";

const YT_VIDEO_ID = "LRTO8jzWVT0";
const STORAGE_KEY = "vsl1_lead_unlocked";

// Endpoint do Google Apps Script (Web App) que grava cada lead na planilha.
// Configure em VITE_LEADS_ENDPOINT (.env). Aceita a URL /exec completa
// OU apenas o token do deploy (AKfycb...), montando a URL automaticamente.
function resolveEndpoint(raw: string | undefined): string {
  const v = (raw || "").trim();
  if (!v) return "";
  if (v.startsWith("http")) return v;
  return `https://script.google.com/macros/s/${v}/exec`;
}

const LEADS_ENDPOINT = resolveEndpoint(
  import.meta.env.VITE_LEADS_ENDPOINT as string | undefined,
);

type Lead = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  temLoja: "sim" | "nao" | "";
};

const EMPTY_LEAD: Lead = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  cargo: "",
  temLoja: "",
};

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function saveLead(lead: Lead) {
  const params = new URLSearchParams(window.location.search);
  const payload = {
    ...lead,
    origem: "vsl1",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    referrer: document.referrer || "",
    data: new Date().toISOString(),
  };

  if (!LEADS_ENDPOINT) {
    console.log("[v0] LEADS_ENDPOINT não configurado. Lead:", payload);
    return;
  }
  try {
    await fetch(LEADS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (err) {
    console.log("[v0] Falha ao salvar lead:", err);
  }
}

export default function Vsl1() {
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Aula Gratuita — Curso Introdução ao E-commerce | Bastelli";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  function handleUnlock() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setUnlocked(true);
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-bastelli-navy font-sans text-white">
      {/* Texturas de fundo (mesma linguagem da home) */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.25) 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        {/* Top bar */}
        <header className="relative mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <img src={bastelliLogo} alt="Bastelli" className="h-7 w-auto md:h-8" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
            Aula gratuita
          </span>
        </header>

        <main className="relative mx-auto max-w-4xl px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-10">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-sm border border-bastelli-orange/50 bg-bastelli-orange/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-bastelli-orange">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-bastelli-orange/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bastelli-orange" />
              </span>
              Curso Introdução ao E-commerce
            </span>
          </div>

          <h1 className="mx-auto max-w-3xl text-balance text-center font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[54px]">
            A aula gratuita que mostra os{" "}
            <span className="relative inline-block">
              fundamentos
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[5px] w-full bg-bastelli-orange/70 md:-bottom-2 md:h-[10px]"
              />
            </span>{" "}
            do e-commerce de verdade
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-[15px] leading-relaxed text-white/75 md:mt-7 md:text-[18px]">
            Em poucos minutos, Bruno Bastelli explica o que separa a loja que
            vende da que só dá trabalho. Libere seu acesso e assista agora.
          </p>

          {/* Player */}
          <div className="mx-auto mt-9 max-w-3xl md:mt-12">
            {unlocked ? (
              <div className="relative w-full overflow-hidden border border-white/15 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
                <div style={{ aspectRatio: "16/9" }} className="relative w-full bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`}
                    title="Aula gratuita — Bruno Bastelli"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label="Liberar acesso à aula gratuita"
                className="group relative block w-full overflow-hidden border border-white/15 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
              >
                <div style={{ aspectRatio: "16/9" }} className="relative w-full bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${YT_VIDEO_ID}/maxresdefault.jpg`}
                    alt="Prévia da aula gratuita com Bruno Bastelli"
                    className="absolute inset-0 h-full w-full object-cover opacity-70 blur-[2px] transition group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-bastelli-navy/55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-bastelli-orange text-white shadow-lg transition group-hover:scale-105 md:h-20 md:w-20">
                      <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor">
                        <path d="M2 2v20l18-10L2 2z" />
                      </svg>
                    </span>
                    <span className="font-display text-[18px] font-semibold md:text-[22px]">
                      Clique para liberar sua aula
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Acesso gratuito e imediato
                    </span>
                  </div>
                </div>
              </button>
            )}

            {!unlocked && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="group/cta flex min-h-[56px] w-full max-w-md items-center justify-center gap-3 bg-bastelli-orange px-7 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#d5602c] active:translate-y-[1px] sm:w-auto"
                >
                  Liberar acesso à aula
                  <span aria-hidden className="text-lg leading-none transition-transform duration-200 group-hover/cta:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Bullets */}
          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
            {[
              "O que realmente faz uma loja vender (e o que só custa dinheiro).",
              "Os erros de operação que travam o crescimento sem você perceber.",
              "Por onde começar hoje, mesmo sem time e sem grande orçamento.",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4 text-[13px] leading-relaxed text-white/75 md:text-[14px]"
              >
                <span className="mt-0.5 text-bastelli-orange">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </main>
      </div>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          Bastelli Consultoria · E-commerce de Performance
        </p>
      </footer>

      {modalOpen && (
        <LeadModal onClose={() => setModalOpen(false)} onUnlock={handleUnlock} />
      )}
    </div>
  );
}

function LeadModal({
  onClose,
  onUnlock,
}: {
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [lead, setLead] = useState<Lead>(EMPTY_LEAD);
  const [errors, setErrors] = useState<Partial<Record<keyof Lead, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const progress = useMemo(() => {
    const fields = [
      lead.nome.trim().length > 1,
      isValidEmail(lead.email),
      lead.telefone.replace(/\D/g, "").length >= 10,
      lead.empresa.trim().length > 0,
      lead.cargo.trim().length > 0,
      lead.temLoja !== "",
    ];
    const done = fields.filter(Boolean).length;
    return Math.round((done / fields.length) * 100);
  }, [lead]);

  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    setLead((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  }

  function validate() {
    const next: Partial<Record<keyof Lead, boolean>> = {
      nome: lead.nome.trim().length < 2,
      email: !isValidEmail(lead.email),
      telefone: lead.telefone.replace(/\D/g, "").length < 10,
      empresa: lead.empresa.trim().length === 0,
      cargo: lead.cargo.trim().length === 0,
      temLoja: lead.temLoja === "",
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    await saveLead(lead);
    onUnlock();
  }

  const inputBase =
    "w-full rounded-md border bg-white px-4 py-3 text-[15px] text-bastelli-ink placeholder:text-bastelli-ink/40 outline-none transition focus:border-bastelli-orange focus:ring-2 focus:ring-bastelli-orange/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Liberar acesso à aula"
    >
      <div
        className="relative my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-bastelli-ink/40 transition hover:bg-bastelli-ink/5 hover:text-bastelli-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Cabeçalho com progresso */}
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full border border-bastelli-orange/40 bg-bastelli-orange/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-bastelli-orange">
            Último passo
          </span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bastelli-ink/10">
              <div
                className="h-full rounded-full bg-bastelli-orange transition-all duration-300"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-bastelli-ink/50">
              {progress}%
            </span>
          </div>
        </div>

        <h2 className="font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-bastelli-ink md:text-[27px]">
          Preencha para{" "}
          <span className="bg-bastelli-orange px-1.5 text-white">liberar sua aula</span>
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-bastelli-ink/60">
          Leva menos de 30 segundos. É gratuito e o acesso é imediato.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3" noValidate>
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              value={lead.nome}
              onChange={(e) => update("nome", e.target.value)}
              autoFocus
              className={`${inputBase} ${errors.nome ? "border-red-400" : "border-bastelli-line"}`}
            />
          </div>
          <div>
            <input
              type="email"
              inputMode="email"
              placeholder="Seu melhor e-mail"
              value={lead.email}
              onChange={(e) => update("email", e.target.value)}
              className={`${inputBase} ${errors.email ? "border-red-400" : "border-bastelli-line"}`}
            />
          </div>
          <div>
            <input
              type="tel"
              inputMode="tel"
              placeholder="Telefone / WhatsApp"
              value={lead.telefone}
              onChange={(e) => update("telefone", formatPhone(e.target.value))}
              className={`${inputBase} ${errors.telefone ? "border-red-400" : "border-bastelli-line"}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Empresa"
              value={lead.empresa}
              onChange={(e) => update("empresa", e.target.value)}
              className={`${inputBase} ${errors.empresa ? "border-red-400" : "border-bastelli-line"}`}
            />
            <input
              type="text"
              placeholder="Cargo"
              value={lead.cargo}
              onChange={(e) => update("cargo", e.target.value)}
              className={`${inputBase} ${errors.cargo ? "border-red-400" : "border-bastelli-line"}`}
            />
          </div>

          <div>
            <span className="mb-2 block text-[13px] font-medium text-bastelli-ink/70">
              Já tem uma loja virtual?
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(["sim", "nao"] as const).map((opt) => {
                const selected = lead.temLoja === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("temLoja", opt)}
                    className={`rounded-md border px-4 py-3 text-[14px] font-semibold capitalize transition ${
                      selected
                        ? "border-bastelli-orange bg-bastelli-orange/10 text-bastelli-orange"
                        : errors.temLoja
                          ? "border-red-400 text-bastelli-ink/70"
                          : "border-bastelli-line text-bastelli-ink/70 hover:border-bastelli-ink/30"
                    }`}
                  >
                    {opt === "sim" ? "Sim" : "Não"}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group/cta mt-2 flex min-h-[54px] items-center justify-center gap-3 bg-bastelli-orange px-6 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#d5602c] active:translate-y-[1px] disabled:opacity-60"
          >
            {submitting ? "Liberando..." : "Liberar acesso à aula"}
            {!submitting && (
              <span aria-hidden className="text-lg leading-none transition-transform duration-200 group-hover/cta:translate-x-0.5">
                →
              </span>
            )}
          </button>
          <p className="text-center text-[11px] leading-relaxed text-bastelli-ink/45">
            Seus dados estão seguros. Sem spam.
          </p>
        </form>
      </div>
    </div>
  );
}
