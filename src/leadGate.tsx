import { createContext, useContext, useEffect, useRef, useState } from "react";

export const LEAD_STORAGE_KEY = "vsl1_lead_unlocked";

// Formulário do HubSpot usado para liberar a aula.
const HUBSPOT = {
  portalId: "9446590",
  formId: "a7fd3b20-e29a-42a5-8302-8c5e87bcac6b",
  region: "na1",
};

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

// Carrega o script de embed do HubSpot uma única vez.
let hubspotScriptPromise: Promise<void> | null = null;
function loadHubspotScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).hbspt) return Promise.resolve();
  if (hubspotScriptPromise) return hubspotScriptPromise;

  hubspotScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Falha ao carregar o HubSpot"));
    document.head.appendChild(script);
  });
  return hubspotScriptPromise;
}

export function LeadModal({
  onClose,
  onUnlock,
}: {
  onClose: () => void;
  onUnlock: () => void;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Cria o formulário do HubSpot dentro do modal e escuta o envio.
  useEffect(() => {
    let cancelled = false;

    loadHubspotScript()
      .then(() => {
        if (cancelled || !targetRef.current) return;
        const hbspt = (window as any).hbspt;
        if (!hbspt) return;

        // Repassa as UTMs da URL como campos ocultos, se existirem no form.
        hbspt.forms.create({
          portalId: HUBSPOT.portalId,
          formId: HUBSPOT.formId,
          region: HUBSPOT.region,
          target: "#hubspot-lead-form",
          onFormReady: () => {
            if (!cancelled) setLoading(false);
          },
          onFormSubmitted: () => {
            // Lead salvo no HubSpot: libera o acesso à aula.
            onUnlock();
          },
        });
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [onUnlock]);

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

        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full border border-bastelli-orange/40 bg-bastelli-orange/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-bastelli-orange">
            Último passo
          </span>
        </div>

        <h2 className="font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-bastelli-ink md:text-[27px]">
          Preencha para{" "}
          <span className="bg-bastelli-orange px-1.5 text-white">liberar sua aula</span>
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-bastelli-ink/60">
          Leva menos de 30 segundos. É gratuito e o acesso é imediato.
        </p>

        <div className="relative mt-5 min-h-[120px]">
          {loading && (
            <div className="flex items-center justify-center py-10" aria-live="polite">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-bastelli-orange border-t-transparent" />
              <span className="ml-3 text-[14px] text-bastelli-ink/60">
                Carregando formulário...
              </span>
            </div>
          )}
          <div id="hubspot-lead-form" ref={targetRef} className="hs-form-bastelli" />
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-bastelli-ink/45">
          Seus dados estão seguros. Sem spam.
        </p>
      </div>
    </div>
  );
}
