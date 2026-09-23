import { Plate, Batch, ScanRecord, MarketSurveyEntry } from '../types';
import { generateSafeCode, formatSerial } from './codeGenerator';

const STORAGE_KEYS = {
  PLATES: 'placanfc_plates_v4',
  BATCHES: 'placanfc_batches_v4',
  SCANS: 'placanfc_scans_v4',
  SURVEYS: 'placanfc_surveys_v4',
};

export const DEFAULT_BOTECO_GOOGLE_URL =
  'https://www.google.com/search?sca_esv=f0da1ac9b7a45388&rlz=1C1OZZY_pt-PTBR1231BR1231&sxsrf=APpeQnvFCuu22XnPXCsWdDrd9HHEvQmPfQ:1790034844859&q=avalia%C3%A7%C3%B5es+sobre+boteko+andradas&uds=AJ5uw1_GNdSQSJLyVA2iSC3uD_n-qlnlJnVycLtbZhkImLAUfPF1muOHwxQaLdHozO3w_kt-zudfzxXD6K5s40ldE3KQvmWdX6yzGPbRDe205mROxY4GsDl3nuMjwnoSKR4rKqCY8MlC2njsEQiH0zwQGEirMF6sBJ1aNP-aKDctND0amtTghyY5NWRtXMQhGAXfp-9HNDS5RO1ndwygd7eSGqn3x0bpAJr91LbDA2lMKQCIeZQH5JssQSIR_r4oTOIXlkOwYGxqvDLo3fPRg4ZHkEYpNXOMAXqCDO-eKW8lzGdhbmnsGbOp7hO8zEfTnIsgl9o5wMD8Nw-akmRRYDm_1ThHjmbsdNQwSaEHj6XaBR4hjHO18ivrt96KXqwda1d8p34HO9POo6hd9Sc7DFV3YGFhu1L7R1EuejMw2-8BAAmcHwXj3QcLfrt6Jjp996CXZE1OMgvVU2N8kIeI4U6FQv0zeLeyAgYgzbFA9kXwoBI9MjnRhQ4gjNp0S6zFmFnNLJq0hjWUz2jAeTH0cBmK7n2CpcKFmJ7qDjFyvmo2h-A1nIyuung&si=APenkKnzv9m99ToiohAuzpadUwbOz34nZJ3j2Ukmo5XOUYWApqEKXTG6jKPRF0TJn01qhEhiA8qLOzjpyYgSICUpo1Nmui0lcUumZ6pFjouXwy1dIPBVN24lpU8yLbE5rjNp9RLcg2I6OFx9SUz00jyTetWeb5PHmw%3D%3D&sa=X&ved=2ahUKEwjfu8C474CXAxUuqJUCHR22AK0Qk8gLegQIHRAB&ictx=1&biw=360&bih=680&dpr=2#ebo=3';

// Semente inicial de 30 placas (Placa 0001 ativa no Boteco Andradas e 29 virgens em estoque)
function createInitialSeed(): { plates: Plate[]; batches: Batch[]; surveys: MarketSurveyEntry[] } {
  const batchId = 'batch-001';
  const initialBatch: Batch = {
    id: batchId,
    label: 'Lote 001 - Estoque Inicial (30 unidades NTAG213)',
    size: 30,
    unitCost: 22.83, // R$ 1,33 tag + R$ 3,00 PVC + R$ 4,00 impressão + R$ 1,50 laminação + R$ 4,00 suporte + R$ 9 deslocamento rateado
    createdAt: new Date().toISOString(),
    status: 'ready',
  };

  const generatedCodes = new Set<string>();
  const plates: Plate[] = [];

  for (let s = 1; s <= 30; s++) {
    const formattedSerial = formatSerial(s);

    if (s === 1) {
      const code = '7CXG';
      generatedCodes.add(code);
      plates.push({
        id: `plate-${formattedSerial}`,
        code,
        serial: s,
        batchId,
        clientName: 'Boteco Andradas',
        companyCategory: 'Restaurante / Bar',
        neighborhood: 'Centro',
        destination: DEFAULT_BOTECO_GOOGLE_URL,
        status: 'active',
        notes: 'Placa piloto ativada no balcão do Boteco Andradas.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        scansCountNfc: 0,
        scansCountQr: 0,
        salePrice: 197,
        monthlyPlanActive: false,
        linkMode: 'direct',
      });
      continue;
    }

    let code = generateSafeCode(4);
    while (generatedCodes.has(code)) code = generateSafeCode(4);
    generatedCodes.add(code);

    plates.push({
      id: `plate-${formattedSerial}`,
      code,
      serial: s,
      batchId,
      clientName: '',
      companyCategory: '',
      neighborhood: '',
      destination: '', // Em estoque aguardando ativação
      status: 'stock',
      notes: 'Placa virgem pronta para ser gravada via NFC Tools ou QR Code e vinculada a um cliente.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scansCountNfc: 0,
      scansCountQr: 0,
      salePrice: 119,
      monthlyPlanActive: false,
    });
  }

  // Nenhuma prospecção realizada ainda (início limpo para registro real em campo)
  const surveys: MarketSurveyEntry[] = [];

  return { plates, batches: [initialBatch], surveys };
}

