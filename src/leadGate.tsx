import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LEAD_STORAGE_KEY = "vsl1_lead_unlocked";

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

type LeadGate = {
  gated: boolean;
  unlocked: boolean;
  openModal: () => void;
};

// Por padrão a home não é gated: o vídeo aparece livre.
export const LeadGateContext = createContext<LeadGate>({
  gated: false,
  unlocked: true,
  openModal: () => {},
});

export const useLeadGate = () => useContext(LeadGateContext);

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
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Data/hora no fuso de Brasília, formato "DD/MM/AAAA HH:mm:ss".
function nowBrasilia() {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}/${get("month")}/${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;
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
    data: nowBrasilia(),
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

export function LeadModal({
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
