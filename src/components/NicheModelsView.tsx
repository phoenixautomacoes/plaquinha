import React, { useState } from 'react';
import { 
  Smile, 
  Beer, 
  Stethoscope, 
  Star, 
  Instagram, 
  Wifi, 
  Smartphone, 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  Calendar,
  Send,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { Plate } from '../types';

interface NicheModelsViewProps {
  plates: Plate[];
}

export type NicheCategory = 'odonto' | 'bars' | 'doctors';

export const NicheModelsView: React.FC<NicheModelsViewProps> = ({ plates }) => {
  const [selectedNiche, setSelectedNiche] = useState<NicheCategory>('odonto');

  // Customizações do modelo Odonto
  const [odontoName, setOdontoName] = useState('DRA. CAROLINA DENTISTA');
  const [odontoSub, setOdontoSub] = useState('ODONTOLOGIA & HARMONIZAÇÃO · CRO/RS 19.420');
  const [odontoFinish, setOdontoFinish] = useState<'gold' | 'rosegold' | 'silver'>('gold');

  // Customizações do modelo Bares
  const [barName, setBarName] = useState('CERVEJARIA DO 4º DISTRITO');
  const [barIncentive, setBarIncentive] = useState<'shot' | 'wifi' | 'cardapio'>('shot');
  const [barFormat, setBarFormat] = useState<'mug' | 'table_tent'>('mug');

  // Customizações do modelo Médicos
  const [doctorName, setDoctorName] = useState('DR. MATHEUS FONTANA');
  const [doctorSpecialty, setDoctorSpecialty] = useState('DERMATOLOGIA & LASER · CRM/RS 38.100');
  const [doctorFinish, setDoctorFinish] = useState<'gold' | 'titanium' | 'crystal'>('titanium');

  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Explicativo de Alto Ticket */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Modelos de Acrílico Recortado a Laser
            </span>
            <span className="text-xs text-slate-400">• Formatos específicos por profissão</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Acrílico Temático: Como Triplicar o Valor Percebido da Placa
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Uma plaquinha retangular genérica é vista como brinde de R$ 100. Mas quando a peça tem o 
            <strong> formato de um Dente com acabamento espelhado dourado</strong>, um <strong>Caneco de Chopp com espuma branca</strong>, ou uma <strong>Cruz Médica de Titânio</strong>, 
            ela vira <em>artigo de luxo</em> para o balcão. O profissional paga de <strong>R$ 290 a R$ 450 rindo</strong>, e o seu custo de acrílico recortado a laser é de apenas <strong>R$ 38 a R$ 50</strong>.
          </p>
        </div>

        {/* Resumo da Margem */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30 text-center shrink-0 min-w-[190px]">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Margem Média por Peça</span>
          <span className="text-2xl font-black text-amber-400 block">+R$ 280,00</span>
          <span className="text-[10px] text-emerald-400 block font-medium mt-0.5">Lucro de até 85%</span>
        </div>
      </div>

      {/* Seletor dos 3 Nichos de Ouro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Nicho 1: Odontologia */}
        <button
          id="btn-niche-odonto"
          onClick={() => setSelectedNiche('odonto')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedNiche === 'odonto'
              ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/40'
              : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Smile className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Ticket R$ 349
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-100">1. Odontologia & Estética</h3>
          <p className="text-xs text-slate-400 mt-1">
            Formato Dente em acrílico branco com borda espelhada dourada (Google + Instagram + Pix).
          </p>
        </button>

        {/* Nicho 2: Bares & Gastronomia */}
        <button
          id="btn-niche-bars"
          onClick={() => setSelectedNiche('bars')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedNiche === 'bars'
              ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/40'
              : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Beer className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Kits R$ 600 - R$ 900
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-100">2. Bares, Pubs & Cervejarias</h3>
          <p className="text-xs text-slate-400 mt-1">
            Caneco de Chopp com espuma + Totens de mesa (Cardápio + Wi-Fi + 5★ com shot grátis).
          </p>
        </button>

        {/* Nicho 3: Médicos & Clínicas */}
        <button
          id="btn-niche-doctors"
          onClick={() => setSelectedNiche('doctors')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedNiche === 'doctors'
              ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/40'
              : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Ticket R$ 390 - R$ 490
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-100">3. Médicos & Clínicas Médicas</h3>
          <p className="text-xs text-slate-400 mt-1">
            Cruz Médica / Titânio escovado (Google Maps para atrair pacientes particulares sem convênio).
          </p>
        </button>
      </div>

      {/* Conteúdo Específico do Nicho Selecionado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: O Mockup Visual e Interativo da Peça */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full max-w-[480px] min-h-[580px] rounded-3xl p-6 bg-gradient-to-b from-stone-900 via-zinc-950 to-black border border-stone-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Efeito de iluminação spot superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Balcão de apoio elegante */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent border-t border-stone-800/40"></div>

            {/* =================================================== */}
            {/* 1. VISUALIZADOR ODONTOLOGIA (DENTE ESPELHADO)      */}
            {/* =================================================== */}
            {selectedNiche === 'odonto' && (
              <div className="relative flex flex-col items-center z-10">
                {/* O Dente recortado a laser com silhueta exata da foto */}
                <div
                  className="w-72 min-h-[350px] bg-white rounded-t-[70px] rounded-b-[55px] shadow-2xl p-5 flex flex-col justify-between items-center text-center relative transition-all"
                  style={{
                    border: odontoFinish === 'gold' 
                      ? '9px solid #fbbf24' 
                      : odontoFinish === 'rosegold' 
                      ? '9px solid #f43f5e' 
                      : '9px solid #94a3b8',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 25px rgba(251,191,36,0.2)'
                  }}
                >
                  {/* Recorte inferior dos dois ápices radiculares do dente */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-8 bg-black rounded-t-full"></div>

                  {/* Topo: Logo & Identidade do Dentista */}
                  <div className="pt-2 space-y-1">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 mx-auto flex items-center justify-center text-amber-300 font-extrabold text-sm shadow-md">
                      D
                    </div>
                    <h4 className="text-xs font-black text-slate-900 tracking-wider uppercase leading-tight">
                      {odontoName}
                    </h4>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">
                      {odontoSub}
                    </p>
                  </div>

                  {/* As 3 Janelas Espelhadas com QR Codes (Exatamente como a imagem) */}
                  <div className="grid grid-cols-3 gap-2 w-full px-1 my-3">
                    {/* Janela 1: Google Reviews */}
                    <div 
                      className="p-1.5 rounded-xl border-2 bg-amber-50/50 flex flex-col items-center shadow-sm"
                      style={{ borderColor: odontoFinish === 'gold' ? '#fbbf24' : '#94a3b8' }}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg p-1 shadow flex items-center justify-center">
                        <QrCode className="w-full h-full text-slate-900" />
                      </div>
                      <span className="text-[9px] font-black text-slate-900 mt-1 flex items-center gap-0.5">
                        <span className="text-[#4285F4]">G</span>oogle
                      </span>
                    </div>

                    {/* Janela 2: Instagram */}
                    <div 
                      className="p-1.5 rounded-xl border-2 bg-amber-50/50 flex flex-col items-center shadow-sm"
                      style={{ borderColor: odontoFinish === 'gold' ? '#fbbf24' : '#94a3b8' }}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg p-1 shadow flex items-center justify-center">
                        <QrCode className="w-full h-full text-slate-900" />
                      </div>
                      <span className="text-[9px] font-black text-slate-900 mt-1 flex items-center gap-0.5">
                        Instagram
                      </span>
                    </div>

                    {/* Janela 3: Pix / WhatsApp */}
                    <div 
                      className="p-1.5 rounded-xl border-2 bg-amber-50/50 flex flex-col items-center shadow-sm"
                      style={{ borderColor: odontoFinish === 'gold' ? '#fbbf24' : '#94a3b8' }}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg p-1 shadow flex items-center justify-center">
                        <QrCode className="w-full h-full text-slate-900" />
                      </div>
                      <span className="text-[9px] font-black text-slate-900 mt-1 flex items-center gap-0.5">
                        Pix / Consulta
                      </span>
                    </div>
                  </div>

                  {/* Indicativo NFC no Pé */}
                  <div className="flex items-center gap-1 text-[9px] font-extrabold text-blue-600 uppercase tracking-widest pb-1">
                    <Smartphone className="w-3 h-3" />
                    <span>TapScan NFC Integrado</span>
                  </div>
                </div>

                {/* Base Pesada em Acrílico Preto Piano 5mm */}
                <div 
                  className="w-72 h-4 rounded shadow-2xl mt-1 border-t flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(to right, #1c1917, #0c0a09, #1c1917)',
                    borderColor: odontoFinish === 'gold' ? '#fbbf24' : '#94a3b8'
                  }}
                >
                  <span className="text-[7px] font-mono text-amber-200/60 uppercase tracking-widest">
                    BASE PESADA BLACK PIANO · 5MM
                  </span>
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* 2. VISUALIZADOR BARES & PUBS (CANECO OU TOTEM)      */}
            {/* =================================================== */}
            {selectedNiche === 'bars' && (
              <div className="relative flex flex-col items-center z-10">
                {barFormat === 'mug' ? (
                  /* CANECO DE CHOPP EM ACRÍLICO CORTADO A LASER */
                  <>
                    {/* Espuma Branca em Acrílico Leitoso */}
                    <div className="w-56 h-14 bg-gradient-to-b from-slate-50 to-slate-200 rounded-t-3xl border-2 border-amber-300 shadow-md flex items-center justify-center gap-1 px-3 z-20">
                      <div className="w-6 h-6 rounded-full bg-white -mt-2 shadow-inner"></div>
                      <div className="w-8 h-8 rounded-full bg-white -mt-4 shadow-inner"></div>
                      <div className="w-9 h-9 rounded-full bg-white -mt-3 shadow-inner"></div>
                      <div className="w-7 h-7 rounded-full bg-white -mt-3 shadow-inner"></div>
                      <div className="w-6 h-6 rounded-full bg-white -mt-1 shadow-inner"></div>
                    </div>

                    {/* Corpo Âmbar Dourado com Frisos e Asa Lateral */}
                    <div className="w-60 min-h-[310px] bg-gradient-to-b from-amber-500/95 via-amber-600 to-amber-700 rounded-b-2xl border-4 border-amber-300 shadow-2xl p-4 flex flex-col justify-between text-center relative z-10">
                      {/* Asa da Caneca */}
                      <div className="absolute -right-9 top-8 w-12 h-36 rounded-r-3xl border-8 border-amber-300 bg-transparent pointer-events-none shadow-xl"></div>

                      <div className="pt-1">
                        <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase block">
                          {barName}
                        </span>
                        <span className="text-xs font-black text-white uppercase drop-shadow">
                          AVALIE NO GOOGLE
                        </span>
                      </div>

                      {/* As 3 Ações de Bar: Google, Wi-Fi, Cardápio */}
                      <div className="grid grid-cols-3 gap-2 my-auto px-1">
                        <div className="p-2 rounded-xl bg-black/40 border border-amber-300/60 flex flex-col items-center">
                          <Star className="w-5 h-5 text-amber-300 fill-current mb-0.5" />
                          <span className="text-[9px] font-bold text-white block">Google</span>
                          <span className="text-[7px] text-amber-200 block">5 Estrelas</span>
                        </div>
                        <div className="p-2 rounded-xl bg-black/40 border border-amber-300/60 flex flex-col items-center">
                          <Wifi className="w-5 h-5 text-emerald-300 mb-0.5" />
                          <span className="text-[9px] font-bold text-white block">Wi-Fi</span>
                          <span className="text-[7px] text-emerald-200 block">Conectar</span>
                        </div>
                        <div className="p-2 rounded-xl bg-black/40 border border-amber-300/60 flex flex-col items-center">
                          <Beer className="w-5 h-5 text-amber-200 mb-0.5" />
                          <span className="text-[9px] font-bold text-white block">Chopps</span>
                          <span className="text-[7px] text-amber-200 block">Cardápio</span>
                        </div>
                      </div>

                      {/* Tag NFC no Pé com Gatilho */}
                      <div className="bg-black/60 rounded-xl p-2.5 border border-amber-300/40 flex items-center justify-between text-left">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-amber-300 uppercase flex items-center gap-1">
                            <Smartphone className="w-3 h-3" /> Aproxime o celular
                          </span>
                          <p className="text-[8px] text-slate-200 leading-tight">
                            {barIncentive === 'shot' && 'Avalie e ganhe 1 Shot ou R$ 5 de desconto!'}
                            {barIncentive === 'wifi' && 'Conecte na rede Wi-Fi e acesse o cardápio'}
                            {barIncentive === 'cardapio' && 'Veja as torneiras de chopp engatadas'}
                          </p>
                        </div>
                        <div className="w-9 h-9 bg-white rounded p-0.5 shrink-0 flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-black" />
                        </div>
                      </div>
                    </div>

                    <div className="w-64 h-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-sm shadow-2xl mt-1 flex items-center justify-center">
                      <span className="text-[7px] font-black text-amber-950 uppercase tracking-wider">
                        BASE DUPLA ACRÍLICO MACIÇO
                      </span>
                    </div>
                  </>
                ) : (
                  /* TOTEM TRIANGULAR DE MESA (KIT 15 MESAS) */
                  <div className="w-56 h-72 bg-gradient-to-b from-stone-900 to-black rounded-2xl border-2 border-amber-400/80 p-4 shadow-2xl flex flex-col justify-between text-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 uppercase">Totem de Mesa #05</span>
                      <h5 className="text-xs font-black text-white uppercase">{barName}</h5>
                    </div>

                    <div className="space-y-2">
                      <div className="w-24 h-24 bg-white rounded-xl p-1 mx-auto shadow-md">
                        <QrCode className="w-full h-full text-black" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 flex items-center justify-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" /> Encoste o Celular Aqui
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-500/40 text-[9px] text-amber-200">
                      Cardápio Digital • Wi-Fi • Avalie com 5★
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================================================== */}
            {/* 3. VISUALIZADOR MÉDICOS (CRUZ MÉDICA / TITÂNIO)     */}
            {/* =================================================== */}
            {selectedNiche === 'doctors' && (
              <div className="relative flex flex-col items-center z-10">
                {/* Placa com formato de Brasão / Cruz Médica Nobre */}
                <div
                  className="w-72 min-h-[350px] rounded-2xl shadow-2xl p-5 flex flex-col justify-between items-center text-center relative transition-all"
                  style={{
                    background: doctorFinish === 'crystal' 
                      ? 'rgba(255,255,255,0.95)' 
                      : 'linear-gradient(to bottom, #0f172a, #020617)',
                    border: doctorFinish === 'gold'
                      ? '6px solid #fbbf24'
                      : doctorFinish === 'crystal'
                      ? '6px solid #38bdf8'
                      : '6px solid #94a3b8',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 20px rgba(56,189,248,0.15)'
                  }}
                >
                  {/* Cruz Médica em Relevo Espelhado no Topo */}
                  <div className="pt-1 space-y-1">
                    <div 
                      className="w-10 h-10 rounded-full mx-auto flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: doctorFinish === 'crystal' ? '#0284c7' : '#1e293b',
                        border: '2px solid #38bdf8'
                      }}
                    >
                      <Stethoscope className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h4 className={`text-xs font-black tracking-wider uppercase leading-tight ${
                      doctorFinish === 'crystal' ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {doctorName}
                    </h4>
                    <p className={`text-[8px] font-semibold uppercase tracking-wide ${
                      doctorFinish === 'crystal' ? 'text-slate-600' : 'text-cyan-400'
                    }`}>
                      {doctorSpecialty}
                    </p>
                  </div>

                  {/* As 3 Janelas Médicas: Google Avaliações, Doctoralia / WhatsApp, Retorno */}
                  <div className="grid grid-cols-3 gap-2 w-full px-1 my-3">
                    <div 
                      className="p-2 rounded-xl border flex flex-col items-center shadow-sm"
                      style={{
                        backgroundColor: doctorFinish === 'crystal' ? '#f8fafc' : '#0f172a',
                        borderColor: '#38bdf8'
                      }}
                    >
                      <div className="w-11 h-11 bg-white rounded p-0.5 shadow">
                        <QrCode className="w-full h-full text-black" />
                      </div>
                      <span className={`text-[8px] font-bold mt-1 ${
                        doctorFinish === 'crystal' ? 'text-slate-900' : 'text-slate-200'
                      }`}>
                        Google 5★
                      </span>
                    </div>

                    <div 
                      className="p-2 rounded-xl border flex flex-col items-center shadow-sm"
                      style={{
                        backgroundColor: doctorFinish === 'crystal' ? '#f8fafc' : '#0f172a',
                        borderColor: '#38bdf8'
                      }}
                    >
                      <div className="w-11 h-11 bg-white rounded p-0.5 shadow">
                        <QrCode className="w-full h-full text-black" />
                      </div>
                      <span className={`text-[8px] font-bold mt-1 ${
                        doctorFinish === 'crystal' ? 'text-slate-900' : 'text-slate-200'
                      }`}>
                        Doctoralia
                      </span>
                    </div>

                    <div 
                      className="p-2 rounded-xl border flex flex-col items-center shadow-sm"
                      style={{
                        backgroundColor: doctorFinish === 'crystal' ? '#f8fafc' : '#0f172a',
                        borderColor: '#38bdf8'
                      }}
                    >
                      <div className="w-11 h-11 bg-white rounded p-0.5 shadow">
                        <QrCode className="w-full h-full text-black" />
                      </div>
                      <span className={`text-[8px] font-bold mt-1 ${
                        doctorFinish === 'crystal' ? 'text-slate-900' : 'text-slate-200'
                      }`}>
                        Secretária
                      </span>
                    </div>
                  </div>

                  {/* Frase Ética de Recomendação */}
                  <div className={`p-2 rounded-xl border text-[9px] w-full ${
                    doctorFinish === 'crystal' 
                      ? 'bg-blue-50 border-blue-200 text-blue-900' 
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}>
                    "Sua avaliação ajuda outros pacientes a encontrar atendimento de excelência."
                  </div>

                  {/* NFC no Rodapé */}
                  <div className="flex items-center gap-1.5 text-[8px] font-mono text-cyan-400 uppercase tracking-widest pt-1">
                    <Smartphone className="w-3 h-3" />
                    <span>Aproxime o celular na consulta</span>
                  </div>
                </div>

                {/* Base de Sustentação */}
                <div className="w-72 h-4 bg-slate-900 border-t-2 border-cyan-500 rounded-sm shadow-2xl mt-1"></div>
              </div>
            )}

            <div className="text-[11px] text-stone-400 mt-4 font-mono z-10">
              Mockup fidedigno para apresentar na visita ou enviar no WhatsApp
            </div>
          </div>
        </div>

        {/* Coluna Direita: Personalizador, Argumentos de Venda e Scripts */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controles de Personalização da Peça */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-100 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Personalizar a Peça do Cliente</span>
            </h4>

            {selectedNiche === 'odonto' && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Nome da Clínica / Doutor(a):
                  </label>
                  <input
                    type="text"
                    value={odontoName}
                    onChange={(e) => setOdontoName(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-bold uppercase focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Especialidade & Registro CRO:
                  </label>
                  <input
                    type="text"
                    value={odontoSub}
                    onChange={(e) => setOdontoSub(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Acabamento do Acrílico Espelhado:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setOdontoFinish('gold')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        odontoFinish === 'gold' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Dourado Nobre
                    </button>
                    <button
                      onClick={() => setOdontoFinish('rosegold')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        odontoFinish === 'rosegold' ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Rose Gold
                    </button>
                    <button
                      onClick={() => setOdontoFinish('silver')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        odontoFinish === 'silver' ? 'bg-slate-700 border-slate-400 text-slate-200' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Prata / Inox
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedNiche === 'bars' && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Nome do Bar / Pub / Cervejaria:
                  </label>
                  <input
                    type="text"
                    value={barName}
                    onChange={(e) => setBarName(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-bold uppercase focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Formato da Peça:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBarFormat('mug')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        barFormat === 'mug' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Caneco de Chopp
                    </button>
                    <button
                      onClick={() => setBarFormat('table_tent')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        barFormat === 'table_tent' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Totem de Mesa
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedNiche === 'doctors' && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Nome do Médico(a) / Clínica:
                  </label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-bold uppercase focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Especialidade & CRM:
                  </label>
                  <input
                    type="text"
                    value={doctorSpecialty}
                    onChange={(e) => setDoctorSpecialty(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Acabamento da Peça Médica:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setDoctorFinish('titanium')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        doctorFinish === 'titanium' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Titânio Nobre
                    </button>
                    <button
                      onClick={() => setDoctorFinish('crystal')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        doctorFinish === 'crystal' ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Cristal Leitoso
                    </button>
                    <button
                      onClick={() => setDoctorFinish('gold')}
                      className={`p-1.5 rounded-lg text-xs font-bold border ${
                        doctorFinish === 'gold' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Ouro 24k
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Roteiro e Script de Abordagem para o Nicho Selecionado */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-100 text-xs flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Script de Abordagem Específico ({selectedNiche.toUpperCase()})</span>
              </h4>
              <button
                onClick={() => {
                  let textToCopy = '';
                  if (selectedNiche === 'odonto') {
                    textToCopy = `Doutor(a), uma consulta particular de implante ou clareamento custa mais de R$ 800. O paciente sai da cadeira feliz com o sorriso renovado, mas na hora de pagar no balcão ele esquece de avaliar. Criamos essa peça de acrílico recortada no formato do dente com espelho dourado: ao pagar no balcão, a secretária pede para ele aproximar o celular e a avaliação 5 estrelas cai na hora no seu Google Maps.`;
                  } else if (selectedNiche === 'bars') {
                    textToCopy = `Seus garçons não precisam ficar entregando cardápio nem repetindo senha de Wi-Fi toda hora. Colocamos o Totem de Chopp na mesa: o cliente conecta no Wi-Fi, abre o cardápio e, se der 5 estrelas no Google, ganha 1 shot da casa. O custo do shot é R$ 1, e você coloca seu bar em primeiro lugar na pesquisa do Google Maps no fim de semana!`;
                  } else {
                    textToCopy = `Doutor(a), a maioria dos pacientes que buscam dermatologia ou cirurgia particular pesquisam no Google antes de agendar. O paciente particular confia na pontuação de 5 estrelas com depoimentos. Desenvolvemos essa peça em acrílico cirúrgico nobre para a recepção: ao encerrar a consulta, a secretária entrega a nota e solicita a recomendação de 1 toque no Google.`;
                  }
                  handleCopy(textToCopy, `script-${selectedNiche}`);
                }}
                className="text-[11px] flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                {copiedScript === `script-${selectedNiche}` ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Script</span>
                  </>
                )}
              </button>
            </div>

            {/* Conteúdo do Script */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed italic">
              {selectedNiche === 'odonto' && (
                <>
                  "Doutor(a), uma única consulta de clareamento ou prótese custa de R$ 800 a R$ 2.500. O paciente sai da cadeira encantado com o resultado, mas esquece de avaliar no Google. 
                  Com essa peça em formato de dente espelhado na recepção, a secretária diz: <em>'Doutor pediu para aproximar seu celular no dente dourado para registrar seu sorriso com 5 estrelas'</em>. 
                  Sua clínica passa os concorrentes e atrai novos pacientes particulares todos os dias."
                </>
              )}
              {selectedNiche === 'bars' && (
                <>
                  "O cliente passa 3 horas sentado na sua mesa bebendo chopp com o celular na mão. Se o totem estiver na mesa com o incentivo: 
                  <em>'Avalie nosso atendimento com 5 estrelas e mostre ao garçom para ganhar 1 shot de cachaça artesanal ou R$ 5 de desconto'</em>, 
                  você ganha 30 a 50 avaliações todo final de semana. O custo de 1 shot é R$ 0,80 pro bar, e você domina o ranking de bares da cidade no Google!"
                </>
              )}
              {selectedNiche === 'doctors' && (
                <>
                  "Doutor(a), médicos particulares não dependem de convênio quando estão no topo do Google Maps com mais de 100 avaliações 5 estrelas. 
                  Desenvolvemos uma peça com acabamento em acrílico titânio que combina perfeitamente com clínicas de alto padrão. 
                  O paciente encosta o celular na saída e deixa o depoimento sobre o seu acolhimento em 3 segundos."
                </>
              )}
            </div>

            {/* Especificação Técnica para o Corte a Laser em Porto Alegre */}
            <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200 block">Especificações para Enviar à Gráfica de Corte a Laser:</span>
              <p>• <strong>Camada de Fundo:</strong> Acrílico Cast Branco Leitoso 3mm recortado a laser no formato.</p>
              <p>• <strong>Camada Frontal (Moldura):</strong> Acrílico Espelhado Dourado / Titânio 2mm colado com adesivo 3M.</p>
              <p>• <strong>Base:</strong> Acrílico Preto Black Piano 5mm com vinco de encaixe justo.</p>
              <p>• <strong>Tag NFC:</strong> NTAG213 colada no verso (atrás da camada leitosa de 3mm, o sinal lê perfeitamente a até 4cm).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
