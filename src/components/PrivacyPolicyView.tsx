import React, { useEffect } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  Building2,
  Lock,
  Server,
  Key,
  Cpu,
  FileCheck2,
  AlertCircle,
  Database,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import phoenixLogo from '../assets/logo-fenix2.png';

interface PrivacyPolicyViewProps {
  onBack?: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner / Barra Superior */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center shrink-0">
              <img
                src={phoenixLogo}
                alt="Phoenix Automações"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block">
                  PHOENIX NFC PRO
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  LGPD 13.709/2018
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:block">
                Política de Privacidade e Proteção de Dados
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://phoenixautomacoes.com.br/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/80 transition-colors"
            >
              <span>Phoenix Principal</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </a>

            <button
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.location.href = '/';
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Voltar ao site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-12 pb-10 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/0 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Documento Oficial de Conformidade LGPD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Política de Privacidade e Proteção de Dados
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transparência, integridade e rigor técnico no tratamento de dados pessoais em todo o ecossistema Phoenix Automações.
          </p>

          {/* Cards de Metadados Institucionais */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left max-w-3xl mx-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Razão Social</span>
              <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">Phoenix Automações</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">CNPJ</span>
              <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">31.418.058/0001-06</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Sede</span>
              <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">Porto Alegre — RS</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Última Atualização</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-0.5">18 de julho de 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal da Política */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 leading-relaxed text-slate-300 text-sm sm:text-base">
        
        {/* Declaração de Compromisso */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-900/60 border border-blue-500/30 rounded-2xl p-6 sm:p-7 shadow-xl shadow-blue-950/20">
          <p className="text-slate-200 leading-relaxed text-base sm:text-lg">
            A <strong>Phoenix Automações</strong> valoriza profundamente a privacidade, a transparência e a segurança das informações de seus clientes contratantes, parceiros e dos consumidores finais que interagem com nossa infraestrutura. Esta Política de Privacidade descreve de forma clara e detalhada como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os dados pessoais processados em nosso ecossistema — que abrange a Caixa de Entrada Omnichannel, o CRM e Funil Kanban, construtores de fluxos automatizados, agendamentos e a nossa inteligência artificial, a <strong>IA Sofia</strong>.
          </p>
        </div>

        {/* 1. Papéis e Responsabilidades no Tratamento (LGPD) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Papéis e Responsabilidades no Tratamento (LGPD)
            </h2>
          </div>
          <p>
            Para assegurar total segurança jurídica e conformidade com a LGPD, a Phoenix Automações atua sob duas perspectivas distintas no tratamento de dados pessoais:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span>Como Controladora de Dados</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Quando coletamos e gerenciamos os dados cadastrais, de faturamento, credenciais de API e logs de acesso dos nossos clientes contratantes (empresas, empreendedores e profissionais que assinam os planos <em>Fluxos & Automações</em> ou <em>Agente de IA</em>). Nesta função, definimos as finalidades de gestão contratual, faturamento, suporte técnico e melhorias da plataforma.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>Como Operadora de Dados</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Quando processamos dados pessoais de consumidores finais (leads e contatos) que interagem através do WhatsApp Cloud API com os negócios dos nossos clientes. Nesse cenário, o <strong>Cliente Contratante atua como Controlador legal</strong> da base de dados, sendo responsável por definir os fluxos do CRM, regras de atendimento e cadência de campanhas, enquanto a Phoenix Automações executa o tratamento estritamente segundo suas instruções e configurações.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Dados Pessoais Coletados e Categorias */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Dados Pessoais Coletados e Categorias
            </h2>
          </div>
          <p>
            A coleta de dados é segmentada de acordo com a modalidade de uso da nossa infraestrutura:
          </p>

          <div className="space-y-4 pt-1">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-blue-400">2.1.</span> Dados dos Clientes (Contratantes da Plataforma)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-100">Informações Cadastrais e Institucionais:</strong> nome do responsável, e-mail profissional, número de WhatsApp/telefone, cargo, razão social e CNPJ.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-100">Dados de Faturamento e Onboarding:</strong> informações necessárias para processamento de cobranças dos planos recorrentes (Fluxos & Automações ou Agente de IA) e da Taxa de Implantação única (R$ 597), processadas em ambiente seguro via gateways de pagamento parceiros.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-100">Chaves e Credenciais de Integração (BYOK — Bring Your Own Key):</strong> tokens da WhatsApp Cloud API oficial da Meta, credenciais de Webhooks e chaves de API próprias de inteligência artificial (OpenAI/GPT ou Anthropic/Claude) fornecidas e controladas pelo cliente.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-100">Logs e Monitoramento:</strong> endereços IP, relatórios de Analytics, estatísticas de tempo de resposta, volume de disparos e histórico de login.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.2.</span> Dados de Contatos Finais (Tratados em Nome do Cliente)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-100">Identificadores de Mensageria:</strong> número de telefone, nome de perfil no WhatsApp, histórico interativo de conversas em texto, áudio e mídias, bem como o estágio do contato no Funil Kanban de vendas.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-100">Interações com a IA Sofia:</strong> quaisquer dados pessoais fornecidos voluntariamente pelos contatos finais durante o atendimento humanizado e automatizado 24 horas por dia (como horários preferidos para agenda, dúvidas de qualificação ou solicitações de serviços).
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Finalidades do Tratamento e Operação do Ecossistema */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Finalidades do Tratamento e Operação do Ecossistema
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <strong className="text-slate-100 block font-semibold text-sm">Prestação e Automação do Atendimento</strong>
              <p className="text-xs text-slate-300">
                Conectar o número de WhatsApp, centralizar conversas em tela única (omnichannel multiatendente), organizar o CRM com funis visuais (Kanban) e automatizar lembretes ou notificações.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <strong className="text-slate-100 block font-semibold text-sm">Operação do Agente de IA (IA Sofia)</strong>
              <p className="text-xs text-slate-300">
                Processar o contexto do cliente em tempo real para responder dúvidas, qualificar leads e agendar compromissos 24h por dia, sem intervenção humana, de acordo com o plano contratado.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <strong className="text-slate-100 block font-semibold text-sm">Execução de Disparos em Massa</strong>
              <p className="text-xs text-slate-300">
                Realizar campanhas proativas e envios com cadência controlada através de templates oficialmente aprovados pela Meta, mitigando riscos de bloqueio.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <strong className="text-slate-100 block font-semibold text-sm">Integrações de Ecossistema (Webhooks e APIs)</strong>
              <p className="text-xs text-slate-300">
                Conectar a operação de atendimento a sistemas ERP, calendários externos e bancos de dados do próprio cliente contratante.
              </p>
            </div>

            <div className="sm:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <strong className="text-slate-100 block font-semibold text-sm">Suporte, Segurança e Governança</strong>
              <p className="text-xs text-slate-300">
                Garantir estabilidade dos servidores, proteção contra incidentes e aplicação da taxa de implantação com configuração completa e treinamento da equipe contratante.
              </p>
            </div>
          </div>

          {/* Destaque Arquitetura Financeira e BYOK */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950/30 border border-blue-500/20 rounded-xl p-5 space-y-3 mt-4">
            <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-400" />
              Arquitetura Financeira e Proteção de Dados na Integração de APIs (Meta e IA)
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>
                <strong className="text-slate-100">API Oficial da Meta à parte:</strong> o consumo e a tarifação das conversas trafegadas via WhatsApp Cloud API são faturados por uso diretamente pela Meta na conta do cliente contratante. Quanto maior o volume de mensagens e disparos, maior o custo junto à Meta, sem incidência de marcação oculta por parte da Phoenix Automações.
              </p>
              <p>
                <strong className="text-slate-100">Inteligência Artificial sob seu controle (BYOK):</strong> no plano <em>Agente de IA</em>, a IA Sofia é conectada diretamente à OpenAI ou ao Claude (Anthropic) utilizando a chave de API própria do cliente. Isso garante que os custos de consumo de tokens permaneçam sob gestão e controle financeiro direto do contratante, além de assegurar que o tráfego de dados ocorra dentro das políticas empresariais de privacidade desses fornecedores.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Compartilhamento de Dados com Terceiros */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Compartilhamento de Dados com Terceiros
            </h2>
          </div>
          <p>
            A Phoenix Automações não vende, aluga ou compartilha dados pessoais com terceiros para fins publicitários ou comerciais alheios à prestação do serviço. O compartilhamento ocorre restritamente com os seguintes provedores essenciais:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Meta Platforms, Inc.</span>
                <span className="text-[11px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Cloud API</span>
              </div>
              <p className="text-xs text-slate-300">
                Tráfego de mensagens, notificações e disparos em massa via WhatsApp Cloud API oficial.
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                <strong>Salvaguardas:</strong> Conformidade com as Políticas de Dados e Segurança de Cloud API da Meta; criptografia em trânsito.
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">OpenAI & Anthropic</span>
                <span className="text-[11px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">IA Sofia</span>
              </div>
              <p className="text-xs text-slate-300">
                Processamento de linguagem natural pela IA Sofia (atendimento, qualificação e agendamento 24h).
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                <strong>Salvaguardas:</strong> Uso de API própria do cliente (BYOK). Políticas corporativas de não-retenção para treino de modelos.
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Infraestrutura em Nuvem</span>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">ISO 27001</span>
              </div>
              <p className="text-xs text-slate-300">
                Hospedagem de banco de dados seguro, aplicação web (Dashboard/Kanban) e rotinas de backup.
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                <strong>Salvaguardas:</strong> Certificações internacionais de segurança (ISO 27001/SOC 2) e isolamento de ambientes de clientes.
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Gateways de Pagamento</span>
                <span className="text-[11px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">PCI-DSS</span>
              </div>
              <p className="text-xs text-slate-300">
                Processamento de assinaturas dos planos recorrentes e da taxa única de implantação no onboarding.
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                <strong>Salvaguardas:</strong> Conformidade com padrão PCI-DSS para máxima segurança em transações financeiras.
              </div>
            </div>
          </div>
        </section>

        {/* 5. Banco de Dados Seguro e Criptografia */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Banco de Dados Seguro e Criptografia
            </h2>
          </div>
          <p>
            A segurança é um pilar estrutural do ecossistema Phoenix Automações. Adotamos medidas técnicas, administrativas e organizacionais aptas a proteger os dados pessoais contra destruição, perda, alteração ou acesso não autorizado:
          </p>

          <ul className="space-y-3 pt-1 text-xs sm:text-sm">
            <li className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Criptografia de ponta a ponta:</strong>
                <span>Todas as comunicações entre o painel da Phoenix, os servidores web, o WhatsApp e as APIs de inteligência artificial são protegidas com protocolos de tunelamento e criptografia em trânsito (TLS/SSL) e em repouso.</span>
              </div>
            </li>

            <li className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Isolamento de contas e controle de acesso:</strong>
                <span>O funil Kanban, o histórico de conversas e as métricas de Analytics de cada cliente contratante são estritamente confidenciais e protegidos via autenticação única, sendo inacessíveis a terceiros ou a outros clientes.</span>
              </div>
            </li>

            <li className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
              <Database className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Backups automáticos e alta disponibilidade:</strong>
                <span>Realizamos rotinas de salvaguarda contínua de dados, garantindo redundância, integridade e capacidade de recuperação rápida ante incidentes técnicos.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* 6. Retenção e Exclusão de Informações */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              6
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Retenção e Exclusão de Informações
            </h2>
          </div>
          <p>
            Os dados cadastrais, financeiros e de uso da plataforma são retidos pelo tempo em que o contrato do cliente permanecer ativo. Em caso de encerramento da assinatura ou cancelamento da conta:
          </p>

          <div className="space-y-3 pt-1 text-xs sm:text-sm">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <strong className="text-slate-100 font-semibold block mb-1">Exclusão da base operacional:</strong>
              <p className="text-slate-300">
                Os históricos de conversas no WhatsApp, leads no Kanban e configurações de fluxo serão definitivamente removidos de nossos servidores produtivos e de rotinas de backup no prazo máximo de <strong>30 (trinta) dias</strong> após a solicitação formal de exclusão.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <strong className="text-slate-100 font-semibold block mb-1">Guarda legal (exceções):</strong>
              <p className="text-slate-300">
                Dados de faturamento, CNPJ e registros de acesso (logs) poderão ser preservados pelo prazo prescricional e decadencial determinado pela legislação brasileira (como o Marco Civil da Internet — Lei nº 12.965/2014 — e obrigações tributárias e fiscais), exclusivamente para cumprimento de dever legal ou defesa em processo judicial.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Seus Direitos como Titular de Dados (Art. 18 da LGPD) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              7
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Seus Direitos como Titular de Dados (Art. 18 da LGPD)
            </h2>
          </div>
          <p>
            A Lei Geral de Proteção de Dados Pessoais garante ao titular o controle sobre suas informações. Qualquer titular pode exercer, a qualquer tempo, os seguintes direitos:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">Confirmação e Acesso</strong>
                <span className="text-slate-400 text-xs">Confirmação do tratamento e cópia integral dos dados.</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">Correção</strong>
                <span className="text-slate-400 text-xs">Retificação de dados incompletos, inexatos ou desatualizados.</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">Anonimização ou Eliminação</strong>
                <span className="text-slate-400 text-xs">Remoção ou bloqueio de dados excessivos ou desconformes.</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">Portabilidade</strong>
                <span className="text-slate-400 text-xs">Transferência dos dados para outro fornecedor de serviço.</span>
              </div>
            </div>

            <div className="sm:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">Revogação do Consentimento</strong>
                <span className="text-slate-400 text-xs">Retirada de consentimento previamente concedido para tratamento.</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5">Nota importante para consumidores finais (leads do WhatsApp):</strong>
              Caso você seja um usuário final que interagiu com uma marca ou empresa através de um canal acionado pela Phoenix Automações, solicitações referentes ao histórico da conversa ou exclusão de lead devem ser enviadas diretamente à <strong>Empresa Contratante (Controladora)</strong>, detentora da sua relação de consumo.
            </div>
          </div>
        </section>

        {/* 8. Contato e Encarregado de Proteção de Dados (DPO) */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-black text-sm border border-blue-500/30">
              8
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Contato e Encarregado de Proteção de Dados (DPO)
            </h2>
          </div>
          <p>
            Para sanar quaisquer dúvidas em relação a esta Política de Privacidade, compreender as salvaguardas técnicas da nossa inteligência artificial e banco de dados, ou para exercer seus direitos como titular de dados pessoais sob a LGPD, disponibilizamos nossos canais de atendimento direto:
          </p>

          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg sm:text-xl">
                  Encarregado de Dados (DPO) — Phoenix Automações
                </h3>
                <span className="text-xs text-slate-400">Atendimento a Titulares e Autoridade Nacional de Proteção de Dados (ANPD)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:privacidade@phoenixautomacoes.com.br"
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-950 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">E-mail do DPO</span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate block">
                    privacidade@phoenixautomacoes.com.br
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/5551991546560?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20DPO%20da%20Phoenix%20Automa%C3%A7%C3%B5es%20sobre%20Privacidade%20e%20LGPD."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-950 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">WhatsApp do DPO</span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate block">
                    (51) 99154-6560
                  </span>
                </div>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>Porto Alegre — RS · CNPJ: 31.418.058/0001-06</span>
              </div>
              <span className="text-slate-500">Documento em estrita conformidade com a Lei nº 13.709/2018 (LGPD).</span>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 mt-16 text-center text-xs text-slate-500 space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 text-xs font-semibold">
            <button
              onClick={() => {
                if (onBack) onBack();
                else window.location.href = '/';
              }}
              className="hover:text-white transition-colors"
            >
              ← Voltar ao site
            </button>
            <span>•</span>
            <a
              href="https://phoenixautomacoes.com.br/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Phoenix Automações (Site Oficial)
            </a>
            <span>•</span>
            <a
              href="mailto:privacidade@phoenixautomacoes.com.br"
              className="hover:text-white transition-colors"
            >
              Contato DPO
            </a>
          </div>

          <p className="font-semibold text-slate-400">
            Phoenix Automações · Tecnologia em Soluções Inteligentes de Balcão e Automação Empresarial
          </p>
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Phoenix Automações. Todos os direitos reservados. CNPJ: 31.418.058/0001-06.
          </p>
        </div>
      </footer>
    </div>
  );
};
