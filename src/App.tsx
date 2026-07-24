import { useEffect, useRef, useState } from "react";
import bastelliLogo from "@/assets/bastelli-logo.png";
import rodaEcommerce from "@/assets/roda-ecommerce.png";
import BrunoSantos from "@/assets/bruno_no_santos.webp";
import BrunoKabum from "@/assets/bruno_palestra.webp";
import BrunoDev from "@/assets/consuiltoria_com_cliente_bastelli.webp";
import BrunoAgencia from "@/assets/bruno_agencia.webp";
import BrunoClientes from "@/assets/bastelli_clientes.webp";
import BrunoAbcomm from "@/assets/premio_abcomm.webp";

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
  "https://pay.hotmart.com/G100638464G?off=fvkwnua1&checkoutMode=10&bid=1784646336100";
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

function Index() {
  return (
    <main className="bg-white font-sans text-bastelli-ink antialiased">
      <Nav />
      <Hero />
      <Identificacao />
      <QuebraDeCrenca />
      <ProblemaReal />
      <PorQueOCurso />
      <RodaDoEcommerce />
      <ApresentacaoCurso />
      <OQueVaiAprender />
      <SobreBruno />
      <Provas />
      <ParaQuemE />
      <Oferta />
      <Preco />
      <Garantia />
      <FAQ />
      <CtaFinal />
      <Footer />
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
              .getElementById("checkout-final")
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    Curso Online Introdução ao E-commerce
  </span>
  <span className="whitespace-nowrap text-white/70">com Bruno Bastelli</span>
</div>

        <h1 className="mx-auto max-w-5xl text-center font-display text-[38px] font-semibold leading-[1.02] tracking-[-0.025em] md:text-[80px]">
          Aprenda os{" "}
          <span className="relative inline-block">
            fundamentos
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[6px] w-full bg-bastelli-orange/70 md:-bottom-2 md:h-[12px]"
            />
          </span>{" "}
          que todo lojista deveria entender antes de abrir, ajustar ou tentar{" "}
          <span className="text-white/60">crescer uma loja virtual.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[16px] leading-relaxed text-white/80 md:mt-10 md:text-[19px]">
          Um treinamento direto e estratégico para quem quer entender o
          e‑commerce como um negócio de verdade — sem promessa milagrosa, sem
          fórmula pronta e sem conversa de guru.
        </p>

        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 md:mt-12">
          <CTA className="w-full">Quero começar agora</CTA>
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
            Acesso imediato · Pagamento único
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   2. IDENTIFICAÇÃO
============================================================ */
function Identificacao() {
  const falas = [
    { texto: "Coloquei R$ 3 mil em anúncio no mês passado. Vendeu menos que no mês que eu não anunciei.", segmento: "moda" },
    { texto: "Já troquei de agência três vezes. A conversa muda, o resultado não.", segmento: "cosméticos" },
    { texto: "Meu Instagram tá bombando de curtida. Aí abro o painel da loja e é deserto.", segmento: "acessórios" },
    { texto: "Fiz Black Friday, vendi bem, e no fim das contas sobrou menos do que num mês normal.", segmento: "pet" },
    { texto: "Migrei de plataforma achando que era isso. Gastei, quebrei a cabeça, e o problema continuou.", segmento: "casa & decoração" },
    { texto: "Vendo bem no WhatsApp, mas sinto que atingi meu teto — não sei como crescer sem virar bagunça.", segmento: "suplementos" },
    { texto: "Quero abrir minha loja há dois anos. Toda vez que vou começar, trava o medo de queimar dinheiro.", segmento: "artesanato" },
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
            <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-bastelli-navy md:text-[60px]">
              A gente já ouviu essa.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-16">
            
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

          <div className="relative flex min-h-[200px] items-center md:min-h-[240px]">
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
                <figcaption className="mt-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bastelli-navy/55 md:mt-6">
                  <span className="h-px w-6 bg-bastelli-navy/40" />
                  lojista · {fala.segmento}
                </figcaption>
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
                      aria-label={`Ir para fala ${i + 1}`}
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
                  aria-label="Fala anterior"
                  className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próxima fala"
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
            Se duas dessas você já disse em voz alta, o problema{" "}
            <span className="bg-bastelli-orange/25 px-1.5 py-0.5 font-semibold">
              não é você não estar tentando
            </span>
            . É que ninguém sentou pra te mostrar como as peças se conectam.
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
   3. QUEBRA DE CRENÇA
============================================================ */
function QuebraDeCrenca() {
  const pares = [
    {
      mito: "“É só achar um gestor de tráfego bom.”",
      verdade:
        "Você já trocou três. O quarto não vai resolver um funil que fura antes do anúncio rodar.",
    },
    {
      mito: "“Preciso de um reel que viralize.”",
      verdade:
        "Já teve o reel com 200 mil views que virou R$ 380 de venda. Alcance não é receita.",
    },
    {
      mito: "“Se eu migrar de plataforma, destrava.”",
      verdade:
        "Nuvemshop, Shopify, Tray, Loja Integrada — a plataforma raramente é o gargalo. É o que roda em cima dela.",
    },
  ];

  return (
    <section className="bg-bastelli-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
        {/* cabeçalho assimétrico */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bastelli-orange">
              O que costumam te vender
            </span>
            <h2 className="mt-5 font-display text-[44px] font-light leading-[0.95] tracking-[-0.02em] md:text-[92px]">
              Anúncio não é{" "}
              <span className="italic font-normal text-bastelli-orange">estratégia</span>.
              <br />
              É <u className="decoration-white/30 underline-offset-[10px] decoration-1">uma peça</u>{" "}
              de um jogo maior.
            </h2>
          </div>
          <aside className="col-span-12 md:col-span-3 md:pt-10">
            
          </aside>
        </div>

        {/* lista mito → verdade, alinhamentos ligeiramente diferentes */}
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

        {/* fecho — linha única, tipografia acima do H2 */}
        <p className="mt-16 font-display text-[38px] font-light leading-[1.02] tracking-[-0.02em] md:mt-24 md:text-[112px]">
          Sua loja não é segunda renda,{" "}
          <span className="text-bastelli-orange">
            não é apenas a plataforma e nem apenas anúncio.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   4. PROBLEMA REAL — mapa
============================================================ */
function ProblemaReal() {
  const bloques = [
    {
      area: "Oferta",
      items: [
        { name: "Precificação", ex: "margem que some no frete grátis" },
        { name: "Combos", ex: "kit que ninguém pede porque não faz sentido junto" },
        { name: "Posicionamento", ex: "você compete por preço sem querer" },
      ],
    },
    {
      area: "Produto",
      items: [
        { name: "Cadastro", ex: "SKU duplicado, variação que some do filtro" },
        { name: "Fotos", ex: "primeira imagem em fundo escuro no mobile" },
        { name: "Descrições", ex: "texto de fornecedor, zero busca orgânica" },
      ],
    },
    {
      area: "Loja",
      items: [
        { name: "Experiência mobile", ex: "botão de comprar abaixo da dobra" },
        { name: "Checkout", ex: "3 campos que derrubam 18% dos pedidos" },
        { name: "SEO", ex: "categoria sem H1, título de aba genérico" },
      ],
    },
    {
      area: "Operação",
      items: [
        { name: "Estoque", ex: "vende o que não tem, cancela, perde reputação" },
        { name: "Frete", ex: "tabela travada, PAC saindo mais caro que Sedex" },
        { name: "ERP", ex: "integração que quebra e ninguém olha por dias" },
      ],
    },
    {
      area: "Atendimento",
      items: [
        { name: "Pré-venda", ex: "responde em 4h, cliente já comprou do concorrente" },
        { name: "Pós-venda", ex: "reclamação vira review de 1 estrela" },
        { name: "Retenção", ex: "segunda compra que nunca acontece" },
      ],
    },
    {
      area: "Dados",
      items: [
        { name: "Metas", ex: "meta anual sem meta de semana" },
        { name: "Calendário", ex: "Black Friday começa a ser pensada em outubro" },
        { name: "Análise", ex: "olha faturamento, ignora ticket e recorrência" },
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((v) => (v + 1) % bloques.length), 5000);
    return () => clearInterval(id);
  }, [paused, bloques.length]);

  const current = bloques[active];

  const goPrev = () => setActive((v) => (v - 1 + bloques.length) % bloques.length);
  const goNext = () => setActive((v) => (v + 1) % bloques.length);

  return (
    <section className="bg-bastelli-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        {/* cabeçalho assimétrico */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bastelli-orange">
              Diagnóstico honesto
            </span>
            <h2 className="mt-4 font-display text-[36px] font-light leading-[1.0] tracking-[-0.02em] text-bastelli-navy md:text-[68px]">
              O anúncio é só a{" "}
              <span className="italic font-normal">ponta</span>.
              <br />
               Os principais erros que você pode estar{" "}
              <span className="underline decoration-bastelli-orange decoration-[2px] underline-offset-[6px]">
                comentando hoje.
              </span>
              .
            </h2>
          </div>
          <aside className="col-span-12 md:col-span-3 md:col-start-10 md:pt-6">
            <p className="border-l border-bastelli-navy/20 pl-4 text-[13px] leading-relaxed text-bastelli-navy/60">
              6 áreas. 18 pontos onde o dinheiro costuma escapar antes de virar venda.
            </p>
          </aside>
        </div>

        {/* carrossel — uma área por vez */}
        <div
          className="relative mt-14 md:mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* ordinal gigante em outline no fundo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[140px] font-light leading-none text-transparent md:text-[240px]"
            style={{ color: "rgba(35,56,74,0.10)" }}
          >
            {String(active + 1).padStart(2, "0")}
          </div>

          <div className="relative border-t border-bastelli-navy/15 pt-10 md:pt-14">
            <div
              key={current.area}
              className="grid grid-cols-12 gap-4 md:gap-8"
              style={{ animation: "fade-in 500ms ease-out both" }}
            >
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-bastelli-orange">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[40px] font-light leading-none tracking-[-0.02em] text-bastelli-orange md:text-[64px]">
                    {current.area}
                  </h3>
                </div>
              </div>

              <ul className="col-span-12 md:col-span-8">
                {current.items.map((it, j) => (
                  <li
                    key={it.name}
                    className={`flex flex-col gap-1 py-3 md:flex-row md:items-baseline md:gap-6 md:py-4 ${
                      j > 0 ? "border-t border-bastelli-navy/10" : ""
                    }`}
                  >
                    <span className="min-w-[10rem] text-[16px] font-medium text-bastelli-navy md:text-[18px]">
                      {it.name}
                    </span>
                    <span className="text-[14px] leading-relaxed text-bastelli-navy/60 md:text-[15px]">
                      {it.ex}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

{/* Controles: contador + dots em cima, setas prev/next abaixo */}
          <div className="mt-10 border-t border-bastelli-navy/15 pt-6">
            <div className="flex flex-col gap-4">
              {/* Linha 1: contador + dots */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2 font-mono text-bastelli-navy/70">
                  <span className="text-[22px] font-semibold text-bastelli-navy md:text-[28px]">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.2em] text-bastelli-navy/40">
                    / {String(bloques.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {bloques.map((b, i) => (
                    <button
                      key={b.area}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Ver área ${b.area}`}
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
                  aria-label="Área anterior"
                  className="grid h-11 w-11 place-items-center rounded-md border-2 border-bastelli-orange text-bastelli-orange transition hover:bg-bastelli-orange hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próxima área"
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
        {/* fecho seco */}
        <p className="mt-14 max-w-[36ch] font-display text-[24px] font-light leading-[1.15] tracking-[-0.01em] text-bastelli-navy md:mt-20 md:text-[36px]">
          Nenhum desses pontos precisa de gênio pra arrumar.
          <br />
          <span className="text-bastelli-orange">Precisam ser vistos.</span>
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   5. POR QUE O CURSO FOI CRIADO
============================================================ */
function PorQueOCurso() {
  return (
    <section className="relative overflow-hidden bg-bastelli-navy text-white">
      {/* marca d'água tipográfica */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-14 -right-6 select-none font-display text-[140px] font-light leading-none text-transparent md:-bottom-16 md:right-4 md:text-[280px]"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Origem
      </span>

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
        {/* cabeçalho editorial: eyebrow + data-linha */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bastelli-orange">
            Antes de ser curso
          </span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        {/* grid assimétrico: abertura ocupa mais, notas laterais deslocadas */}
        <div className="mt-12 grid grid-cols-12 gap-8 md:mt-20 md:gap-12">
          {/* abertura — parágrafo grande */}
          <div className="col-span-12 md:col-span-8">
            <p className="font-display text-[30px] font-light leading-[1.1] tracking-[-0.02em] md:text-[56px]">
              Antes de virar curso, era uma{" "}
              <span className="italic font-normal text-bastelli-orange">conversa</span>{" "}
              que se repetia toda semana.
            </p>
            <p className="mt-8 max-w-[54ch] text-[16px] leading-relaxed text-white/80 md:text-[18px]">
              Cliente novo chegava com a mesma pergunta: <em className="not-italic text-white">"por que o anúncio não tá performando?"</em>. Duas
              perguntas depois, o problema estava no cadastro do produto, no frete
              ou no combo que ninguém pediu.
            </p>
          </div>

          {/* notas laterais como marginália */}
          <div className="col-span-12 flex flex-col gap-8 md:col-span-4 md:mt-24">
            <div className="border-l-2 border-bastelli-orange pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-orange">
                Nota 01
              </span>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                Bruno começou anotando as respostas em um Google Doc pra reaproveitar
                nas próximas reuniões.
              </p>
            </div>
            <div className="border-l-2 border-white/30 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                Nota 02
              </span>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                O doc virou treinamento interno. O treinamento virou um curso curto
                — porque a mesma dúvida chegava de gente que nunca ia virar cliente
                da consultoria.
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

/* ============================================================
   6. RODA DO E-COMMERCE
============================================================ */
function RodaDoEcommerce() {
  const pilares = [
    {
      n: "01",
      title: "Planejamento",
      desc:
        "Meta do mês, calendário de campanha e onde apostar ficha no próximo trimestre. Sem isso, o resto vira reação.",
    },
    {
      n: "02",
      title: "Loja Virtual",
      desc:
        "O caminho do produto até o checkout — foto, descrição, filtro, frete, SEO. É onde a venda acontece ou trava.",
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
              Metodologia Bastelli
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
            No curso, você vê como as quatro giram juntas{" "}
            <span className="text-bastelli-orange">na sua loja</span>.
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
   7. APRESENTAÇÃO DO CURSO
============================================================ */
function ApresentacaoCurso() {
  const ficha = [
    { k: "Aulas", v: "24, curtas e sem enrolação" },
    { k: "Duração", v: "4h28 no total" },
    { k: "Formato", v: "vídeo sob demanda, assiste no seu tempo" },
    { k: "Nível", v: "introdutório — serve pra quem tá começando e pra quem já opera" },
    { k: "Entrega", v: "uma visão inteira da operação, do topo ao pós-venda" },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        {/* Kicker + regra */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-bastelli-navy/15" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-bastelli-navy/50">
            Ficha do curso
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
            <p className="mt-8 max-w-xl text-[17px] leading-[1.55] text-bastelli-navy/75 md:text-[19px]">
              É um curso introdutório com Bruno Bastelli. Você senta, assiste
              em alguns dias e sai enxergando a loja como um sistema — não
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
   8. O QUE VAI APRENDER
============================================================ */
function OQueVaiAprender() {
  const blocos = [
    {
      n: "01",
      t: "Planejamento e metas",
      d: "Objetivo, calendário e indicadores que cabem no tamanho da sua loja — não no template de agência.",
      out: [
        "Montar o calendário de Black Friday sem improviso de última hora",
        "Definir meta de faturamento a partir de margem, não de vontade",
        "Escolher 3 KPIs que a sua loja realmente consegue acompanhar",
      ],
    },
    {
      n: "02",
      t: "Plataformas e estrutura da loja",
      d: "O que uma loja precisa ter de verdade — e o que só parece importante no vídeo do YouTube.",
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
        "Refazer uma ficha de produto sem parecer marketplace genérico",
        "Organizar categorias para o visitante achar sozinho",
        "Ajustar fotos e descrição sem contratar estúdio",
      ],
    },
    {
      n: "04",
      t: "Pagamentos, frete, logística e operação",
      d: "A parte chata que sustenta a loja em pé — pagamento, frete, estoque, expedição, antifraude.",
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
      d: "O que faz o cliente voltar — e o que faz ele sumir depois da primeira compra.",
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
                Cada bloco cobre uma parte da loja — e conversa com as outras. Nada aqui vive isolado.
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
   9. SOBRE BRUNO
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
                  Quem escreveu isso
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
                <div className="flex justify-between"><dt>ABComm</dt><dd className="text-bastelli-navy">2023</dd></div>
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
              body="Problemas de saúde encerraram a carreira no futebol. Foi ali que a vida profissional recomeçou — dessa vez, atrás de uma tela."
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
              body="Sete anos passando por área diferente a cada ciclo. Cada uma resolveu uma parte do quebra-cabeça — e mostrou como as partes se travam entre si quando ninguém olha o conjunto."
              img={BrunoDev}
            />
            <Momento
              n="04"
              year="2019"
              chapter="Bastelli"
              title="Abri a Bastelli pra fazer o que nenhuma agência fazia."
              body="Consultoria que olha a loja inteira — não só o anúncio. Estruturação de operação, performance, tráfego, dados. Sem terceirizar a decisão que é do dono."
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
              title="Aí veio o curso. Fundamentos abertos, sem enrolação."
              body="Dava pra condensar 16 anos de operação em algo que qualquer lojista pudesse assistir e começar a decidir melhor. Foi o que fiz."
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
  img: string; // path/import real da imagem OU "[[LABEL DO QUE FALTA]]"
}) {
  const isEven = parseInt(n, 10) % 2 === 0;
  const isPlaceholder = img.startsWith("[[");

  return (
    <article className="relative md:py-14 md:first:pt-0 md:last:pb-0">
      <span
        aria-hidden
        className="block md:absolute md:-left-[72px] md:top-12 font-display text-[26px] md:text-[38px] font-light leading-none text-bastelli-orange bg-white pr-2 md:block"
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
   10. PROVAS
============================================================ */
function Provas() {
  const linhas = [
    { k: "Desde", v: "2010", d: "operando e-commerce por dentro" },
    { k: "Lojas atendidas", v: "200+", d: "consultoria e operação, times pequenos e grandes" },
    { k: "Reconhecimento", v: "ABComm", d: "referência técnica em e-commerce" },
  ];
  return (
    <section className="bg-bastelli-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        {/* Header assimétrico 5/7 com kicker mono e linha tracejada */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-orange">
                Prova, não pitch
              </span>
              <span aria-hidden className="h-px flex-1 border-t border-dashed border-bastelli-orange/40" />
            </div>
            <h2 className="mt-6 font-display text-[38px] font-light leading-[0.98] tracking-tight md:text-[60px]">
              Números que <em className="font-serif italic text-bastelli-orange">já aconteceram</em>.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65 md:text-[16px]">
              Não tem case fabricado nem promessa de faturamento. O que tem é
              tempo dentro de e-commerce — vendo o que quebra, o que sustenta e
              o que se repete de loja pra loja.
            </p>
          </div>

          {/* Coluna direita: numeral âncora + ficha corrida */}
          <div className="md:col-span-7 md:pt-4">
            {/* Âncora tipográfica */}
            <div className="flex items-end gap-6 border-b border-white/12 pb-8 md:gap-8 md:pb-10">
              <div
                aria-hidden
                className="font-display text-[120px] font-light leading-[0.85] tracking-[-0.04em] text-white md:text-[200px]"
              >
                16
                <span className="text-bastelli-orange">.</span>
              </div>
              <div className="pb-3 md:pb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                  contagem
                </div>
                <div className="mt-2 max-w-[14rem] font-display text-[18px] leading-tight text-white/90 md:text-[22px]">
                  anos dentro de e-commerce — operando, quebrando a cabeça e ajustando.
                </div>
              </div>
            </div>

            {/* Ficha corrida — não é grid de cards */}
            <dl className="mt-2 divide-y divide-white/10">
              {linhas.map((l) => (
                <div
                  key={l.k}
                  className="grid grid-cols-12 items-baseline gap-4 py-5 md:py-6"
                >
                  <dt className="col-span-12 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 md:col-span-3">
                    {l.k}
                  </dt>
                  <dd className="col-span-5 pr-3 font-display text-[28px] font-light leading-none tracking-tight text-white md:col-span-3 md:text-[34px]">
                    {l.v}
                  </dd>
                  <dd className="col-span-7 text-[13px] leading-relaxed text-white/65 md:col-span-6 md:text-[14px]">
                    {l.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   11. PARA QUEM É
============================================================ */
function ParaQuemE() {
  const yes = [
    "Vende no Instagram e no WhatsApp, fecha pedido no direct, e quer entender o que muda de verdade quando abre uma loja com carrinho e checkout.",
    "Tem loja aberta há uns 6, 8 meses e as vendas travaram no mesmo patamar todo mês — mesmo aumentando o investimento em anúncio.",
    "Gasta entre R$ 30 e R$ 150 por dia em Meta Ads e ainda não sabe dizer se o gargalo é o criativo, o site, o preço ou o frete.",
    "Já vende no Mercado Livre ou no Shopee e quer avaliar, com números, se abrir loja própria compensa antes de contratar plataforma.",
    "Cansou de trocar de freelancer todo mês e receber três respostas diferentes pra mesma pergunta sobre a loja.",
    "Tem loja física funcionando e quer botar online sem repetir o erro do concorrente do lado que abriu e fechou em 4 meses.",
  ];
  const highlight = (text: string) => {
    // Destaca R$ XX, "N meses", "N/N meses", "N em N", números seguidos de meses/aulas
    const parts = text.split(
      /(R\$\s?\d+(?:[.,]\d+)?(?:\s?(?:e|a|até)\s?R\$\s?\d+(?:[.,]\d+)?)?|\b\d+(?:,\s?\d+)?\s?meses?\b|\b\d+\s?em\s?\d+\b|\btrês respostas\b)/gi
    );
    return parts.map((p, i) =>
      /R\$|meses?|em\s?\d|três respostas/i.test(p) ? (
        <span key={i} className="font-medium text-bastelli-navy">
          {p}
        </span>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };
  const no = [
    "Procura fórmula de 6 em 7 ou loja que vende no automático.",
    "Acha que subir o investimento em tráfego resolve, sozinho, o problema da conversão.",
    "Não pretende abrir planilha, olhar relatório nem revisar precificação.",
    "Espera receita passiva sem entrar dentro da operação da loja.",
    "Quer copiar o e-commerce de outra pessoa e esperar o mesmo resultado.",
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
        {/* Header assimétrico — sem centralização */}
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3 md:pt-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-orange">
              Antes de comprar
            </div>
            <div className="mt-2 font-mono text-[11px] text-bastelli-navy/45">
              Leitura franca · 3 min
            </div>
            <div className="mt-6 hidden h-px w-16 bg-bastelli-navy/20 md:block" />
            <p className="mt-6 hidden max-w-[220px] font-serif text-[13px] italic leading-relaxed text-bastelli-navy/55 md:block">
              É melhor descobrir aqui do que na terceira aula.
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[40px] font-light leading-[0.98] tracking-tight text-bastelli-navy md:text-[72px]">
              Esse curso{" "}
              <em className="font-serif italic font-normal text-bastelli-orange">
                não
              </em>{" "}
              é pra
              <br className="hidden md:block" /> todo mundo.
            </h2>
          </div>
        </div>

        {/* Corpo — 7/5 assimétrico */}
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-14">
          {/* É pra você — cenário em destaque + checklist assimétrico */}
          <div className="md:col-span-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-navy/55">
                Serve se você
              </span>
              <span aria-hidden className="h-px flex-1 bg-bastelli-navy/15" />
              <span className="font-mono text-[10px] text-bastelli-navy/35">
                {String(yes.length).padStart(2, "0")} cenários reais
              </span>
            </div>

            {/* Cenário em destaque — o primeiro item ganha peso editorial */}
            <figure className="mt-8 border-l-2 border-bastelli-orange pl-5 md:pl-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-orange">
                  Cenário 01
                </span>
                <span className="font-mono text-[10px] text-bastelli-navy/45">
                  o mais comum nas calls
                </span>
              </div>
              <blockquote className="mt-3 font-display text-[24px] font-light leading-[1.18] tracking-tight text-bastelli-navy md:text-[30px]">
                {highlight(yes[0])}
              </blockquote>
            </figure>

            {/* Restantes — checklist com marcador manual, indentação alternada */}
            <ol className="mt-10 space-y-6 md:mt-14 md:space-y-7">
              {yes.slice(1).map((y, i) => {
                const idx = i + 1;
                // indenta os pares — quebra a simetria
                const offset = i % 2 === 1 ? "md:ml-10" : "";
                return (
                  <li
                    key={y}
                    className={`grid grid-cols-[auto_1fr] items-start gap-4 md:gap-6 ${offset}`}
                  >
                    <span
                      aria-hidden
                      className="mt-1 flex items-baseline gap-1.5"
                    >
                      {/* marcador custom: traço orange + numeral mono */}
                      <span className="h-[2px] w-4 translate-y-[-4px] bg-bastelli-orange md:w-6" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bastelli-orange">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="text-[16px] leading-snug text-bastelli-navy/90 md:text-[18px]">
                      {highlight(y)}
                    </span>
                  </li>
                );
              })}
            </ol>
            {/* Marginália manuscrita */}
            <div className="mt-10 flex items-start gap-4 border-t border-dashed border-bastelli-navy/20 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bastelli-orange">
                Nota
              </span>
              <p className="font-serif text-[14px] italic leading-relaxed text-bastelli-navy/70 md:text-[15px]">
                Marquei aqui os cenários que mais ouço nas calls de diagnóstico.
                Se você se viu em dois ou mais, o curso resolve.
                <span className="mt-1 block not-italic font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/45">
                  — Bruno, à mão
                </span>
              </p>
            </div>
          </div>

          {/* Não é pra você — coluna estreita, densa, navy */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24 bg-bastelli-navy p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                  Não serve se você
                </span>
                <span aria-hidden className="font-mono text-[10px] text-white/35">
                  {String(no.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {no.map((y) => (
                  <li
                    key={y}
                    className="py-3.5 text-[14px] leading-snug text-white/80 line-through decoration-white/25 decoration-1 md:text-[15px]"
                  >
                    {y}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-white/10 pt-5 font-serif text-[14px] italic leading-relaxed text-white/70 md:text-[15px]">
                Prefiro perder a venda aqui do que ver você pedir reembolso
                depois de duas aulas achando que comprou outra coisa.
                <span className="mt-2 block not-italic font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-orange">
                  — Bruno
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Veredicto de fechamento — quebra o padrão de "só duas colunas" */}
        <div className="mt-16 grid gap-6 border-t border-bastelli-navy/15 pt-8 md:mt-24 md:grid-cols-12 md:gap-10 md:pt-10">
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/45">
              Se ficou em dúvida
            </span>
          </div>
          <p className="font-display text-[22px] font-light leading-[1.15] tracking-tight text-bastelli-navy md:col-span-9 md:text-[30px]">
            Releia a lista. Se{" "}
            <em className="font-serif italic text-bastelli-orange">nenhuma</em>{" "}
            frase é sua, provavelmente é o curso certo. Se pelo menos duas são,
            economiza seu dinheiro — ou volta quando estiver pronto.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   12. OFERTA
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
              Composição do acesso
            </div>
            <div className="mt-2 font-mono text-[11px] text-bastelli-navy/45">
              03 entregáveis · 01 acesso
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
              justificar preço.{" "}
              <span className="font-mono text-[11px] text-bastelli-orange">
                [[VALIDAR: OFERTA_FINAL_CONFIRMADA]]
              </span>
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
                  01 · Curso principal
                </span>
                <span aria-hidden className="h-px flex-1 bg-bastelli-navy/15" />
                <span className="font-mono text-[10px] text-bastelli-navy/40">
                  peça central
                </span>
              </div>
              <div className="mt-6">
                <Placeholder
                  label="Frame real das aulas — dashboard do curso"
                  ratio="16/9"
                  tone="paper"
                />
              </div>
              <h3 className="mt-6 font-display text-[30px] font-light leading-[1.02] tracking-tight text-bastelli-navy md:text-[44px]">
                Introdução ao E-commerce Bastelli
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
                <Placeholder
                  label="Mockup real do e-book — capa e páginas internas"
                  ratio="16/10"
                  tone="paper"
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
                  consultar antes de tomar decisão — troca de plataforma,
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
                <Placeholder
                  label="Mockup real do manual — capa e páginas internas"
                  ratio="16/10"
                  tone="paper"
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
                  Checklist por etapa da Roda — o que revisar antes de subir
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
                    Recibo do acesso
                  </span>
                  <span className="font-mono text-[10px] text-bastelli-navy/40">
                    nº 001
                  </span>
                </div>

                <dl className="mt-5 space-y-4 text-[13px] text-bastelli-navy/80">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/50">
                      Curso
                    </dt>
                    <dd className="text-right">12 módulos · 24 aulas · 4h28</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/50">
                      E-book
                    </dt>
                    <dd className="text-right">Roda do E-commerce</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/50">
                      Manual
                    </dt>
                    <dd className="text-right">Boas práticas por etapa</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-bastelli-navy/50">
                      Plataforma
                    </dt>
                    <dd className="text-right">Área oficial da Bastelli</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 text-bastelli-navy/50">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em]">
                      Prazo
                    </dt>
                    <dd className="text-right font-mono text-[11px]">
                      [[VALIDAR]]
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 text-bastelli-navy/50">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em]">
                      Certificado
                    </dt>
                    <dd className="text-right font-mono text-[11px]">
                      [[VALIDAR]]
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 border-t border-dashed border-bastelli-navy/25 pt-6">
                  <CTA className="w-full">Ir para o checkout Hotmart</CTA>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/40">
                    Checkout seguro · Hotmart
                  </p>
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
   13. PREÇO
============================================================ */
function Preco() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-28">
        {/* Linha superior — barra de faturamento, sem card */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-bastelli-navy/20 pt-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-orange">
              Nota de investimento
            </span>
            <span className="font-mono text-[10px] text-bastelli-navy/45">
              nº 01 · pagamento único
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bastelli-navy/45">
            processado via Hotmart
          </span>
        </div>

        {/* Corpo assimétrico 5/7 — sem card, sem simetria */}
        <div className="mt-10 grid gap-12 md:mt-16 md:min-h-[calc(100vh+8rem)] md:grid-cols-12 md:gap-14">
          {/* Coluna A — preço dominante como âncora tipográfica */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <p className="mt-2 flex items-center gap-3">
  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bastelli-navy/55">
    Preço oficial
  </span>

  <span className="font-display text-[30px] font-light text-bastelli-navy/45 line-through">
    R$ 397
  </span>
</p>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-navy/55">
                Você paga
              </div>
              
              <div className="mt-4 flex items-start gap-2 md:gap-3">
                <span className="mt-4 font-mono text-[14px] text-bastelli-navy/60 md:mt-6 md:text-[16px]">
                  R$
                </span>
                <span className="font-display text-[96px] font-light leading-[0.85] tracking-tight text-bastelli-navy md:text-[132px]">
                  197
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bastelli-orange">
                Valor de lançamento
              </p>
              

              {/* Bloco CTA — separado, respiração diferente */}
              <div className="mt-10 border-t border-dashed border-bastelli-navy/25 pt-6" id="checkout-final">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-orange">
                    Próximo passo
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-bastelli-navy/15" />
                </div>
                <CTA className="w-full" href={CHECKOUT_URL}>
                  Garantir minha vaga
                </CTA>
                <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-bastelli-navy/45 md:text-left">
                  Pagamento único · Sem urgência falsa
                </p>
              </div>
            </div>
          </div>

          {/* Coluna B — descriminação em "linha de nota" */}
          <div className="md:col-span-7 md:pl-6">
            <h2 className="font-display text-[28px] font-light leading-[1.02] tracking-tight text-bastelli-navy md:text-[42px]">
              Um único pagamento.{" "}
              <em className="font-serif italic text-bastelli-orange">
                Nada escondido depois.
              </em>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-bastelli-navy/70 md:text-[16px]">
              Sem plano mensal, sem módulo travado, sem upsell no meio da aula
              7. O que está listado aqui embaixo é o que entra no acesso — e é
              tudo que entra.
            </p>

            {/* Discriminação — cada linha ligada por traço tracejado */}
            <dl className="mt-8 divide-y divide-bastelli-navy/10 border-y border-bastelli-navy/15">
              {[
                {
                  label: "Curso principal",
                  value: "12 módulos · 24 aulas · 4h28",
                  status: "incluído",
                },
                {
                  label: "E-book — Roda do E-commerce",
                  value: "PDF, leitura em ~40 min",
                  status: "incluído",
                },
                {
                  label: "Manual de boas práticas",
                  value: "Checklist por etapa da Roda",
                  status: "incluído",
                },
                {
                  label: "Prazo de acesso",
                  value: "sem prazo para consumir",
                  status: "vitalício",
                },
                {
                  label: "Garantia",
                  value: "arrependeu, devolve",
                  status: "7 dias",
                },
              ].map((row) => {
                const pending = row.status.includes("VALIDAR");
                return (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4"
                  >
                    <div>
                      <div className="text-[15px] leading-snug text-bastelli-navy md:text-[16px]">
                        {row.label}
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-bastelli-navy/55">
                        {row.value}
                      </div>
                    </div>
                    <div
                      className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                        pending ? "text-bastelli-orange" : "text-bastelli-navy/70"
                      }`}
                    >
                      {row.status}
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   14. GARANTIA
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
                  Bruno — Bastelli
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
  15. FAQ
============================================================ */
function FAQ() {
  const groups = [
    {
      label: "Sobre o curso",
      range: "01 → 04",
      items: [
        {
          q: "É pra quem tá começando do zero?",
          a: "É. Foi feito pra quem quer entender antes de gastar. Se você nunca abriu loja, começa por aqui — o curso te dá vocabulário e critério pra tomar as primeiras decisões sem chutar.",
        },
        {
          q: "E se eu já tenho loja rodando?",
          a: "Também serve. Na prática, quem já opera costuma travar em planejamento, dado ou experiência — não em anúncio. O curso ajuda a enxergar onde tá o gargalo real.",
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
          a: "A configuração final está em fechamento. [[VALIDAR: OFERTA_FINAL_CONFIRMADA]]",
        },
        {
          q: "Como recebo o acesso?",
          a: "Assim que o pagamento cai na Hotmart, você recebe um e-mail com o login da plataforma da Bastelli. Direto, sem etapa intermediária.",
        },
        {
          q: "Por quanto tempo tenho acesso?",
          a: "Sem prazo para consumir. O acesso é vitalício — você entra quando conseguir e revisita quando precisar.",
        },
        {
          q: "Tem certificado no final?",
          a: "[[VALIDAR COM O CLIENTE: CERTIFICADO]]",
        },
      ],
    },
    {
      label: "Sobre expectativas",
      range: "09 → 10",
      items: [
        {
          q: "Vou vender mais depois de fazer?",
          a: "Não prometo isso. Ninguém honesto promete. O curso te ensina a decidir melhor — o que acontece com a loja depende do que você faz com essas decisões.",
        },
        {
          q: "Tem garantia se eu não gostar?",
          a: "Tem. Arrependeu, devolve — 7 dias a partir da compra, sem gatilho e sem contagem regressiva.",
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
              <span className="h-px w-10 bg-bastelli-navy/30" />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bastelli-navy/60">
                10 respostas
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
   16. CTA FINAL
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
            Fim da página
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-white/40 md:inline">
            · Última chamada honesta
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
                      Bruno — Bastelli
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
   17. FOOTER
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
              Conteúdo introdutório sobre e-commerce.{" "}
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
              © {new Date().getFullYear()} Bastelli
              <br />
              [[VALIDAR: suporte]]
              <br />
              [[VALIDAR: privacidade / termos]]
            </p>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col gap-2 border-t border-bastelli-navy/10 pt-5 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/40">
            Fim do documento
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bastelli-navy/40">
            v.1 · pré-lançamento
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Index;
