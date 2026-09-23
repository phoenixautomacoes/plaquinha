import React from 'react';
import { 
  Layers, 
  Printer, 
  Repeat, 
  Smartphone, 
  Calculator, 
  Compass, 
  Send, 
  Star,
  Sparkles,
  Beer,
  KeyRound,
  LogOut,
  ExternalLink,
  Flame,
  Globe
} from 'lucide-react';

export type ActiveTab = 
  | 'plates' 
  | 'landing'
  | 'bar_niche'
  | 'print' 
  | 'proposals' 
  | 'google_helper' 
  | 'redirect_tester' 
  | 'biosite' 
  | 'calculator' 
  | 'street_guide';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  activeCount: number;
  stockCount: number;
  onLogout?: () => void;
  onChangePassword?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  activeCount,
  stockCount,
  onLogout,
  onChangePassword,
}) => {
  const tabs = [
    {
      id: 'plates' as ActiveTab,
      label: 'Gerenciador de Placas',
      badge: `${activeCount} ativas`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: Layers,
    },
    {
      id: 'bar_niche' as ActiveTab,
      label: 'Nichos (Odonto, Bares, Médicos)',
      icon: Sparkles,
      badge: 'Ticket R$ 350+',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'print' as ActiveTab,
      label: 'Gráfica 10×15 & Mockup',
      icon: Printer,
      badge: 'PNG 300 DPI',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'proposals' as ActiveTab,
      label: 'Propostas & WhatsApp',
      icon: Send,
      badge: 'Fechamento',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'google_helper' as ActiveTab,
      label: 'Link 5★ Google',
      icon: Star,
      badge: 'Extrator Oficial',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 'redirect_tester' as ActiveTab,
      label: 'Testador 302 No-Store',
      icon: Repeat,
      badge: 'NFC vs QR',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'biosite' as ActiveTab,
      label: 'Landing Page + Domínio (12m)',
      icon: Globe,
      badge: 'Recorrência Anual',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'calculator' as ActiveTab,
      label: 'Calculadora & Custos',
      icon: Calculator,
      badge: 'R$ 1,33/tag',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'street_guide' as ActiveTab,
      label: 'Pesquisa & Roteiro 30s',
      icon: Compass,
      badge: 'Guia de Rua',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Marca Operacional */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Flame className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-100 text-base sm:text-lg tracking-tight">
                  PHOENIX <span className="text-cyan-400">NFC PRO</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Painel Operacional
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Lote 001 (30 tags NTAG213) · Controle de estoque e placas inteligentes
              </p>
            </div>
          </div>

          {/* Ações de Segurança e Conta */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* Resumo de Estoque Rápido */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ativas: <strong className="text-emerald-400">{activeCount}</strong></span>
              <span className="text-slate-600">|</span>
              <span>Em Estoque: <strong className="text-amber-400">{stockCount}</strong></span>
            </div>

            {/* Botão para visualizar a Landing Page pública */}
            <button
              onClick={() => onTabChange('landing')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-blue-200 transition-colors font-semibold"
              title="Visualizar a Landing Page Pública Comercial (Visão do Cliente)"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Site Público</span>
            </button>

            {onChangePassword && (
              <button
                onClick={onChangePassword}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Alterar E-mail ou Senha de Acesso"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span>Senha</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 transition-colors font-semibold"
                title="Sair do Painel e Bloquear Acesso"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            )}
          </div>
        </div>

        {/* Abas */}
        <div className="flex overflow-x-auto scrollbar-none space-x-1 py-1 -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-button-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-t-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-blue-500 text-blue-400 bg-slate-800/70 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-normal ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
