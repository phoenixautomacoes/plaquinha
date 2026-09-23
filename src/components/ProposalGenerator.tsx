import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Copy, 
  Check, 
  DollarSign, 
  Smartphone, 
  Layers, 
  Percent, 
  CheckCircle2, 
  MessageCircle, 
  Building2,
  Printer,
  Sparkles
} from 'lucide-react';
import { Plate } from '../types';

interface ProposalGeneratorProps {
  plates: Plate[];
}

export const ProposalGenerator: React.FC<ProposalGeneratorProps> = ({ plates }) => {
  const [senderName, setSenderName] = useState('Phoenix Automações');
  const [clientName, setClientName] = useState('');
  const [contactName, setContactName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [category, setCategory] = useState('Salão de Beleza');
  const [neighborhood, setNeighborhood] = useState('');
  const [packageType, setPackageType] = useState<'single' | 'combo' | 'biosite' | 'b2b'>('single');
  const [customPrice, setCustomPrice] = useState('119');
  const [copied, setCopied] = useState(false);

  // Atualiza preço sugerido ao trocar pacote
  const handlePackageChange = (type: 'single' | 'combo' | 'biosite' | 'b2b') => {
    setPackageType(type);
    if (type === 'single') setCustomPrice('119');
    if (type === 'combo') setCustomPrice('249');
    if (type === 'biosite') setCustomPrice('497');
    if (type === 'b2b') setCustomPrice('79'); // Unitário no lote de 10
  };

  // Texto da proposta para WhatsApp
  const generateWhatsAppMessage = () => {
    const saudacao = contactName ? `Olá, ${contactName}!` : 'Olá!';
    const empresa = clientName ? ` da *${clientName}*` : '';
    const remitente = senderName.trim() || 'Phoenix Automações';
    const regiao = neighborhood.trim() ? ` aqui em ${neighborhood.trim()}` : '';

    if (packageType === 'single') {
      return `${saudacao} Aqui é da *${remitente}*, especialistas em tecnologia e posicionamento no Google${regiao}.

Conforme conversamos${empresa}, segue a proposta da **Placa Inteligente de Avaliação do Google (NFC + QR Code)**:

⭐ **O que está incluso:**
• 1 Placa em acrílico/PVC premium 10×15 cm para balcão
• Tecnologia NFC (aproximação do celular) + QR Code de alta precisão
• Configuração completa apontando direto para a tela de 5 estrelas do seu perfil no Google
• Testada no local e pronta para uso imediato
• Sem mensalidade obrigatória (placa 100% sua)

💰 **Investimento:** R$ ${customPrice} (à vista no Pix ou no cartão)
⏱️ **Prazo de entrega:** Pronta entrega / configurada imediatamente

Quem tem mais avaliações recentes aparece em 1º lugar nas buscas${regiao || ' no bairro'}. Posso separar a sua unidade agora?`;
    }

    if (packageType === 'combo') {
      return `${saudacao} Aqui é da *${remitente}*! Segue a proposta do **Combo Estratégico 3 Placas Google** para a *${clientName || 'sua empresa'}*:

🎯 **Por que 3 placas?**
• 1 Placa no Caixa / Balcão principal
• 1 Placa na mesa de atendimento / espera
• 1 Placa na saída ou vitrine

⭐ **O que está incluso:**
• 3 Placas personalizadas com NFC + QR Code
• Configuração e testes em todos os aparelhos
• Suporte na entrega

💰 **Investimento Especial do Combo:** De ~R$ 357~ por apenas **R$ ${customPrice}** (Economia de R$ 108!)
Parcelamento facilitado no cartão.

Podemos fechar para entrega esta semana?`;
    }

    if (packageType === 'biosite') {
      return `${saudacao} Segue a proposta completa da *${remitente}* do **Combo Presença Digital (Placa NFC + Landing Page Profissional com Domínio Próprio e Servidor 12 Meses)** para a *${clientName || 'sua empresa'}*:

🚀 **O que está incluso na entrega:**
1. **Placa Inteligente NFC + QR Code de Balcão:** O cliente aproxima o celular e acessa imediatamente o seu site oficial.
2. **Landing Page Profissional Exclusiva de Alta Conversão:**
   • Registro de **Domínio Próprio** (ex: *www.suaempresa.com.br*)
   • **Hospedagem em Servidor Cloud dedicado inclusa por 12 meses**
   • Botão flutuante de atendimento e agendamento direto no WhatsApp
   • Catálogo completo de serviços/produtos com preços e fotos
   • Seção institucional "Sobre Nós" e diferenciais
   • Botão de destaque: "Avalie 5 Estrelas no Google" integrado
   • Localização com mapa e chave Pix para pagamentos rápidos
3. **Certificado de Segurança SSL (HTTPS)** e carregamento ultrarrápido no celular.

💰 **Investimento de Implantação (Placa + Landing Page + Domínio + Servidor 12 Meses):** De ~R$ 897~ por apenas **R$ ${customPrice}** (Pix ou cartão).

🔄 **Recorrência / Manutenção Anual:** Somente após 12 meses, renovação de domínio + servidor em nuvem + suporte por apenas R$ 297/ano (ou R$ 49/mês) para manter o negócio sempre ativo no ar.

Vamos registrar o seu domínio e colocar sua Landing Page no ar esta semana?`;
    }

    // B2B Lote
    return `${saudacao} Tudo bem? Segue nossa proposta corporativa de **Placas NFC de Avaliação do Google para Redes e Parceiros**${empresa}:

📦 **Condições para Lote Corporativo:**
• A partir de 10 unidades: **R$ ${customPrice}/placa**
• Personalização individual por unidade/filial
• Links dinâmicos com painel de gerenciamento centralizado
• Entrega técnica e manual de instrução para a equipe de balcão

💰 **Investimento Lote (10 placas):** R$ ${(Number(customPrice) * 10).toLocaleString('pt-BR')} com nota e faturamento para empresa.

Fico à disposição para emitir o pedido de produção!`;
  };

  const messageText = generateWhatsAppMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    let cleanPhone = clientPhone.replace(/\D/g, '');
    if (cleanPhone.length >= 10 && !cleanPhone.startsWith('55')) {
      cleanPhone = `55${cleanPhone}`;
    }
    const encoded = encodeURIComponent(messageText);
    const url = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Fechamento Rápido no WhatsApp
            </span>
            <span className="text-xs text-slate-400">• Aumente a taxa de conversão em 40%</span>
          </div>
          <h3 className="text-base font-bold text-slate-100">
            Gerador de Propostas Comerciais & Orçamentos
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Depois da abordagem de 30 segundos no balcão, o comerciante costuma pedir: *"Me manda no WhatsApp que vou ver"*. 
            Envie imediatamente uma proposta estruturada e profissional antes que o interesse esfrie.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>
          <button
            onClick={handleOpenWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Enviar no WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Grid: Configuração da Proposta + Prévia Formatada */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Personalização */}
        <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-700 pb-3">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Dados do Comércio Visitado</span>
          </h4>

          {/* Selecionar Pacote */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Pacote Ofertado:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePackageChange('single')}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                  packageType === 'single'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 ring-1 ring-blue-500'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                1 Placa Unitária
                <span className="block text-[10px] font-normal text-slate-400">R$ 119 no balcão</span>
              </button>

              <button
                type="button"
                onClick={() => handlePackageChange('combo')}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                  packageType === 'combo'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Combo 3 Placas
                <span className="block text-[10px] font-normal text-slate-400">R$ 249 (Desconto)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePackageChange('biosite')}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                  packageType === 'biosite'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300 ring-1 ring-purple-500'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Placa + Landing Page (12m)
                <span className="block text-[10px] font-normal text-slate-400">R$ 497 (Domínio + Recorrência)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePackageChange('b2b')}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                  packageType === 'b2b'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lote B2B / Redes
                <span className="block text-[10px] font-normal text-slate-400">A partir de 10un</span>
              </button>
            </div>
          </div>

          {/* Dados do Remetente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 border-b border-slate-700/60">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Seu Nome / Sua Empresa
              </label>
              <input
                type="text"
                placeholder="Ex: Phoenix Automações"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Sua Cidade / Região
              </label>
              <input
                type="text"
                placeholder="Ex: Porto Alegre / Centro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Nome da Empresa e Contato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome da Empresa do Cliente
              </label>
              <input
                type="text"
                placeholder="Ex: Barbearia Modelo"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Dono/Decisor
              </label>
              <input
                type="text"
                placeholder="Ex: Carlos"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* WhatsApp do Cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp com DDD
              </label>
              <input
                type="text"
                placeholder="51999998888"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Valor da Proposta (R$)
              </label>
              <input
                type="text"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Visualizador da Mensagem Formatada para WhatsApp */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Prévia da Mensagem (Formato WhatsApp)
            </span>
            <span className="text-[11px] text-slate-500">Pronto para envio</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0b141a] border border-emerald-950 text-slate-100 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
            {messageText}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Dica: envie nos primeiros 10 minutos após sair do comércio.
            </span>
            <button
              onClick={handleOpenWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Abrir Conversa no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
