import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Check, 
  Copy, 
  Star, 
  MapPin, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Link as LinkIcon
} from 'lucide-react';
import { Plate } from '../types';
import { formatSerial } from '../utils/codeGenerator';

interface GoogleLinkHelperProps {
  plates: Plate[];
  onApplyLinkToPlate: (plateId: string, googleUrl: string, clientName: string) => void;
}

export const GoogleLinkHelper: React.FC<GoogleLinkHelperProps> = ({
  plates,
  onApplyLinkToPlate,
}) => {
  const [businessQuery, setBusinessQuery] = useState('');
  const [neighborhood, setNeighborhood] = useState('Porto Alegre');
  const [rawInputUrl, setRawInputUrl] = useState('');
  const [cleanedUrl, setCleanedUrl] = useState('');
  const [placeIdInput, setPlaceIdInput] = useState('');
  const [selectedPlateId, setSelectedPlateId] = useState(plates[0]?.id || '');
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Gera link de busca no Google Maps
  const handleOpenMapsSearch = () => {
    if (!businessQuery.trim()) return;
    const query = encodeURIComponent(`${businessQuery.trim()} ${neighborhood.trim()}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Abre a ferramenta oficial de Place ID do Google
  const handleOpenPlaceIdFinder = () => {
    window.open('https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder', '_blank');
  };

  // Processa link ou Place ID
  const handleProcessUrl = () => {
    let result = '';

    if (placeIdInput.trim()) {
      // Formato oficial 5 estrelas direto:
      result = `https://search.google.com/local/writereview?placeid=${placeIdInput.trim()}`;
    } else if (rawInputUrl.trim()) {
      let input = rawInputUrl.trim();

      // Se o usuário colou um link do Google Maps com coordenadas ou compartilhado
      if (input.includes('placeid=')) {
        result = input;
      } else if (input.includes('g.page') && !input.includes('/review')) {
        result = `${input}/review`;
      } else {
        result = input;
      }
    }

    setCleanedUrl(result);
  };

  const handleApplyToPlate = () => {
    if (!selectedPlateId || !cleanedUrl) return;
    onApplyLinkToPlate(selectedPlateId, cleanedUrl, businessQuery || 'Cliente Google');
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  const handleCopyLink = () => {
    if (!cleanedUrl) return;
    navigator.clipboard.writeText(cleanedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Box de Apoio ao Rodrigo */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-100 text-base">
              Extrator de Link Oficial de 5 Estrelas do Google
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Muitos donos de comércio não sabem enviar o link que abre direto a caixinha de 5 estrelas — eles costumam mandar o link da rota ou da fachada. 
              Use esta ferramenta para pegar o link perfeito que <strong>já abre a janela de avaliação pronta para o cliente digitar</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Ferramentas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Passo a Passo Rápido */}
        <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-700 pb-3">
            <Search className="w-4 h-4 text-blue-400" />
            <span>Passo 1: Localizar o Comércio no Google Maps</span>
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Estabelecimento
              </label>
              <input
                type="text"
                placeholder="Ex: Barba Negra Petrópolis"
                value={businessQuery}
                onChange={(e) => setBusinessQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cidade / Bairro
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleOpenMapsSearch}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Abrir Busca no Maps</span>
              </button>

              <button
                type="button"
                onClick={handleOpenPlaceIdFinder}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Place ID Oficial Google</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700 text-xs text-slate-400 space-y-1">
            <strong className="text-slate-200 block">Como o comerciante pega no celular dele:</strong>
            <p>
              1. Ele abre o app do Google Maps e clica na foto de perfil dele.<br />
              2. Clica em <em>"Perfil da Empresa"</em>.<br />
              3. Rola até <em>"Solicitar avaliações"</em> e clica em <em>"Compartilhar link"</em>.
            </p>
          </div>
        </div>

        {/* Gerador & Vinculador */}
        <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-700 pb-3">
            <LinkIcon className="w-4 h-4 text-emerald-400" />
            <span>Passo 2: Converter e Aplicar na Placa</span>
          </h4>

          {/* Opção 1: Colar link qualquer */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Opção A: Cole o Link compartilhado pelo cliente
            </label>
            <input
              type="text"
              placeholder="https://maps.app.goo.gl/... ou https://g.page/..."
              value={rawInputUrl}
              onChange={(e) => setRawInputUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          {/* Opção 2: Place ID direto */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Opção B: Ou cole o Place ID (Ex: ChIJ...)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
                value={placeIdInput}
                onChange={(e) => setPlaceIdInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                type="button"
                onClick={handleProcessUrl}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                Gerar Link
              </button>
            </div>
          </div>

          {/* Link Pronto e Vinculação */}
          {cleanedUrl && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Link Pronto de 5 Estrelas
                </span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 break-all">
                {cleanedUrl}
              </div>

              {/* Vincular com 1 clique à placa do lote */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Vincular imediatamente à placa:
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedPlateId}
                    onChange={(e) => setSelectedPlateId(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
                  >
                    {plates.map((p) => (
                      <option key={p.id} value={p.id}>
                        Placa #{formatSerial(p.serial)} · {p.clientName || 'Virgem em Estoque'} ({p.code})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleApplyToPlate}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shrink-0"
                  >
                    {appliedSuccess ? 'Vinculada!' : 'Gravar Destino'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
