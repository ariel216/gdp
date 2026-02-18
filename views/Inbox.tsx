
import React, { useState, useMemo } from 'react';

interface InboxDocument {
  id: string;
  nuri: string;
  title: string;
  sender: string;
  senderRole: string;
  origin: string;
  originOffice: string;
  status: 'atraso' | 'pendiente' | 'hoy';
  statusText: string;
  type: 'oficial' | 'externo';
  proveido: string;
}

const Inbox: React.FC = () => {
  // --- MOCK DATA ---
  const initialDocs: InboxDocument[] = [
    {
      id: '1',
      nuri: '2024-MIN-00982',
      title: 'Solicitud de Adquisición de Equipamiento de Red Core - Fase II',
      sender: 'Ing. Roberto Castillo',
      senderRole: 'Jefe de Infraestructura IT',
      origin: 'Dirección de Sistemas',
      originOffice: 'Viceministerio de Telecomunicaciones',
      status: 'atraso',
      statusText: '4 DÍAS ATRASO',
      type: 'oficial',
      proveido: 'Se autoriza la revisión técnica. Favor derivar a Presupuesto para validación de fondos 2024.'
    },
    {
      id: '2',
      nuri: '2024-EXT-1123',
      title: 'Invitación al Foro Internacional de Modernización del Estado 2024',
      sender: 'Dra. Martha Luz Arrieta',
      senderRole: 'Directora Ejecutiva',
      origin: 'Fundación Nueva Gestión',
      originOffice: 'Entidad Privada - La Paz',
      status: 'pendiente',
      statusText: '2 DÍAS PENDIENTE',
      type: 'externo',
      proveido: 'Agradecer invitación y coordinar agenda de la máxima autoridad.'
    },
    {
      id: '3',
      nuri: '2024-ADM-00045',
      title: 'Memorándum de Designación de Comisión Calificadora - Licitación G-001/2024',
      sender: 'Lic. Carlos Mendizábal',
      senderRole: 'Director Administrativo',
      origin: 'Dirección General Administrativa',
      originOffice: 'Oficina Central',
      status: 'hoy',
      statusText: 'HOY',
      type: 'oficial',
      proveido: 'Notificar a los integrantes designados de manera inmediata vía correo institucional.'
    }
  ];

  // --- STATE ---
  const [documents, setDocuments] = useState<InboxDocument[]>(initialDocs);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Fecha (Más reciente)');
  
  // Modal State
  const [isDeriveModalOpen, setIsDeriveModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<InboxDocument | null>(null);
  const [deriveStep, setDeriveStep] = useState(1);

  // --- HANDLERS ---
  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleReceive = (id: string) => {
    if (confirm('¿Confirmar la recepción de este documento?')) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleBulkReceive = () => {
    if (confirm(`¿Confirmar la recepción masiva de ${selectedIds.size} documentos?`)) {
      setDocuments(prev => prev.filter(d => !selectedIds.has(d.id)));
      setSelectedIds(new Set());
    }
  };

  const openDeriveModal = (doc: InboxDocument) => {
    setSelectedDoc(doc);
    setDeriveStep(1);
    setIsDeriveModalOpen(true);
  };

  const closeDeriveModal = () => {
    setIsDeriveModalOpen(false);
    setSelectedDoc(null);
  };

  const handleDeriveComplete = () => {
    if (selectedDoc) {
      setDocuments(prev => prev.filter(d => d.id !== selectedDoc.id));
      alert(`Documento ${selectedDoc.nuri} derivado y recibido con éxito.`);
      closeDeriveModal();
    }
  };

  // --- FILTERED & SORTED DATA ---
  const filteredDocs = useMemo(() => {
    let result = documents.filter(doc => 
      doc.nuri.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'Hoja Ruta (NURI)') {
      result.sort((a, b) => a.nuri.localeCompare(b.nuri));
    } else if (sortBy === 'Oficina Origen') {
      result.sort((a, b) => a.origin.localeCompare(b.origin));
    }
    
    return result;
  }, [documents, searchQuery, sortBy]);

  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300 relative">
      <main className="max-w-[1600px] mx-auto w-full px-4 md:px-10 py-6 md:py-8 space-y-6 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div className="space-y-1">
            <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight uppercase">Bandeja de Entrada</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Gestión y recepción oficial de correspondencia y trámites internos.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
              <span className="material-symbols-outlined text-primary font-bold">menu_book</span>
              Recibir + Libro
            </button>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex flex-1 w-full items-center gap-3">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400 transition-all" 
                placeholder="Buscar por NURI, Remitente o Referencia..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0">
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Ordenar:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border-none bg-slate-50 dark:bg-slate-800 rounded-xl py-2.5 pl-4 pr-10 focus:ring-4 focus:ring-primary/10 font-black text-slate-900 dark:text-white transition-all w-full uppercase"
              >
                <option>Fecha (Más reciente)</option>
                <option>Hoja Ruta (NURI)</option>
                <option>Oficina Origen</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Area / List */}
        <div className="space-y-4 pb-32">
          {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-5 md:p-6 transition-all flex flex-col md:flex-row gap-6 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-2xl dark:hover:shadow-primary/5 ${selectedIds.has(doc.id) ? 'ring-4 ring-primary/20 border-primary dark:border-primary' : ''}`}
            >
              <div className="flex items-start gap-5">
                <div className="pt-2">
                  <input 
                    checked={selectedIds.has(doc.id)}
                    onChange={() => toggleSelect(doc.id)}
                    className="rounded-xl border-slate-300 dark:border-slate-700 text-primary focus:ring-primary focus:ring-offset-0 size-6 cursor-pointer bg-white dark:bg-slate-800 transition-all" 
                    type="checkbox"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className={`size-12 rounded-2xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 shadow-inner ${
                    doc.type === 'oficial' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  }`}>
                    <span className="material-symbols-outlined !text-3xl font-bold">
                      {doc.type === 'oficial' ? 'verified' : 'person_pin_circle'}
                    </span>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${
                    doc.type === 'oficial' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {doc.type}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-primary font-black text-xl uppercase tracking-tight">NURI: {doc.nuri}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-sm border uppercase tracking-widest ${
                    doc.status === 'atraso' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200' : 
                    doc.status === 'pendiente' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200' : 
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200'
                  }`}>
                    <span className="material-symbols-outlined !text-xs font-black">
                      {doc.status === 'hoy' ? 'bolt' : 'schedule'}
                    </span>
                    {doc.statusText}
                  </span>
                </div>

                <h4 className="text-slate-900 dark:text-white text-xl font-black leading-tight group-hover:text-primary transition-colors uppercase tracking-tight line-clamp-2">
                  {doc.title}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="size-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                      <span className="material-symbols-outlined !text-xl text-slate-400">person</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-800 dark:text-slate-200 uppercase text-xs truncate">{doc.sender}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest truncate">{doc.senderRole}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                      <span className="material-symbols-outlined !text-xl text-slate-400">apartment</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-800 dark:text-slate-200 uppercase text-xs truncate">{doc.origin}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest truncate">{doc.originOffice}</p>
                    </div>
                  </div>
                </div>

                {/* Proveído Box */}
                <div className="bg-slate-50/50 dark:bg-slate-800/40 rounded-3xl p-5 border-l-8 border-primary dark:border-primary relative overflow-hidden transition-colors">
                  <div className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    <span className="font-black not-italic text-slate-900 dark:text-white block mb-2 text-[10px] uppercase tracking-[0.3em]">Instrucción de Remitente:</span>
                    "{doc.proveido}"
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-end items-center md:items-end gap-4 min-w-[180px] border-t md:border-t-0 pt-4 md:pt-0">
                <button 
                  onClick={() => handleReceive(doc.id)}
                  className="flex-1 md:w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest text-primary border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all active:scale-95"
                >
                  Recibir
                </button>
                <button 
                  onClick={() => openDeriveModal(doc)}
                  className="flex-1 md:w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-primary shadow-xl shadow-primary/20 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95"
                >
                  Recibir y Derivar
                </button>
              </div>
            </div>
          )) : (
            <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="size-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined !text-5xl text-slate-200 dark:text-slate-700">inbox</span>
              </div>
              <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Bandeja vacía</h3>
              <p className="text-slate-400 dark:text-slate-600 mt-2 font-medium">No hay correspondencia pendiente de recepción.</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button for Bulk Selection */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
           <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-5 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] flex items-center gap-8 border border-white/10 dark:border-slate-200 backdrop-blur-xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Seleccionados</span>
                <span className="text-2xl font-black tabular-nums">{selectedIds.size}</span>
              </div>
              <div className="h-12 w-px bg-white/20 dark:bg-slate-200"></div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBulkReceive}
                  className="bg-primary text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95"
                >
                  Recibir en Lote
                </button>
                <button 
                  onClick={() => setSelectedIds(new Set())}
                  className="px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 dark:hover:bg-slate-100 transition-all active:scale-95"
                >
                  Cancelar
                </button>
              </div>
           </div>
        </div>
      )}

      {/* --- DERIVE MODAL (THEMED AS PER REFERENCE) --- */}
      {isDeriveModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#1a2632] w-full max-w-[900px] rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] flex flex-col max-h-[95vh] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-slate-100 dark:border-white/10 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Recibir y Derivar</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">NURI: {selectedDoc.nuri}</span>
                  <span className="text-slate-300 dark:text-slate-700 text-xs">|</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-bold truncate max-w-[400px] uppercase tracking-tighter italic">Ref: {selectedDoc.title}</span>
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
                    <div className={`size-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-xl ${deriveStep >= s.n ? 'bg-primary text-white shadow-primary/30 scale-110' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                      {deriveStep > s.n ? <span className="material-symbols-outlined !text-xl">check</span> : s.n}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${deriveStep >= s.n ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              
              {deriveStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Buscar Servidor Público / Oficina</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors !text-2xl">person_search</span>
                      <input className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-3xl text-base font-bold focus:ring-8 focus:ring-primary/10 transition-all dark:text-white" placeholder="Escriba el nombre del funcionario..." type="text" autoFocus/>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Dra. Andrea Villarroel', 'Lic. Milton Paz', 'Ing. Clara Rojas'].map((name, i) => (
                      <div key={i} className="p-6 rounded-3xl border-2 border-slate-50 dark:border-white/5 bg-slate-50/20 dark:bg-white/5 flex items-center gap-5 hover:border-primary hover:bg-primary/5 cursor-pointer group transition-all">
                        <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-sm uppercase shadow-lg shadow-primary/20">
                          {name.split(' ').filter(x => x.length > 2).map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase truncate">{name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Dirección General Técnica</p>
                        </div>
                        <span className="material-symbols-outlined ml-auto text-slate-300 group-hover:text-primary transition-colors">check_circle</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {deriveStep === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] px-1">Acción Requerida *</label>
                      <select className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-sm font-black uppercase tracking-tight px-6 appearance-none shadow-sm">
                        <option>Para su revisión y V°B°</option>
                        <option>Elaborar informe técnico</option>
                        <option>Para su archivo respectivo</option>
                        <option>Conocimiento y fines</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] px-1">Motivo de envío</label>
                      <select className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-sm font-black uppercase tracking-tight px-6 appearance-none shadow-sm">
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
                    <textarea className="w-full rounded-3xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-base p-8 placeholder:text-slate-300 resize-none font-medium leading-relaxed shadow-inner" placeholder="Ingrese las instrucciones precisas para el destinatario..." rows={5}></textarea>
                  </div>

                  <div className="flex items-center gap-6 p-6 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-100 dark:border-orange-900/30 rounded-[2.5rem] group transition-all hover:bg-orange-100/50">
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 scale-110">
                      <input className="sr-only peer" type="checkbox" value=""/>
                      <div className="w-12 h-6.5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange-600 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-5.5 after:w-5.5 after:transition-all shadow-inner transition-colors"></div>
                    </label>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest">Prioridad ALTA / Notificación Inmediata</span>
                      <span className="text-xs text-orange-600/80 dark:text-orange-400/60 font-medium">El destinatario recibirá alertas visuales críticas en su dashboard de control.</span>
                    </div>
                  </div>
                </div>
              )}

              {deriveStep === 3 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300 text-center">
                   <div className="size-28 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/10">
                      <span className="material-symbols-outlined !text-6xl font-black">task_alt</span>
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Todo listo para derivar</h3>
                   <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
                     Se ha validado la información. Al confirmar, el documento será marcado como recibido en su bandeja y se generará el movimiento oficial al siguiente destinatario.
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
                      <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl text-left border border-slate-100 dark:border-white/5">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Destinatario Final</p>
                         <p className="text-sm font-black text-slate-900 dark:text-white uppercase">Dra. Andrea Villarroel</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Dir. General Técnica</p>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl text-left border border-slate-100 dark:border-white/5">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Acción Programada</p>
                         <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-primary animate-pulse"></span>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase">Revisión y V°B°</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-12 py-8 border-t border-slate-100 dark:border-white/10 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5 shrink-0">
              <button onClick={closeDeriveModal} className="px-8 py-4 text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-widest rounded-2xl transition-all hover:bg-red-50 active:scale-95">
                Cancelar Proceso
              </button>
              <div className="flex gap-4">
                {deriveStep > 1 && (
                  <button 
                    onClick={() => setDeriveStep(deriveStep - 1)}
                    className="px-8 py-4 text-xs font-black text-slate-700 dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 rounded-2xl transition-all flex items-center gap-3 uppercase tracking-widest active:scale-95"
                  >
                    <span className="material-symbols-outlined !text-xl">arrow_back</span>
                    Atrás
                  </button>
                )}
                
                {deriveStep < 3 ? (
                  <button 
                    onClick={() => setDeriveStep(deriveStep + 1)}
                    className="px-12 py-4 text-xs font-black text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-2xl transition-all shadow-2xl flex items-center gap-3 uppercase tracking-widest active:scale-95 group"
                  >
                    Continuar
                    <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleDeriveComplete}
                    className="px-16 py-4 text-xs font-black text-white bg-primary hover:bg-blue-600 rounded-2xl transition-all shadow-[0_20px_50px_rgba(19,127,236,0.3)] flex items-center gap-3 uppercase tracking-widest active:scale-95 group"
                  >
                    Confirmar Salida
                    <span className="material-symbols-outlined !text-xl group-hover:scale-125 transition-transform font-black">send</span>
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

export default Inbox;
