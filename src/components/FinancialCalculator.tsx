import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  ShieldAlert, 
  Target, 
  CheckCircle2,
  PieChart,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const FinancialCalculator: React.FC = () => {
  // Parâmetros de Custo Unitário (baseados nas 30 tags de R$ 39,90 e cotações no Centro de POA)
  const [tagCost, setTagCost] = useState(1.33); // R$ 39,90 / 30
  const [baseCost, setBaseCost] = useState(3.00); // PVC expandido ou acrílico no Centro
  const [printCost, setPrintCost] = useState(4.00); // Vinil fosco ou UV
  const [laminationCost, setLaminationCost] = useState(1.50);
  const [standCost, setStandCost] = useState(4.00); // Suporte de mesa em L
  const [travelAndFee, setTravelAndFee] = useState(9.00); // Combustível/transporte + maquininha

  // Preços de Venda
  const [plateSellPrice, setPlateSellPrice] = useState(119); // Preço unitário recomendado em POA
  const [comboPrice, setComboPrice] = useState(249); // Combo 3 placas
  const [googleProfilePrice, setGoogleProfilePrice] = useState(497); // Estruturação Perfil Google
  const [monthlySubscriptionPrice, setMonthlySubscriptionPrice] = useState(99); // Recorrência

  // Volumes Mensais Estimados (Metas)
  const [monthlyPlatesSold, setMonthlyPlatesSold] = useState(30);
  const [monthlyProfilesSold, setMonthlyProfilesSold] = useState(3);
  const [monthlySubscribersCount, setMonthlySubscribersCount] = useState(10);

  // Cálculos
  const totalUnitCost = tagCost + baseCost + printCost + laminationCost + standCost + travelAndFee;
  const unitProfit = plateSellPrice - totalUnitCost;
  const profitMarginPercent = ((unitProfit / plateSellPrice) * 100).toFixed(1);

  // Custo para produzir o lote-teste de 30 placas
  const batch30ProductionCost = (tagCost + baseCost + printCost + laminationCost + standCost) * 30;
  const breakEvenPlates = Math.ceil(batch30ProductionCost / plateSellPrice);

  // Projeção Mensal
  const platesRevenue = monthlyPlatesSold * plateSellPrice;
  const platesCost = monthlyPlatesSold * totalUnitCost;
  const platesNetProfit = platesRevenue - platesCost;

  const profilesRevenue = monthlyProfilesSold * googleProfilePrice; // Custo quase zero além do tempo
  const subscriptionRevenue = monthlySubscribersCount * monthlySubscriptionPrice;

  const totalMonthlyGrossRevenue = platesRevenue + profilesRevenue + subscriptionRevenue;
  const totalMonthlyNetProfit = platesNetProfit + (profilesRevenue * 0.95) + subscriptionRevenue;

  return (
    <div className="space-y-6">
      {/* Header com os Destaques de Viabilidade */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">Custo Total Produzido</span>
          <p className="text-2xl font-black text-slate-100 mt-2">
            R$ {totalUnitCost.toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Inclui tag R$ 1,33 + base + impressão + taxa</p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">Lucro Líquido por Placa</span>
          <p className="text-2xl font-black text-emerald-400 mt-2">
            R$ {unitProfit.toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-300 font-medium mt-1">
            Margem de {profitMarginPercent}% a R$ {plateSellPrice}
          </p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">Ponto de Equilíbrio</span>
          <p className="text-2xl font-black text-amber-400 mt-2">
            {breakEvenPlates} Vendas
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            3 vendas pagam todo o lote de 30 unidades (~R$ 415)!
          </p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">Projeção Mensal Líquida</span>
          <p className="text-2xl font-black text-purple-400 mt-2">
            R$ {totalMonthlyNetProfit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[11px] text-purple-300 font-medium mt-1">
            Placas + Perfis Google + Recorrência
          </p>
        </div>
      </div>

      {/* Simulador Interativo: Composição de Custos vs Esteira de Vendas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da Esquerda: Composição de Custo Unitário */}
        <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-700/80 pb-3">
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-400" />
              Composição de Custo Unitário Estimado
            </span>
            <span className="text-xs font-mono text-slate-400">Base: 30 tags Mercado Livre</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300">Tag NFC NTAG213 NXP adesiva (30 un = R$ 39,90):</label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.05"
                  value={tagCost}
                  onChange={(e) => setTagCost(Number(e.target.value))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300">Base PVC expandido 3mm ou Acrílico (Centro POA):</label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.20"
                  value={baseCost}
                  onChange={(e) => setBaseCost(Number(e.target.value))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300">Adesivo impresso 10×15 ou impressão UV direta:</label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.50"
                  value={printCost}
                  onChange={(e) => setPrintCost(Number(e.target.value))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300">Laminação fosca de proteção & acabamento:</label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.20"
                  value={laminationCost}
                  onChange={(e) => setLaminationCost(Number(e.target.value))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300">Suporte de mesa em L ou pé dobrado em PVC:</label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.50"
                  value={standCost}
                  onChange={(e) => setStandCost(Number(e.target.value))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300">Deslocamento rateado + taxa da maquininha:</label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.50"
                  value={travelAndFee}
                  onChange={(e) => setTravelAndFee(Number(e.target.value))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 flex items-center justify-between font-bold text-sm">
              <span className="text-slate-200">Custo Total Unitário:</span>
              <span className="text-amber-400 font-mono">R$ {totalUnitCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Dica Estratégica de Precificação */}
          <div className="p-3.5 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-blue-200 space-y-1">
            <strong className="text-blue-300 block">Regra de Ouro da Rua:</strong>
            <p>
              Nunca venda a menos de R$ 89. Em comércios de rua e bairros comerciais com fluxo, 
              <strong> R$ 119</strong> passa com facilidade. Se o comerciante pedir desconto, ofereça o Combo de 3 placas por R$ 249 — nunca abaixe a unitária!
            </p>
          </div>
        </div>

        {/* Coluna da Direita: Simulador de Esteira de Produtos (Onde Está o Dinheiro Real) */}
        <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-700/80 pb-3">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Simulador da Esteira Completa de Faturamento
            </span>
            <span className="text-xs text-emerald-400 font-semibold">Mês 1 / Mês 2</span>
          </h3>

          {/* Placas Vendidas */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">1. Placas NFC Vendidas no Mês:</span>
              <span className="font-bold text-slate-100">{monthlyPlatesSold} placas</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={monthlyPlatesSold}
              onChange={(e) => setMonthlyPlatesSold(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Preço: R$ {plateSellPrice}</span>
              <span className="text-emerald-400 font-semibold">Lucro Placas: R$ {platesNetProfit.toFixed(0)}</span>
            </div>
          </div>

          {/* Estruturação de Perfil Google (Ticket R$ 497) */}
          <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">
                2. Perfis Google Estruturados (Upsell R$ 497):
              </span>
              <span className="font-bold text-purple-400">{monthlyProfilesSold} clientes</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={monthlyProfilesSold}
              onChange={(e) => setMonthlyProfilesSold(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>2 a cada 10 clientes de placa compram</span>
              <span className="text-purple-300 font-semibold">+ R$ {profilesRevenue.toFixed(0)}</span>
            </div>
          </div>

          {/* Assinaturas de Gestão Mensal (Recorrência R$ 99/mês) */}
          <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">
                3. Assinantes do Plano de Gestão (R$ 99/mês):
              </span>
              <span className="font-bold text-amber-400">{monthlySubscribersCount} assinantes</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={monthlySubscribersCount}
              onChange={(e) => setMonthlySubscribersCount(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>QR dinâmico + relatório mensal de acessos</span>
              <span className="text-amber-300 font-semibold">
                R$ {subscriptionRevenue.toFixed(0)}/mês fixo no bolso
              </span>
            </div>
          </div>

          {/* Resumo Final */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-700 space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Faturamento Bruto Total:</span>
              <span className="font-bold text-slate-200">
                R$ {totalMonthlyGrossRevenue.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-extrabold text-emerald-400 pt-1 border-t border-slate-800">
              <span>Lucro Líquido Estimado:</span>
              <span className="text-xl">
                R$ {totalMonthlyNetProfit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
