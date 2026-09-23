// Alfabeto sem 0, O, 1, I, L (para evitar qualquer ambiguidade ao falar no telefone ou ler impresso)
export const SAFE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Formata o serial numérico com zeros à esquerda (ex: 1 -> "0001", 12 -> "0012")
 */
export function formatSerial(serial: number | string, digits = 4): string {
  const num = typeof serial === 'number' ? serial : parseInt(String(serial), 10);
  if (isNaN(num)) return String(serial);
  return String(num).padStart(digits, '0');
}

/**
 * Gera um código alfanumérico seguro e não sequencial (Ex: A7K2, 9M4R, K3P8)
 */
export function generateSafeCode(length = 4): string {
  let result = '';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += SAFE_ALPHABET[array[i] % SAFE_ALPHABET.length];
  }
  return result;
}

export const CUSTOM_BASE_URL_STORAGE_KEY = 'placanfc_custom_base_url';

/**
 * Retorna a URL base do redirecionador da aplicação
 */
export function getBaseRedirectUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(CUSTOM_BASE_URL_STORAGE_KEY);
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/+$/, '');
    }
    return `${window.location.origin}`;
  }
  return 'https://r.placanfc.pro';
}

/**
 * Define uma URL base customizada para o domínio do sistema
 */
export function setCustomBaseUrl(url: string): void {
  if (typeof window !== 'undefined') {
    const cleanUrl = url.trim().replace(/\/+$/, '');
    localStorage.setItem(CUSTOM_BASE_URL_STORAGE_KEY, cleanUrl);
  }
}

/**
 * Restaura a URL base para o padrão (origem da janela)
 */
export function resetCustomBaseUrl(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CUSTOM_BASE_URL_STORAGE_KEY);
  }
}

/**
 * Retorna se o usuário configurou um domínio base customizado
 */
export function hasCustomBaseUrl(): boolean {
  if (typeof window !== 'undefined') {
    return Boolean(localStorage.getItem(CUSTOM_BASE_URL_STORAGE_KEY));
  }
  return false;
}

/**
 * Gera a URL dinâmica para a placa
 * @param code Código de 4 caracteres
 * @param source 'nfc' para tag NFC (?s=n) ou 'qr' para QRCode (?s=q)
 * @param customBaseUrl URL base opcional
 */
export function getPlateRedirectUrl(code: string, source?: 'nfc' | 'qr', customBaseUrl?: string): string {
  const base = (customBaseUrl && customBaseUrl.trim()) 
    ? customBaseUrl.trim().replace(/\/+$/, '') 
    : getBaseRedirectUrl();
  const url = `${base}?r=${encodeURIComponent(code.toUpperCase())}`;
  if (source === 'nfc') return `${url}&s=n`;
  if (source === 'qr') return `${url}&s=q`;
  return url;
}

/**
 * Calcula as URLs efetivas para QR Code e Tag NFC com base na preferência da placa (Direto do Cliente vs Dinâmico 302)
 */
export function getEffectivePlateUrls(
  plate: {
    code: string;
    destination?: string;
    linkMode?: 'direct' | 'dynamic';
    customNfcUrl?: string;
    customQrUrl?: string;
  },
  overrideMode?: 'direct' | 'dynamic'
): { qrUrl: string; nfcUrl: string; mode: 'direct' | 'dynamic'; isDirect: boolean } {
  // Se houver overrideMode usa ele; senão se plate.linkMode estiver definido usa ele; 
  // senão se houver destination configurado (cliente cadastrado), usa 'direct' por padrão para já gerar com o link dele!
  const hasDestination = Boolean(plate.destination && plate.destination.trim());
  const mode = overrideMode || plate.linkMode || (hasDestination ? 'direct' : 'dynamic');
  const isDirect = mode === 'direct' && hasDestination;

  let qrUrl: string;
  let nfcUrl: string;

  if (isDirect) {
    qrUrl = plate.customQrUrl?.trim() || plate.destination!.trim();
    nfcUrl = plate.customNfcUrl?.trim() || plate.destination!.trim();
  } else {
    qrUrl = plate.customQrUrl?.trim() || getPlateRedirectUrl(plate.code, 'qr');
    nfcUrl = plate.customNfcUrl?.trim() || getPlateRedirectUrl(plate.code, 'nfc');
  }

  return { qrUrl, nfcUrl, mode: isDirect ? 'direct' : 'dynamic', isDirect };
}

/**
 * Normaliza e valida a URL de destino
 */
export function validateAndNormalizeUrl(input: string): { valid: boolean; url: string; error?: string } {
  if (!input || input.trim() === '') {
    return { valid: false, url: '', error: 'URL de destino não pode ser vazia' };
  }

  let sanitized = input.trim();
  if (!/^https?:\/\//i.test(sanitized)) {
    sanitized = `https://${sanitized}`;
  }

  try {
    const parsed = new URL(sanitized);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, url: '', error: 'Apenas links HTTP e HTTPS são permitidos' };
    }
    return { valid: true, url: parsed.toString() };
  } catch (err) {
    return { valid: false, url: '', error: 'Formato de URL inválido' };
  }
}