export function loadPlates(): Plate[] {
  try {
    let data = localStorage.getItem(STORAGE_KEYS.PLATES);
    if (!data) {
      const prevData = localStorage.getItem('placanfc_plates_v3');
      if (prevData) {
        data = prevData;
      }
    }
    if (!data) {
      const seed = createInitialSeed();
      localStorage.setItem(STORAGE_KEYS.PLATES, JSON.stringify(seed.plates));
      localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(seed.batches));
      localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify(seed.surveys));
      return seed.plates;
    }
    const parsed: Plate[] = JSON.parse(data);
    let changed = false;
    const migrated = parsed.map((p) => {
      let dest = p.destination;
      let clientName = p.clientName;
      let status = p.status;
      let salePrice = p.salePrice !== undefined ? p.salePrice : 119;

      // Se for a placa #0001 ou com código 7CXG ou com nome Boteco Andradas, assegura o link real do Google
      if (p.serial === 1 || p.code === '7CXG' || (p.clientName && p.clientName.toLowerCase().includes('boteco'))) {
        if (!dest || dest.trim() === '') {
          dest = DEFAULT_BOTECO_GOOGLE_URL;
          changed = true;
        }
        if (!clientName || clientName.trim() === '') {
          clientName = 'Boteco Andradas';
          changed = true;
        }
        if (p.status === 'stock') {
          status = 'active';
          changed = true;
        }
        if (p.salePrice === undefined || p.salePrice === 119) {
          salePrice = 197;
          changed = true;
        }
      }

      const effectiveLinkMode = p.linkMode || (dest && dest.trim() ? 'direct' : 'dynamic');
      if (effectiveLinkMode !== p.linkMode) {
        changed = true;
      }

      return {
        ...p,
        clientName,
        destination: dest,
        status,
        salePrice,
        linkMode: effectiveLinkMode,
      };
    });

    if (changed) {
      localStorage.setItem(STORAGE_KEYS.PLATES, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return createInitialSeed().plates;
  }
}

export function savePlates(plates: Plate[]): void {
  localStorage.setItem(STORAGE_KEYS.PLATES, JSON.stringify(plates));
}

export function loadBatches(): Batch[] {
  try {
    let data = localStorage.getItem(STORAGE_KEYS.BATCHES);
    if (!data) {
      data = localStorage.getItem('placanfc_batches_v3');
    }
    if (!data) return createInitialSeed().batches;
    return JSON.parse(data);
  } catch {
    return createInitialSeed().batches;
  }
}

export function saveBatches(batches: Batch[]): void {
  localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches));
}

export function loadSurveys(): MarketSurveyEntry[] {
  try {
    let data = localStorage.getItem(STORAGE_KEYS.SURVEYS);
    if (!data) {
      data = localStorage.getItem('placanfc_surveys_v3');
    }
    if (!data) return createInitialSeed().surveys;
    return JSON.parse(data);
  } catch {
    return createInitialSeed().surveys;
  }
}

export function saveSurveys(surveys: MarketSurveyEntry[]): void {
  localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify(surveys));
}

export function recordScan(code: string, source: 'nfc' | 'qr' | 'test'): { plate?: Plate; redirectUrl?: string } {
  const plates = loadPlates();
  const plateIndex = plates.findIndex((p) => p.code.toUpperCase() === code.toUpperCase());

  if (plateIndex === -1) return {};

  const plate = plates[plateIndex];
  if (source === 'nfc') {
    plate.scansCountNfc = (plate.scansCountNfc || 0) + 1;
  } else if (source === 'qr') {
    plate.scansCountQr = (plate.scansCountQr || 0) + 1;
  }
  plate.updatedAt = new Date().toISOString();

  plates[plateIndex] = plate;
  savePlates(plates);

  return { plate, redirectUrl: plate.destination };
}

/**
 * Restaura o estado inicial do sistema com 30 placas virgens em estoque e 0 prospecções
 */
export function resetToEmptyState(): { plates: Plate[]; batches: Batch[]; surveys: MarketSurveyEntry[] } {
  const seed = createInitialSeed();
  localStorage.setItem(STORAGE_KEYS.PLATES, JSON.stringify(seed.plates));
  localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(seed.batches));
  localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify(seed.surveys));
  localStorage.removeItem(STORAGE_KEYS.SCANS);
  return seed;
}

