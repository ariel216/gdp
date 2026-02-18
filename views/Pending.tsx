
import React, { useState, useMemo } from 'react';

interface PendingDocument {
  id: string;
  hr: string;
  nuri: string;
  type: string;
  typeIcon: string;
  reference: string;
  proveido: string;
  sender: string;
  senderOffice: string;
  moraDays: number;
  isConfidential?: boolean;
}

const Pending: React.FC = () => {
  // --- MOCK DATA ---
  const [documents, setDocuments] = useState<PendingDocument[]>([
    {
      id: '1',
      hr: 'HR-00245-2023',
      nuri: '2023-98421',
      type: 'Informe',
      typeIcon: 'article',
      reference: 'Solicitud de mantenimiento preventivo de equipos IT',
      proveido: 'Se requiere la revisión de los servidores del piso 4...',
      sender: 'Lic. Roberto Arce',
      senderOffice: 'Unidad de Sistemas',
      moraDays: 12
    },
    {
      id: '2',
      hr: 'HR-00251-2023',
      nuri: '2023-98455',
      type: 'Nota',
      typeIcon: 'lock',
      reference: 'Presupuesto Auditoría Externa Gestión 2023',
      proveido: 'Aprobación de fondos para consultoría especializada...',
      sender: 'Dra. María Vargas',
      senderOffice: 'Dirección Financiera',
      moraDays: 2,
      isConfidential: true
    },
    {
      id: '3',
      hr: 'HR-00262-2023',
      nuri: '2023-98490',
      type: 'Circular',
      typeIcon: 'mail',
      reference: 'Horarios de ingreso fiestas de fin de año',
      proveido: 'Se comunica a todo el personal el nuevo rol de turnos...',
      sender: 'Recursos Humanos',
      senderOffice: 'Administración Central',
      moraDays: 0
    },
    {
      id: '4',
      hr: 'HR-00270-2024',
      nuri: '2024-10221',
      type: 'Informe',
      typeIcon: 'article',
      reference: 'Evaluación técnica de plataforma interoperabilidad',
      proveido: 'Favor revisar el esquema de base de datos propuesto.',
      sender: 'Ing. Elena Rojas',
      senderOffice: 'Unidad de Desarrollo',
      moraDays: 6
    },
    {
      id: '5',
      hr: 'HR-00285-2024',
      nuri: '2024-10550',
      type: 'Memorándum',
      typeIcon: 'assignment',
      reference: 'Designación de custodia de archivos pasivos',
      proveido: 'Se asigna personal para la organización del archivo central.',
      sender: 'Lic. Pedro Marin',
      senderOffice: 'Servicios Generales',
      moraDays: 1
    }
  ]);

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Todos los tipos');
  const [filterOffice, setFilterOffice] = useState('Todas las oficinas');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Modal State
  const [isDeriveModalOpen, setIsDeriveModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<PendingDocument | null>(null);
  const [deriveStep, setDeriveStep] = useState(1);

  // --- DERIVED DATA (FILTERING) ---
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = 
        doc.nuri.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.hr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.reference.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'Todos los tipos' || doc.type === filterType;
      const matchesOffice = filterOffice === 'Todas las oficinas' || doc.senderOffice === filterOffice;

      return matchesSearch && matchesType && matchesOffice;
    });
  }, [documents, searchQuery, filterType, filterOffice]);

  // --- HANDLERS ---
  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredDocuments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDocuments.map(d => d.id)));
    }
  };

  const openDeriveModal = (doc: PendingDocument) => {
    setSelectedDoc(doc);
    setDeriveStep(1);
    setIsDeriveModalOpen(true);
  };

  const closeDeriveModal = () => {
    setIsDeriveModalOpen(false);
    setDeriveStep(1);
    setSelectedDoc(null);
  };

  const handleArchive = (id: string) => {
    if (confirm('¿Está seguro que desea archivar este trámite? Esta acción cerrará el ciclo del documento.')) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      alert('Documento archivado con éxito.');
    }
  };

  const handleBulkArchive = () => {
    if (confirm(`¿Archivar los ${selectedIds.size} documentos seleccionados?`)) {
      setDocuments(prev => prev.filter(d => !selectedIds.has(d.id)));
      setSelectedIds(new Set());
      alert('Trámites archivados correctamente.');
    }
  };

  const handleDeriveSubmit = () => {
    setDocuments(prev => prev.filter(d => d.id !== selectedDoc?.id));
    alert(`Documento ${selectedDoc?.nuri} derivado correctamente.`);
    closeDeriveModal();
  };

  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300 relative">
      <main className="max-w-[1600px] mx-auto w-full px-4 md:px-10 py-6 md:py-8 space-y-6 animate-in fade-in duration-500 pb-32">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight uppercase">Documentos Pendientes</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Gestione los trámites activos que requieren su atención u oficina.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
              <span className="material-symbols-outlined">file_download</span>
              Exportar
            </button>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">print</span> Imprimir
            </button>
          </div>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-4 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Búsqueda rápida</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold placeholder:text-slate-400 dark:text-white transition-all" 
                  placeholder="NURI, Hoja de Ruta o Referencia..." 
                  type="text"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Tipo Documental</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full h-12 border-none bg-slate-50 dark:bg-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 text-[11px] font-black uppercase tracking-widest px-4 appearance-none dark:text-white"
              >
                <option>Todos los tipos</option>
                <option>Nota</option>
                <option>Informe</option>
                <option>Circular</option>
                <option>Memorándum</option>
              </select>
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Origen / Remitente</label>
              <select 
                value={filterOffice}
                onChange={(e) => setFilterOffice(e.target.value)}
                className="w-full h-12 border-none bg-slate-50 dark:bg-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 text-[11px] font-black uppercase tracking-widest px-4 appearance-none dark:text-white"
              >
                <option>Todas las oficinas</option>
                <option>Unidad de Sistemas</option>
                <option>Dirección Financiera</option>
                <option>Administración Central</option>
                <option>Unidad de Desarrollo</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button 
                onClick={() => { setSearchQuery(''); setFilterType('Todos los tipos'); setFilterOffice('Todas las oficinas'); }}
                className="w-full h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between px-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Mostrando <span className="text-primary">{filteredDocuments.length}</span> documentos encontrados
          </p>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500"></span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">Crítico (+5 días)</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-amber-500"></span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">En curso</span>
             </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-5 w-12">
                    <input 
                      checked={selectedIds.size > 0 && selectedIds.size === filteredDocuments.length}
                      onChange={handleSelectAll}
                      className="rounded-lg border-slate-300 dark:border-slate-700 text-primary focus:ring-primary size-5 bg-white dark:bg-slate-800" 
                      type="checkbox" 
                    />
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoja de Ruta / NURI</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Referencia / Proveído</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Remitente</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Mora</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocuments.length > 0 ? filteredDocuments.map((doc) => (
                  <tr key={doc.id} className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors group ${selectedIds.has(doc.id) ? 'bg-primary/[0.02]' : ''}`}>
                    <td className="px-6 py-5">
                      <input 
                        checked={selectedIds.has(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        className="rounded-lg border-slate-300 dark:border-slate-700 text-primary focus:ring-primary size-5 bg-white dark:bg-slate-800 transition-all" 
                        type="checkbox" 
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`size-2 rounded-full animate-pulse ${doc.moraDays > 5 ? 'bg-red-500' : doc.moraDays > 0 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                        <div>
                          <span className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">{doc.hr}</span>
                          <span className="text-[10px] text-slate-400 font-mono font-bold block mt-0.5 tracking-widest">NURI: {doc.nuri}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                        doc.type === 'Informe' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        doc.type === 'Nota' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        <span className="material-symbols-outlined !text-sm font-bold">{doc.typeIcon}</span> {doc.type}
                      </span>
                      {doc.isConfidential && (
                        <div className="mt-2 flex items-center gap-1 text-[8px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-full tracking-tighter uppercase w-fit animate-pulse">
                          <span className="material-symbols-outlined !text-[10px]">lock</span>
                          Confidencial
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 max-w-xs">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 line-clamp-1 uppercase tracking-tight group-hover:text-primary transition-colors cursor-pointer">{doc.reference}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-2 mt-1 leading-relaxed">"{doc.proveido}"</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase truncate max-w-[150px]">{doc.sender}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5 truncate max-w-[150px]">{doc.senderOffice}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-[10px] font-black uppercase tracking-widest tabular-nums ${doc.moraDays > 5 ? 'text-red-600' : doc.moraDays > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                          {doc.moraDays === 0 ? '< 1 día' : `${doc.moraDays} días`}
                        </span>
                        <div className="w-14 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden shadow-inner">
                          <div 
                            className={`h-full transition-all duration-1000 ${doc.moraDays > 5 ? 'bg-red-500' : doc.moraDays > 0 ? 'bg-amber-500' : 'bg-green-500'}`} 
                            style={{ width: `${Math.min(100, (doc.moraDays / 15) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all" title="Ver Detalle"><span className="material-symbols-outlined !text-2xl font-bold">visibility</span></button>
                        <button onClick={() => openDeriveModal(doc)} className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all" title="Derivar"><span className="material-symbols-outlined !text-2xl font-bold">forward</span></button>
                        <button onClick={() => handleArchive(doc.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all" title="Archivar"><span className="material-symbols-outlined !text-2xl font-bold">inventory_2</span></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-32 text-center">
                      <div className="size-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <span className="material-symbols-outlined !text-5xl text-slate-300 dark:text-slate-600">inbox</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Bandeja sin resultados</h3>
                      <p className="text-slate-400 dark:text-slate-600 mt-2 font-medium">Ajuste los filtros o términos de búsqueda.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Simulation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Sincronizado hace unos segundos • Sistema GPD v4.0</p>
          <div className="flex items-center gap-2">
             <button className="size-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
             </button>
             <button className="size-10 bg-primary text-white rounded-xl text-xs font-black shadow-lg shadow-primary/30">1</button>
             <button className="size-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-black hover:bg-slate-50 transition-all">2</button>
             <button className="size-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
             </button>
          </div>
        </div>
      </main>

      {/* Floating Action Bar for Bulk Selection */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
           <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-6 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex items-center gap-10 border border-white/10 dark:border-slate-200 backdrop-blur-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Documentos Seleccionados</span>
                <span className="text-3xl font-black tabular-nums">{selectedIds.size}</span>
              </div>
              <div className="h-14 w-px bg-white/10 dark:bg-slate-200"></div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBulkArchive}
                  className="bg-primary text-white px-8 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95"
                >
                  Archivar en Lote
                </button>
                <button 
                  className="bg-white/10 dark:bg-slate-100 text-white dark:text-slate-900 px-6 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 dark:hover:bg-slate-200 transition-all active:scale-95"
                >
                  Exportar PDF
                </button>
                <button 
                  onClick={() => setSelectedIds(new Set())}
                  className="px-6 h-14 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors"
                >
                  Cancelar
                </button>
              </div>
           </div>
        </div>
      )}

      {/* --- DERIVE MODAL --- */}
      {isDeriveModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#1a2632] w-full max-w-[900px] rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] flex flex-col max-h-[95vh] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-slate-100 dark:border-white/10 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Derivación de Trámite</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">NURI: {selectedDoc.nuri}</span>
                  <span className="text-slate-300 dark:text-slate-700 text-xs">|</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-bold truncate max-w-[400px] uppercase tracking-tighter italic">Ref: {selectedDoc.reference}</span>
                </div>
              </div>
              <button onClick={closeDeriveModal} className="text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 p-3 rounded-full transition-all active:scale-90">
                <span className="material-symbols-outlined !text-3xl">close</span>
              </button>
            </div>

            {/* Stepper Progress */}
            <div className="px-12 pt-10 pb-6">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-white/5 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500" 
                  style={{ width: deriveStep === 1 ? '0%' : deriveStep === 2 ? '50%' : '100%' }}
                ></div>

                {[
                  { n: 1, label: 'Destinatario' },
                  { n: 2, label: 'Instrucciones' },
                  { n: 3, label: 'Finalizar' }
                ].map((s) => (
                  <div key={s.n} className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`size-12 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-xl ${deriveStep >= s.n ? 'bg-primary text-white shadow-primary/30 scale-110' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                      {deriveStep > s.n ? <span className="material-symbols-outlined !text-2xl">check</span> : s.n}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${deriveStep >= s.n ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              
              {deriveStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Buscar Servidor Público / Oficina</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors !text-3xl">person_search</span>
                      <input className="w-full pl-16 pr-6 py-6 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-[2rem] text-lg font-bold focus:ring-8 focus:ring-primary/10 transition-all dark:text-white outline-none" placeholder="Escriba el nombre o cargo..." type="text" autoFocus/>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Dra. Andrea Villarroel', 'Lic. Milton Paz', 'Ing. Clara Rojas', 'Dr. Sergio Bustos'].map((name, i) => (
                      <div key={i} className="p-6 rounded-[2rem] border-2 border-slate-50 dark:border-white/5 bg-slate-50/20 dark:bg-white/5 flex items-center gap-5 hover:border-primary hover:bg-primary/5 cursor-pointer group transition-all">
                        <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-base uppercase shadow-lg shadow-primary/20">
                          {name.split(' ').filter(x => x.length > 2).map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase truncate">{name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Dirección General Técnica</p>
                        </div>
                        <span className="material-symbols-outlined ml-auto text-slate-200 group-hover:text-primary transition-colors">check_circle</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {deriveStep === 2 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] px-1">Acción Requerida *</label>
                      <select className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-sm font-black uppercase tracking-tight px-6 appearance-none shadow-sm outline-none">
                        <option>Para su revisión y V°B°</option>
                        <option>Elaborar informe técnico</option>
                        <option>Para su archivo respectivo</option>
                        <option>Conocimiento y fines</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] px-1">Motivo de envío</label>
                      <select className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-sm font-black uppercase tracking-tight px-6 appearance-none shadow-sm outline-none">
                        <option>Urgencia institucional</option>
                        <option>Trámite de rutina</option>
                        <option>Solicitud del usuario</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Proveído Detallado *</label>
                      <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest opacity-60">Máximo 500 caracteres</span>
                    </div>
                    <textarea className="w-full rounded-[2.5rem] border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-base p-10 placeholder:text-slate-300 resize-none font-medium leading-relaxed shadow-inner outline-none" placeholder="Ingrese las instrucciones precisas para el destinatario..." rows={5}></textarea>
                  </div>

                  <div className="flex items-center gap-6 p-8 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-100 dark:border-orange-900/30 rounded-[2.5rem] group transition-all hover:bg-orange-100/50">
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 scale-125">
                      <input className="sr-only peer" type="checkbox" value=""/>
                      <div className="w-12 h-6.5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange-600 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-5.5 after:w-5.5 after:transition-all shadow-inner transition-colors"></div>
                    </label>
                    <div className="flex flex-col">
                      <span className="text-base font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest">Trámite con prioridad ALTA</span>
                      <span className="text-xs text-orange-600/80 dark:text-orange-400/60 font-medium">El destinatario recibirá alertas visuales críticas en su bandeja personal.</span>
                    </div>
                  </div>
                </div>
              )}

              {deriveStep === 3 && (
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300 text-center">
                   <div className="size-32 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/10">
                      <span className="material-symbols-outlined !text-7xl font-black">task_alt</span>
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Confirmación de Salida</h3>
                   <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
                     Se ha verificado la integridad de los datos. Al confirmar, el documento abandonará su bandeja de pendientes y se generará el movimiento oficial al destinatario seleccionado.
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
                      <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] text-left border border-slate-100 dark:border-white/5">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">DESTINATARIO FINAL</p>
                         <p className="text-base font-black text-slate-900 dark:text-white uppercase leading-none">Dra. Andrea Villarroel</p>
                         <p className="text-[11px] text-slate-500 font-bold uppercase mt-2 tracking-tight">Dir. General Técnica</p>
                      </div>
                      <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] text-left border border-slate-100 dark:border-white/5">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">MODALIDAD DE ENVÍO</p>
                         <div className="flex items-center gap-3">
                            <span className="size-3 rounded-full bg-primary animate-pulse"></span>
                            <p className="text-base font-black text-slate-900 dark:text-white uppercase">REVISIÓN Y V°B°</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-12 py-10 border-t border-slate-100 dark:border-white/10 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5 shrink-0">
              <button onClick={closeDeriveModal} className="px-10 py-4 text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-widest rounded-2xl transition-all hover:bg-red-50 active:scale-95">
                Cancelar Proceso
              </button>
              <div className="flex gap-4">
                {deriveStep > 1 && (
                  <button 
                    onClick={() => setDeriveStep(deriveStep - 1)}
                    className="px-10 py-4 text-xs font-black text-slate-700 dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 rounded-2xl transition-all flex items-center gap-3 uppercase tracking-widest active:scale-95"
                  >
                    <span className="material-symbols-outlined !text-xl font-bold">arrow_back</span>
                    Paso Anterior
                  </button>
                )}
                
                {deriveStep < 3 ? (
                  <button 
                    onClick={() => setDeriveStep(deriveStep + 1)}
                    className="px-14 py-4 text-xs font-black text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-2xl transition-all shadow-2xl flex items-center gap-3 uppercase tracking-widest active:scale-95 group"
                  >
                    Continuar
                    <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform font-bold">arrow_forward</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleDeriveSubmit}
                    className="px-20 py-5 text-xs font-black text-white bg-primary hover:bg-blue-600 rounded-2xl transition-all shadow-[0_20px_60px_rgba(19,127,236,0.35)] flex items-center gap-4 uppercase tracking-widest active:scale-95 group"
                  >
                    Registrar y Derivar
                    <span className="material-symbols-outlined !text-2xl group-hover:scale-125 transition-transform font-black">send</span>
                  </button> 
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;
