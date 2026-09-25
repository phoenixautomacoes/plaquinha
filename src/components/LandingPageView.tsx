import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Coffee,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  MousePointer2,
  Palette,
  QrCode,
  Radio,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  X,
} from "lucide-react";
import { PlateConfigurator } from "./landing/PlateConfigurator";
import { PlatePreview } from "./landing/PlatePreview";
import { faqs, PHOENIX_URL, plans, whatsappLink } from "./landing/content";

interface LandingPageViewProps {
  onGoToDashboard?: () => void;
  onOpenPrivacy?: () => void;
  whatsappNumber?: string;
}

const niches = [
  {
    label: "Restaurantes e cafés",
    icon: Coffee,
    name: "Café da Esquina",
    title: "A última impressão também conta.",
    description:
      "No caixa ou na mesa, convide o cliente a contar como foi a experiência. Um gesto simples no fim de um bom atendimento.",
    placement: "No caixa ou no balcão",
    color: "coffee",
    image: "/balcao01.jpg",
  },
  {
    label: "Beleza e bem-estar",
    icon: Scissors,
    name: "Studio Essência",
    title: "Seu cuidado continua depois da visita.",
    description:
      "Na bancada ou na recepção, facilite o acesso às avaliações, ao contato da equipe ou à página dos seus serviços.",
    placement: "Na bancada de atendimento",
    color: "beauty",
  },
  {
    label: "Clínicas e consultórios",
    icon: Stethoscope,
    name: "Clínica Horizonte",
    title: "Uma recepção que conecta.",
    description:
      "Apresente uma forma prática de compartilhar a experiência de atendimento e encontrar os canais oficiais da clínica.",
    placement: "Na recepção da clínica",
    color: "clinic",
  },
  {
    label: "Lojas e pet shops",
    icon: ShoppingBag,
    name: "Meu Pet & Cia",
    title: "A compra termina. A relação continua.",
    description:
      "Deixe o convite visível no balcão. Seu cliente pode acessar o perfil no Google ou o canal de contato escolhido pela loja.",
    placement: "No balcão de pagamento",
    color: "shop",
  },
];

