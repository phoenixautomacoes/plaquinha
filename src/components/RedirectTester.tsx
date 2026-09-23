import React, { useState } from 'react';
import { 
  Repeat, 
  Smartphone, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Plate } from '../types';
import { getPlateRedirectUrl, formatSerial } from '../utils/codeGenerator';

interface RedirectTesterProps {
  plates: Plate[];
  onTriggerScan: (code: string, source: 'nfc' | 'qr') => void;
  onUpdatePlateDestination: (plateId: string, newDestination: string) => void;
}

export const RedirectTester: React.FC<RedirectTesterProps> = ({
  plates,
  onTriggerScan,
  onUpdatePlateDestination,
}) => {
  const [selectedPlateId, setSelectedPlateId] = useState<string>(plates[0]?.id || '');
  const [simulatedSource, setSimulatedSource] = useState<'nfc' | 'qr'>('nfc');
  const [testResult, setTestResult] = useState<{
    code: string;
    serial: number;
    destination: string;
    source: 'nfc' | 'qr';
    httpStatus: number;
    cacheControl: string;
    timestamp: string;
  } | null>(null);

  const selectedPlate = plates.find((p) => p.id === selectedPlateId) || plates[0];
  const [quickDestinationInput, setQuickDestinationInput] = useState(selectedPlate?.destination || '');

  // Sincroniza input quando troca de placa
  const handleSelectPlate = (plateId: string) => {
    setSelectedPlateId(plateId);
    const p = plates.find((item) => item.id === plateId);
    if (p) {
      setQuickDestinationInput(p.destination || '');
    }
  };

  const handleSimulateScan = (source: 'nfc' | 'qr') => {
    if (!selectedPlate) return;
    setSimulatedSource(source);
    onTriggerScan(selectedPlate.code, source);

    setTestResult({
      code: selectedPlate.code,
      serial: selectedPlate.serial,
      destination: selectedPlate.destination || 'https://sua-empresa.com/placa-em-ativacao',
      source,
      httpStatus: 302,
      cacheControl: 'no-store, no-cache, must-revalidate',
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  const handleApplyQuickDestination = () => {
    if (!selectedPlate) return;
    onUpdatePlateDestination(selectedPlate.id, quickDestinationInput);
    if (testResult) {
      setTestResult({
        ...testResult,
        destination: quickDestinationInput,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Box de Esclarecimento Estratégico (O que Claude tentou explicar, agora em forma de ferramenta real) */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-100 text-base">
              Por que o Redirecionador Dinâmico 302 é o coração do seu negócio?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Se você gravar o link direto do Google Maps na placa de acrílico, você nunca mais poderá alterá-lo.
              Com o <strong>nosso Redirecionador Dinâmico</strong>, a placa aponta para o seu código curto (ex:{' '}
              <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">r.placanfc.pro/A7K2</code>). 
              Quando o comerciante quiser trocar o link, mudar para uma Landing Page com domínio próprio e WhatsApp, ou pagar a mensalidade de gestão, 
              você altera o destino aqui no painel e <strong>muda instantaneamente para todos os celulares</strong>!
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> HTTP 302 Found (Temporário, sem cache)
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cache-Control: no-store (iPhone & Android não travam)
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Métricas separadas: NFC (?s=n) vs QR (?s=q)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bancada de Testes de Leitura */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Painel de Controle de Simulação */}
        <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 space-y-5">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Repeat className="w-4 h-4 text-blue-400" />
            <span>Simulador de Leitura no Balcão</span>
          </h4>

          {/* Selecionar Placa */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Escolha a Placa para Testar:
            </label>
            <select
              id="test-select-plate"
              value={selectedPlate?.id}
              onChange={(e) => handleSelectPlate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 font-medium"
            >
              {plates.map((p) => (
                <option key={p.id} value={p.id}>
                  #{formatSerial(p.serial)} · {p.clientName || 'Virgem em Estoque'} ({p.code})
                </option>
              ))}
            </select>
          </div>

          {/* Edição Rápida do Destino (Para testar troca em tempo real) */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Destino Dinâmico Atual:</span>
              <span className="text-[10px] font-mono text-blue-400">Código: {selectedPlate?.code}</span>
            </div>
            <input
              type="text"
              value={quickDestinationInput}
              onChange={(e) => setQuickDestinationInput(e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleApplyQuickDestination}
              className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Aplicar Novo Link Imediatamente</span>
            </button>
          </div>

          {/* Disparar Simulação */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-400">
              Disparar Leitura Simulada:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="simulate-nfc-btn"
                onClick={() => handleSimulateScan('nfc')}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all shadow-sm"
              >
                <Smartphone className="w-4 h-4" />
                <span>Simular Aproximação NFC (?s=n)</span>
              </button>

              <button
                id="simulate-qr-btn"
                onClick={() => handleSimulateScan('qr')}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 font-bold text-xs transition-all shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Simular Câmera QR (?s=q)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Console de Inspeção HTTP & Resposta em Tempo Real */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono text-xs space-y-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Console de Resposta HTTP do Servidor
            </span>
            {testResult && (
              <span className="text-[11px] text-slate-500">Último disparo: {testResult.timestamp}</span>
            )}
          </div>

          {testResult ? (
            <div className="space-y-3">
              {/* Requisição */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <div className="text-blue-400 font-bold">
                  GET /r/{testResult.code}?s={testResult.source} HTTP/1.1
                </div>
                <div className="text-slate-500">Host: r.placanfc.pro</div>
                <div className="text-slate-500">
                  User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15
                </div>
                <div className="text-slate-500">
                  Source: <strong className="text-amber-400">{testResult.source.toUpperCase()}</strong> (
                  {testResult.source === 'nfc' ? 'Tag NTAG213 Aproximada' : 'QRCode Lido na Câmera'})
                </div>
              </div>

              {/* Resposta HTTP 302 */}
              <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/30 text-emerald-300 space-y-1">
                <div className="font-bold flex items-center justify-between">
                  <span className="text-emerald-400">HTTP/1.1 302 Found</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    Redirecionamento Ativo
                  </span>
                </div>
                <div className="text-slate-300">
                  Location: <strong className="text-blue-300 break-all">{testResult.destination}</strong>
                </div>
                <div className="text-slate-400">
                  Cache-Control: <span className="text-amber-300">{testResult.cacheControl}</span>
                </div>
                <div className="text-slate-500">
                  Pragma: no-cache | Expires: 0
                </div>
              </div>

              {/* Botão de Teste Real no Navegador */}
              <div className="pt-2 flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
                <div className="text-slate-300 text-xs">
                  Placa #{formatSerial(testResult.serial)} apontando para o destino com sucesso.
                </div>
                <a
                  href={testResult.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold transition-colors"
                >
                  <span>Abrir Destino Real</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Smartphone className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
              <p>Clique em "Simular Aproximação NFC" ou "Simular Câmera QR" para inspecionar a resposta.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
