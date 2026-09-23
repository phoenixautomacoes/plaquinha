import React, { useEffect, useState } from 'react';
import { Plate } from '../types';
import { recordScan } from '../utils/storage';
import { 
  CheckCircle2, 
  ExternalLink, 
  Smartphone, 
  Sparkles, 
  MessageCircle, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface PublicRedirectPageProps {
  plateCode: string;
  source: 'nfc' | 'qr' | 'test';
  onGoToDashboard: () => void;
}

export const PublicRedirectPage: React.FC<PublicRedirectPageProps> = ({
  plateCode,
  source,
  onGoToDashboard,
}) => {
  const [targetPlate, setTargetPlate] = useState<Plate | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(2);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const result = recordScan(plateCode, source);
    if (result.plate) {
      setTargetPlate(result.plate);
      if (result.redirectUrl) {
        setRedirectUrl(result.redirectUrl);
      }
    }
  }, [plateCode, source]);

  // Contagem regressiva e redirecionamento
  useEffect(() => {
    if (!redirectUrl) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!hasRedirected) {
      setHasRedirected(true);
      window.location.href = redirectUrl;
    }
  }, [redirectUrl, countdown, hasRedirected]);

  // Placa não encontrada ou em ativação
  if (!targetPlate || !targetPlate.destination) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Logo / Ícone */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 mx-auto p-1 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Placa em Ativação · Código: {plateCode}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100">
              Esta Placa NFC Está Quase Pronta!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Esta placa dinâmica inteligente de avaliação do Google ainda não foi vinculada a um estabelecimento.
            </p>
          </div>

          {/* Botão de WhatsApp para Ativar */}
          <div className="space-y-3 pt-2">
            <a
              href={`https://wa.me/?text=Ol%C3%A1,%20estou%20com%20a%20placa%20NFC%20c%C3%B3digo%20${plateCode}%20e%20quero%20ativar%20no%20meu%20estabelecimento!`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ativar Placa no WhatsApp</span>
            </a>

            <button
              onClick={onGoToDashboard}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              ← Acessar Painel de Controle Operacional
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Redirecionamento em andamento
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Ícone de Sucesso */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {source === 'nfc' ? '⚡ Aproximação NFC Confirmada' : '📷 Leitura QR Code Confirmada'}
          </span>
          <h2 className="text-xl font-black text-slate-100">
            {targetPlate.clientName || 'Estabelecimento Parceiro'}
          </h2>
          <p className="text-xs text-slate-400">
            Redirecionando para a avaliação oficial no Google em{' '}
            <strong className="text-amber-400 text-sm font-bold">{countdown}s</strong>...
          </p>
        </div>

        {/* Link Manual Direto */}
        <div className="pt-2">
          <a
            href={targetPlate.destination}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Toque Aqui para Abrir Agora</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={onGoToDashboard}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Abrir Painel Administrativo
          </button>
        </div>
      </div>
    </div>
  );
};
