import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  Printer, 
  Download, 
  Smartphone, 
  QrCode as QrIcon, 
  Check, 
  Sparkles,
  Info,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  Image as ImageIcon,
  Save,
  Globe,
  Target,
  Zap,
  CheckCircle2,
  Upload,
  X
} from 'lucide-react';
import { Plate } from '../types';
import { getPlateRedirectUrl, getEffectivePlateUrls, formatSerial } from '../utils/codeGenerator';

interface PlatePrintViewProps {
  plates: Plate[];
  selectedPlateId?: string;
  onSelectPlate: (plateId: string) => void;
  onUpdatePlate?: (updated: Plate) => void;
}

export const PlatePrintView: React.FC<PlatePrintViewProps> = ({
  plates,
  selectedPlateId,
  onSelectPlate,
  onUpdatePlate,
}) => {
  const currentPlate = plates.find((p) => p.id === selectedPlateId) || plates[0];
  const [theme, setTheme] = useState<'white' | 'black'>('white');
  const [viewMode, setViewMode] = useState<'print' | 'mockup'>('print');
  const [customBusinessName, setCustomBusinessName] = useState(currentPlate?.clientName || '');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [destinationUrl, setDestinationUrl] = useState(currentPlate?.destination || '');
  const [linkMode, setLinkMode] = useState<'direct' | 'dynamic'>(
    currentPlate?.linkMode || (currentPlate?.destination ? 'direct' : 'dynamic')
  );
  const [isSaved, setIsSaved] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Sincroniza nome customizado, destino e modo ao trocar de placa
  useEffect(() => {
    if (currentPlate) {
      setCustomBusinessName(currentPlate.clientName || '');
      setDestinationUrl(currentPlate.destination || '');
      setLinkMode(currentPlate.linkMode || (currentPlate.destination ? 'direct' : 'dynamic'));
      setIsSaved(false);
    }
  }, [currentPlate?.id, currentPlate?.clientName, currentPlate?.destination, currentPlate?.linkMode]);

  // Calcula URLs efetivas (se modo Direto do Cliente ou Dinâmico Phoenix 302)
  const { qrUrl: effectiveQrUrl, nfcUrl: effectiveNfcUrl, isDirect } = getEffectivePlateUrls(
    {
      code: currentPlate ? currentPlate.code : '7CXG',
      destination: destinationUrl,
      linkMode: linkMode,
      customNfcUrl: currentPlate?.customNfcUrl,
      customQrUrl: currentPlate?.customQrUrl,
    },
    linkMode
  );

  const handleSavePlateDetails = () => {
    if (!currentPlate || !onUpdatePlate) return;
    const updated: Plate = {
      ...currentPlate,
      clientName: customBusinessName.trim() || currentPlate.clientName,
      destination: destinationUrl.trim(),
      linkMode: linkMode,
      status: destinationUrl.trim() ? 'active' : currentPlate.status,
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlate(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Gera o QR Code com base no modo ativo (Link Direto do Cliente ou Dinâmico Phoenix 302)
  useEffect(() => {
    if (!currentPlate || !effectiveQrUrl) return;

    QRCode.toDataURL(effectiveQrUrl, {
      width: 600,
      margin: 1,
      color: {
        dark: theme === 'white' ? '#111827' : '#000000',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Erro gerando QR Code:', err));
  }, [effectiveQrUrl, theme, currentPlate?.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(label);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Exporta a placa diretamente em PNG de Alta Resolução (300 DPI - 100x150mm)
  const handleDownloadHighResPng = async () => {
    if (!currentPlate || !qrDataUrl) return;
    setIsGeneratingPng(true);

    try {
      // 10x15 cm a 300 DPI = 1181 x 1772 pixels
      const canvas = document.createElement('canvas');
      canvas.width = 1181;
      canvas.height = 1772;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isWhite = theme === 'white';

      // Fundo Base
      ctx.fillStyle = isWhite ? '#FFFFFF' : '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Faixa Superior Gradiente Google
      const topGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      topGrad.addColorStop(0, '#4285F4');
      topGrad.addColorStop(0.33, '#EA4335');
      topGrad.addColorStop(0.66, '#FBBC05');
      topGrad.addColorStop(1, '#34A853');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, canvas.width, 24);

      // Faixa Inferior Gradiente Google Invertido
      const botGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      botGrad.addColorStop(0, '#34A853');
      botGrad.addColorStop(0.33, '#FBBC05');
      botGrad.addColorStop(0.66, '#EA4335');
      botGrad.addColorStop(1, '#4285F4');
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, canvas.height - 24, canvas.width, 24);

      // Se tiver logotipo do cliente, desenha no topo
      if (customLogoUrl) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
          logoImg.src = customLogoUrl;
        });
        if (logoImg.complete && logoImg.naturalWidth > 0) {
          const logoSize = 180;
          ctx.drawImage(logoImg, 100, 70, logoSize, logoSize);
          ctx.textAlign = 'right';
          ctx.font = 'bold 46px sans-serif';
          ctx.fillStyle = isWhite ? '#0f172a' : '#f8fafc';
          ctx.fillText(customBusinessName.trim().toUpperCase() || 'NOME DA EMPRESA', canvas.width - 100, 150);
          ctx.textAlign = 'center';
        }
      }

      // Título "Google" estilizado
      ctx.font = 'bold 90px sans-serif';
      ctx.textAlign = 'center';
      const googleY = customLogoUrl ? 290 : 220;
      
      const letters = [
        { char: 'G', color: '#4285F4' },
        { char: 'o', color: '#EA4335' },
        { char: 'o', color: '#FBBC05' },
        { char: 'g', color: '#4285F4' },
        { char: 'l', color: '#34A853' },
        { char: 'e', color: '#EA4335' },
      ];
      let startX = canvas.width / 2 - 170;
      letters.forEach((l) => {
        ctx.fillStyle = l.color;
        ctx.fillText(l.char, startX, googleY);
        startX += 68;
      });

      // Título "Nos avalie no Google"
      ctx.fillStyle = isWhite ? '#0f172a' : '#f8fafc';
      ctx.font = 'bold 72px sans-serif';
      ctx.fillText('Nos avalie no Google', canvas.width / 2, customLogoUrl ? 400 : 360);

      // Nome do Cliente ou Subtítulo (se não tiver logo no topo)
      if (!customLogoUrl) {
        const displayName = customBusinessName.trim() || 'Sua opinião é fundamental para nós!';
        ctx.fillStyle = isWhite ? '#2563eb' : '#60a5fa';
        ctx.font = customBusinessName ? 'bold 44px sans-serif' : 'normal 38px sans-serif';
        ctx.fillText(displayName.toUpperCase(), canvas.width / 2, 440);
      }

      // 5 Estrelas Douradas
      const starY = 530;
      const starRadius = 28;
      const starSpacing = 85;
      const starStartX = canvas.width / 2 - 2 * starSpacing;

      ctx.fillStyle = '#FBBC05';
      for (let i = 0; i < 5; i++) {
        const cx = starStartX + i * starSpacing;
        drawStar(ctx, cx, starY, 5, starRadius, starRadius / 2);
      }

      // Caixa 1: NFC (Esquerda)
      const boxWidth = 460;
      const boxHeight = 560;
      const boxY = 660;
      const box1X = 100;

      ctx.fillStyle = isWhite ? '#f8fafc' : '#18181b';
      roundRect(ctx, box1X, boxY, boxWidth, boxHeight, 36, true, true, isWhite ? '#e2e8f0' : '#27272a');

      // Círculo Azul do NFC
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(box1X + boxWidth / 2, boxY + 180, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px sans-serif';
      ctx.fillText('NFC', box1X + boxWidth / 2, boxY + 195);

      ctx.fillStyle = isWhite ? '#0f172a' : '#f8fafc';
      ctx.font = 'bold 50px sans-serif';
      ctx.fillText('APROXIME', box1X + boxWidth / 2, boxY + 370);
      ctx.font = 'normal 36px sans-serif';
      ctx.fillStyle = isWhite ? '#64748b' : '#a1a1aa';
      ctx.fillText('O seu celular aqui', box1X + boxWidth / 2, boxY + 440);

      // Caixa 2: QR Code (Direita)
      const box2X = canvas.width - 100 - boxWidth;
      ctx.fillStyle = isWhite ? '#f8fafc' : '#18181b';
      roundRect(ctx, box2X, boxY, boxWidth, boxHeight, 36, true, true, isWhite ? '#e2e8f0' : '#27272a');

      // Desenhar QR Code real
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      await new Promise((resolve) => {
        qrImg.onload = resolve;
        qrImg.src = qrDataUrl;
      });

      const qrSize = 300;
      ctx.drawImage(qrImg, box2X + (boxWidth - qrSize) / 2, boxY + 60, qrSize, qrSize);

      ctx.fillStyle = isWhite ? '#0f172a' : '#f8fafc';
      ctx.font = 'bold 50px sans-serif';
      ctx.fillText('APONTE', box2X + boxWidth / 2, boxY + 430);
      ctx.font = 'normal 36px sans-serif';
      ctx.fillStyle = isWhite ? '#64748b' : '#a1a1aa';
      ctx.fillText('A câmera do celular', box2X + boxWidth / 2, boxY + 490);

      // Disparar Download
      const link = document.createElement('a');
      link.download = `placa-google-10x15-serial-${formatSerial(currentPlate.serial)}-${currentPlate.code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Erro ao gerar PNG de alta resolução:', err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  // Funções utilitárias para desenhar estrela e retângulo arredondado no Canvas
  function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: boolean, stroke: boolean, strokeColor: string) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  const currentIndex = plates.findIndex((p) => p.id === currentPlate?.id);
  const prevPlate = currentIndex > 0 ? plates[currentIndex - 1] : null;
  const nextPlate = currentIndex < plates.length - 1 ? plates[currentIndex + 1] : null;

  if (!currentPlate) {
    return (
      <div className="p-8 text-center text-slate-400">
        Nenhuma placa disponível no lote para impressão.
      </div>
    );
  }

  const nfcTargetUrl = getPlateRedirectUrl(currentPlate.code, 'nfc');
  const qrTargetUrl = getPlateRedirectUrl(currentPlate.code, 'qr');

  return (
    <div className="space-y-6">
      {/* Controles do Topo */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 no-print shadow-md">
        {/* Navegação entre placas */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => prevPlate && onSelectPlate(prevPlate.id)}
            disabled={!prevPlate}
            className="p-2 rounded-lg bg-slate-700 disabled:opacity-30 hover:bg-slate-600 text-slate-200 transition-colors"
            title="Placa anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <select
            id="select-plate-print"
            value={currentPlate.id}
            onChange={(e) => onSelectPlate(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 font-semibold focus:outline-none focus:border-blue-500 flex-1 md:flex-none"
          >
            {plates.map((p) => (
              <option key={p.id} value={p.id}>
                Placa #{formatSerial(p.serial)} · {p.clientName ? p.clientName : `Virgem em Estoque (${p.code})`}
              </option>
            ))}
          </select>

          <button
            onClick={() => nextPlate && onSelectPlate(nextPlate.id)}
            disabled={!nextPlate}
            className="p-2 rounded-lg bg-slate-700 disabled:opacity-30 hover:bg-slate-600 text-slate-200 transition-colors"
            title="Próxima placa"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Alternador de Modo (Arte vs Mockup de Balcão) */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('print')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'print'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Arte 10×15 cm</span>
          </button>

          <button
            onClick={() => setViewMode('mockup')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'mockup'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Mockup no Balcão Real</span>
          </button>
        </div>

        {/* Escolha do Tema da Placa (Branca vs Preta) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme('white')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              theme === 'white'
                ? 'bg-white text-slate-950 shadow-md ring-2 ring-blue-500'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Branca
          </button>
          <button
            onClick={() => setTheme('black')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              theme === 'black'
                ? 'bg-slate-950 text-white shadow-md ring-2 ring-blue-500 border border-slate-700'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Preta Premium
          </button>
        </div>

        {/* Ações: Download PNG 300 DPI & Imprimir */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadHighResPng}
            disabled={isGeneratingPng}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            title="Exportar imagem 1181x1772 a 300 DPI pronta para gráfica"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPng ? 'Gerando...' : 'Baixar PNG (300 DPI)'}</span>
          </button>

          <button
            id="print-card-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Campo para Personalizar o Nome do Estabelecimento e Logotipo na Placa */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Personalização na Placa:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Ex: BARBEARIA PORTO ALEGRE"
            value={customBusinessName}
            onChange={(e) => setCustomBusinessName(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-blue-500 uppercase tracking-wide"
          />

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 text-xs text-slate-300 hover:text-white transition-colors">
            {customLogoUrl ? (
              <img src={customLogoUrl} alt="Logo" className="w-4 h-4 object-contain rounded" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>{customLogoUrl ? 'Trocar Logo' : 'Enviar Logo'}</span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp, image/svg+xml"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  const r = new FileReader();
                  r.onload = (ev) => setCustomLogoUrl(ev.target?.result as string);
                  r.readAsDataURL(f);
                }
              }}
              className="hidden"
            />
          </label>

          {customLogoUrl && (
            <button
              onClick={() => setCustomLogoUrl(null)}
              className="text-xs text-red-400 hover:text-red-300 px-1 py-1 inline-flex items-center gap-0.5"
              title="Remover logotipo"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remover</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Principal: Visualizador Real da Placa + Informações Técnicas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visualizador Proporcional / Mockup */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {viewMode === 'mockup' ? (
            /* MOCKUP 3D REALISTA NO BALCÃO */
            <div className="w-full max-w-[480px] h-[580px] rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl border border-slate-700 bg-gradient-to-b from-slate-900 via-stone-900 to-amber-950">
              {/* Iluminação de teto tipo spot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-amber-200/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Superfície do Balcão de Madeira Nobre / Café */}
              <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-stone-950 via-amber-950/80 to-amber-900/40 border-t border-amber-800/30"></div>

              {/* A Placa em Perspectiva com Suporte em L */}
              <div
                className={`w-[260px] h-[390px] rounded-xl p-4 shadow-2xl relative flex flex-col justify-between transition-all border z-10 ${
                  theme === 'white'
                    ? 'bg-white text-slate-900 border-slate-200'
                    : 'bg-zinc-950 text-white border-zinc-800'
                }`}
                style={{
                  transform: 'perspective(900px) rotateX(8deg) rotateY(-4deg)',
                  boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(251, 188, 5, 0.15)',
                }}
              >
                {/* Faixa Superior Gradiente */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

                {/* Topo */}
                <div className="text-center pt-1 space-y-1">
                  <span className="font-black text-lg tracking-tight">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                  <h4 className="text-xs font-black leading-tight">Nos avalie no Google</h4>
                  <p className="text-[9px] font-bold text-blue-500 uppercase tracking-wider truncate">
                    {customBusinessName || 'Sua Empresa Aqui'}
                  </p>
                  <div className="flex justify-center gap-0.5 text-[#FBBC05]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                </div>

                {/* Centro: NFC e QR */}
                <div className="grid grid-cols-2 gap-2 my-auto px-1">
                  <div className={`p-2 rounded-lg text-center border ${theme === 'white' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                    <Smartphone className="w-5 h-5 text-[#4285F4] mx-auto mb-1" />
                    <span className="text-[9px] font-bold uppercase block">NFC</span>
                    <span className="text-[7px] text-slate-500 block">Aproxime</span>
                  </div>
                  <div className={`p-1.5 rounded-lg text-center border ${theme === 'white' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR" className="w-10 h-10 mx-auto rounded p-0.5 bg-white" />
                    ) : (
                      <div className="w-10 h-10 bg-slate-200 mx-auto rounded" />
                    )}
                    <span className="text-[7px] text-slate-500 block mt-0.5">Aponte</span>
                  </div>
                </div>

                {/* Faixa Inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#34A853] via-[#FBBC05] via-[#EA4335] to-[#4285F4]" />
              </div>

              {/* Sombra realista projetada no balcão */}
              <div className="w-56 h-6 bg-black/60 rounded-full blur-md -mt-2 z-0"></div>
              <span className="absolute bottom-3 text-[11px] text-amber-200/60 font-mono">
                Visualização de Demonstração no Balcão de Atendimento
              </span>
            </div>
          ) : (
            /* ARTE OFICIAL 10x15 PARA IMPRESSÃO */
            <>
              <div className="text-xs text-slate-400 mb-2 font-mono flex items-center gap-2 no-print">
                <span>Dimensões de Corte Gráfica: 10 cm × 15 cm</span>
                <span>•</span>
                <span>Proporção 2:3 padrão balcão</span>
              </div>

              <div
                ref={printRef}
                id="printable-plate"
                className={`w-[360px] h-[540px] rounded-2xl p-6 shadow-2xl relative flex flex-col justify-between transition-colors overflow-hidden border ${
                  theme === 'white'
                    ? 'bg-white text-slate-900 border-slate-200'
                    : 'bg-zinc-950 text-white border-zinc-800'
                }`}
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Faixa Superior Gradiente Oficial Google */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

                {/* Cabeçalho da Placa */}
                <div className="pt-2 space-y-2">
                  {customLogoUrl ? (
                    <div className="relative flex items-center min-h-[64px] px-1 mb-1">
                      <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <img src={customLogoUrl} alt="Logo" className="max-w-[58px] max-h-[58px] object-contain" />
                      </div>
                      <div className="absolute left-[calc(50%-70px)] right-0 text-left pl-2">
                        <span className="font-black text-sm uppercase tracking-tight block leading-snug text-left">
                          {customBusinessName.trim() || 'NOME DA EMPRESA'}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="text-center space-y-1">
                    <div className="flex justify-center items-center gap-2">
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span className="font-extrabold text-2xl tracking-tight">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold tracking-tight">
                      Nos avalie no Google
                    </h2>
                    {!customLogoUrl && (
                      customBusinessName ? (
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {customBusinessName}
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-slate-400">
                          Sua opinião nos ajuda a crescer!
                        </p>
                      )
                    )}
                  </div>

                  {/* 5 Estrelas Douradas */}
                  <div className="flex justify-center items-center gap-1 text-[#FBBC05]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Centro: NFC e QR */}
                <div className="grid grid-cols-2 gap-4 my-auto px-2">
                  <div
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center ${
                      theme === 'white' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                      <Smartphone className="w-8 h-8 text-[#4285F4]" />
                    </div>
                    <span className="font-extrabold text-xs tracking-tight uppercase">NFC</span>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-zinc-400 mt-1 leading-tight">
                      Aproxime seu celular
                    </p>
                  </div>

                  <div
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center ${
                      theme === 'white' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="QR Code de Avaliação"
                        className="w-20 h-20 rounded-lg p-1 bg-white shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-slate-200 animate-pulse rounded-lg" />
                    )}
                    <span className="font-extrabold text-xs tracking-tight uppercase mt-1">QR Code</span>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-zinc-400 leading-tight">
                      Aponte sua câmera
                    </p>
                  </div>
                </div>

                {/* Faixa Inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#34A853] via-[#FBBC05] via-[#EA4335] to-[#4285F4]" />
              </div>
            </>
          )}

          {/* Indicador de Destino Ativo logo abaixo da Placa */}
          <div className="mt-4 w-full max-w-[480px] bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-xl shrink-0 ${isDirect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {isDirect ? <Target className="w-4 h-4 text-emerald-400" /> : <Globe className="w-4 h-4 text-[#4285F4]" />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-semibold text-slate-400">
                    QR Code Atual da Placa:
                  </p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    isDirect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {isDirect ? '🎯 Direto do Cliente' : '⚡ Phoenix 302'}
                  </span>
                </div>
                <p className={`text-xs font-mono truncate ${isDirect ? 'text-emerald-400' : 'text-indigo-300'}`}>
                  {effectiveQrUrl}
                </p>
              </div>
            </div>
            {effectiveQrUrl && (
              <a
                href={effectiveQrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold shrink-0 transition-colors inline-flex items-center gap-1 shadow-sm ${
                  isDirect ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'
                }`}
                title="Testar link ativo do QR Code em nova aba"
              >
                <span>Testar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Painel Lateral: Guia de Gravação NFC & Especificações da Gráfica */}
        <div className="lg:col-span-5 space-y-4 no-print">
          {/* Seletor de Modo: Link Direto do Cliente vs Dinâmico Phoenix 302 */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Destino do QR Code & Gravação NFC:</span>
              </label>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isDirect 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}>
                {isDirect ? '🎯 Modo Direto Ativo' : '⚡ Modo Dinâmico Ativo'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLinkMode('direct');
                  if (currentPlate && onUpdatePlate) {
                    onUpdatePlate({ ...currentPlate, linkMode: 'direct', updatedAt: new Date().toISOString() });
                  }
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isDirect
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Link Direto do Cliente</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  QR Code e NFC gravam o link de avaliação do Google direto, 100% finalizado para a gráfica.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLinkMode('dynamic');
                  if (currentPlate && onUpdatePlate) {
                    onUpdatePlate({ ...currentPlate, linkMode: 'dynamic', updatedAt: new Date().toISOString() });
                  }
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  !isDirect
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-300">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Dinâmico Phoenix 302</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Gera <span className="font-mono text-[10px]">?r={currentPlate.code}</span> permitindo trocar o link em nuvem depois.
                </p>
              </button>
            </div>
          </div>

          {/* Card Principal: Link do Google para Avaliação (Destino Real) */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[#4285F4] font-black text-base">G</span>
                <span>Link do Google para Avaliação</span>
              </h3>
              {destinationUrl ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Link Conectado
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Sem Link
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O cliente final é redirecionado instantaneamente para este link de <strong>5 Estrelas no Google</strong> ao encostar o celular na placa ou escanear o QR Code:
            </p>

            {/* Input com Link do Google */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://www.google.com/search?q=avaliacoes..."
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg pl-3 pr-24 py-2 text-xs text-emerald-300 font-mono focus:outline-none transition-colors"
                />
                {destinationUrl && (
                  <a
                    href={destinationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-sm transition-all"
                    title="Abrir destino no Google agora em nova aba"
                  >
                    <span>Testar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Botões de Ação do Google */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => handleCopy(destinationUrl, 'google_url')}
                  disabled={!destinationUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-40"
                  title="Copiar link do Google"
                >
                  {copiedUrl === 'google_url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Link do Google</span>
                    </>
                  )}
                </button>

                {onUpdatePlate && (
                  <button
                    onClick={handleSavePlateDetails}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/30"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Salvo na Placa!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Salvar Link na Placa</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Explicação dos modos */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-[11px] text-slate-400 space-y-1.5">
              <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Status da Configuração:</span>
              </div>
              <p className="leading-relaxed">
                {isDirect ? (
                  <>
                    <strong className="text-emerald-300">Modo Link Direto Ativo:</strong> O QR Code gerado na placa física e o link da Tag NFC apontam <strong>diretamente para o link do cliente</strong> sem redirecionamentos intermediários. Prontinho para imprimir!
                  </>
                ) : (
                  <>
                    <strong className="text-indigo-300">Modo Dinâmico Ativo:</strong> A placa física gravada com <strong className="text-indigo-300 font-mono">?r={currentPlate.code}</strong> redireciona em nuvem para este endereço. Se o cliente mudar de endereço, basta alterar aqui sem trocar a placa.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Instruções de Gravação no Celular */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>Gravação da Tag NFC (App NFC Tools)</span>
            </h3>

            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
              <li>Abra o NFC Tools e toque em <strong>Escrever</strong>.</li>
              <li>Toque em <strong>Adicionar registro</strong> → <strong>URL / URI</strong>.</li>
              <li>Cole o link NFC abaixo ({isDirect ? <strong className="text-emerald-300">Link Direto do Cliente</strong> : <code className="text-amber-400">?s=n</code>}).</li>
              <li>Aproxime o celular da tag NTAG213 até o "Beep" de sucesso!</li>
              <li className="text-amber-300 font-medium">
                Trave com senha no menu "Outras opções" para ninguém alterar.
              </li>
            </ol>

            {/* Link para Tag NFC */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-400">
                  Link Exato para Gravar na Tag NFC:
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isDirect ? '🎯 Direto' : '⚡ Dinâmico'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={effectiveNfcUrl}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-mono"
                />
                <button
                  onClick={() => handleCopy(effectiveNfcUrl, 'nfc')}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors shrink-0"
                  title="Copiar link NFC"
                >
                  {copiedUrl === 'nfc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Link para QR Code */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-400">
                  Link Embutido no QR Code da Placa:
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isDirect ? '🎯 Direto' : '⚡ Dinâmico'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={effectiveQrUrl}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-indigo-300 font-mono"
                />
                <button
                  onClick={() => handleCopy(effectiveQrUrl, 'qr')}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors shrink-0"
                  title="Copiar link QR"
                >
                  {copiedUrl === 'qr' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Dicas para Gráfica de Porto Alegre */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Instrução de Produção Gráfica em POA</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• <strong>Dimensão:</strong> 100 mm × 150 mm com cantos raio 4mm.</li>
              <li>• <strong>Base:</strong> Acrílico Cristal 3 mm dobrado em L (mesa) ou PVC expandido 3 mm.</li>
              <li>• <strong>Impressão:</strong> Vinil adesivo fosco com laminação (evita reflexo de luz no balcão).</li>
              <li>• <strong>Tag NFC:</strong> Colada no verso da placa, no centro do ícone NFC.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
