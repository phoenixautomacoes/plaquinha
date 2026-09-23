import React, { useState, useEffect } from 'react';
import { Navigation, ActiveTab } from './components/Navigation';
import { PlatesManager } from './components/PlatesManager';
import { NicheModelsView } from './components/NicheModelsView';
import { PlatePrintView } from './components/PlatePrintView';
import { ProposalGenerator } from './components/ProposalGenerator';
import { GoogleLinkHelper } from './components/GoogleLinkHelper';
import { RedirectTester } from './components/RedirectTester';
import { BioSiteBuilder } from './components/BioSiteBuilder';
import { FinancialCalculator } from './components/FinancialCalculator';
import { FieldScriptGuide } from './components/FieldScriptGuide';
import { PublicRedirectPage } from './components/PublicRedirectPage';
import { LandingPageView } from './components/LandingPageView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { Plate } from './types';
import { loadPlates, savePlates, recordScan, resetToEmptyState } from './utils/storage';
import { checkIsAdminAuthenticated, logoutAdmin } from './utils/auth';
import confetti from 'canvas-confetti';

function checkIsPrivacyUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const searchParams = new URLSearchParams(window.location.search);
  const p = (searchParams.get('p') || '').toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    p === 'privacidade' ||
    p === 'politica-de-privacidade' ||
    p === 'privacy' ||
    path.includes('/politica-de-privacidade') ||
    path.includes('/privacidade')
  );
}