function UseCases() {
  const [active, setActive] = useState(0);
  const item = niches[active];
  return (
    <section
      className="phx-section use-cases"
      id="para-quem"
      aria-labelledby="use-cases-title"
    >
      <div className="phx-container">
        <div className="section-heading" data-reveal>
          <h2 id="use-cases-title">
            Em cada balcão,
            <br />
            uma nova possibilidade.
          </h2>
          <p>
            Onde existe um bom atendimento, existe uma oportunidade de conexão.
          </p>
        </div>
        <div className={`niche-scene niche-${item.color}`}>
          <div className="niche-copy">
            <div className="niche-top-meta">
              <div className="niche-google-badge">
                <img
                  src="/Google.01.png"
                  alt="Avaliações 5 estrelas no Google"
                  className="niche-google-img"
                  width="210"
                  height="112"
                />
              </div>
              <span className="mini-eyebrow">{item.placement}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="niche-highlights">
              <li>
                <Check size={15} />
                <span>Aproximação NFC + QR Code</span>
              </li>
              <li>
                <Check size={15} />
                <span>Avaliação em segundos sem app</span>
              </li>
            </ul>
            <a href="#personalizar" className="text-link">
              Experimentar com a minha marca <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="niche-display">
            {'image' in item && item.image ? (
              <div className="niche-photo-container">
                <img
                  src={item.image}
                  alt={`Aplicação real da placa Phoenix no balcão — ${item.name}`}
                  className="niche-photo-img"
                  width="500"
                  height="500"
                  loading="lazy"
                />
                <span className="scene-note">
                  Aplicação real da placa no balcão
                </span>
              </div>
            ) : (
              <>
                <div className="scene-ring" aria-hidden="true" />
                <div className="scene-counter" aria-hidden="true" />
                <PlatePreview name={item.name} compact />
                <span className="scene-note">
                  Simulação ilustrativa de aplicação
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingPageView({
  onGoToDashboard,
  onOpenPrivacy,
  whatsappNumber = "5551926347571",
}: LandingPageViewProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<number>(1);
  const pageRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const contactUrl = whatsappLink(
    whatsappNumber,
    "Olá! Quero conhecer a placa NFC da Phoenix Automações para o meu negócio.",
  );

  useEffect(() => {
    const page = pageRef.current;
    if (
      !page ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    page.querySelectorAll("[data-reveal]").forEach((element) => {
      // Only defer content below the fold; the initial viewport is visible immediately.
      if (element.getBoundingClientRect().top > window.innerHeight)
        element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const navItems = [
    ["#como-funciona", "Como funciona"],
    ["#ecossistema", "Ecossistema"],
    ["#precos", "Planos"],
    ["#faq", "Dúvidas"],
  ];
  return (
    <div className="phx-landing" ref={pageRef}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="phx-header">
        <div className="phx-container header-inner">
          <a
            href="#inicio"
            className="phx-brand"
            aria-label="Phoenix NFC Pro — início"
          >
            <img src="/phoenix-logo.webp" width="32" height="51" alt="" />
            <span>
              PHOENIX <b>NFC PRO</b>
              <small>por Phoenix Automações</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([href, label]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="phx-button header-cta" href="#personalizar">
              Criar minha placa <ArrowUpRight size={16} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              ref={menuButtonRef}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Navegação mobile"
          >
            {navItems.map(([href, label]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a href={PHOENIX_URL} target="_blank" rel="noopener noreferrer">
              Conhecer a Phoenix <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>

      <main id="conteudo">
        <section className="phx-hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="phx-container hero-layout">
            <div className="hero-copy">
              <a className="ecosystem-badge" href="#ecossistema">
                <span className="status-dot" /> UMA CONEXÃO DO ECOSSISTEMA
                PHOENIX <ArrowUpRight size={13} />
              </a>
              <p className="hero-eyebrow">PLACA INTELIGENTE · NFC + QR CODE</p>
              <h1 id="hero-title">
                Seu atendimento
                <br />
                merece ser
                <br />
                <span>lembrado.</span>
                <span className="heading-spark" aria-hidden="true">
                  <img
                    src="/Estrelas.png"
                    alt=""
                    width="74"
                    height="13"
                    decoding="async"
                  />
                </span>
              </h1>
              <p className="hero-description">
                Leve a boa experiência do seu balcão para o Google. Com a{" "}
                <strong>placa NFC personalizada</strong>, seu cliente aproxima o
                celular e encontra o caminho para avaliar sua empresa.
              </p>
              <div className="hero-buttons">
                <a className="phx-button button-blue" href="#personalizar">
                  Personalizar minha placa <ArrowUpRight size={19} />
                </a>
                <a className="hero-secondary" href="#como-funciona">
                  <span>
                    <ArrowDown size={16} />
                  </span>
                  Como funciona
                </a>
              </div>
              <div className="hero-purchase">
                <div>
                  <span>A partir de</span>
                  <strong>
                    R$ 119,90<small> / placa</small>
                  </strong>
                </div>
                <span className="hero-purchase-divider" />
                <p>
                  Com nome e logo.
                  <br />
                  <b>Pronta para o seu balcão.</b>
                </p>
              </div>
            </div>
            <PlateConfigurator whatsappNumber={whatsappNumber} />
          </div>
          <div className="phx-container hero-bottom">
            <span>DO PRESENCIAL AO DIGITAL, SEM COMPLICAR.</span>
            <span>
              Role para conhecer <ArrowDown size={13} />
            </span>
          </div>
        </section>

        <div className="trust-strip">
          <div className="phx-container">
            {[
              {
                icon: "/NFC.png",
                title: "NFC + QR Code",
                text: "Duas formas de acessar",
              },
              {
                icon: "/identidade.png",
                title: "A sua identidade",
                text: "Nome e logo na placa",
              },
              {
                icon: "/app.png",
                title: "Sem app específico",
                text: "Acesso pelo celular",
              },
              {
                icon: "/Suporte.png",
                title: "Suporte Phoenix",
                text: "Ajuda na configuração",
              },
            ].map((item) => (
              <div className="trust-item" key={item.title}>
                <img
                  src={item.icon}
                  alt=""
                  width="36"
                  height="36"
                  className="trust-icon"
                  decoding="async"
                />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section
          className="phx-section how-section"
          id="como-funciona"
          aria-labelledby="how-title"
        >
          <div className="phx-container">
            <div className="section-heading split-heading" data-reveal>
              <div>
                <h2 id="how-title">
                  Menos caminhos.
                  <br />
                  <span className="text-muted">Mais conexões.</span>
                </h2>
              </div>
              <p>
                O cliente não precisa procurar o nome da sua empresa. A placa
                leva direto ao endereço configurado, no momento em que o
                atendimento ainda está na memória.
              </p>
            </div>
            <div className="steps-grid">
              <article className="step-card" data-reveal>
                <div className="step-visual step-touch">
                  <img
                    src="/balcao2.jpg"
                    alt="Cliente aproximando o celular da placa NFC da Phoenix no balcão"
                    className="step-photo"
                    width="500"
                    height="500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>Aproxime ou escaneie.</h3>
                <p>
                  Encoste um celular compatível na área NFC ou use a câmera para
                  ler o QR Code.
                </p>
              </article>
              <article className="step-card" data-reveal>
                <div className="step-visual step-open">
                  <img
                    src="/destino-certo.png"
                    alt="Celular mostrando o destino configurado: WhatsApp, Site e Avaliações no Google"
                    className="step-photo step-photo-center"
                    width="632"
                    height="424"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>O destino já está certo.</h3>
                <p>
                  A página abre no celular: avaliações no Google, seu site,
                  WhatsApp ou cardápio.
                </p>
              </article>
              <article className="step-card" data-reveal>
                <div className="step-visual step-review">
                  <img
                    src="/Avaliacoes.png"
                    alt="Cliente escolhendo 5 estrelas na avaliação pelo celular"
                    className="step-photo step-photo-center"
                    width="688"
                    height="384"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>A opinião ganha espaço.</h3>
                <p>
                  Seu cliente escolhe a nota e escreve a avaliação, com
                  liberdade e no próprio tempo.
                </p>
              </article>
            </div>
            <p className="section-footnote">
              <Check size={14} /> Precisa de internet. A leitura por aproximação
              depende de NFC compatível e ativado.
            </p>
          </div>
        </section>

        <section
          className="ecosystem-section"
          id="ecossistema"
          aria-labelledby="ecosystem-title"
        >
          <div className="phx-container ecosystem-layout">
            <div className="ecosystem-copy" data-reveal>
              <h2 id="ecosystem-title">
                Uma placa no balcão.
                <br />
                <span>
                  Um ecossistema
                  <br />
                  por trás.
                </span>
              </h2>
              <p>
                A Phoenix conecta a presença digital da sua empresa ao
                atendimento do dia a dia. A plaquinha é o ponto de encontro
                entre a experiência presencial e os seus canais digitais.
              </p>
              <a
                className="phx-button button-glass"
                href={PHOENIX_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer a Phoenix Automações <ArrowUpRight size={18} />
              </a>
              <small>
                Sofia, CRM e demais serviços têm contratação própria.
              </small>
            </div>
            <div
              className="ecosystem-map"
              aria-label="Serviços do ecossistema Phoenix"
            >
              <div className="ecosystem-orbit" aria-hidden="true" />
              <div className="ecosystem-orbit orbit-inner" aria-hidden="true" />
              <div className="ecosystem-center">
                <img
                  src="/phoenix-mark.webp"
                  width="56"
                  height="64"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
                <strong>PHOENIX</strong>
                <span>AUTOMAÇÕES</span>
              </div>
              <a
                className="ecosystem-node node-web"
                href="https://clinica.phoenixautomacoes.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe2 />
                <span>
                  <strong>Site profissional</strong>
                  <small>Apresente seu negócio</small>
                </span>
                <ArrowUpRight className="node-arrow" size={14} />
              </a>
              <a
                className="ecosystem-node node-sofia"
                href={`${PHOENIX_URL}#recursos`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                <span>
                  <strong>IA Sofia</strong>
                  <small>Atendimento no WhatsApp</small>
                </span>
                <ArrowUpRight className="node-arrow" size={14} />
              </a>
              <a
                className="ecosystem-node node-crm"
                href="https://dashboard.phoenixautomacoes.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Layers3 />
                <span>
                  <strong>CRM e gestão</strong>
                  <small>Organize cada contato</small>
                </span>
                <ArrowUpRight className="node-arrow" size={14} />
              </a>
              <a className="ecosystem-node node-nfc" href="#personalizar">
                <Radio />
                <span>
                  <strong>Plaquinha NFC</strong>
                  <small>Sua conexão no balcão</small>
                </span>
                <span className="you-are-here">VOCÊ ESTÁ AQUI</span>
              </a>
            </div>
          </div>
        </section>

        <UseCases />

        <section
          className="phx-section pricing-section"
          id="precos"
          aria-labelledby="pricing-title"
        >
          <div className="phx-container">
            <div className="section-heading split-heading" data-reveal>
              <div>
                <h2 id="pricing-title">
                  Comece pelo balcão.
                  <br />
                  <span className="text-muted">Vá além quando quiser.</span>
                </h2>
              </div>
              <p>
                Uma placa para começar. Combos para ampliar sua presença
                digital. Escolha o que faz sentido para o momento da sua
                empresa.
              </p>
            </div>
            <div
              className="pricing-grid"
              onMouseLeave={() => setActivePlan(1)}
            >
              {plans.map((plan, index) => {
                const isActive = activePlan === index;
                return (
                  <article
                    className={`price-card${index === 1 ? " price-featured" : ""}${isActive ? " price-card-active" : " price-card-inactive"}`}
                    key={plan.name}
                    data-reveal
                    onMouseEnter={() => setActivePlan(index)}
                    onFocusCapture={() => setActivePlan(index)}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const rx = ((y / rect.height) - 0.5) * -4.5;
                      const ry = ((x / rect.width) - 0.5) * 4.5;
                      card.style.setProperty("--mouse-x", `${x}px`);
                      card.style.setProperty("--mouse-y", `${y}px`);
                      card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
                      card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      card.style.setProperty("--rx", "0deg");
                      card.style.setProperty("--ry", "0deg");
                    }}
                  >
                    <div className="price-card-spotlight" aria-hidden="true" />
                    {index === 1 && (
                      <div className="price-featured-label">
                        <Sparkles size={13} /> PLACA + PRESENÇA DIGITAL
                      </div>
                    )}
                    <span className="plan-eyebrow">{plan.label}</span>
                    <h3>{plan.name}</h3>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-price">
                      <span>R$</span>
                      <strong>{plan.displayPrice || plan.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                    </div>
                    <p className="plan-detail">{plan.detail}</p>
                    <a
                      className="phx-button button-blue"
                      href={whatsappLink(
                        whatsappNumber,
                        `Olá! Tenho interesse no pacote *${plan.name}* (R$ ${plan.displayPrice || plan.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}) da Phoenix Automações. Podemos confirmar a personalização e as condições de entrega?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.cta}
                      <ArrowUpRight size={17} />
                    </a>
                    <ul>
                      {plan.features.map((feature) => {
                        const isNfcFeature = feature.toLowerCase().includes("nfc configurado");
                        return (
                          <li
                            key={feature}
                            className={isNfcFeature ? "feature-highlighted" : ""}
                          >
                            <Check size={isNfcFeature ? 18 : 16} />
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>
            <div className="pricing-note">
              <ShieldCheck size={19} />
              <p>
                Arte, prazo e entrega são confirmados no atendimento. Nos
                combos, consulte as condições de domínio, hospedagem e
                renovação. Serviços de Sofia e CRM são contratados à parte.
              </p>
            </div>

            {/* Campo: CONSULTE VALORES PARA SISTEMAS */}
            <div className="systems-inquiry-box" data-reveal id="consulte-sistemas">
              <div className="systems-inquiry-content">
                <div className="systems-inquiry-icon" aria-hidden="true">
                  <img
                    src="/money.png?v=3"
                    alt=""
                    width="40"
                    height="40"
                    decoding="async"
                  />
                </div>
                <div className="systems-inquiry-text">
                  <span className="systems-inquiry-badge">AUTOMAÇÃO &amp; SISTEMAS SOB MEDIDA</span>
                  <h3 className="systems-inquiry-title">CONSULTE VALORES PARA SISTEMAS</h3>
                  <p className="systems-inquiry-desc">
                    Precisa de integração com CRM, agente de IA Sofia no WhatsApp oficial, fluxos multiatendentes ou sistemas corporativos personalizados? Consulte nossa equipe de engenharia.
                  </p>
                </div>
              </div>
              <div className="systems-inquiry-action">
                <a
                  className="phx-button button-blue systems-inquiry-button"
                  href={whatsappLink(
                    whatsappNumber,
                    "Olá! Gostaria de consultar os valores para sistemas e automações da Phoenix Automações.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-consulte-valores-sistemas"
                  title="Consulte Valores para Sistemas no WhatsApp"
                >
                  <img
                    src="/whatsapp.png?v=2"
                    alt=""
                    width="22"
                    height="22"
                    className="whatsapp-btn-icon"
                    decoding="async"
                  />
                  <span>CONSULTE VALORES PARA SISTEMAS</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="phx-section faq-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="phx-container faq-layout">
            <div className="section-heading" data-reveal>
              <h2 id="faq-title">
                Ficou alguma
                <br />
                dúvida?
              </h2>
              <p>
                A gente te ajuda a escolher a melhor configuração para o seu
                negócio.
              </p>
              <a
                className="text-link"
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar com a Phoenix <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={`faq-item${openFaq === index ? " faq-open" : ""}`}
                  key={faq.q}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-question-${index}`}
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                    >
                      {faq.q}
                      <ChevronDown size={18} />
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    hidden={openFaq !== index}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-section" aria-labelledby="final-title">
          <div className="phx-container final-content" data-reveal>
            <div className="final-orbit" aria-hidden="true" />
            <h2 id="final-title">
              Seu balcão tem muito
              <br />
              mais a <span>conectar.</span>
            </h2>
            <p>
              Veja sua placa personalizada e dê o primeiro passo com a Phoenix.
            </p>
            <div>
              <a className="phx-button button-blue" href="#personalizar">
                Criar minha placa <ArrowUpRight size={19} />
              </a>
              <a
                className="phx-button button-glass"
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/whatsapp.png?v=2"
                  alt=""
                  width="20"
                  height="20"
                  className="whatsapp-btn-icon"
                  decoding="async"
                />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="phx-footer">
        <div className="phx-container">
          <div className="footer-top">
            <a
              className="phx-brand"
              href={PHOENIX_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/phoenix-logo.webp"
                alt=""
                width="32"
                height="51"
                loading="lazy"
                decoding="async"
              />
              <span>
                PHOENIX <b>NFC PRO</b>
                <small>Uma solução Phoenix Automações</small>
              </span>
            </a>
            <nav aria-label="Links do rodapé">
              <a href={PHOENIX_URL} target="_blank" rel="noopener noreferrer">
                Conheça o ecossistema <ArrowUpRight size={14} />
              </a>
              <a
                href="?p=privacidade"
                onClick={(event) => {
                  if (onOpenPrivacy) {
                    event.preventDefault();
                    onOpenPrivacy();
                  }
                }}
              >
                Privacidade
              </a>
              <button type="button" onClick={onGoToDashboard}>
                Painel administrativo
              </button>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Phoenix Automações · CNPJ 31.418.058/0001-06
            </span>
            <p>
              Google e Google Maps são marcas de seus respectivos titulares. A
              Phoenix não é afiliada ao Google.
            </p>
          </div>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={contactUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Phoenix no WhatsApp"
      >
        <img
          src="/whatsapp.png?v=2"
          alt=""
          width="48"
          height="48"
          decoding="async"
        />
      </a>
    </div>
  );
}
