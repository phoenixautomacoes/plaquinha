/**
 * Módulo de Autenticação e Gestão de Sessão do Painel PHOENIX NFC PRO
 */

const STORAGE_KEYS = {
  CREDS: 'phx_admin_credentials_v1',
  SESSION: 'phx_admin_session_v1',
};

// Credenciais iniciais padrão
const DEFAULT_CREDENTIALS = {
  email: 'admin@phoenixautomacoes.com.br',
  // Aceita também o e-mail do fundador
  aliasEmail: 'rgbarcellos@gmail.com',
  password: 'Phoenix@2026',
};

interface StoredCredentials {
  email: string;
  passwordHash: string; // SHA-256 em hexadecimal
  updatedAt: string;
}

/**
 * Função utilitária para gerar hash SHA-256 usando Web Crypto API
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Inicializa ou recupera as credenciais cadastradas
 */
export async function getStoredCredentials(): Promise<StoredCredentials> {
  if (typeof window === 'undefined') {
    const hash = await sha256(DEFAULT_CREDENTIALS.password);
    return {
      email: DEFAULT_CREDENTIALS.email,
      passwordHash: hash,
      updatedAt: new Date().toISOString(),
    };
  }

  const raw = localStorage.getItem(STORAGE_KEYS.CREDS);
  if (!raw) {
    const defaultHash = await sha256(DEFAULT_CREDENTIALS.password);
    const initial: StoredCredentials = {
      email: DEFAULT_CREDENTIALS.email,
      passwordHash: defaultHash,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(raw);
  } catch {
    const defaultHash = await sha256(DEFAULT_CREDENTIALS.password);
    return {
      email: DEFAULT_CREDENTIALS.email,
      passwordHash: defaultHash,
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Verifica se o administrador já está autenticado nesta máquina/navegador
 */
export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session) return false;

    const data = JSON.parse(session);
    // Válido por 30 dias se ativo
    if (data.authenticated && data.timestamp) {
      const now = Date.now();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      if (now - data.timestamp < thirtyDaysMs) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Realiza o login comparando e-mail e senha informados
 */
export async function loginAdmin(emailInput: string, passwordInput: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const stored = await getStoredCredentials();
  const inputHash = await sha256(passwordInput.trim());
  const cleanEmail = emailInput.trim().toLowerCase();

  const validEmail =
    cleanEmail === stored.email.toLowerCase() ||
    cleanEmail === DEFAULT_CREDENTIALS.aliasEmail.toLowerCase() ||
    cleanEmail === 'admin';

  // Verifica se o hash bate
  const isPasswordMatch = inputHash === stored.passwordHash;

  if (validEmail && isPasswordMatch) {
    const session = {
      authenticated: true,
      email: cleanEmail,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    return true;
  }

  return false;
}

/**
 * Encerra a sessão do administrador
 */
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}

/**
 * Permite que o administrador altere o e-mail ou a senha dentro do painel
 */
export async function changeAdminCredentials(
  currentPasswordInput: string,
  newEmailInput: string,
  newPasswordInput: string
): Promise<{ success: boolean; error?: string }> {
  if (typeof window === 'undefined') return { success: false, error: 'Ambiente inválido' };

  const stored = await getStoredCredentials();
  const currentHash = await sha256(currentPasswordInput.trim());

  if (currentHash !== stored.passwordHash) {
    return { success: false, error: 'A senha atual informada está incorreta.' };
  }

  if (newPasswordInput && newPasswordInput.trim().length < 6) {
    return { success: false, error: 'A nova senha deve ter no mínimo 6 caracteres.' };
  }

  const updatedHash = newPasswordInput.trim() ? await sha256(newPasswordInput.trim()) : stored.passwordHash;
  const updatedEmail = newEmailInput.trim() || stored.email;

  const updated: StoredCredentials = {
    email: updatedEmail,
    passwordHash: updatedHash,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify(updated));

  // Renova a sessão
  const session = {
    authenticated: true,
    email: updatedEmail,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

  return { success: true };
}
