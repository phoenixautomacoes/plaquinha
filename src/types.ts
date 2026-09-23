export type PlateStatus = 'stock' | 'active' | 'paused' | 'returned';

export type ScanSource = 'nfc' | 'qr' | 'test' | 'unknown';

export interface ScanRecord {
  id: string;
  plateId: string;
  plateCode: string;
  timestamp: string;
  source: ScanSource;
  device?: string;
}

export interface Plate {
  id: string;
  code: string; // Ex: A7K2 (usado na URL)
  serial: number; // Ex: 0001 (impresso fisicamente)
  batchId: string;
  clientName?: string;
  companyCategory?: string;
  phone?: string;
  neighborhood?: string;
  destination: string; // URL final (Google Avaliações ou BioSite)
  status: PlateStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  scansCountNfc: number;
  scansCountQr: number;
  salePrice?: number; // Valor negociado / venda da placa física (R$)
  monthlyPlanActive?: boolean;
  monthlyPlanPrice?: number;
  linkMode?: 'direct' | 'dynamic'; // 'direct' = QR e NFC usam direto o link do Google/cliente, 'dynamic' = Phoenix 302
  customNfcUrl?: string;
  customQrUrl?: string;
}

export interface Batch {
  id: string;
  label: string; // Ex: "Lote 001 - Piloto 30un Porto Alegre"
  size: number;
  unitCost: number; // R$ apurado
  createdAt: string;
  status: 'planning' | 'in_production' | 'ready';
}

export interface LandingPageData {
  businessName: string;
  category: string;
  rating: string;
  reviewCount: number;
  googleReviewUrl: string;
  whatsapp: string;
  instagram: string;
  address: string;
  pixKey?: string;
  aboutText: string;
  services: { title: string; price?: string; description?: string }[];
  accentColor: string;
  // Domínio Próprio, Servidor 12 Meses e Recorrência
  domain?: string; // Ex: www.studiobellanail.com.br
  serverDurationMonths?: number; // 12 meses
  activatedAt?: string; // Data de ativação
  expiresAt?: string; // Data de expiração (após 12 meses)
  recurrencePrice?: number; // Valor de renovação (ex: 297/ano ou 49/mês)
  recurrencePeriod?: 'annual' | 'monthly';
  recurrenceStatus?: 'active' | 'pending_renewal' | 'expired';
}

export type BioSiteData = LandingPageData;

export interface MarketSurveyEntry {
  id: string;
  businessName: string;
  category: string;
  neighborhood: string;
  currentReviewsCount: number;
  asksForReviews: string;
  hasBeenApproached: boolean;
  competitorPriceReported?: string;
  wouldHelpHim: boolean;
  guessedPrice: number;
  decisionMaker: string;
  interestedInSignal: boolean;
  notes: string;
  date: string;
}
