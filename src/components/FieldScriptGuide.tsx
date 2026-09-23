import React, { useState } from 'react';
import { 
  Compass, 
  MessageSquare, 
  CheckSquare, 
  ShieldAlert, 
  Plus, 
  Save, 
  MapPin, 
  Star,
  DollarSign,
  HelpCircle,
  ThumbsUp,
  Award
} from 'lucide-react';
import { MarketSurveyEntry } from '../types';
import { loadSurveys, saveSurveys } from '../utils/storage';

export const FieldScriptGuide: React.FC = () => {
  const [surveys, setSurveys] = useState<MarketSurveyEntry[]>(loadSurveys());
  const [showNewSurveyForm, setShowNewSurveyForm] = useState(false);

  // Novo registro de pesquisa
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [currentReviewsCount, setCurrentReviewsCount] = useState<number>(10);
  const [asksForReviews, setAsksForReviews] = useState('');
  const [hasBeenApproached, setHasBeenApproached] = useState(false);
  const [competitorPriceReported, setCompetitorPriceReported] = useState('');
  const [wouldHelpHim, setWouldHelpHim] = useState(true);
  const [guessedPrice, setGuessedPrice] = useState<number>(120);
  const [decisionMaker, setDecisionMaker] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    const newEntry: MarketSurveyEntry = {
      id: `survey-${Date.now()}`,
      businessName: businessName.trim(),
      category: category.trim() || 'Comércio Local',
      neighborhood: neighborhood.trim() || 'Região Local',
      currentReviewsCount: Number(currentReviewsCount) || 0,
      asksForReviews: asksForReviews.trim() || 'Não pede com frequência',
      hasBeenApproached,
      competitorPriceReported: competitorPriceReported.trim() || undefined,
      wouldHelpHim,
      guessedPrice: Number(guessedPrice) || 0,
      decisionMaker: decisionMaker.trim() || 'Proprietário',
      interestedInSignal: false,
      notes: notes.trim(),
      date: new Date().toISOString(),
    };

    const updated = [newEntry, ...surveys];
    setSurveys(updated);
    saveSurveys(updated);
    setShowNewSurveyForm(false);
    setBusinessName('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Abordagem de 30 Segundos */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs uppercase font-bold tracking-wider">
            O Roteiro da Abordagem de 30 Segundos
          </span>
          <span className="text-xs text-slate-400">• Com a placa de demonstração na mão</span>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2 text-sm text-slate-200">
          <p className="italic text-amber-300 font-medium leading-relaxed">
            "Oi, tudo bem? Trabalho aqui na região com avaliação e posicionamento no Google. 
            Posso te mostrar uma coisa em 30 segundos no balcão?"
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            (Você já encosta o seu celular na placa na frente dele. A tela de avaliação do próprio estabelecimento dele abre imediatamente).
          </p>
          <p className="italic text-emerald-300 font-medium leading-relaxed">
            "É isso: o cliente encosta o celular, cai direto na sua avaliação com 5 estrelas. 
            Quem tem mais avaliação aparece na frente quando alguém pesquisa {category || 'o seu serviço'} aqui no bairro. 
            Deixo configurada no seu nome, testo aqui com você. R$ 119 na mão hoje."
          </p>
        </div>
      </div>

      {/* Grid: Quebra de Objeções + Checklist de Bancada */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quebra de Objeções */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>As 4 Principais Objeções do Comerciante</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/70 space-y-1">
              <strong className="text-amber-300 block">1. "Vou pensar..."</strong>
              <p className="text-slate-300">
                <span className="text-slate-400">Resposta:</span> "Claro! Deixo uma placa aqui até amanhã, sem compromisso. Se você vir avaliações chegando, fechamos. Se não, pego de volta sem custo."
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/70 space-y-1">
              <strong className="text-amber-300 block">2. "Meu cliente não sabe usar NFC..."</strong>
              <p className="text-slate-300">
                <span className="text-slate-400">Resposta:</span> "Por isso a placa tem NFC e QR Code juntos! Quem tem celular novo apenas aproxima, quem tem aparelho mais simples só aponta a câmera."
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/70 space-y-1">
              <strong className="text-amber-300 block">3. "Achei caro R$ 119..."</strong>
              <p className="text-slate-300">
                <span className="text-slate-400">Resposta:</span> "Quanto vale UM cliente novo no seu negócio? Se essa placa trouxer apenas um cliente, já pagou tudo. E ela vai ficar no seu balcão pelos próximos 5 anos."
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/70 space-y-1">
              <strong className="text-emerald-300 block">4. "Não tenho Google Meu Negócio..." (A Melhor Objeção!)</strong>
              <p className="text-slate-300">
                <span className="text-slate-400">Resposta:</span> "Perfeito! Eu estruturo o perfil oficial da sua empresa com fotos, horários e categorias por R$ 497 e te dou a placa de brinde!"
              </p>
            </div>
          </div>
        </div>

        {/* Checklist de Bancada Anti-Falhas */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Checklist de Bancada (Antes de ir para a Rua)</span>
          </h4>

          <div className="space-y-2 text-xs text-slate-300">
            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-700/60 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-500" />
              <div>
                <strong className="text-slate-100 block">Exigir Chip NTAG213 NXP original</strong>
                <span className="text-[11px] text-slate-400">Tag genérica de memória curta é o que falha em iPhones antigos.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-700/60 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-500" />
              <div>
                <strong className="text-slate-100 block">Teste com Capinha Grossa e Balcão</strong>
                <span className="text-[11px] text-slate-400">Se o balcão do cliente for de inox ou metal, precisa de tag antimetal.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-700/60 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-500" />
              <div>
                <strong className="text-slate-100 block">Gravar com Senha no NFC Tools</strong>
                <span className="text-[11px] text-slate-400">Depois de gravar o link curto, trave a tag com senha para ninguém regravar.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-700/60 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-500" />
              <div>
                <strong className="text-slate-100 block">Aviso Ético do Google: Sem Filtro Fake</strong>
                <span className="text-[11px] text-rose-300">
                  O link deve levar direto para a avaliação. Filtrar apenas clientes 5 estrelas viola as políticas do Google e derruba a conta do cliente.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Pesquisa de Mercado & Prospecção de Campo */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Pesquisa de Campo & Registro de Abordagens</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Anote os feedbacks e respostas dos comerciantes que você abordar nas suas visitas
            </p>
          </div>

          <button
            onClick={() => setShowNewSurveyForm(!showNewSurveyForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showNewSurveyForm ? 'Fechar Formulário' : 'Anotar Nova Visita'}</span>
          </button>
        </div>

        {/* Formulário de Registro de Visita */}
        {showNewSurveyForm && (
          <form onSubmit={handleSaveSurvey} className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Estabelecimento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Barbearia da Esquina"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nicho / Ramo</label>
                <input
                  type="text"
                  placeholder="Salão, Clínica, Pet Shop..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bairro / Região</label>
                <input
                  type="text"
                  placeholder="Centro, Bairro..."
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Quantas avaliações tem hoje?</label>
                <input
                  type="number"
                  value={currentReviewsCount}
                  onChange={(e) => setCurrentReviewsCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Quanto ele chutou que custa?</label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-xs">R$</span>
                  <input
                    type="number"
                    value={guessedPrice}
                    onChange={(e) => setGuessedPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Quem decide a compra?</label>
                <input
                  type="text"
                  placeholder="O dono, gerente, sócio..."
                  value={decisionMaker}
                  onChange={(e) => setDecisionMaker(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Anotações da conversa / Reação</label>
              <textarea
                rows={2}
                placeholder="Ex: Ficou impressionado quando encostei o celular e abriu o Google dele. Pediu para voltar na sexta com a placa pronta."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Salvar Resposta da Pesquisa
              </button>
            </div>
          </form>
        )}

        {/* Lista de Respostas da Pesquisa */}
        <div className="space-y-2">
          {surveys.length === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-900/60 rounded-xl border border-dashed border-slate-700/80 text-slate-400">
              <Compass className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
              <p className="font-semibold text-sm text-slate-200">Nenhuma prospecção ou pesquisa registrada ainda</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Quando você realizar visitas comerciais de campo, clique em <strong>"Anotar Nova Visita"</strong> para registrar as respostas e percepções dos comerciantes.
              </p>
            </div>
          ) : (
            surveys.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">{s.businessName}</span>
                    <span className="text-slate-400">({s.category})</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px] border border-blue-500/20">
                      {s.neighborhood}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1">{s.notes}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-slate-300 font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Avaliações no Maps:</span>
                    <strong className="text-amber-400">{s.currentReviewsCount}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Preço Chutado:</span>
                    <strong className="text-emerald-400">R$ {s.guessedPrice}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
