import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Smartphone,
  QrCode,
  Star,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  MessageCircle,
  Coffee,
  Scissors,
  Stethoscope,
  ShoppingBag,
  HelpCircle,
  ChevronDown,
  Layers,
  Award,
  Flame,
  Upload,
  X,
  Send,
  Image as ImageIcon,
  Copy,
  Check,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { formatSerial } from '../utils/codeGenerator';

interface LandingPageViewProps {
  onGoToDashboard?: () => void;
  onOpenPrivacy?: () => void;
  whatsappNumber?: string;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onGoToDashboard,
  onOpenPrivacy,
  whatsappNumber = '5551926347571',
}) => {
  const [plateTheme, setPlateTheme] = useState<'white' | 'black'>('white');
  const [previewBusinessName, setPreviewBusinessName] = useState('');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Por favor escolha uma imagem de até 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setCustomLogoUrl(null);
  };

  const isFormComplete = Boolean(previewBusinessName.trim() && customLogoUrl);

  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const formattedWaNumber = cleanNumber.startsWith('55') ? cleanNumber : `55${cleanNumber}`;

  const simulatorMessage = `Olá! Fiz uma simulação da Placa do Google no site para a minha empresa: *${previewBusinessName.trim()}*.\n\nGostaria de saber mais sobre a produção e valores para o meu balcão. Posso enviar o logotipo por aqui!`;

  const generalMessage = `Olá! Tenho interesse na Placa do Google da Phoenix Automações para o meu balcão. Gostaria de mais informações!`;

  const whatsappSimulatorUrl = `https://wa.me/${formattedWaNumber}?text=${encodeURIComponent(
    previewBusinessName.trim() ? simulatorMessage : generalMessage
  )}`;

  const whatsappBaseUrl = `https://wa.me/${formattedWaNumber}?text=${encodeURIComponent(generalMessage)}`;

  const whatsappPlan1Url = `https://wa.me/${formattedWaNumber}?text=${encodeURIComponent(
    `Olá! Tenho interesse no plano *Placa Balcão Express* (R$ 119). Gostaria de pedir para o meu balcão. Como podemos iniciar?`
  )}`;

  const whatsappPlan2Url = `https://wa.me/${formattedWaNumber}?text=${encodeURIComponent(
    `Olá! Tenho interesse no *Combo Turbo + Landing Page* (R$ 497). Gostaria de garantir a placa e a landing page profissional da minha empresa. Como podemos iniciar?`
  )}`;

  const whatsappPlan3Url = `https://wa.me/${formattedWaNumber}?text=${encodeURIComponent(
    `Olá! Tenho interesse no *Kit Empresa Completa* (R$ 697). Gostaria de saber mais sobre a placa, landing page e a configuração do Google Meu Negócio. Como podemos iniciar?`
  )}`;

  const faqs = [
    {
      q: 'O meu cliente precisa baixar algum aplicativo no celular?',
      a: 'Absolutamente não! O cliente só precisa encostar o celular na placa (via tecnologia NFC nativa do smartphone) ou apontar a câmera comum para o QR Code. A tela oficial de avaliação 5 estrelas do Google abre instantaneamente no navegador.',
    },
    {
      q: 'Funciona tanto no iPhone quanto no Android?',
      a: 'Sim, funciona em 100% dos smartphones modernos. O iPhone possui leitor NFC automático desde o iPhone XR (todos os modelos fabricados nos últimos 7 anos), e celulares Android (Samsung, Motorola, Xiaomi, etc.) possuem NFC e leitor nativo na câmera.',
    },
    {
      q: 'Qual o diferencial dessa placa para as plaquinhas baratas da internet?',
      a: 'As placas comuns de marketplace gravam o link estático direto no chip. Se o Google mudar a URL do seu negócio ou você trocar de ponto, a placa vira lixo. A tecnologia Phoenix Automações utiliza Link Dinâmico Inteligente: você pode trocar o destino a qualquer momento, mudar para WhatsApp, Cardápio ou sua Landing Page em 1 clique, sem precisar trocar a placa física.',
    },
    {
      q: 'Tem mensalidade obrigatória?',
      a: 'Não! O valor de compra da placa (R$ 119) é taxa única e a placa física é sua em definitivo. Opcionalmente, oferecemos serviços de gestão mensal com relatórios de acessos e monitoramento de avaliações para quem deseja acompanhamento contínuo.',
    },
    {
      q: 'Como é o acabamento da placa?',
      a: 'Produzida em acrílico nobre de 3mm com corte a laser de precisão (10 cm × 15 cm), acabamento bisotado, suporte em "L" reforçado para balcão e impressão gráfica de alta resolução protegida com laminação especial que não desbota e aceita limpeza diária com álcool.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner / Barra Superior */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0">
              <Flame className="w-4 h-4 text-blue-600 fill-blue-600/20" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 block leading-none">
                PHOENIX <span className="text-blue-600">NFC PRO</span>
              </span>
              <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                Phoenix Automações · Google 5★
              </span>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#como-funciona" className="hover:text-blue-600 transition-colors">Como Funciona</a>
            <a href="#diferenciais" className="hover:text-blue-600 transition-colors">Tecnologia Dinâmica</a>
            <a href="#nichos" className="hover:text-blue-600 transition-colors">Para Quem É</a>
            <a href="#precos" className="hover:text-blue-600 transition-colors">Preços & Combos</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            {onGoToDashboard && (
              <button
                onClick={onGoToDashboard}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all bg-white shadow-2xs"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Painel Admin</span>
              </button>
            )}

            <a
              href={whatsappBaseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Pedir no WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/20">
        {/* Glow de Fundo Sutil */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-100/60 via-indigo-50/40 to-emerald-100/50 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Coluna Texto & Promessa */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>NFC por Aproximação + QR Code</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">
                Avaliações 5 Estrelas no Google{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                  em 3 Segundos
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Transforme cada cliente do balcão em reputação máxima no Google Maps. Basta encostar o celular na placa.
              </p>

              {/* Balas Rápidas de Autoridade */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 p-2.5 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sem aplicativo para o cliente</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 p-2.5 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>iPhone & Android 100%</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 p-2.5 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Link Dinâmico em Nuvem</span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href={whatsappBaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-base shadow-xl shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Quero Minha Placa no Balcão</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#diferenciais"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-950 font-bold text-sm bg-white shadow-xs transition-all"
                >
                  <span>Ver Como Funciona</span>
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-4">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Placa Pronta para Uso
                </span>
                <span>•</span>
                <span>Entrega com Suporte Phoenix</span>
              </div>
            </div>

            {/* Coluna Visual: Mockup Interativo da Placa */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Controles do Simulador com Grande Destaque Visual */}
              <div className="w-full max-w-sm mb-4 bg-white border-2 border-blue-500 rounded-2xl p-4 shadow-xl shadow-blue-500/10 ring-4 ring-blue-50 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 tracking-tight">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 animate-pulse" />
                    <span>SIMULADOR AO VIVO DA SUA PLACA</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Interativo
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      DIGITE O NOME DO SEU NEGÓCIO
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 lowercase tracking-normal">
                      (aparece na placa abaixo)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={previewBusinessName}
                    onChange={(e) => setPreviewBusinessName(e.target.value)}
                    placeholder="Ex: Burger House, Barbearia Silva, Studio..."
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border-2 border-blue-400 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-inner transition-all"
                  />
                </div>

                {/* Upload de Logotipo Personalizado */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      ENVIAR LOGO DA SUA EMPRESA (OBRIGATÓRIO)
                    </label>
                    {customLogoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="text-[10px] text-red-600 hover:text-red-700 font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3 h-3" />
                        <span>Remover logo</span>
                      </button>
                    )}
                  </div>

                  <label className="cursor-pointer flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-white border-2 border-dashed border-slate-300 hover:border-blue-500 transition-all shadow-2xs group">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {customLogoUrl ? (
                        <div className="w-7 h-7 rounded-lg bg-white p-0.5 shrink-0 overflow-hidden border border-slate-200 shadow-2xs">
                          <img src={customLogoUrl} alt="Logo Preview" className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 truncate">
                        {customLogoUrl ? 'Logo aplicado com sucesso!' : 'Clique para enviar seu logo (PNG ou JPG)'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-lg bg-blue-600 text-white shadow-xs group-hover:bg-blue-700 transition-colors shrink-0">
                      {customLogoUrl ? 'Trocar' : 'Upload'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Card Container do Mockup (Template Google Avaliações 10 × 15 cm) */}
              <div className="w-full max-w-[340px] bg-slate-100/90 border border-slate-200/90 rounded-2xl p-4 shadow-xl shadow-slate-200/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                  <span className="font-semibold text-slate-800">Placa Phoenix · balcão</span>
                  <span className="text-slate-500 font-mono text-[11px]">10 × 15 cm</span>
                </div>

                {/* Placa Física Estilo Template Oficial */}
                <div className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col justify-between text-center select-none relative ring-1 ring-slate-950/5">
                  {/* Borda superior gradiente Google */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 to-blue-500"></div>

                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
                    {/* Topo: Logotipo à esquerda e Nome da Empresa alinhado ao N de "NOS AVALIE NO" */}
                    <div className="relative flex items-center min-h-[64px]">
                      {/* Logo (Custom ou Google "G" multicolorido) com tamanho ampliado e destacado */}
                      <div className="w-16 h-16 flex items-center justify-center shrink-0">
                        {customLogoUrl ? (
                          <img
                            src={customLogoUrl}
                            alt="Logo da Empresa"
                            className="max-w-[64px] max-h-[64px] object-contain rounded"
                          />
                        ) : (
                          <svg viewBox="0 0 48 48" className="w-14 h-14">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          </svg>
                        )}
                      </div>

                      {/* Nome da Empresa: Inicia alinhado ao N de "NOS AVALIE NO" e preenche da esquerda para a direita */}
                      <div className="absolute left-[calc(50%-52px)] right-0 text-left pl-2">
                        <span className="font-black text-xs sm:text-sm text-slate-950 uppercase tracking-tight leading-snug block break-words text-left">
                          {previewBusinessName.trim() || 'NOME DA EMPRESA'}
                        </span>
                      </div>
                    </div>

                    {/* Centro: NOS AVALIE NO + Google + 5 Estrelas */}
                    <div className="py-0.5 space-y-0.5">
                      <div className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-wider">
                        NOS AVALIE NO
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </div>
                      <div className="flex justify-center gap-1 text-[#FBBC05] text-base sm:text-lg pt-0.5">
                        ★★★★★
                      </div>
                    </div>

                    {/* Dois Blocos com borda grossa: QR Code e NFC */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {/* Bloco QR Code */}
                      <div className="flex flex-col items-center">
                        <div className="w-full aspect-square bg-white border-2 border-slate-950 rounded-2xl p-2.5 flex items-center justify-center shadow-sm">
                          <QrCode className="w-full h-full text-slate-950" />
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-black text-slate-950 uppercase tracking-tight mt-1 text-center leading-tight">
                          Aponte sua câmera
                        </span>
                      </div>

                      {/* Bloco NFC */}
                      <div className="flex flex-col items-center">
                        <div className="w-full aspect-square bg-white border-2 border-slate-950 rounded-2xl p-2 flex flex-col items-center justify-center shadow-sm">
                          <svg className="w-8 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M4 11a12 12 0 0 1 16 0" />
                            <path d="M7.5 14.5a7 7 0 0 1 9 0" />
                            <path d="M11 18a2 2 0 0 1 2 0" />
                          </svg>
                          <span className="font-black text-xs sm:text-sm text-slate-950 tracking-wider mt-0.5">NFC</span>
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-black text-slate-950 uppercase tracking-tight mt-1 text-center leading-tight">
                          Aproxime seu celular
                        </span>
                      </div>
                    </div>

                    {/* Logo Google sutil no rodapé da placa */}
                    <div className="pt-1">
                      <span className="text-[11px] font-bold tracking-tight">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </span>
                    </div>
                  </div>

                  {/* Borda inferior gradiente Google */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-green-500 via-yellow-400 via-red-500 to-blue-500"></div>
                </div>

                {/* Botão Enviar para WhatsApp (Somente clicável após preencher nome e logotipo) */}
                <div className="pt-2 space-y-2">
                  {isFormComplete ? (
                    <a
                      href={whatsappSimulatorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-center cursor-pointer"
                    >
                      <Send className="w-4 h-4 fill-white text-white" />
                      <span>Enviar</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="Preencha o nome do seu negócio e faça o upload do logotipo para habilitar o envio."
                      className="w-full py-3.5 px-4 rounded-xl bg-slate-200 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300 select-none transition-all"
                    >
                      <Send className="w-4 h-4 opacity-40 text-slate-400" />
                      <span>Enviar</span>
                    </button>
                  )}

                  {!isFormComplete && (
                    <p className="text-[11px] text-center font-medium text-amber-700 bg-amber-50 py-1.5 px-3 rounded-lg border border-amber-200/80 leading-snug">
                      {!previewBusinessName.trim() && !customLogoUrl
                        ? '⚠️ Digite o nome do negócio e envie o logotipo para habilitar o botão.'
                        : !previewBusinessName.trim()
                        ? '⚠️ Digite o nome do seu negócio acima para habilitar o botão.'
                        : '⚠️ Envie o logotipo da sua empresa acima para habilitar o botão.'}
                    </p>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 text-center font-mono">
                  Dimensões reais do balcão: 10cm × 15cm · Acrílico nobre premium
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 3 MOTIVOS: POR QUE O GOOGLE É O MAIOR VENDEDOR DO SEU BAIRRO */}
      <section id="como-funciona" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
              O Poder das 5 Estrelas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950">
              Por que quem tem mais avaliações domina as vendas da sua cidade?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              O algoritmo do Google Maps privilegia negócios com alto volume de notas 5 estrelas recentes. Veja o que acontece quando você coloca a placa no seu balcão:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50/70 border border-slate-200/80 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-400 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Topo do Google Maps</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Quando alguém pesquisa por "Restaurante", "Dentista" ou "Barbearia" perto de você, o Google recomenda primeiro quem tem mais e melhores notas.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-400 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Avaliação em 3 Segundos</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                O cliente não precisa pesquisar sua empresa nem digitar nada. Ele apenas encosta o celular na placa enquanto paga a conta e já dá 5 estrelas.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-400 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Autoridade & Confiança Imediata</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                93% dos clientes novos leem comentários antes de entrar ou pedir delivery. Uma média 4.9 estrelas elimina qualquer hesitação de compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DIFERENCIAL TECNOLÓGICO: PHOENIX VS PLACAS COMUNS DA INTERNET */}
      <section id="diferenciais" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
              ENGENHARIA PHOENIX AUTOMAÇÕES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950">
              Nem toda placa NFC é igual
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Veja a diferença entre uma placa NFC básica e a tecnologia Phoenix, um investimento pensado para acompanhar o seu negócio a longo prazo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Placa NFC Básica */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-slate-400" />
                  <h3 className="text-lg font-bold text-slate-800">Placa NFC básica</h3>
                </div>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span><strong className="text-slate-900">Link estático:</strong> O destino é fixo. Se o link do Google mudar ou você quiser apontar para o WhatsApp, é preciso trocar a placa.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span><strong className="text-slate-900">Sem métricas:</strong> Não há como acompanhar quantas pessoas tocaram ou leram a placa ao longo do mês.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span><strong className="text-slate-900">Acabamento simples:</strong> Materiais mais básicos, sem suporte estruturado e sem proteção reforçada para o uso diário no balcão.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span><strong className="text-slate-900">Configuração por conta própria:</strong> A instalação e a configuração ficam totalmente sob sua responsabilidade.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-3 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
                Resolve o básico, mas fica limitada conforme o negócio cresce.
              </div>
            </div>

            {/* Placa Inteligente Phoenix */}
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-emerald-500/10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-emerald-800">Placa Inteligente Phoenix Automações</h3>
                </div>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong className="text-slate-950">Link Dinâmico Inteligente:</strong> Troque o destino a qualquer momento em 1 clique! Mude para o Google, para o WhatsApp, Cardápio ou sua Landing Page exclusiva sem precisar trocar a placa física.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong className="text-slate-950">Rastreamento Separado NFC vs QR:</strong> Relatório em tempo real de acessos por aproximação e leitura de câmera.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong className="text-slate-950">Acrílico Nobre 2mm Laser:</strong> Acabamento de luxo com suporte em "L" super resistente e proteção química contra álcool 70%.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong className="text-slate-950">Implantação Completa:</strong> Nós extraímos o link oficial 5★ e entregamos a placa 100% pronta para lucrar no balcão.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-3 rounded-xl bg-emerald-50 text-xs text-emerald-800 border border-emerald-200 font-semibold flex items-center justify-between">
                <span>Investimento definitivo: sua placa nunca fica obsoleta.</span>
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO NICHOS RECOMENDADOS */}
      <section id="nichos" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/80">
              ONDE A PLACA MAIS DÁ RETORNO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950">
              Modelos sob medida para o seu ramo
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Veja como cada tipo de comércio usa a Placa Phoenix para transformar atendimentos em faturamento e reputação:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50/70 border border-slate-200/80 hover:border-amber-300 hover:bg-white hover:shadow-md transition-all p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Bares, Cafés & Burgers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Colocada nas mesas ou no caixa. Enquanto o cliente espera a conta ou come a sobremesa, ele aproxima o celular e avalia.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 hover:border-pink-300 hover:bg-white hover:shadow-md transition-all p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Barbearias & Salões</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Na bancada em frente ao espelho. O cliente satisfeito com o corte avalia antes de sair pela porta.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Clínicas & Dentistas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Na recepção ou sala de espera. Transmite alto padrão e modernidade para pacientes particulares e convênios.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all p-5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Pet Shops & Lojas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No balcão de pagamento. Perfeito para registrar a satisfação pós-banho e tosa ou compras no varejo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PREÇOS & COMBOS */}
      <section id="precos" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
              INVESTIMENTO CLARO & TRANSPARENTE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950">
              Escolha o pacote ideal para o seu negócio
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Valores acessíveis que se pagam já nos primeiros novos clientes atraídos pelo Google Maps:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plano 1: Placa Balcão Avulsa */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Placa Balcão Express</h3>
                <p className="text-xs text-slate-500 mt-1">Ideal para começar rápido com 1 ponto no caixa</p>
                <div className="my-6">
                  <span className="text-xs text-slate-500">Pagamento único de</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-semibold text-slate-500">R$</span>
                    <span className="text-4xl font-black text-slate-950">119</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Sem mensalidade obrigatória</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-200 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1 Placa Acrílico Nobre 10×15cm Cristal ou Black</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Chip NFC configurado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>QR Code de alta resolução</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Suporte na configuração inicial</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappPlan1Url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Pedir Placa Express</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Plano 2: Combo Turbo + Landing Page (Mais Popular) */}
            <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-blue-500/10 ring-4 ring-blue-50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                MAIS ESCOLHIDO PELOS LOJISTAS
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-950">Combo Turbo + Landing Page</h3>
                <p className="text-xs text-slate-600 mt-1">Placa NFC + Landing Page própria profissional</p>
                <div className="my-6">
                  <span className="text-xs text-slate-500">Investimento único de</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-semibold text-blue-600">R$</span>
                    <span className="text-4xl font-black text-slate-950">497</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Placa física + Landing Page inclusa</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 border-t border-slate-200 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>1 Placa Acrílico Nobre 10×15cm</strong> completa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>Landing Page Profissional:</strong> design exclusivo de alta conversão (SEO configurado)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Botão flutuante de WhatsApp + Catálogo de Serviços</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Botão integrado de 5 Estrelas no Google</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Otimizada para celulares e máxima velocidade</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappPlan2Url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs text-center shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
              >
                <span>Garantir Combo Turbo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Plano 3: Kit Empresa Completa */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Kit Empresa Completa</h3>
                <p className="text-xs text-slate-500 mt-1">1 Placa Balcão + Landing Page + Perfil do Google</p>
                <div className="my-6">
                  <span className="text-xs text-slate-500">Investimento único de</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-semibold text-slate-500">R$</span>
                    <span className="text-4xl font-black text-slate-950">697</span>
                  </div>
                  <span className="text-[11px] text-purple-700 font-semibold">Solução completa para o seu negócio</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-200 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>1 Placa Balcão</strong> em Acrílico Nobre 10×15cm</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>Landing Page Profissional</strong> (SEO configurado)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>Configuração do Perfil do Google Meu Negócio</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Orientação de categorias e palavras-chave locais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Suporte prioritário Phoenix Automações</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappPlan3Url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Pedir Kit Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FAQ */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
              TIRA-DÚVIDAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-50/80 border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL DE FECHAMENTO */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Pronto para colocar sua empresa no topo das buscas do Google?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Não perca mais clientes para o concorrente do outro lado da rua só porque ele tem mais avaliações. Peça sua placa hoje mesmo e comece a receber 5 estrelas ainda esta semana.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href={whatsappBaseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
              <span className="text-white">Falar com um especialista no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-sm tracking-wide">
          <Flame className="w-4 h-4 text-blue-600" />
          <span>PHOENIX NFC PRO</span>
        </div>
        <p className="text-slate-500 max-w-2xl mx-auto px-4">
          Phoenix Automações · Tecnologia em soluções inteligentes de balcão. Google, Google Maps e NFC são marcas registradas de seus respectivos detentores.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenPrivacy) onOpenPrivacy();
              else window.location.href = '?p=privacidade';
            }}
            className="hover:text-blue-600 transition-colors underline decoration-slate-300 underline-offset-4"
          >
            Política de Privacidade (LGPD)
          </button>
          <span>•</span>
          <a
            href="https://phoenixautomacoes.com.br/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Phoenix Automações (Site Principal)
          </a>
        </div>
        <p className="text-[11px] text-slate-400 pt-1">
          © {new Date().getFullYear()} Phoenix Automações. Todos os direitos reservados. CNPJ 51.418.058/0001-06.
        </p>
      </footer>

      {/* Botão Flutuante de WhatsApp no Canto */}
      <a
        href={whatsappBaseUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all transform hover:scale-105"
        title="Falar com Especialista no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Pedir Minha Placa</span>
      </a>
    </div>
  );
};
