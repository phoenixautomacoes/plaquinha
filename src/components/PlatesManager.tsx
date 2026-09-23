import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Copy, 
  Check, 
  Edit3, 
  Zap, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Download,
  AlertCircle,
  Phone,
  MapPin,
  TrendingUp,
  RotateCcw,
  Target
} from 'lucide-react';
import { Plate, PlateStatus } from '../types';
import { getPlateRedirectUrl, getEffectivePlateUrls, validateAndNormalizeUrl, formatSerial, generateSafeCode } from '../utils/codeGenerator';

interface PlatesManagerProps {
  plates: Plate[];
  onUpdatePlate: (updated: Plate) => void;
  onAddNewPlate: (plate: Plate) => void;
  onSelectForPrint: (plate: Plate) => void;
  onResetData?: () => void;
}

export const PlatesManager: React.FC<PlatesManagerProps> = ({
  plates,
  onUpdatePlate,
  onAddNewPlate,
  onSelectForPrint,
  onResetData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PlateStatus>('all');
  const [editingPlate, setEditingPlate] = useState<Plate | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [destinationInput, setDestinationInput] = useState('');
  const [clientNameInput, setClientNameInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [neighborhoodInput, setNeighborhoodInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [salePriceInput, setSalePriceInput] = useState('119');
  const [monthlyPlanActiveInput, setMonthlyPlanActiveInput] = useState(false);
  const [notesInput, setNotesInput] = useState('');
  const [customNfcUrlInput, setCustomNfcUrlInput] = useState('');
  const [customQrUrlInput, setCustomQrUrlInput] = useState('');
  const [linkModeInput, setLinkModeInput] = useState<'direct' | 'dynamic'>('direct');
  const [editError, setEditError] = useState<string | null>(null);

  const handleCreateNewPlate = () => {
    const nextSerial = plates.length > 0 ? Math.max(...plates.map((p) => p.serial)) + 1 : 1;
    const newCode = generateSafeCode(4);
    const newPlate: Plate = {
      id: `plate-${Date.now()}`,
      serial: nextSerial,
      code: newCode,
      batchId: plates[0]?.batchId || 'batch-001',
      destination: '',
      linkMode: 'direct',
      status: 'stock',
      salePrice: 119,
      scansCountNfc: 0,
      scansCountQr: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onAddNewPlate(newPlate);
    handleOpenEdit(newPlate);
  };

  // Filtragem
  const filteredPlates = plates.filter((plate) => {
    const formatted = formatSerial(plate.serial);
    const matchesSearch =
      plate.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatted.includes(searchTerm) ||
      plate.serial.toString().includes(searchTerm) ||
      (plate.clientName && plate.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (plate.neighborhood && plate.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || plate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (plate: Plate) => {
    setEditingPlate(plate);
    setDestinationInput(plate.destination || '');
    setClientNameInput(plate.clientName || '');
    setCategoryInput(plate.companyCategory || '');
    setNeighborhoodInput(plate.neighborhood || '');
    setPhoneInput(plate.phone || '');
    setSalePriceInput((plate.salePrice !== undefined ? plate.salePrice : 119).toString());
    setMonthlyPlanActiveInput(plate.monthlyPlanActive || false);
    setNotesInput(plate.notes || '');
    setCustomNfcUrlInput(plate.customNfcUrl || '');
    setCustomQrUrlInput(plate.customQrUrl || '');
    setLinkModeInput(plate.linkMode || (plate.destination ? 'direct' : 'dynamic'));
    setEditError(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlate) return;

    if (destinationInput.trim() !== '') {
      const validation = validateAndNormalizeUrl(destinationInput);
      if (!validation.valid) {
        setEditError(validation.error || 'URL inválida');
        return;
      }
      destinationInput.trim();
    }

    const effectiveMode = linkModeInput || (destinationInput.trim() ? 'direct' : 'dynamic');

    const updated: Plate = {
      ...editingPlate,
      clientName: clientNameInput.trim() || undefined,
      companyCategory: categoryInput.trim() || undefined,
      neighborhood: neighborhoodInput.trim() || undefined,
      phone: phoneInput.trim() || undefined,
      destination: destinationInput.trim(),
      linkMode: effectiveMode,
      salePrice: salePriceInput.trim() !== '' ? Number(salePriceInput) : 119,
      status: destinationInput.trim() ? 'active' : 'stock',
      monthlyPlanActive: monthlyPlanActiveInput,
      monthlyPlanPrice: monthlyPlanActiveInput ? (editingPlate.monthlyPlanPrice || 99) : undefined,
      notes: notesInput.trim(),
      customNfcUrl: customNfcUrlInput.trim() || undefined,
      customQrUrl: customQrUrlInput.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };

    onUpdatePlate(updated);
    setEditingPlate(null);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exportCsv = () => {
    const headers = ['Serial', 'Codigo', 'Cliente', 'Bairro', 'Status', 'Modo_Link', 'Valor_Negociado', 'Destino', 'Scans_NFC', 'Scans_QR', 'URL_NFC', 'URL_QR'];
    const rows = plates.map((p) => {
      const { nfcUrl, qrUrl, isDirect } = getEffectivePlateUrls(p);
      return [
        formatSerial(p.serial),
        p.code,
        `"${p.clientName || ''}"`,
        `"${p.neighborhood || ''}"`,
        p.status,
        isDirect ? 'Direto' : 'Dinamico',
        p.salePrice ?? 119,
        `"${p.destination || ''}"`,
        p.scansCountNfc,
        p.scansCountQr,
        nfcUrl,
        qrUrl,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lote_placas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalPreview = editingPlate
    ? getEffectivePlateUrls(
        {
          code: editingPlate.code,
          destination: destinationInput.trim(),
          linkMode: linkModeInput,
          customNfcUrl: customNfcUrlInput.trim() || undefined,
          customQrUrl: customQrUrlInput.trim() || undefined,
        },
        linkModeInput
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Top Header & Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total de Placas</span>
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <QrCode className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-100 mt-2">{plates.length}</p>
          <p className="text-xs text-slate-400 mt-1">Lote 001 ({plates.filter((p) => p.status === 'stock').length} em estoque)</p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Placas Ativas (Vendidas)</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-2">
            {plates.filter((p) => p.status === 'active').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Receita realizada: R$ {plates.filter((p) => p.status === 'active').reduce((acc, p) => acc + (p.salePrice ?? 119), 0).toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Leituras NFC vs QR</span>
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-xl font-bold text-amber-400">
              {plates.reduce((acc, p) => acc + (p.scansCountNfc || 0), 0)} <span className="text-xs text-slate-400">NFC</span>
            </p>
            <span className="text-slate-500">/</span>
            <p className="text-xl font-bold text-indigo-400">
              {plates.reduce((acc, p) => acc + (p.scansCountQr || 0), 0)} <span className="text-xs text-slate-400">QR</span>
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-1">Métricas em tempo real por aproximação e leitura</p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Recorrência Mensal</span>
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-400 mt-2">
            R$ {plates.filter((p) => p.monthlyPlanActive).reduce((acc, p) => acc + (p.monthlyPlanPrice || 99), 0)}/mês
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {plates.filter((p) => p.monthlyPlanActive).length} clientes no Plano de Gestão
          </p>
        </div>
      </div>

      {/* Barra de Filtros & Ações */}
      <div className="bg-slate-800/90 border border-slate-700/70 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-plates-input"
              type="text"
              placeholder="Buscar por cliente, bairro, serial #0001 ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            id="status-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">Todos os Status ({plates.length})</option>
            <option value="active">Ativas / Vendidas ({plates.filter((p) => p.status === 'active').length})</option>
            <option value="stock">Em Estoque / Virgens ({plates.filter((p) => p.status === 'stock').length})</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {onResetData && (
            <button
              onClick={() => {
                if (window.confirm('Deseja restaurar os dados do sistema para o estado inicial limpo (0 vendas, 30 placas em estoque e 0 prospecções)?')) {
                  onResetData();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700/60 hover:bg-rose-900/40 hover:text-rose-300 text-slate-300 text-xs font-semibold transition-colors border border-slate-600/50"
              title="Restaurar para o estado inicial limpo (0 vendas)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Zerar Dados</span>
            </button>
          )}

          <button
            id="export-csv-btn"
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            title="Exportar dados do lote para a gráfica ou backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV Gráfica</span>
          </button>

          <button
            id="add-new-plate-btn"
            onClick={handleCreateNewPlate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
            title="Cadastrar uma nova placa além das 30 iniciais"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nova Placa</span>
          </button>
        </div>
      </div>

      {/* Lista de Placas */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Serial & Código</th>
                <th className="py-3 px-4">Cliente / Estabelecimento</th>
                <th className="py-3 px-4">Destino (Google / Link)</th>
                <th className="py-3 px-4 text-center">Valor Placa</th>
                <th className="py-3 px-4 text-center">NFC vs QR</th>
                <th className="py-3 px-4 text-center">Gestão Mensal</th>
                <th className="py-3 px-4 text-right">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredPlates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto text-slate-400">
                        <CheckCircle2 className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-200">
                        {statusFilter === 'active' 
                          ? 'Nenhuma placa vendida ou ativa ainda' 
                          : 'Nenhuma placa encontrada'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {statusFilter === 'active' 
                          ? 'Todas as 30 placas do lote estão virgens em estoque aguardando seu primeiro cliente. Alterne para "Em Estoque" para visualizar e configurar uma placa.' 
                          : 'Tente ajustar os termos de pesquisa ou remover os filtros aplicados.'}
                      </p>
                      {statusFilter === 'active' && (
                        <button
                          onClick={() => setStatusFilter('stock')}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                        >
                          Ver Placas em Estoque
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPlates.map((plate) => {
                  const { nfcUrl, qrUrl, isDirect } = getEffectivePlateUrls(plate);
                  const isStock = plate.status === 'stock';

                  return (
                    <tr key={plate.id} className="hover:bg-slate-750/40 transition-colors">
                      {/* Serial e Código */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-100 text-base bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                            #{formatSerial(plate.serial)}
                          </span>
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {plate.code}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          {isStock ? (
                            <span className="text-amber-400 font-medium">● Estoque Virgem</span>
                          ) : (
                            <span className="text-emerald-400 font-medium">● Ativa no Balcão</span>
                          )}
                        </div>
                      </td>

                      {/* Cliente e Bairro */}
                      <td className="py-3.5 px-4">
                        {plate.clientName ? (
                          <div>
                            <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                              <span>{plate.clientName}</span>
                              {plate.phone && (
                                <a
                                  href={`https://wa.me/55${plate.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                    `Olá ${plate.clientName}, aqui é da Phoenix Automações! Sua plaquinha do Google Avaliações já está pronta com o link oficial. Segue o link para conferir: ${plate.destination || ''}`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 p-0.5"
                                  title={`Enviar link de teste no WhatsApp: ${plate.phone}`}
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                              {plate.neighborhood && (
                                <span className="flex items-center gap-0.5 text-slate-300">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  {plate.neighborhood}
                                </span>
                              )}
                              {plate.companyCategory && (
                                <span className="text-slate-400">· {plate.companyCategory}</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-400 italic text-xs">
                            Aguardando venda/cliente na rua
                          </div>
                        )}
                      </td>

                      {/* Destino Dinâmico ou Direto */}
                      <td className="py-3.5 px-4 max-w-xs">
                        {plate.destination ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                                isDirect 
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                              }`}>
                                {isDirect ? '🎯 Direto Google' : '⚡ 302'}
                              </span>
                              <span className="truncate text-xs font-mono text-slate-300 block max-w-[180px]" title={plate.destination}>
                                {plate.destination}
                              </span>
                              <a
                                href={plate.destination}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:text-blue-300 p-0.5 shrink-0"
                                title="Abrir link de destino em nova aba"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-[11px]">
                              <button
                                onClick={() => handleCopy(nfcUrl, `nfc-${plate.id}`)}
                                className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
                                title={`Copiar URL gravada no NFC: ${nfcUrl}`}
                              >
                                {copiedCode === `nfc-${plate.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>Copiar NFC ({isDirect ? 'Direto' : 'App'})</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Sem link (Aponta p/ tela de ativação)
                          </span>
                        )}
                      </td>

                      {/* Valor Placa */}
                      <td className="py-3.5 px-4 text-center">
                        {isStock ? (
                          <span className="text-xs font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60" title="Valor de tabela em estoque">
                            R$ {plate.salePrice ?? 119}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 shadow-sm" title="Valor negociado da placa">
                            R$ {plate.salePrice ?? 119}
                          </span>
                        )}
                      </td>

                      {/* Scans NFC vs QR */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/60 text-xs">
                          <span className="text-amber-400 font-semibold" title="Leituras aproximando por NFC">
                            ⚡ {plate.scansCountNfc || 0}
                          </span>
                          <span className="text-slate-600">|</span>
                          <span className="text-indigo-400 font-semibold" title="Leituras apontando a câmera no QR">
                            📷 {plate.scansCountQr || 0}
                          </span>
                        </div>
                      </td>

                      {/* Recorrência */}
                      <td className="py-3.5 px-4 text-center">
                        {plate.monthlyPlanActive ? (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                            <TrendingUp className="w-3 h-3" />
                            R$ {plate.monthlyPlanPrice || 99}/mês
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">Avulso</span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            id={`edit-plate-${plate.id}`}
                            onClick={() => handleOpenEdit(plate)}
                            className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                            title="Editar destino, cliente e dados"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            id={`print-plate-${plate.id}`}
                            onClick={() => onSelectForPrint(plate)}
                            className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white border border-indigo-500/40 transition-colors"
                            title="Visualizar arte da placa 10x15 pronta para impressão"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edição de Placa */}
      {editingPlate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                  Configurar Placa #{formatSerial(editingPlate.serial)}
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {editingPlate.code}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Troca de destino com efeito instantâneo (Redirecionamento 302 no-store)
                </p>
              </div>
              <button
                onClick={() => setEditingPlate(null)}
                className="text-slate-400 hover:text-slate-200 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              {editError && (
                <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              {/* URL de Destino Principal */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  URL de Destino (Link do Google Avaliações ou Perfil da Empresa) *
                </label>
                <input
                  id="modal-destination-input"
                  type="text"
                  placeholder="https://maps.app.goo.gl/... ou https://..."
                  value={destinationInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDestinationInput(val);
                    if (val.trim() && !destinationInput.trim()) {
                      setLinkModeInput('direct');
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Dica: para a avaliação abrir direto, use o link oficial de avaliação do Perfil da Empresa no Maps.
                </p>
              </div>

              {/* Modo de Destino do QR Code e NFC */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>Modo do QR Code & Gravação NFC:</span>
                  </label>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    linkModeInput === 'direct'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  }`}>
                    {linkModeInput === 'direct' ? '🎯 Direto do Cliente' : '⚡ Dinâmico 302'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLinkModeInput('direct')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      linkModeInput === 'direct'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>🎯 Link Direto (Finalizado)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-tight">
                      Gera o QR Code da placa e a gravação NFC já com o link direto do cliente. Pronto para gráfica!
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLinkModeInput('dynamic')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      linkModeInput === 'dynamic'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-300">
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Dinâmico Phoenix 302</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-tight">
                      Gera ?r={editingPlate?.code} e permite trocar o link de destino em nuvem a qualquer momento.
                    </p>
                  </button>
                </div>

                {/* Prévia dos Links em Tempo Real */}
                {modalPreview && (
                  <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-semibold text-slate-300">QR Code na Placa:</span>
                      <span className="font-mono text-indigo-300 truncate max-w-[260px]" title={modalPreview.qrUrl}>
                        {modalPreview.qrUrl}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-semibold text-slate-300">Tag NFC (Gravação):</span>
                      <span className="font-mono text-amber-300 truncate max-w-[260px]" title={modalPreview.nfcUrl}>
                        {modalPreview.nfcUrl}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dados do Cliente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome do Estabelecimento
                  </label>
                  <input
                    id="modal-client-name"
                    type="text"
                    placeholder="Ex: Salão Beleza Pura"
                    value={clientNameInput}
                    onChange={(e) => setClientNameInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Categoria do Negócio
                  </label>
                  <input
                    id="modal-category"
                    type="text"
                    placeholder="Ex: Barbearia, Pet Shop, Clínica"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bairro / Região
                  </label>
                  <input
                    id="modal-neighborhood"
                    type="text"
                    placeholder="Centro, Bairro..."
                    value={neighborhoodInput}
                    onChange={(e) => setNeighborhoodInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp do Comerciante
                  </label>
                  <input
                    id="modal-phone"
                    type="text"
                    placeholder="(51) 99999-9999"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Valor Negociado da Placa */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Valor Negociado da Placa (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm font-semibold text-slate-400">R$</span>
                  <input
                    id="modal-sale-price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="119"
                    value={salePriceInput}
                    onChange={(e) => setSalePriceInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-100 font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Valor cobrado na implantação (Tabela R$ 119 ou valor personalizado no balcão).
                </p>
              </div>

              {/* Plano de Gestão Recorrente */}
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={monthlyPlanActiveInput}
                    onChange={(e) => setMonthlyPlanActiveInput(e.target.checked)}
                    className="rounded border-purple-500 text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-purple-300 block">
                      Ativar Plano de Gestão Mensal (Recorrência R$ 79–149/mês)
                    </span>
                    <span className="text-[11px] text-purple-200/70">
                      Inclui controle dinâmico do link, relatório mensal de acessos e monitoramento de avaliações.
                    </span>
                  </div>
                </label>
              </div>

              {/* Links de Gravação Customizados (NFC / QR) */}
              <div className="p-3 bg-slate-900/80 border border-slate-700/80 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">
                    Links da Placa (NFC & QR Code)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Deixe em branco para usar o redirecionador padrão dinâmico
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-amber-300 mb-1">
                      Link Gravado na Tag NFC:
                    </label>
                    <input
                      type="text"
                      placeholder={`Padrão: ${editingPlate ? getPlateRedirectUrl(editingPlate.code, 'nfc') : ''}`}
                      value={customNfcUrlInput}
                      onChange={(e) => setCustomNfcUrlInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-indigo-300 mb-1">
                      Link Embutido no QR Code:
                    </label>
                    <input
                      type="text"
                      placeholder={`Padrão: ${editingPlate ? getPlateRedirectUrl(editingPlate.code, 'qr') : ''}`}
                      value={customQrUrlInput}
                      onChange={(e) => setCustomQrUrlInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notas de Visita / Observações
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  placeholder="Ex: Placa entregue na mão com 50% de sinal. Oferecer estruturação do Perfil Google na 2ª semana."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPlate(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancelar
                </button>
                <button
                  id="save-edit-plate-btn"
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
