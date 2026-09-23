import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft, ArrowRight, Flame } from 'lucide-react';
import { loginAdmin } from '../utils/auth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    try {
      const ok = await loginAdmin(email, password);
      if (ok) {
        onSuccess();
      } else {
        setError('E-mail ou senha incorretos. Verifique suas credenciais.');
      }
    } catch {
      setError('Ocorreu um erro ao validar o acesso.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10">
        
        {/* Glow Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Topo / Logotipo */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-blue-500/20">
            <Flame className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Área Restrita · Phoenix Automações</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Acesso Administrativo
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Informe suas credenciais para desbloquear o painel operacional.
            </p>
          </div>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 relative z-10">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              E-mail de Administrador
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                autoFocus
                placeholder="seu-email@dominio.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 p-0.5"
                title={showPassword ? 'Ocultar senha' : 'Ver senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Validando...</span>
            ) : (
              <>
                <span>Desbloquear Painel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Botão Voltar para o Site */}
        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a Landing Page</span>
          </button>
        </div>

      </div>
    </div>
  );
};
