import { useEffect, useRef, useState } from "react";
import bastelliLogo from "@/assets/bastelli-logo.png";
import rodaEcommerce from "@/assets/roda-ecommerce.png";
import BrunoSantos from "@/assets/bruno_no_santos.webp";
import BrunoKabum from "@/assets/bruno_palestra.webp";
import BrunoDev from "@/assets/consuiltoria_com_cliente_bastelli.webp";
import BrunoAgencia from "@/assets/bruno_agencia.webp";
import BrunoClientes from "@/assets/bastelli_clientes.webp";
import BrunoAbcomm from "@/assets/premio_abcomm.webp";
import img01 from "@/assets/combo.webp";
import img02 from "@/assets/boas_praticas.webp";
import img03 from "@/assets/e-book.webp";
import img04 from "@/assets/hotmart.webp";
import img05 from "@/assets/planilha_metas.webp";
import img06 from "@/assets/planilha_ofertas.webp";
import img07 from "@/assets/roda_do_e_commerce.webp";
import img08 from "@/assets/trello.webp";

function useAutoScrollCarousel<T extends HTMLElement>(itemCount: number, intervalMs = 4500) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || itemCount <= 1) return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;
    let paused = false;
    const onPointer = () => {
      paused = true;
      window.clearTimeout((el as any)._resumeT);
      (el as any)._resumeT = window.setTimeout(() => (paused = false), 6000);
    };
    const onEnter = () => {
      paused = true;
      window.clearTimeout((el as any)._resumeT);
    };
    const onLeave = () => {
      paused = false;
    };
    el.addEventListener("pointerdown", onPointer, { passive: true });
    el.addEventListener("touchstart", onPointer, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const id = window.setInterval(() => {
      if (paused) return;
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 16; // gap-4
      const currentIndex = Math.round(el.scrollLeft / step);
      const nextIndex = currentIndex + 1;
      el.scrollTo({
        left: nextIndex >= itemCount ? 0 : nextIndex * step,
        behavior: "smooth",
      });
    }, intervalMs);
    return () => {
      window.clearInterval(id);
      window.clearTimeout((el as any)._resumeT);
      el.removeEventListener("pointerdown", onPointer);
      el.removeEventListener("touchstart", onPointer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [itemCount, intervalMs]);
  return ref;
}


const CHECKOUT_URL =
  "https://pay.hotmart.com/G100638464G?off=fvkwnua1&checkoutMode=10&bid=1780434842803";
const CTA_LABEL = "Quero entender meu e-commerce de verdade";

function CTA({
  variant = "solid",
  className = "",
  children = CTA_LABEL,
  href,
}: {
  variant?: "solid" | "ghost";
  className?: string;
  children?: React.ReactNode;
  href?: string;
}) {
  const base =
    "group/cta relative flex w-full min-h-[60px] items-center justify-between gap-4 rounded-none px-5 py-4 text-left text-[15px] font-semibold leading-[1.15] tracking-tight transition-all duration-200 active:translate-y-[1px] sm:inline-flex sm:w-auto sm:min-h-[56px] sm:justify-center sm:gap-3 sm:px-7 sm:text-center";
  const styles =
    variant === "solid"
      ? "bg-bastelli-orange text-white shadow-[0_1px_0_0_rgba(0,0,0,0.15)] hover:bg-[#d5602c]"
      : "border border-white/30 text-white hover:bg-white/10";
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`${base} ${styles} ${className}`}
      >
        <span className="flex-1 sm:flex-none">{children}</span>
        <span
          aria-hidden
          className="flex shrink-0 items-center gap-2 text-[13px] font-mono uppercase tracking-[0.18em] opacity-90 sm:text-[15px] sm:tracking-normal sm:normal-case sm:font-semibold sm:opacity-100"
        >
          <span className="hidden h-px w-6 bg-current opacity-40 sm:hidden" />
          <span className="text-lg leading-none transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
        </span>
      </a>
    );
  }
  return (
    <a
      href="#checkout-final"
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById("checkout-final")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="flex-1 sm:flex-none">{children}</span>
      <span
        aria-hidden
        className="flex shrink-0 items-center text-lg leading-none transition-transform duration-200 group-hover/cta:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

function Placeholder({
  label,
  ratio = "4/5",
  tone = "navy",
}: {
  label: string;
  ratio?: string;
  tone?: "navy" | "paper" | "blue";
}) {
  const bg =
    tone === "navy"
      ? "bg-bastelli-navy text-white/70"
      : tone === "blue"
        ? "bg-bastelli-blue text-white/80"
        : "bg-bastelli-paper text-bastelli-navy/60";
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative w-full overflow-hidden ${bg} flex items-center justify-center`}
    >
      <div className="absolute inset-3 border border-current/20" />
      <span className="px-4 text-center font-mono text-[11px] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={[
        "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-bastelli-navy shadow-lg transition-all duration-300",
        "hover:bg-bastelli-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bastelli-orange focus-visible:ring-offset-2",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}

function Index() {
  return (
    <main className="bg-white font-sans text-bastelli-ink antialiased">
      <Nav />
      <Hero />
      <Identificacao />
      <QuebraDeCrenca />
      <RodaDoEcommerce />
      <ApresentacaoCurso />
      <OQueVaiAprender />
      <Bonus />
      <SobreBruno />
      <Oferta />
      <Garantia />
      <FAQ />
      <CtaFinal />
      <Footer />
      <BackToTop />
    </main>
  );
}

/* ============================================================
   NAV
============================================================ */
function Nav() {
  const anchors = [
    { href: "#roda", label: "Curso" },
    { href: "#modulos", label: "Módulos" },
    { href: "#bruno", label: "Bruno" },
    { href: "#faq", label: "FAQ" },
  ];
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="sticky top-0 z-40 border-b border-bastelli-line/70 bg-white/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 md:gap-8 md:px-8">
        <a href="/" aria-label="Bastelli — Consultoria em E-commerce" className="flex items-center">
          <img
            src={bastelliLogo}
            alt="Bastelli — Consultoria em E-commerce e Performance"
            className="h-7 w-auto md:h-8"
          />
        </a>

        {/* Âncoras — só desktop, discretas */}
        <nav className="hidden items-center gap-6 md:flex">
          <span aria-hidden className="h-px w-8 bg-bastelli-navy/20" />
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              onClick={scrollTo(a.href.slice(1))}
              className="text-[11px] uppercase tracking-[0.22em] text-bastelli-navy/55 transition-colors hover:text-bastelli-navy"
            >
              {a.label}
            </a>
          ))}
        </nav>

        <a
          href="#checkout-final"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("oferta")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="group inline-flex items-baseline gap-2 text-[13px] font-semibold text-bastelli-navy"
        >
          <span className="whitespace-nowrap underline decoration-bastelli-orange decoration-[3px] underline-offset-[6px] group-hover:decoration-[4px] lg:decoration-2 lg:group-hover:decoration-[3px]">
            Ver a oferta
          </span>
          <span aria-hidden className="text-[10px] uppercase tracking-[0.2em] text-bastelli-orange lg:text-bastelli-navy/50">↓</span>
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   1. HERO
============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-bastelli-navy text-white">
      {/* Grão de papel (noise SVG) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Malha técnica editorial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.35) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      {/* Escala técnica vertical à esquerda */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 flex-col gap-14 opacity-40 md:flex"
      >
        <span className="rotate-90 font-mono text-[9px] tracking-[0.35em] text-white/50">
          BST_2010
        </span>
        <span className="rotate-90 font-mono text-[9px] tracking-[0.35em] text-white/50">
          MOD_12/24
        </span>
        <span className="rotate-90 font-mono text-[9px] tracking-[0.35em] text-white/50">
          VER_1.0
        </span>
      </div>
      {/* Escala técnica vertical à direita */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 flex-col gap-14 opacity-40 md:flex"
      >
        <span className="rotate-90 font-mono text-[9px] tracking-[0.35em] text-white/50">
          ISO_ECOM
        </span>
        <span className="rotate-90 font-mono text-[9px] tracking-[0.35em] text-white/50">
          SEC_002
        </span>
        <span className="rotate-90 font-mono text-[9px] tracking-[0.35em] text-white/50">
          REV_A
        </span>
      </div>
      {/* Vinheta radial para profundidade nas bordas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.24em] text-white/60 md:mb-8 md:flex-nowrap md:whitespace-nowrap md:text-[11px]">
  <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-bastelli-orange/50 bg-bastelli-orange/10 px-2.5 py-1 font-mono font-bold text-bastelli-orange">
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className="absolute inset-0 animate-ping rounded-full bg-bastelli-orange/70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bastelli-orange" />
    </span>
    Curso Online de Introdução ao E-commerce
  </span>
  <span className="whitespace-nowrap text-white/70">com Bruno Bastelli</span>
</div>

        <h1 className="mx-auto max-w-5xl text-center font-display text-[38px] font-semibold leading-[1.02] tracking-[-0.025em] md:text-[80px]">
          Os{" "}
          <span className="relative inline-block">
            fundamentos
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[6px] w-full bg-bastelli-orange/70 md:-bottom-2 md:h-[12px]"
            />
          </span>{" "}
          que todo lojista precisa dominar antes de abrir, ajustar ou{" "}
          <span className="text-white/60">escalar sua loja virtual.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[16px] leading-relaxed text-white/80 md:mt-10 md:text-[19px]">
          Sem fórmula mágica. Sem guru. Sem enrolação. Um treinamento
          estratégico para quem quer construir um e‑commerce de verdade.
        </p>

        {/* VSL — acima do CTA */}
        <div className="mx-auto mt-10 max-w-2xl md:mt-14 md:max-w-4xl">
          <VSLPlayer />
          <p className="mx-auto mt-4 max-w-xl text-center text-[13px] leading-relaxed text-white/55 md:text-[14px]">
            Se você tem uma loja online e as vendas não estão saindo do lugar, começa por aqui. É rápido.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 md:mt-10">
          <CTA className="w-full">Quero começar agora</CTA>
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
            Acesso imediato · Pagamento único
          </p>
        </div>
      </div>
    </section>
  );
}

function VSLPlayer() {
  const [playing, setPlaying] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [outOfView, setOutOfView] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOutOfView(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showFloating = outOfView && !dismissed;

  return (
    <div ref={anchorRef}>
    <div className="relative w-full overflow-hidden border border-white/15 bg-black/30 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
      <div style={{ aspectRatio: "16/9" }} className="relative w-full">
        {playing ? (
          <div className="flex h-full w-full items-center justify-center bg-black text-center text-white/60">
            <div className="px-4 font-mono text-[11px] uppercase tracking-widest">
              [[INSERIR ARQUIVO OU URL DA VSL APROVADA]]
            </div>
          </div>
        ) : (
          <>
            <Placeholder label="Poster real com Bruno — VSL" ratio="16/9" tone="navy" />
            <button
              onClick={() => setPlaying(true)}
              aria-label="Reproduzir vídeo"
              className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/10"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-bastelli-orange text-white shadow-lg md:h-20 md:w-20">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor">
                  <path d="M2 2v20l18-10L2 2z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
    {showFloating && (
      <div
        className="fixed bottom-4 right-4 z-50 w-[240px] overflow-hidden rounded-lg border border-white/20 bg-black shadow-2xl animate-fade-in sm:w-[300px] md:w-[340px]"
        role="complementary"
        aria-label="Vídeo flutuante"
      >
        <div className="flex flex-col items-center justify-center gap-1 bg-bastelli-navy px-3 py-2 pr-8 text-[10px] uppercase tracking-[0.18em] text-white/50">
          <div className="flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap">
            <span className="inline-flex items-center gap-2 rounded-sm border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
              <span className="relative inline-flex items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-sm bg-orange-500/60 opacity-75" />
                <span className="relative inline-flex items-center justify-center rounded-[3px] bg-orange-500 px-1 py-[1px]">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-white" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              Vídeo
            </span>
            <span className="text-white/70">Aula-convite</span>
          </div>
          <span className="text-white/40">Assista antes de começar</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar vídeo flutuante"
          className="absolute right-1.5 top-1.5 z-10 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-white/80 backdrop-blur transition hover:bg-black hover:text-white"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l8 8M9 1l-8 8" />
          </svg>
        </button>
        <button
          onClick={() => {
            anchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="block w-full text-left"
          aria-label="Voltar para o vídeo"
        >
          <div style={{ aspectRatio: "16/9" }} className="relative w-full bg-black">
            {playing ? (
              <div className="flex h-full w-full items-center justify-center bg-black text-center text-white/60">
                <div className="px-3 font-mono text-[9px] uppercase tracking-widest">
                  [[VSL EM REPRODUÇÃO]]
                </div>
              </div>
            ) : (
              <>
                <Placeholder label="VSL" ratio="16/9" tone="navy" />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setPlaying(true);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-bastelli-orange text-white shadow-lg">
                    <svg width="12" height="14" viewBox="0 0 22 24" fill="currentColor">
                      <path d="M2 2v20l18-10L2 2z" />
                    </svg>
                  </span>
                </span>
              </>
            )}
          </div>
        </button>
      </div>
    )}
    </div>
  );
}

/* ============================================================
   2. O PROBLEMA REAL DO LOJISTA
============================================================ */
function Identificacao() {
  const falas = [
    { texto: "Você aumenta o tráfego, mas a loja não converte." },
    { texto: "Troca a campanha, mas o resultado não melhora." },
    { texto: "Posta mais, mas continua sem previsibilidade." },
    { texto: "Faz promoção, mas vende com margem apertada." },
    { texto: "Troca ferramenta, mas continua sem direção." },
  ];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % falas.length), 5000);
    return () => clearInterval(id);
  }, [paused, falas.length]);
  const total = falas.length;
  const atual = falas[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="border-b border-bastelli-line bg-[#F7F3EE]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-28">
        {/* Cabeçalho assimétrico — nada centralizado */}
        <div className="grid gap-5 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bastelli-orange">
              O problema real do lojista
            </span>
            <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-bastelli-navy md:text-[60px]">
              Você vai continuar
              <br />
              vendendo <span className="text-bastelli-navy/50">no escuro?</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-16">
            <p className="max-w-sm text-[15px] leading-relaxed text-bastelli-navy/65 md:text-[16px]">
              Você tenta resolver uma parte, mas o problema parece sempre
              estar ali.
            </p>
          </div>
        </div>

        <div
          className="relative mt-10 md:mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Ordinal gigante em outline, atrás da fala, à direita */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[120px] font-bold leading-none tracking-tighter text-transparent md:-top-10 md:text-[280px]"
            style={{ color: "rgba(35,56,74,0.10)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative flex min-h-[160px] items-center md:min-h-[200px]">
            {falas.map((fala, i) => (
              <figure
                key={i}
                aria-hidden={i !== index}
                className={`absolute inset-0 flex max-w-[46rem] flex-col justify-center px-2 transition-all duration-700 ease-out ${
                  i === index
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute -left-3 -top-8 font-display text-[90px] leading-none text-bastelli-orange/40 md:-left-5 md:-top-10 md:text-[140px]"
                >
                  “
                </span>
                <blockquote className="relative font-display text-[26px] font-semibold leading-[1.25] tracking-[-0.01em] text-bastelli-navy md:text-[38px]">
                  {fala.texto}
                </blockquote>
              </figure>
            ))}
          </div>

          {/* Controles: contador + dots em cima, setas prev/next abaixo */}
          <div className="mt-4 border-t border-bastelli-navy/15 pt-3 md:mt-6 md:pt-5">
            <div className="flex flex-col gap-4">
              {/* Linha 1: contador + dots */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2 font-mono text-bastelli-navy/70">
                  <span className="text-[22px] font-semibold text-bastelli-navy md:text-[28px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.2em] text-bastelli-navy/40">
                    / {String(total).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {falas.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Ir para o ponto ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-10 bg-bastelli-orange"
                          : "w-2 bg-bastelli-navy/20 hover:bg-bastelli-navy/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Linha 2: botões prev/next, alinhados à direita */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Ponto anterior"
                  className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próximo ponto"
                  className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fecho — dividido em duas colunas, com assinatura */}
        <div className="mt-12 grid gap-6 md:mt-28 md:grid-cols-12 md:gap-10">
          <p className="md:col-span-9 text-[19px] leading-[1.45] text-bastelli-navy md:text-[24px]">
            O problema é que, quando você não entende a operação como um
            todo,{" "}
            <span className="bg-bastelli-orange/25 px-1.5 py-0.5 font-semibold">
              qualquer decisão vira tentativa
            </span>
            . Enquanto isso, empresas que entendem a operação de verdade de
            um e-commerce vendem todo dia, e você fica se perguntando o
            que elas sabem e você não.
          </p>
          <p className="md:col-span-3 md:pt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-bastelli-navy/55">
            — Bruno Bastelli
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. A VIRADA DE CHAVE
============================================================ */
function QuebraDeCrenca() {
  const pares = [
    {
      mito: "“Tenho produto bom, então deveria vender.”",
      verdade:
        "Uma loja virtual pode ter bons produtos e ainda assim não vender.",
    },
    {
      mito: "“Se eu tiver tráfego, as vendas vêm.”",
      verdade:
        "Pode ter tráfego e ainda assim não converter. Pode ter campanha rodando e ainda assim perder dinheiro.",
    },
    {
      mito: "“A plataforma resolve o problema.”",
      verdade:
        "Pode ter uma plataforma conhecida e ainda assim gerar uma experiência ruim.",
    },
  ];

  return (
    <section className="bg-bastelli-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
        {/* cabeçalho */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bastelli-orange">
              A virada de chave
            </span>
            <h2 className="mt-5 font-display text-[44px] font-light leading-[0.95] tracking-[-0.02em] md:text-[92px]">
              E-commerce não é{" "}
              <span className="italic font-normal text-bastelli-orange">
                uma peça isolada
              </span>.
            </h2>
          </div>
          <aside className="col-span-12 md:col-span-3 md:pt-10"></aside>
        </div>

        {/* lista */}
        <ol className="mt-16 md:mt-24">
          {pares.map((p, i) => (
            <li
              key={p.mito}
              className={`grid grid-cols-[110px_1fr] gap-4 md:gap-8 border-t border-white/10 py-8 md:py-12
                ${i === 1 ? "pl-6 md:pl-12" : ""}
                ${i === 2 ? "pl-12 md:pl-24" : ""}
              `}
            >
              <div className="relative flex items-start">
                <span className="font-display font-semibold text-[48px] leading-none text-bastelli-orange md:text-[72px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <p className="font-display text-[20px] leading-[1.25] text-white/55 md:text-[28px]">
                  {p.mito}
                </p>
                <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.55] text-white md:mt-4 md:text-[18px]">
                  {p.verdade}
                </p>
              </div>
            </li>
          ))}
          <li className="border-t border-white/10" />
        </ol>

        {/* fechamento */}
        <p className="mt-16 font-display text-[38px] font-light leading-[1.02] tracking-[-0.02em] md:mt-24 md:text-[112px]">
          É{" "}
          <span className="text-bastelli-orange">
            planejamento, loja, operação e marketing
          </span>{" "}
          funcionando juntos.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   4. RODA DO E-COMMERCE
============================================================ */
function RodaDoEcommerce() {
  const pilares = [
    {
      n: "01",
      title: "Planejamento",
      desc:
        "Meta do mês, calendário de campanha e onde apostar ficha no próximo trimestre. Sem isso, você lojista não sabe para onde ir.",
    },
    {
      n: "02",
      title: "Loja Virtual",
      desc:
            "O caminho do produto até o checkout: foto, descrição, filtro, frete, SEO. É onde a venda acontece ou trava.",
    },
    {
      n: "03",
      title: "Operação",
      desc:
        "Pedido, estoque, ERP, entrega, atendimento. A parte que ninguém vê e que decide se o cliente volta.",
    },
    {
      n: "04",
      title: "Marketing",
      desc:
        "Tráfego, conteúdo, marca, base de clientes. Só entrega resultado quando os outros três já estão em pé.",
    },
  ];

  return (
    <section id="roda" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-12 md:px-8 md:pt-16 md:pb-24">
        {/* cabeçalho + roda em bleed à direita */}
        <div className="grid grid-cols-12 items-center gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bastelli-orange">
              Metodologia Exclusiva da Bastelli
            </span>
            <h2 className="mt-4 font-display text-[38px] font-light leading-[0.98] tracking-[-0.02em] text-bastelli-navy md:text-[68px]">
              Quatro engrenagens.
              <br />
              Se uma <span className="italic font-normal text-bastelli-orange">trava</span>,
              <br />
              a loja anda torto.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-bastelli-navy/65 md:text-[16px]">
              A Roda do E-commerce é o mapa que a Bastelli usa toda vez que entra
              numa loja. Ajuda a parar de trocar tática e começar a olhar o todo.
            </p>
          </div>

          {/* roda: protagonista, com halos e anéis girando */}
          <div className="col-span-12 md:col-span-6">
            <div className="relative mx-auto -mt-2 aspect-square w-full max-w-[420px] md:mt-0 md:mr-[-60px] md:max-w-none md:w-[120%]">
              {/* halo navy interno para profundidade */}
              <div
                aria-hidden
                className="absolute inset-[10%] rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(35,56,74,0.10), rgba(35,56,74,0) 70%)",
                }}
              />
              {/* anel tracejado girando no sentido contrário */}
              <div
                aria-hidden
                className="absolute inset-[3%] rounded-full border border-dashed border-bastelli-navy/25"
                style={{
                  animation: "roda-spin 90s linear infinite reverse",
                  transformOrigin: "50% 50%",
                }}
              />
              {/* anel fino de destaque */}
              <div
                aria-hidden
                className="absolute inset-[1%] rounded-full border border-bastelli-orange/25"
              />
              {/* marcadores cardinais */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-bastelli-orange/60" />
                <span className="absolute left-1/2 bottom-0 h-2 w-px -translate-x-1/2 bg-bastelli-orange/60" />
                <span className="absolute top-1/2 left-0 h-px w-2 -translate-y-1/2 bg-bastelli-orange/60" />
                <span className="absolute top-1/2 right-0 h-px w-2 -translate-y-1/2 bg-bastelli-orange/60" />
              </div>
              <img
                src={rodaEcommerce}
                alt="Roda do E-commerce Bastelli — Planejamento, Loja Virtual, Operação e Marketing"
                className="relative h-full w-full select-none object-contain drop-shadow-[0_28px_50px_rgba(35,56,74,0.18)]"
                style={{
                  animation: "roda-spin 40s linear infinite",
                  transformOrigin: "50% 50%",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* pilares como carrossel */}
        <RodaPilaresCarousel pilares={pilares} />

        <div className="mt-8 flex flex-col items-start gap-4 md:mt-14 md:flex-row md:items-center md:gap-8">
          <p className="max-w-[36ch] font-display text-[20px] font-light leading-[1.2] text-bastelli-navy md:text-[24px]">
            No Curso Online Introdução ao E-commerce.
          </p>
          <CTA />
        </div>
      </div>
    </section>
  );
}

function RodaPilaresCarousel({
  pilares,
}: {
  pilares: { n: string; title: string; desc: string }[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((v) => (v + 1) % pilares.length), 5000);
    return () => clearInterval(id);
  }, [paused, pilares.length]);

  const current = pilares[active];

  const goPrev = () => setActive((v) => (v - 1 + pilares.length) % pilares.length);
  const goNext = () => setActive((v) => (v + 1) % pilares.length);

  return (
    <div
      className="relative mt-4 md:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative min-h-[260px] border-t border-bastelli-navy/15 pt-10 md:min-h-[300px] md:pt-14">
        <div
          key={current.n}
          className="grid grid-cols-12 items-baseline gap-4 md:gap-8"
          style={{ animation: "fade-in 500ms ease-out both" }}
        >
          <div
            className="col-span-3 font-display text-[72px] font-light leading-none text-transparent md:col-span-2 md:text-[132px]"
            style={{ color: "rgba(35,56,74,0.4)" }}
          >
            {current.n}
          </div>
          <h3 className="col-span-9 font-display text-[28px] font-normal leading-[1.1] tracking-[-0.01em] text-bastelli-navy md:col-span-3 md:text-[40px]">
            {current.title}
          </h3>
          <p className="col-span-12 max-w-[54ch] text-[16px] leading-relaxed text-bastelli-navy/70 md:col-span-7 md:text-[18px]">
            {current.desc}
          </p>
        </div>
      </div>

      {/* Controles: contador + dots em cima, setas prev/next abaixo — idêntico ao bloco 2 */}
      <div className="mt-8 border-t border-bastelli-navy/15 pt-6">
        <div className="flex flex-col gap-4">
          {/* Linha 1: contador + dots */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2 font-mono text-bastelli-navy/70">
              <span className="text-[22px] font-semibold text-bastelli-navy md:text-[28px]">
                {current.n}
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-bastelli-navy/40">
                / {String(pilares.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {pilares.map((p, i) => (
                <button
                  key={p.n}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver pilar ${p.title}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-10 bg-bastelli-orange"
                      : "w-2 bg-bastelli-navy/20 hover:bg-bastelli-navy/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Linha 2: botões prev/next, alinhados à direita */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Pilar anterior"
              className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Próximo pilar"
              className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   5. APRESENTAÇÃO DO CURSO
============================================================ */
function ApresentacaoCurso() {
  const ficha = [
    { k: "Aulas", v: "24, curtas e sem enrolação" },
    { k: "Duração", v: "4h28 no total" },
    { k: "Formato", v: "vídeo sob demanda, assiste no seu tempo" },
    { k: "Nível", v: "introdução, serve pra quem tá começando e pra quem já opera" },
    { k: "Entrega", v: "uma visão inteira da operação, do topo ao pós-venda" },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        {/* Kicker + regra */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-bastelli-navy/15" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-bastelli-navy/50">
            Sobre o Curso
          </span>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Coluna texto */}
          <div className="md:col-span-7">
            <h2 className="font-display text-[38px] font-light leading-[0.98] tracking-[-0.02em] text-bastelli-navy md:text-[64px]">
              Um curso prático.
              <br />
              <span className="italic text-bastelli-orange">Uma visão 360º.</span>
            </h2>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.55] text-bastelli-navy/90 md:text-[19px]">
              É um Curso Online de Introdução ao E-commerce com Bruno Bastelli. Você senta, assiste
              em alguns dias e sai enxergando a loja como um sistema, não
              como uma pilha de tarefas soltas.
            </p>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bastelli-navy/60 md:pl-10">
              Serve pra quem tá começando e quer o mapa antes de sair
              gastando. E também pra quem já opera, mas sente que tá tapando
              buraco toda semana.
            </p>

            {/* Ficha técnica em linhas */}
            <dl className="mt-12 border-t border-bastelli-navy/15">
              {ficha.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[110px_1fr] gap-4 border-b border-bastelli-navy/10 py-3 md:grid-cols-[140px_1fr] md:py-4"
                >
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-bastelli-navy/50">
                    {row.k}
                  </dt>
                  <dd className="text-[15px] leading-snug text-bastelli-navy md:text-[16px]">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

{/* Coluna numeral dominante */}
          <div className="relative md:col-span-5 md:pt-16">
            <div className="relative flex flex-col items-start md:sticky md:top-24">
              <div className="pointer-events-none select-none font-display text-[160px] font-light leading-[0.82] tracking-[-0.06em] text-bastelli-navy md:text-[220px]">
                12
              </div>
              <div className="mt-1 flex items-baseline gap-3 md:mt-3">
                <span className="h-px w-10 translate-y-[-4px] bg-bastelli-orange" />
                <span className="text-[13px] uppercase tracking-[0.24em] text-bastelli-navy/70">
                  módulos
                </span>
              </div>
              <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-bastelli-navy/55 md:mt-5 md:ml-4">
                Cada módulo cobre uma parte da operação e conversa com as
                outras. Nenhum vive isolado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. O QUE VAI APRENDER
============================================================ */
function OQueVaiAprender() {
  const blocos = [
    {
      n: "01",
      t: "Planejamento e metas",
      d: "Objetivo, calendário e indicadores que cabem no tamanho da sua loja. Não no template de agência.",
      out: [
        "Montar o calendário de Black Friday sem improviso de última hora",
        "Definir meta de faturamento a partir de margem, não de vontade",
        "Escolher 3 KPIs que a sua loja realmente consegue acompanhar",
      ],
    },
    {
      n: "02",
      t: "Plataformas e estrutura da loja",
      d: "O que uma loja precisa ter de verdade. E o que só parece importante no vídeo do YouTube.",
      out: [
        "Escolher entre Shopify, Nuvemshop, VTEX e Tray sem achismo",
        "Saber quando trocar de plataforma (e quando é só desculpa)",
        "Mapear as integrações mínimas antes de assinar qualquer plano",
      ],
    },
    {
      n: "03",
      t: "Produtos, fotos, descrições e experiência de compra",
      d: "O que decide, em 4 segundos, se a pessoa confia na loja ou fecha a aba.",
      out: [
        "Fazer um cadastro de produtos sem parecer marketplace genérico",
        "Organizar categorias para o visitante achar sozinho",
        "Ajustar fotos e descrição sem contratar estúdio",
      ],
    },
    {
      n: "04",
      t: "Pagamentos, frete, logística e operação",
      d: "A parte chata que sustenta a loja em pé: pagamento, frete, estoque, expedição, antifraude.",
      out: [
        "Configurar frete sem comer margem no CEP errado",
        "Reduzir chargeback ajustando as regras de antifraude",
        "Desenhar a rotina do pedido: da venda ao objeto postado",
      ],
    },
    {
      n: "05",
      t: "Marketing, tráfego e dados",
      d: "Tráfego é uma engrenagem, não a loja inteira. Aqui você para de terceirizar decisão.",
      out: [
        "Ler um relatório do Ads sem depender do gestor traduzir",
        "Instalar tracking que não mente sobre a origem da venda",
        "Decidir, com dado, quando vale escalar e quando vale segurar",
      ],
    },
    {
      n: "06",
      t: "Atendimento, retenção e crescimento",
        d: "O que faz o cliente voltar e o que faz ele sumir depois da primeira compra.",
      out: [
        "Atender WhatsApp sem virar SAC de reclamação",
        "Montar um fluxo de recompra simples (sem CRM caro)",
        "Descobrir por que o cliente comprou uma vez e não voltou",
      ],
    },
  ];

  const scrollRef = useAutoScrollCarousel<HTMLOListElement>(blocos.length, 4500);

  return (
    <section id="modulos" className="bg-bastelli-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          {/* Coluna esquerda — índice sticky */}
          <aside className="min-w-0 md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-bastelli-orange" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                  Índice
                </span>
              </div>
              <h2 className="mt-6 font-display text-[38px] font-light leading-[0.98] text-bastelli-navy md:text-[56px]">
                Seis frentes.<br />
                <span className="italic text-bastelli-orange">Doze módulos.</span><br />
                Uma operação<br />inteira.
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bastelli-navy/70">
                Cada bloco cobre uma parte da loja e conversa com as outras. Nada aqui vive isolado.
              </p>
              <dl className="mt-8 space-y-2 border-t border-bastelli-navy/15 pt-6 font-mono text-[12px] uppercase tracking-[0.18em] text-bastelli-navy/60">
                <div className="flex justify-between"><dt>Módulos</dt><dd className="text-bastelli-navy">12</dd></div>
                <div className="flex justify-between"><dt>Frentes</dt><dd className="text-bastelli-navy">06</dd></div>
                <div className="flex justify-between"><dt>Duração</dt><dd className="text-bastelli-navy">4h28</dd></div>
              </dl>
            </div>
          </aside>

          {/* Coluna direita — lista de blocos */}
          <div className="min-w-0 md:col-span-8">
            <ol ref={scrollRef} className="flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:block md:snap-none md:overflow-visible md:gap-0 md:pb-0 md:divide-y md:divide-bastelli-navy/15 md:border-y md:border-bastelli-navy/15 [&>li]:snap-center [&>li]:shrink-0 [&>li]:w-[80vw] [&>li]:max-w-[320px] [&>li]:border [&>li]:border-bastelli-navy/15 [&>li]:rounded-lg [&>li]:bg-white [&>li]:px-4 md:[&>li]:w-auto md:[&>li]:max-w-none md:[&>li]:border-0 md:[&>li]:rounded-none md:[&>li]:bg-transparent md:[&>li]:px-0">
              {blocos.map((b) => (
                <Accordion key={b.n} n={b.n} title={b.t} outcomes={b.out}>
                  {b.d}
                </Accordion>
              ))}
            </ol>

            {/* Navegação mobile — setas prev/next */}
            <div className="mt-3 flex items-center justify-end gap-3 md:hidden">
              <button
                type="button"
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: -(scrollRef.current.clientWidth * 0.85),
                    behavior: "smooth",
                  })
                }
                aria-label="Módulo anterior"
                className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: scrollRef.current.clientWidth * 0.85,
                    behavior: "smooth",
                  })
                }
                aria-label="Próximo módulo"
                className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Accordion({
  n,
  title,
  children,
  outcomes,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  outcomes?: string[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <li className="list-none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 text-left md:gap-8"
        aria-expanded={open}
      >
        <span
          className={`font-display text-[42px] font-light leading-none tracking-tight md:text-[56px] ${
            open ? "text-bastelli-orange" : "text-bastelli-navy/25"
          } transition-colors group-hover:text-bastelli-orange`}
          aria-hidden
        >
          {n}
        </span>
        <span className="font-display text-[20px] font-medium leading-tight text-bastelli-navy md:text-[26px]">
          {title}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[13px] transition-all ${
            open
              ? "rotate-45 border-bastelli-orange bg-bastelli-orange text-white"
              : "border-bastelli-navy/30 text-bastelli-navy group-hover:border-bastelli-navy"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      {open && (
        <div className="grid grid-cols-[auto_1fr] gap-6 pb-8 md:gap-8">
          <span aria-hidden className="w-[42px] md:w-[56px]" />
          <div className="max-w-2xl">
            <p className="text-[16px] leading-relaxed text-bastelli-navy/80 md:text-[17px]">
              {children}
            </p>
            {outcomes && outcomes.length > 0 && (
              <>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bastelli-navy/50">
                  Você sai sabendo
                </p>
                <ul className="mt-3 space-y-2.5">
                  {outcomes.map((o) => (
                    <li
                      key={o}
                      className="grid grid-cols-[auto_1fr] items-start gap-3 text-[15px] leading-snug text-bastelli-navy/85"
                    >
                      <span aria-hidden className="mt-[0.7em] h-px w-5 bg-bastelli-orange" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

/* ============================================================
   7. BÔNUS
============================================================ */
function Bonus() {
  const itens = [
  {
    title: "Curso Online Introdução E-commerce",
    desc: "Com diversos bônus e materiais extras.",
    img: img01,
  },
  {
    title: "Planilha/PDF com a Roda do E-commerce",
    desc: "A metodologia completa de decisão.",
    img: img07,
  },
  {
    title: "Boas Práticas de Banners",
    desc: "Checklist prático para execução.",
    img: img02,
  },
  {
    title: "E-book Introdução E-commerce",
    desc: "Base para estruturar sua loja corretamente.",
    img: img03,
  },
  {
    title: "Planilha Para Definição de Metas",
    desc: "Defina metas claras e mensuráveis.",
    img: img05,
  },
  {
    title: "Planilha com Ideias de Ofertas",
    desc: "Planilha com mais de 50 ideias de ofertas validadas.",
    img: img06,
  },
  {
    title: "Trello com Planejamento de Ações",
    desc: "Organize campanhas e vendas.",
    img: img08,
  },
  {
    title: "Acesso via Hotmart",
    desc: "Acesso completo pela plataforma.",
    img: img04,
  },
];

  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;

      if (totalScroll <= 0) {
        setActive(0);
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      const pct = scrolled / totalScroll;

      const idx = Math.min(
        itens.length - 1,
        Math.floor(pct * itens.length)
      );

      setActive(idx);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itens.length]);

  const current = itens[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${itens.length * 100}vh` }}
    >
      {/* STICKY */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-6">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          {/* HEADER */}
          <div className="mb-4 max-w-[600px] md:mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bastelli-orange md:text-[11px]">
              Bônus
            </span>
            <h2 className="mt-2 font-display text-[26px] font-light leading-[1.02] tracking-[-0.02em] text-bastelli-navy md:mt-4 md:text-[56px]">
              O acesso vai{" "}
              <span className="italic text-bastelli-orange">além do curso</span>
            </h2>
          </div>

          {/* CARD */}
          <div
            key={active}
            className="grid grid-cols-1 overflow-hidden border border-bastelli-navy/10 md:grid-cols-2"
            style={{ animation: "fade-in 500ms ease-out both" }}
          >
            {/* IMAGEM — esquerda */}
            <div className="flex min-h-[22vh] items-center justify-center bg-[#f5f3ed] py-6 md:min-h-[34vh]">
              <img
                src={current.img}
                alt={current.title}
                className="h-auto w-full max-w-[400px] object-contain md:max-w-[]"
              />
            </div>

            {/* TEXTO — direita */}
            <div className="flex flex-col justify-center px-6 py-6 md:px-12 md:py-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bastelli-orange md:text-[11px]">
                {String(active + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-[20px] leading-tight text-bastelli-navy md:mt-4 md:text-[32px]">
                {current.title}
              </h3>
              <p className="mt-2 max-w-[42ch] text-[14px] leading-relaxed text-bastelli-navy/70 md:mt-4 md:text-[16px]">
                {current.desc}
              </p>
            </div>
          </div>

          {/* Progresso — contador + dots */}
          <div className="mt-4 border-t border-bastelli-navy/15 pt-3 md:mt-6 md:pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-2 font-mono text-bastelli-navy/70">
                <span className="text-[16px] font-semibold text-bastelli-navy md:text-[22px]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-bastelli-navy/40 md:text-[12px]">
                  / {String(itens.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {itens.map((it, i) => (
                  <span
                    key={it.title}
                    aria-hidden
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-8 bg-bastelli-orange md:w-10" : "w-2 bg-bastelli-navy/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-bastelli-navy/40 md:mt-3 md:text-[10px]">
              Role a página pra ver os próximos bônus
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. SOBRE BRUNO
============================================================ */
function SobreBruno() {
  const scrollRef = useAutoScrollCarousel<HTMLDivElement>(6, 5000);
  return (
    <section id="bruno" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-32">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="min-w-0 md:col-span-4 md:order-2">
            <div className="sticky top-24">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-bastelli-orange" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                  Com Quem Você Vai Aprender
                </span>
              </div>
              <h2 className="mt-6 font-display text-[44px] font-light leading-[0.95] text-bastelli-navy md:text-[68px]">
                Bruno<br />
                <span className="italic text-bastelli-orange">Bastelli.</span>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bastelli-navy/75">
                Começou no atendimento da KaBuM. Passou por dev, UX, tráfego e operação antes de virar consultor. Hoje toca a Bastelli Consultoria.
              </p>
              <dl className="mt-8 space-y-2 border-t border-bastelli-navy/15 pt-6 font-mono text-[12px] uppercase tracking-[0.18em] text-bastelli-navy/55">
                <div className="flex justify-between"><dt>No e-commerce</dt><dd className="text-bastelli-navy">16 anos</dd></div>
                <div className="flex justify-between"><dt>Clientes</dt><dd className="text-bastelli-navy">200+</dd></div>
                <div className="flex flex-col gap-0.5"><dt>ABComm</dt><dd className="text-bastelli-navy normal-case tracking-normal text-[11px]">Vencedor do Prêmio ABComm Consultoria em E-commerce</dd></div>
              </dl>
            </div>
          </div>

          <div className="min-w-0 md:col-span-8 md:order-1 relative md:pr-16 md:before:content-[''] md:before:absolute md:before:top-3 md:before:bottom-3 md:before:right-6 md:before:w-px md:before:border-l md:before:border-dashed md:before:border-bastelli-orange/50">
            <div ref={scrollRef} className="flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:block md:snap-none md:overflow-visible md:gap-0 md:pb-0 [&>article]:snap-center [&>article]:shrink-0 [&>article]:w-[80vw] [&>article]:max-w-[320px] [&>article]:rounded-lg [&>article]:border [&>article]:border-bastelli-navy/15 [&>article]:bg-white [&>article]:p-5 md:[&>article]:w-auto md:[&>article]:max-w-none md:[&>article]:border-0 md:[&>article]:rounded-none md:[&>article]:bg-transparent md:[&>article]:p-0">
            <Momento
              n="01"
              year="2007"
              chapter="Recomeço"
              title="O futebol acabou antes da hora. Precisei recomeçar longe do campo."
              body="Problemas de saúde encerraram a carreira no futebol. Foi ali que a vida profissional recomeçou, dessa vez atrás de uma tela."
              img={BrunoSantos}
            />
            <Momento
              n="02"
              year="2010"
              chapter="KaBuM"
              title="Entrei atendendo cliente na KaBuM. Saí entendendo a loja por dentro."
              body="No atendimento dá pra ver tudo: pedido travado, cobrança errada, entrega atrasada, promessa que a loja não cumpre. Foi a melhor escola que eu poderia ter tido."
              img={BrunoKabum}
            />
            <Momento
              n="03"
              year="2012–2018"
              chapter="Aprofundamento"
              title="Dev, UX, expedição, integrações, tráfego, Analytics."
              body="Sete anos passando por área diferente a cada ciclo. Cada uma resolveu uma parte do quebra-cabeça e mostrou como as partes se travam entre si quando ninguém olha o conjunto."
              img={BrunoDev}
            />
            <Momento
              n="04"
              year="2019"
              chapter="Bastelli"
              title="Abri a Bastelli pra fazer o que nenhuma agência fazia."
              body="Consultoria que olha a loja inteira, não só o anúncio. Estruturação de operação, performance, tráfego, dados. Sem terceirizar a decisão que é do dono."
              img={BrunoAgencia}
            />
            <Momento
              n="05"
              year="2020–2024"
              chapter="Clientes"
              title="200+ lojas atendidas. Um prêmio no meio do caminho."
              body="Projetos entregues em moda, cosméticos, pet, casa, nichos técnicos. Em 2023, a ABComm reconheceu como Melhor Profissional de E-commerce do Interior de SP."
              img={BrunoClientes}
            />
            <Momento
              n="06"
              year="2025"
              chapter="O curso"
              title="A gente precisa ajudar mais pessoas com o Curso."
              body="Dava pra condensar 16 anos de operação em algo que qualquer lojista pudesse assistir e começar a decidir melhor. Foi o que fiz, trouxe o curso exclusivo e amado por nossos clientes, para todos os empresários que precisam vender na internet na forma certa, com a metodologia que nos premiou no Prêmio ABComm."
              img={BrunoAbcomm}
            />
            </div>

            {/* Navegação mobile — setas prev/next */}
            <div className="mt-3 flex items-center justify-end gap-3 md:hidden">
              <button
                type="button"
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: -(scrollRef.current.clientWidth * 0.85),
                    behavior: "smooth",
                  })
                }
                aria-label="Momento anterior"
                className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: scrollRef.current.clientWidth * 0.85,
                    behavior: "smooth",
                  })
                }
                aria-label="Próximo momento"
                className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Momento({
  n,
  year,
  chapter,
  title,
  body,
  img,
}: {
  n: string;
  year: string;
  chapter: string;
  title: string;
  body: string;
  img: string;
}) {
  const isEven = parseInt(n, 10) % 2 === 0;
  const isPlaceholder = img.startsWith("[[");

  return (
    <article
      className="relative md:mt-24 md:first:mt-0 md:before:absolute md:before:inset-x-0 md:before:-top-12 md:before:h-px md:before:bg-bastelli-navy/10 md:before:content-[''] md:first:before:hidden"
    >
      <span
        aria-hidden
        className="block md:absolute md:-left-[72px] md:top-16 font-display text-[26px] md:text-[38px] font-light leading-none text-bastelli-orange bg-white pr-2 md:block"
      >
        {n}
      </span>
      <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2">
        <div className={isEven ? "md:order-2" : "md:order-1"}>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
              {chapter}
            </span>
            <span className="font-mono text-[11px] text-bastelli-navy/40">·</span>
            <span className="font-mono text-[11px] text-bastelli-navy/50">
              {year}
            </span>
          </div>
          <h3 className="mt-4 font-display text-[28px] font-light leading-[1.05] text-bastelli-navy md:text-[42px]">
            {title}
          </h3>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bastelli-navy/70 md:text-[16px]">
            {body}
          </p>
        </div>
        <div className={isEven ? "md:order-1" : "md:order-2"}>
          {isPlaceholder ? (
            <Placeholder label={img} ratio="4/5" tone="paper" />
          ) : (
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-bastelli-paper">
              <img
                src={img}
                alt={title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   9. OFERTA
============================================================ */
function Oferta() {
  const carouselRef = useAutoScrollCarousel<HTMLDivElement>(3, 5000);
  return (
    <section id="oferta" className="bg-bastelli-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        {/* Header assimétrico 3/9 com ficha técnica no rodapé */}
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3 md:pt-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-orange">
              O que você vai receber
            </div>

          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[38px] font-light leading-[0.98] tracking-tight text-bastelli-navy md:text-[64px]">
              O que entra{" "}
              <em className="font-serif italic font-normal text-bastelli-orange">
                no acesso.
              </em>
            </h2>
            <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-bastelli-navy/70 md:text-[17px]">
              Um curso principal e dois materiais que ficam do lado do
              computador enquanto você opera. Nada de bônus inflado pra
              justificar preço.
            </p>
          </div>
        </div>

        {/* Corpo — 7/5 assimétrico com itens de peso desigual */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="min-w-0 md:col-span-7">
            <div
              ref={carouselRef}
              className="-mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:block md:space-y-20 md:overflow-visible md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
            {/* Item 01 — dominante, foto grande em cima */}
            <article className="w-[calc(100vw-2.5rem)] shrink-0 snap-center md:w-auto md:shrink md:snap-none">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                  01 · Curso Online de Introdução ao E-commerce
                </span>
                <span aria-hidden className="h-px flex-1 bg-bastelli-navy/15" />
              </div>
              <div className="mt-6 overflow-hidden rounded-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hotmart_edit2-Mk318cTyI75Jtoycnwmtk4QL5Z4D4Z.png"
                  alt="Dashboard do Curso Online de Introdução ao E-commerce na Hotmart"
                  className="w-full h-auto object-contain"
                />
              </div>
              <h3 className="mt-6 font-display text-[30px] font-light leading-[1.02] tracking-tight text-bastelli-navy md:text-[44px]">
                Curso Online de Introdução ao E-commerce com Bruno Bastelli.
              </h3>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-bastelli-navy/75 md:text-[17px]">
                12 módulos, 24 aulas, 4h28. Do primeiro planejamento até ler o
                relatório da segunda-feira sem entrar em pânico. A visão inteira
                da loja, na ordem em que as decisões acontecem.
              </p>
            </article>

            {/* Item 02 — split horizontal, foto à direita, texto respirando */}
            <article className="flex w-[calc(100vw-2.5rem)] shrink-0 snap-center flex-col gap-6 md:grid md:w-auto md:shrink md:snap-none md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
              <div className="md:order-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/roda_do_e-commerce_edit-EEhGVuHShdpjyoX51SZ1FqdKyOUUgQ.png"
                  alt="Planilha Roda do E-commerce — mockup em desktop e tablet"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="md:order-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                    02 · E-book
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-bastelli-navy/15" />
                </div>
                <h3 className="mt-4 font-display text-[24px] font-light leading-[1.1] tracking-tight text-bastelli-navy md:text-[32px]">
                  A{" "}
                  <em className="font-serif italic text-bastelli-orange">
                    Roda do E-commerce
                  </em>{" "}
                  no papel.
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-bastelli-navy/75 md:text-[15px]">
                  A metodologia da Bastelli traduzida num guia curto pra você
                  consultar antes de tomar decisão: troca de plataforma,
                  reajuste de preço, briefing de agência.
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-y-2 font-mono text-[11px] text-bastelli-navy/55">
                  <dt className="uppercase tracking-[0.2em]">Formato</dt>
                  <dd className="text-right text-bastelli-navy/75">
                    PDF · leitura rápida
                  </dd>
                  <dt className="uppercase tracking-[0.2em]">Uso</dt>
                  <dd className="text-right text-bastelli-navy/75">
                    consulta recorrente
                  </dd>
                </dl>
              </div>
            </article>

            {/* Item 03 — mesmo formato do 02, com imagem à esquerda pra alternar o ritmo */}
            <article className="flex w-[calc(100vw-2.5rem)] shrink-0 snap-center flex-col gap-6 md:grid md:w-auto md:shrink md:snap-none md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
              <div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boas_praticas_edit-RsUmpNvBQfIFTJv4SjaQywFT3eiPnx.png"
                  alt="Planilha de Ideias de Ofertas — mockup em desktop e tablet"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                    03 · Manual
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-bastelli-navy/15" />
                </div>
                <h3 className="mt-4 font-display text-[24px] font-light leading-[1.1] tracking-tight text-bastelli-navy md:text-[32px]">
                  Boas práticas,{" "}
                  <em className="font-serif italic text-bastelli-orange">
                    em checklist
                  </em>
                  .
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-bastelli-navy/75 md:text-[15px]">
                  Checklist por etapa da Roda: o que revisar antes de subir
                  produto novo, o que testar antes de rodar campanha, o que
                  perguntar antes de fechar contrato com fornecedor. Pra você
                  aplicar sem precisar terceirizar.
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-y-2 font-mono text-[11px] text-bastelli-navy/55">
                  <dt className="uppercase tracking-[0.2em]">Formato</dt>
                  <dd className="text-right text-bastelli-navy/75">
                    PDF · checklist
                  </dd>
                  <dt className="uppercase tracking-[0.2em]">Uso</dt>
                  <dd className="text-right text-bastelli-navy/75">
                    aplicação prática
                  </dd>
                </dl>
              </div>
            </article>
            </div>
          </div>

          {/* Aside — "recibo" com borda tracejada */}
          <aside className="min-w-0 md:col-span-5">
            <div className="md:sticky md:top-24">
              <div className="border border-dashed border-bastelli-navy/25 bg-white p-6 md:p-8">
                <div className="flex items-baseline justify-between border-b border-bastelli-navy/10 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                    O que está incluso no valor
                  </span>
                </div>

                <dl className="mt-5 space-y-4 text-[13px] text-bastelli-navy">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/70">
                      Curso
                    </dt>
                    <dd className="text-right font-medium">12 módulos · 24 aulas · 4h28</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/70">
                      E-book
                    </dt>
                    <dd className="text-right font-medium">Roda do E-commerce</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/70">
                      Manual
                    </dt>
                    <dd className="text-right font-medium">Boas práticas por etapa</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/70">
                      Plataforma
                    </dt>
                    <dd className="text-right font-medium">Hotmart</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/70">
                      Certificado
                    </dt>
                    <dd className="text-right font-medium">
                      Incluso
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 border-t border-dashed border-bastelli-navy/25 pt-6">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/50">
                      Valor
                    </span>
                    <span className="font-display text-[28px] font-light text-bastelli-navy">
                      R$ 197,00
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <CTA className="w-full max-w-xs">Ir para o checkout Hotmart</CTA>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bastelli-navy/40"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/40">
                      Compra segura · Hotmart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function OfertaItem({
  n,
  tag,
  title,
  body,
  img,
}: {
  n: string;
  tag: string;
  title: string;
  body: string;
  img: string;
}) {
  return (
    <article className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.3fr] md:gap-8">
      <Placeholder label={img} ratio="4/3" tone="paper" />
      <div>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-bastelli-orange">
          <span className="font-mono">{n}</span>
          <span className="h-px w-6 bg-bastelli-orange" />
          {tag}
        </div>
        <h3 className="mt-3 font-display text-[24px] leading-tight text-bastelli-navy md:text-[30px]">
          {title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-bastelli-navy/70 md:text-[15px]">
          {body}
        </p>
      </div>
    </article>
  );
}

/* ============================================================
   10. GARANTIA
============================================================ */
function Garantia() {
  return (
    <section className="bg-bastelli-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          {/* Rótulo vertical */}
          <div className="col-span-12 md:col-span-2 md:row-span-3">
            <div className="flex items-center gap-3 md:sticky md:top-24 md:block">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-orange md:[writing-mode:vertical-rl] md:rotate-180">
                Garantia real
              </span>
              <span className="h-px w-16 bg-bastelli-navy/30 md:hidden" />
            </div>
          </div>

          {/* Título deslocado */}
          <div className="col-span-12 md:col-span-10 md:-ml-4">
            <h2 className="font-display text-[34px] leading-[1.02] tracking-tight text-bastelli-navy md:text-[68px]">
              Zero <span className="italic text-bastelli-orange">pressão.</span>
              <br className="hidden md:block" />
              <span className="text-bastelli-navy/60">Zero medo.</span> Só decisão.
            </h2>
          </div>

          {/* Bloco nota manuscrita */}
          <div className="col-span-12 md:col-start-3 md:col-span-7">
            <div className="relative border border-dashed border-bastelli-navy/40 bg-white/60 p-6 md:p-8">
              {/* Selo tipográfico rotacionado */}
              <div className="absolute -top-4 -right-4 hidden md:block">
                <div className="rotate-[8deg] border border-bastelli-navy px-3 py-1 bg-bastelli-paper">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bastelli-navy">
                    ok.
                  </span>
                </div>
              </div>

              <p className="font-display text-[19px] leading-[1.5] text-bastelli-navy md:text-[22px]">
                Não preciso te apressar pra você comprar algo que funciona.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-bastelli-navy/75 md:text-[16px]">
                Assista as primeiras aulas com calma. Se não fizer sentido
                pra sua loja, devolvo cada centavo em até 7 dias.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-bastelli-navy/40" />
                <span className="font-mono text-[12px] tracking-wide text-bastelli-navy/70">
                  Bruno Bastelli
                </span>
              </div>
            </div>
          </div>

          {/* Rodapé técnico */}
          <div className="col-span-12 md:col-start-3 md:col-span-9 flex flex-col gap-2 border-t border-bastelli-navy/15 pt-5 md:flex-row md:items-center md:justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bastelli-navy/60">
              Prazo, forma e condições
            </span>
            <span className="font-mono text-[12px] text-bastelli-navy/80">
              7 dias pra decidir · reembolso sem enrolação
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
  11. FAQ
============================================================ */
function FAQ() {
  const groups = [
    {
      label: "Sobre o curso",
      range: "01 → 04",
      items: [
        {
          q: "É pra quem tá começando do zero?",
          a: "É. Foi feito pra quem quer entender antes de gastar. Se você nunca abriu loja, começa por aqui: o curso te dá vocabulário e critério pra tomar as primeiras decisões sem chutar.",
        },
        {
          q: "E se eu já tenho loja rodando?",
          a: "Também serve. Na prática, quem já opera costuma travar em planejamento, dado ou experiência, não em anúncio. O curso ajuda a enxergar onde tá o gargalo real.",
        },
        {
          q: "Preciso ter loja pra fazer?",
          a: "Não. Boa parte dos alunos faz antes de abrir, justamente pra não gastar errado no começo.",
        },
        {
          q: "Ensina tráfego pago?",
          a: "Não é o foco. A gente explica onde o tráfego entra na operação e por que ele não resolve sozinho. Curso de anúncio avançado é outra coisa.",
        },
      ],
    },
    {
      label: "Sobre o formato",
      range: "05 → 08",
      items: [
        {
          q: "O que vem junto do curso?",
          a: "Está incluso o acesso na Hotmart com o Curso Online Introdução E-commerce. O curso tem 12 módulos, 24 aulas e 4 horas, 28 minutos de conteúdo, abordando temas como planejamento, Roda do E-commerce, plataformas, meios de pagamento, fraudes, ERP, logística, estoque, experiência do usuário, SEO, cadastro de produtos, atendimento, metas, análise de dados, tracking, retenção e ciclo de sucesso de uma loja virtual. Incluso o E-book Roda do E-commerce, PDF Manual de Boas Práticas Para E-commerce, entre outros materiais.",
        },
        {
          q: "Como recebo o acesso?",
          a: "Assim que o pagamento cai na Hotmart, você recebe um e-mail com o login e acesso enviado pela Hotmart com os dados que você utilizou na hora de comprar.",
        },
        {
          q: "Por quanto tempo tenho acesso?",
          a: "O Acesso ao curso e todos os materiais é válido por 1 ano, sendo necessário renovar após esse prazo. Entendemos que antes disso, você precisa concluir os módulos para ter sucesso! É imprescindível que você aplique os conhecimentos.",
        },
        {
          q: "Tem certificado no final?",
          a: "Sim, você terá acesso ao certificado dentro do ambiente da Hotmart após concluir todas as aulas.",
        },
      ],
    },
    {
      label: "Sobre expectativas",
      range: "09 → 10",
      items: [
        {
          q: "Vou vender mais depois de fazer?",
          a: "Não prometo isso. Ninguém honesto promete. O curso te ensina a decidir melhor. O que acontece com a loja depende do que você faz com essas decisões.",
        },
        {
          q: "Tem garantia se eu não gostar?",
          a: "Sim, em até 7 dias você pode solicitar o cancelamento caso não tenha ficado satisfeito com a qualidade das aulas e curso.",
        },
      ],
    },
  ];

  let counter = 0;
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        {/* Header assimétrico */}
        <div className="grid grid-cols-12 items-end gap-6 pb-14 md:pb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-orange">
                F.A.Q.
              </span>

            </div>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-8">
            <h2 className="font-display text-[36px] leading-[1.0] tracking-tight text-bastelli-navy md:text-[68px]">
  Vamos esclarecer{" "}
  <span className="italic text-bastelli-orange">tudo.</span>
  <br className="hidden md:block" />
  <span className="text-bastelli-navy/55">
    As respostas abaixo eliminam as principais dúvidas antes da compra.
  </span>
</h2>
          </div>
        </div>

        {/* Grupos temáticos */}
        <div className="space-y-14 md:space-y-20">
          {groups.map((group) => (
            <div key={group.label} className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Label da categoria */}
              <div className="col-span-12 md:col-span-3">
                <div className="md:sticky md:top-24">
                  <div className="flex items-baseline gap-3 border-t border-bastelli-navy pt-3 md:block md:border-t-0 md:pt-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bastelli-navy/60">
                      {group.range}
                    </span>
                    <h3 className="font-display text-[20px] leading-tight text-bastelli-navy md:mt-2 md:text-[24px]">
                      {group.label}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Lista de perguntas */}
              <div className="col-span-12 md:col-span-9">
                <ul className="divide-y divide-bastelli-navy/10 border-y border-bastelli-navy/10">
                  {group.items.map((it) => {
                    counter += 1;
                    return (
                      <Accordion
                        key={it.q}
                        n={String(counter).padStart(2, "0")}
                        title={it.q}
                      >
                        {it.a}
                      </Accordion>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   12. CTA FINAL
============================================================ */
function CtaFinal() {
  return (
    <section className="relative bg-bastelli-navy text-white">
      {/* Marca geométrica de fundo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -right-6 top-6 select-none font-display text-[220px] leading-none tracking-tighter text-white/[0.04] md:-right-4 md:top-10 md:text-[420px]"
        >
          12
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
        {/* Header pequeno */}
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-bastelli-orange" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-orange">
            Última Chance
          </span>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-y-12 md:mt-16 md:gap-x-10">
          {/* Headline em 2 tempos */}
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-[44px] leading-[0.98] tracking-tight md:text-[104px]">
              <span className="block text-white/40 line-through decoration-white/25 decoration-[3px]">
                Continuar chutando.
              </span>
              <span className="mt-2 block md:mt-3">
                Ou parar{" "}
                <span className="italic text-bastelli-orange">12 módulos</span>
                <br className="hidden md:block" />
                <span className="text-white/85"> pra entender.</span>
              </span>
            </h2>

            {/* CTA + micro-linha */}
            <div className="mt-12 flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <CTA className="min-w-[260px]" />
                <span aria-hidden className="hidden h-px w-24 bg-bastelli-orange md:block" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                pagamento único · sem gatilho · acesso imediato
              </p>
            </div>
          </div>

          {/* Bilhete assinado */}
          <div className="col-span-12 md:col-span-4 md:pt-24">
            <div className="md:sticky md:top-24">
              <div className="max-w-xs md:-rotate-[1.5deg]">
                <div className="border-l-2 border-bastelli-orange pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                    Nota do autor
                  </p>
                  <p className="mt-3 font-display text-[18px] leading-[1.45] text-white md:text-[20px]">
                    Eu reuni aqui exatamente o que gostaria de ter aprendido quando comecei. Sem promessas exageradas. Apenas o que realmente funciona.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-white/40" />
                    <span className="font-mono text-[11px] tracking-wide text-white/70">
                      Bruno Bastelli
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Régua de coordenadas */}
        <div className="mt-20 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 md:mt-28">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Formato
            </p>
            <p className="mt-2 font-display text-[16px] text-white md:text-[18px]">
              12 módulos
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Pagamento
            </p>
            <p className="mt-2 font-display text-[16px] text-white md:text-[18px]">
              Único, na Hotmart
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Acesso
            </p>
            <p className="mt-2 font-display text-[16px] text-white md:text-[18px]">
              Imediato
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   13. FOOTER
============================================================ */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="border-t border-bastelli-navy/10" />

      {/* Linha laranja curta (offset) */}
      <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8 md:pt-10">
        <div className="h-px w-16 bg-bastelli-orange md:ml-8" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8 md:pb-14">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          {/* Logo real */}
          <div className="col-span-12 md:col-span-5">
            <img
              src={bastelliLogo}
              alt="Bastelli — Consultoria em E-commerce e Performance"
              className="h-8 w-auto md:h-9"
            />
            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-bastelli-navy/70">
              Curso Online de Introdução ao E-commerce com Bruno Bastelli.{" "}
              <span className="text-bastelli-navy">
                Serve como ponto de partida
              </span>{" "}
              para quem quer entender a operação antes de decidir os próximos
              passos da loja.
            </p>
          </div>

          {/* Meta / legal */}
          <div className="col-span-12 md:col-span-7 md:text-right">
            <p className="font-mono text-[12px] leading-relaxed text-bastelli-navy/70">
              © {new Date().getFullYear()} Bastelli Consultoria
              <br />
              Suporte: (19) 97114-9592
            </p>
            <a
              href="https://instagram.com/bastelliconsultoriaecommerce"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-mono text-[12px] text-bastelli-navy/70 transition-colors hover:text-bastelli-orange"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              @bastelliconsultoriaecommerce
            </a>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col gap-2 border-t border-bastelli-navy/10 pt-5 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/40">
            Bastelli Consultoria – Todos os direitos Reservados
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/40">
            CNPJ 43.747.839/0001-09
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Index;
