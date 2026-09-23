import React, { useState } from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Share2, 
  MessageCircle, 
  Instagram, 
  Star, 
  MapPin, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  ExternalLink,
  DollarSign,
  Layers,
  Globe,
  Server,
  ShieldCheck,
  Calendar,
  Clock,
  Send,
  Monitor,
  AlertCircle,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { LandingPageData, Plate } from '../types';
import { formatSerial } from '../utils/codeGenerator';

interface BioSiteBuilderProps {
  plates: Plate[];
  onAssignToPlate: (plateId: string, landingPageUrl: string, clientName: string) => void;
}

export const BioSiteBuilder: React.FC<BioSiteBuilderProps> = ({
  plates,
  onAssignToPlate,
}) => {
  const [landingData, setLandingData] = useState<LandingPageData>({
    businessName: 'Studio Bella Nail & Hair',
    category: 'Salão de Beleza & Estética',
    rating: '5.0',
    reviewCount: 47,
    googleReviewUrl: 'https://maps.google.com/?cid=sample_google_review',
    whatsapp: '51991234567',
    instagram: 'studiobellanail',
    address: 'Rua Otto Niemeyer, 1200 - Tristeza, Porto Alegre',
    pixKey: 'contato@studiobellanail.com.br',
    aboutText: 'Especialistas em unhas de fibra, manicure russa, visagismo e cuidados capilares com produtos de alta performance.',
    accentColor: '#4f46e5',
    services: [
      { title: 'Alongamento em Fibra de Vidro', price: 'R$ 180', description: 'Aplicação completa com acabamento ultra natural' },
      { title: 'Manutenção de Unha em Gel', price: 'R$ 120', description: 'Reforço, nivelamento e esmaltação premium' },
      { title: 'Corte Feminino + Escova', price: 'R$ 95', description: 'Visagismo e finalização com proteção térmica' },
      { title: 'Spa dos Pés Completo', price: 'R$ 70', description: 'Esfoliação, hidratação profunda e massagem' },
    ],
    // Domínio, Servidor 12 meses e Recorrência
    domain: 'www.studiobellanail.com.br',
    serverDurationMonths: 12,
    activatedAt: new Date().toISOString().split('T')[0],
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    recurrencePrice: 297,
    recurrencePeriod: 'annual',
    recurrenceStatus: 'active',
  });

  const [selectedPlateId, setSelectedPlateId] = useState<string>(plates[0]?.id || '');
  const [assignedSuccess, setAssignedSuccess] = useState(false);
  const [renewalSuccess, setRenewalSuccess] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // Calcula dias restantes dos 12 meses
  const calculateDaysLeft = () => {
    if (!landingData.expiresAt) return 365;
    const now = new Date();
    const exp = new Date(landingData.expiresAt);
    const diff = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const daysLeft = calculateDaysLeft();

  const handleAddService = () => {
    if (!newServiceTitle.trim()) return;
    setLandingData({
      ...landingData,
      services: [
        ...landingData.services,
        { title: newServiceTitle.trim(), price: newServicePrice.trim() || undefined },
      ],
    });
    setNewServiceTitle('');
    setNewServicePrice('');
  };

  const handleRemoveService = (index: number) => {
    setLandingData({
      ...landingData,
      services: landingData.services.filter((_, i) => i !== index),
    });
  };

  // Renovar por mais 12 meses
  const handleRenew12Months = () => {
    const currentExp = landingData.expiresAt ? new Date(landingData.expiresAt) : new Date();
    const newExp = new Date(currentExp.getTime() + 365 * 24 * 60 * 60 * 1000);
    setLandingData({
      ...landingData,
      expiresAt: newExp.toISOString().split('T')[0],
      recurrenceStatus: 'active',
    });
    setRenewalSuccess(true);
    setTimeout(() => setRenewalSuccess(false), 3000);
  };

  // Vincular à Placa NFC
  const handleLinkToPlate = () => {
    if (!selectedPlateId) return;
    const targetUrl = landingData.domain
      ? `https://${landingData.domain.replace(/^https?:\/\//, '')}`
      : `${window.location.origin}?view=landing&name=${encodeURIComponent(landingData.businessName)}`;
    
    onAssignToPlate(selectedPlateId, targetUrl, landingData.businessName);
    setAssignedSuccess(true);
    setTimeout(() => setAssignedSuccess(false), 3000);
  };

  // Mensagem WhatsApp para cobrança de renovação
  const generateRenewalWhatsAppUrl = () => {
    const domainText = landingData.domain || 'sua Landing Page';
    const priceText = `R$ ${landingData.recurrencePrice || 297}`;
    const pixText = landingData.pixKey ? `\nChave Pix para renovação: *${landingData.pixKey}*` : '';
    const msg = `Olá, ${landingData.businessName}! Tudo bem?

Passando para lembrar que a sua Landing Page Oficial (*${domainText}*) está completando o ciclo de 12 meses!

🌐 *O que está incluso na renovação anual:*
• Manutenção do Registro do Domínio Próprio (.com.br)
• Hospedagem em Servidor Cloud dedicado por mais 12 meses
• Certificado de Segurança SSL (HTTPS)
• Suporte técnico e atualizações nos botões do WhatsApp e catálogo

💰 *Valor da Renovação Anual:* ${priceText}/ano${pixText}

Posso confirmar a renovação do seu domínio e servidor por mais 1 ano para manter seu site sempre no ar?`;

    return `https://wa.me/55${landingData.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6">
      {/* Banner de Alto Valor: Landing Page Própria com Domínio & Servidor 12 Meses */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/30 rounded-2xl p-5 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Modelo de Recorrência Anual
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <Server className="w-3.5 h-3.5" />
              12 Meses de Domínio & Servidor Inclusos
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">
            Landing Page Profissional: Domínio Próprio + Servidor 12 Meses Inclusos
          </h3>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Não entregamos um simples linktree ou biosite amador. Entregamos uma <strong>Landing Page Completa de Alta Conversão</strong> com 
            domínio registrado (ex: <em>www.suaempresa.com.br</em>) e servidor em nuvem dedicado por 12 meses.
            Isso posiciona a empresa com autoridade máxima no Google e gera nossa <strong>Recorrência Anual de R$ 297 a R$ 497/ano</strong> de manutenção.
          </p>
        </div>

        {/* Métricas Financeiras de Setup & Recorrência */}
        <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none bg-slate-900/90 p-3 rounded-xl border border-blue-500/30 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Setup + 1º Ano</span>
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              R$ 497
            </span>
            <span className="text-[10px] text-blue-400 block font-medium">Placa + LP + 12m</span>
          </div>

          <div className="flex-1 lg:flex-none bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30 text-center">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Recorrência Anual</span>
            <span className="text-xl font-black text-emerald-400">
              R$ 297<span className="text-xs text-slate-400 font-normal">/ano</span>
            </span>
            <span className="text-[10px] text-emerald-400 block font-medium">Renovação Domínio</span>
          </div>
        </div>
      </div>

      {/* BLOCO EXCLUSIVO: GESTÃO DO DOMÍNIO, SERVIDOR E RECORRÊNCIA */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <span>Gestão do Domínio Próprio & Servidor (12 Meses)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {daysLeft > 0 ? `${daysLeft} dias restantes` : 'Expirado'}
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Acompanhe o ciclo de 12 meses da hospedagem e envie a cobrança de renovação no momento certo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={generateRenewalWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Cobrar Renovação no WhatsApp</span>
            </a>

            <button
              onClick={handleRenew12Months}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
              title="Adicionar mais 12 meses ao vencimento"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>+12 Meses</span>
            </button>
          </div>
        </div>

        {renewalSuccess && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Servidor e domínio renovados por mais 12 meses com sucesso! Nova data de expiração aplicada.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Domínio Próprio */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Domínio Próprio do Cliente:</span>
            </label>
            <input
              type="text"
              value={landingData.domain || ''}
              onChange={(e) => setLandingData({ ...landingData, domain: e.target.value })}
              placeholder="Ex: www.suaempresa.com.br"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
            />
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> SSL Seguro e DNS Ativo
            </span>
          </div>

          {/* Data de Ativação */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Data de Ativação:</span>
            </label>
            <input
              type="date"
              value={landingData.activatedAt || ''}
              onChange={(e) => setLandingData({ ...landingData, activatedAt: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Início da hospedagem</span>
          </div>

          {/* Data de Renovação (12 Meses) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Vencimento dos 12 Meses:</span>
            </label>
            <input
              type="date"
              value={landingData.expiresAt || ''}
              onChange={(e) => setLandingData({ ...landingData, expiresAt: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-semibold text-amber-300"
            />
            <span className="text-[10px] text-amber-400 block mt-1">Renovação anual do domínio</span>
          </div>

          {/* Valor da Recorrência */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Valor da Recorrência:</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={landingData.recurrencePrice || 297}
                onChange={(e) => setLandingData({ ...landingData, recurrencePrice: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-bold focus:outline-none focus:border-blue-500 text-emerald-400"
              />
              <span className="text-xs text-slate-400 font-semibold shrink-0">/ano</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Cobrança periódica contratada</span>
          </div>
        </div>
      </div>

      {/* Interface Dupla: Formulário de Configuração + Pré-visualização da Landing Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Edição dos Dados da Landing Page */}
        <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Dados & Conteúdo da Landing Page</span>
            </h4>
            <span className="text-xs text-slate-400">Design de Alta Conversão</span>
          </div>

          {/* Nome e Categoria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome da Empresa
              </label>
              <input
                type="text"
                value={landingData.businessName}
                onChange={(e) => setLandingData({ ...landingData, businessName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Segmento / Categoria
              </label>
              <input
                type="text"
                value={landingData.category}
                onChange={(e) => setLandingData({ ...landingData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* WhatsApp e Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Oficial de Vendas / Agendamento
              </label>
              <input
                type="text"
                placeholder="51991234567"
                value={landingData.whatsapp}
                onChange={(e) => setLandingData({ ...landingData, whatsapp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Instagram (@perfil)
              </label>
              <input
                type="text"
                placeholder="studiobellanail"
                value={landingData.instagram}
                onChange={(e) => setLandingData({ ...landingData, instagram: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Endereço e Chave Pix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Endereço Físico (com Bairro e Cidade)
              </label>
              <input
                type="text"
                value={landingData.address}
                onChange={(e) => setLandingData({ ...landingData, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Chave Pix (Pagamento Rápido na Landing Page)
              </label>
              <input
                type="text"
                placeholder="CNPJ, E-mail ou Celular"
                value={landingData.pixKey || ''}
                onChange={(e) => setLandingData({ ...landingData, pixKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Texto Institucional Sobre a Empresa */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Apresentação / Sobre a Empresa
            </label>
            <textarea
              rows={2}
              value={landingData.aboutText}
              onChange={(e) => setLandingData({ ...landingData, aboutText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Catálogo de Serviços */}
          <div className="pt-2 border-t border-slate-700/60 space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Catálogo de Serviços / Diferenciais da Empresa:
            </label>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {landingData.services.map((serv, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-700/70 text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-200">{serv.title}</span>
                    {serv.description && (
                      <p className="text-[11px] text-slate-400">{serv.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {serv.price && (
                      <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {serv.price}
                      </span>
                    )}
                    <button
                      onClick={() => handleRemoveService(index)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remover serviço"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Adicionar novo serviço */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Novo serviço (Ex: Barba Terapia)"
                value={newServiceTitle}
                onChange={(e) => setNewServiceTitle(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="R$ 45"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
                className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 text-center"
              />
              <button
                onClick={handleAddService}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vincular à Placa NFC do Lote */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Vincular esta Landing Page a uma Placa do Lote
              </span>
              {assignedSuccess && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Placa vinculada com sucesso!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <select
                value={selectedPlateId}
                onChange={(e) => setSelectedPlateId(e.target.value)}
                className="w-full sm:w-auto flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-medium"
              >
                {plates.map((p) => (
                  <option key={p.id} value={p.id}>
                    Placa #{formatSerial(p.serial)} · {p.clientName || `Em Estoque (${p.code})`}
                  </option>
                ))}
              </select>

              <button
                onClick={handleLinkToPlate}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
              >
                Vincular Domínio à Placa
              </button>
            </div>
          </div>
        </div>

        {/* Pré-Visualização da Landing Page (Mobile & Desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Controles de Dispositivo */}
          <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-1 text-xs">
            <div className="text-slate-400 font-mono flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Simulação Online</span>
            </div>

            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1 rounded flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  previewDevice === 'mobile'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Mobile"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1 rounded flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  previewDevice === 'desktop'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Desktop"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Web</span>
              </button>
            </div>
          </div>

          {/* Moldura do Dispositivo */}
          <div className="w-[340px] h-[640px] bg-slate-950 rounded-[36px] border-4 border-slate-700 shadow-2xl p-2.5 relative flex flex-col overflow-hidden">
            {/* Barra do Navegador com Domínio Próprio */}
            <div className="bg-slate-900 rounded-2xl px-3 py-1.5 mb-2 border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-[10px] text-slate-200 truncate">
                  https://{landingData.domain || 'www.suaempresa.com.br'}
                </span>
              </div>
              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                12M
              </span>
            </div>

            {/* Conteúdo da Landing Page */}
            <div className="flex-1 overflow-y-auto scrollbar-none px-2 space-y-4 text-center text-slate-100 pb-4">
              {/* Header Hero */}
              <div className="space-y-2 pt-2">
                <div className="w-16 h-16 rounded-full mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xl text-blue-400">
                    {landingData.businessName.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-100 tracking-tight leading-tight">
                    {landingData.businessName}
                  </h3>
                  <p className="text-[11px] text-blue-400 font-medium mt-0.5">{landingData.category}</p>
                  
                  {/* Google 5 Estrelas */}
                  <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">{landingData.rating}</span>
                    <span className="text-slate-400">({landingData.reviewCount} avaliações no Google)</span>
                  </div>
                </div>
              </div>

              {/* Chamada para Ação Principal: Avaliação Google */}
              <a
                href={landingData.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 hover:opacity-95 transition-all"
              >
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Nos Avalie 5 Estrelas no Google</span>
              </a>

              {/* Botão de Agendamento no WhatsApp */}
              <a
                href={`https://wa.me/55${landingData.whatsapp}?text=Ol%C3%A1,%20gostaria%20de%20um%20agendamento!`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar Diretamente no WhatsApp</span>
              </a>

              {/* Seção Sobre Nós */}
              {landingData.aboutText && (
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block">
                    Sobre Nós
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {landingData.aboutText}
                  </p>
                </div>
              )}

              {/* Catálogo de Serviços & Preços */}
              {landingData.services.length > 0 && (
                <div className="space-y-1.5 text-left pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Nossos Serviços & Valores
                  </span>
                  <div className="space-y-1.5">
                    {landingData.services.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="pr-2">
                          <span className="font-semibold text-slate-200 text-[11px] block">{s.title}</span>
                          {s.description && (
                            <span className="text-[10px] text-slate-400 block">{s.description}</span>
                          )}
                        </div>
                        {s.price && (
                          <span className="font-bold text-emerald-400 text-[11px] shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {s.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Endereço & Chave Pix */}
              <div className="pt-2 text-[10px] text-slate-400 space-y-1.5 border-t border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{landingData.address}</span>
                </div>
                {landingData.pixKey && (
                  <div className="text-slate-400">
                    Chave Pix Oficial: <code className="text-blue-300 font-mono">{landingData.pixKey}</code>
                  </div>
                )}
                <div className="text-[9px] text-slate-500 pt-1">
                  © {new Date().getFullYear()} {landingData.businessName} · Hospedado em Servidor Cloud
                </div>
              </div>
            </div>

            {/* Barra Inferior do Celular */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2 shrink-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingPageBuilder = BioSiteBuilder;