export default function App() {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('plates');
  const [selectedPrintPlateId, setSelectedPrintPlateId] = useState<string>('');
  
  // Parâmetros de rota dinâmica caso a URL contenha ?r=CODIGO
  const [publicRouteCode, setPublicRouteCode] = useState<string | null>(null);
  const [publicRouteSource, setPublicRouteSource] = useState<'nfc' | 'qr' | 'test'>('test');

  // Autenticação e telas públicas
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkIsAdminAuthenticated());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
  const [isPrivacyPage, setIsPrivacyPage] = useState<boolean>(() => checkIsPrivacyUrl());

  useEffect(() => {
    // Carrega placas salvas
    const loaded = loadPlates();
    setPlates(loaded);
    if (loaded.length > 0) {
      setSelectedPrintPlateId(loaded[0].id);
    }

    // Checa parâmetros de URL para redirecionamento público
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const rCode = searchParams.get('r');
      const sourceParam = searchParams.get('s');
      const pageParam = searchParams.get('p');

      if (rCode) {
        setPublicRouteCode(rCode.toUpperCase());
        if (sourceParam === 'nfc') setPublicRouteSource('nfc');
        else if (sourceParam === 'qr') setPublicRouteSource('qr');
        else setPublicRouteSource('test');
      } else if (pageParam === 'admin') {
        if (checkIsAdminAuthenticated()) {
          setIsAuthenticated(true);
          setActiveTab('plates');
        } else {
          setIsLoginModalOpen(true);
        }
      } else if (pageParam === 'landing') {
        setActiveTab('landing');
      } else if (checkIsPrivacyUrl()) {
        setIsPrivacyPage(true);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setIsPrivacyPage(checkIsPrivacyUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleUpdatePlate = (updated: Plate) => {
    const newPlates = plates.map((p) => (p.id === updated.id ? updated : p));
    setPlates(newPlates);
    savePlates(newPlates);

    // Efeito visual quando uma placa é ativada com sucesso
    if (updated.status === 'active') {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleAddNewPlate = (newPlate: Plate) => {
    const newPlates = [newPlate, ...plates];
    setPlates(newPlates);
    savePlates(newPlates);
  };

  const handleSelectForPrint = (plate: Plate) => {
    setSelectedPrintPlateId(plate.id);
    setActiveTab('print');
  };

  const handleTriggerScan = (code: string, source: 'nfc' | 'qr') => {
    recordScan(code, source);
    const updated = loadPlates();
    setPlates(updated);
  };

  const handleUpdatePlateDestination = (plateId: string, newDestination: string) => {
    const target = plates.find((p) => p.id === plateId);
    if (!target) return;

    const updated: Plate = {
      ...target,
      destination: newDestination.trim(),
      linkMode: newDestination.trim() ? 'direct' : target.linkMode,
      status: newDestination.trim() ? 'active' : 'stock',
      updatedAt: new Date().toISOString(),
    };
    handleUpdatePlate(updated);
  };

  const handleAssignBioSiteToPlate = (plateId: string, bioSiteUrl: string, clientName: string) => {
    const target = plates.find((p) => p.id === plateId);
    if (!target) return;

    const updated: Plate = {
      ...target,
      destination: bioSiteUrl,
      linkMode: 'direct',
      clientName,
      status: 'active',
      notes: (target.notes ? `${target.notes} | ` : '') + 'Landing Page com Domínio e Servidor 12m (Recorrência Anual)',
      updatedAt: new Date().toISOString(),
    };
    handleUpdatePlate(updated);
  };

  const handleApplyGoogleLinkToPlate = (plateId: string, googleUrl: string, clientName: string) => {
    const target = plates.find((p) => p.id === plateId);
    if (!target) return;

    const updated: Plate = {
      ...target,
      destination: googleUrl,
      linkMode: 'direct',
      clientName: clientName !== 'Cliente Google' ? clientName : target.clientName || 'Cliente Google',
      status: 'active',
      updatedAt: new Date().toISOString(),
    };
    handleUpdatePlate(updated);
  };

  const handleResetData = () => {
    const fresh = resetToEmptyState();
    setPlates(fresh.plates);
    if (fresh.plates.length > 0) {
      setSelectedPrintPlateId(fresh.plates[0].id);
    }
  };

  const handleOpenAdminFromLanding = () => {
    if (isAuthenticated) {
      setActiveTab('plates');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    setActiveTab('plates');
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setActiveTab('landing');
  };

  const handleOpenPrivacy = () => {
    setIsPrivacyPage(true);
    window.history.pushState({}, '', '?p=privacidade');
  };

  const handleClosePrivacy = () => {
    setIsPrivacyPage(false);
    const newUrl = window.location.pathname.replace(/\/(politica-de-privacidade|privacidade|privacy)/i, '') || '/';
    window.history.pushState({}, '', newUrl);
    if (!isAuthenticated) {
      setActiveTab('landing');
    }
  };

  // Se a página foi aberta por um toque na placa ou leitura de QR (?r=CODIGO)
  if (publicRouteCode) {
    return (
      <PublicRedirectPage
        plateCode={publicRouteCode}
        source={publicRouteSource}
        onGoToDashboard={() => {
          setPublicRouteCode(null);
          if (isAuthenticated) setActiveTab('plates');
          else setActiveTab('landing');
        }}
      />
    );
  }

  // Se a página atual for a Política de Privacidade (?p=privacidade ou /politica-de-privacidade)
  if (isPrivacyPage) {
    return (
      <PrivacyPolicyView
        onBack={handleClosePrivacy}
      />
    );
  }

  // Se NÃO estiver autenticado OU a aba selecionada for a Landing Page
  if (!isAuthenticated || activeTab === 'landing') {
    return (
      <>
        <LandingPageView
          onGoToDashboard={handleOpenAdminFromLanding}
          onOpenPrivacy={handleOpenPrivacy}
        />
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  const activeCount = plates.filter((p) => p.status === 'active').length;
  const stockCount = plates.filter((p) => p.status === 'stock').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Navegação Superior */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeCount={activeCount}
        stockCount={stockCount}
        onLogout={handleLogout}
        onChangePassword={() => setIsChangePasswordOpen(true)}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'plates' && (
          <PlatesManager
            plates={plates}
            onUpdatePlate={handleUpdatePlate}
            onAddNewPlate={handleAddNewPlate}
            onSelectForPrint={handleSelectForPrint}
            onResetData={handleResetData}
          />
        )}

        {activeTab === 'bar_niche' && (
          <NicheModelsView plates={plates} />
        )}

        {activeTab === 'print' && (
          <PlatePrintView
            plates={plates}
            selectedPlateId={selectedPrintPlateId}
            onSelectPlate={(id) => setSelectedPrintPlateId(id)}
            onUpdatePlate={handleUpdatePlate}
          />
        )}

        {activeTab === 'proposals' && (
          <ProposalGenerator plates={plates} />
        )}

        {activeTab === 'google_helper' && (
          <GoogleLinkHelper
            plates={plates}
            onApplyLinkToPlate={handleApplyGoogleLinkToPlate}
          />
        )}

        {activeTab === 'redirect_tester' && (
          <RedirectTester
            plates={plates}
            onTriggerScan={handleTriggerScan}
            onUpdatePlateDestination={handleUpdatePlateDestination}
          />
        )}

        {activeTab === 'biosite' && (
          <BioSiteBuilder
            plates={plates}
            onAssignToPlate={handleAssignBioSiteToPlate}
          />
        )}

        {activeTab === 'calculator' && <FinancialCalculator />}

        {activeTab === 'street_guide' && <FieldScriptGuide />}
      </main>

      {/* Rodapé Operacional */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-4 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Phoenix Automações · Operação PHOENIX NFC PRO · Lote Inicial 30un NTAG213</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleOpenPrivacy}
              className="hover:text-blue-400 transition-colors underline decoration-slate-700 underline-offset-2"
            >
              Política de Privacidade
            </button>
            <span>•</span>
            <span>Redirecionamento 302 No-Store</span>
            <span>•</span>
            <span>Esteira: Placa R$ 119 → Landing Page + Domínio R$ 497 → Perfil Google R$ 497 → Recorrência R$ 297/ano</span>
          </div>
        </div>
      </footer>

      {/* Modal de Alteração de Senha */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}
