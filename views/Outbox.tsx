
import React, { useState, useMemo } from 'react';

interface OutboxDocument {
  id: string;
  nur: string;
  date: string;
  time: string;
  recipient: string;
  recipientOffice: string;
  reference: string;
  responsible: string;
  responsibleAvatar: string;
  status: 'Pendiente' | 'Despachado' | 'Recibido';
}

const Outbox: React.FC = () => {
  // --- MOCK DATA ---
  const [documents, setDocuments] = useState<OutboxDocument[]>([
    {
      id: '#88219',
      nur: 'GPD-2023-4592',
      date: '24 Oct, 2023',
      time: '14:30',
      recipient: 'Caja Nacional de Salud',
      recipientOffice: 'Ventanilla Recepción',
      reference: 'Informe Técnico trimestral sobre el avance de la reestructuración hospitalaria en áreas críticas.',
      responsible: 'V. Arancibia',
      responsibleAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5FOscinsH60eYNe7DWo0xhqItZH48T09b1QFoi3tnfIEtQyS1Htgzm3lGVR0ayEcw_TLGJ8PFiotKTGKBtYpCY4e3Zraw_AsOP8Z_gLyKqpDGbG_XVF3TKpihq34AmGN7Ka73tIdn-nmgDd9zpo380K7Erdnl6Ibxe4OtkJf5LiGterkVA2A7WHsM-Bszi9cfPiY-gYbIZ9UrAVw5aUt-WD6omXde5wg2BhpOpvUasjvf5rxyYT9xqKVAvBw8PDO6-vFNLmlPVdoA',
      status: 'Pendiente'
    },
    {
      id: '#88211',
      nur: 'GPD-2023-4580',
      date: '23 Oct, 2023',
      time: '09:15',
      recipient: 'Min. de Economía',
      recipientOffice: 'Dirección de Planificación',
      reference: 'Solicitud de ampliación presupuestaria partida 25800 para adquisición de suministros tecnológicos.',
      responsible: 'L. Mendoza',
      responsibleAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2KRwukHi1n0akNfZLNBZaNu4J_dyuSHz8fjGxLoQ1mkOGUDJYjVVrD1DDduWNtR58BFaaoolnsBKt-Om02QLBHQYEXewn7tGgI-0Xu17Cgsr8vsu6esvhjeLpNd4nbnLr4ryJDcdSsvX4TtO9VEaE7e91F96cyl7bvKVtZaddjjjfGbYCVqnV-c6qg4hUZsrz8lmAMFhy06BvpfYvMywYSWapCu4qwA3JoW5kcHyJaT_PJ5x_VgM4rW3dQrsD74IAT1vhGQq7c4Tv',
      status: 'Despachado'
    },
    {
      id: '#88192',
      nur: 'GPD-2023-4555',
      date: '20 Oct, 2023',
      time: '16:45',
      recipient: 'Gobierno Autónomo de La Paz',
      recipientOffice: 'Despacho Municipal',
      reference: 'Coordinación interinstitucional para la campaña nacional de vacunación invierno 2023.',
      responsible: 'R. Quispe',
      responsibleAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQx38tdGDP7nsuulYI9ZkGoKlbooJoSQGUZtbO3CSB0lkOqaRotJbTFx80eqEvGZbZdOVI99nYblUcSVxxHzrduUCRLdjhSlR3QqJFlyf5UfWDVX-S4Nm9YDpMV7FxMpXbbiDsVG6-AAXBEJMsSmDH4b9kl8IF6MMTD_9gHtxGfKCrR7v1WGFGiVDX_xX0L6lamXy98CeXFIppgI8zlfOorn-Kx7-Gjp7C-a4atPa57juHk7_LAmb5twD1OscAiL2msDHkWv1udW4O',
      status: 'Recibido'
    }
  ]);

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos los estados');
  const [filterRecipient, setFilterRecipient] = useState('');

  // --- HANDLERS ---
  const handleDispatch = (id: string) => {
    if (confirm('¿Confirmar el despacho físico/digital de este documento?')) {
      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, status: 'Despachado' as const } : doc
      ));
      alert('Documento despachado exitosamente.');
    }
  };

  const handleCancelDerivation = (id: string) => {
    if (confirm('¿Está seguro de cancelar la derivación? El documento retornará a su estado pendiente y desaparecerá de la bandeja del destinatario.')) {
      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, status: 'Pendiente' as const } : doc
      ));
      alert('Derivación cancelada. El documento ha sido recuperado.');
    }
  };

  const handleNewEnvio = () => {
    alert('Iniciando flujo de Nuevo Envío Externo...');
  };

  // --- FILTER LOGIC ---
  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchSearch = doc.nur.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.reference.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'Todos los estados' || doc.status === filterStatus;
      const matchRecipient = doc.recipient.toLowerCase().includes(filterRecipient.toLowerCase());
      
      return matchSearch && matchStatus && matchRecipient;
    });
  }, [documents, searchQuery, filterStatus, filterRecipient]);

  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300">
      <main className="max-w-[1600px] mx-auto w-full px-4 md:px-10 py-6 md:py-8 space-y-8 animate-in fade-in duration-500 pb-32">
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Correspondencia Enviada</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Control de salida y trazabilidad de documentos hacia entidades externas.</p>
          </div>
          <button 
            onClick={handleNewEnvio}
            className="bg-primary hover:bg-blue-600 text-white flex items-center justify-center gap-3 px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/25 transition-all active:scale-95 group"
          >
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
            Nuevo Envío Externo
          </button>
        </div>

        {/* Dynamic Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-4 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Buscar Trámite</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold placeholder:text-slate-400 dark:text-white focus:ring-4 focus:ring-primary/10 transition-all" 
                  placeholder="NUR o palabras clave en referencia..." 
                  type="text"
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Estado de Recepción</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-12 border-none bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest px-4 appearance-none dark:text-white focus:ring-4 focus:ring-primary/10"
              >
                <option>Todos los estados</option>
                <option>Pendiente</option>
                <option>Despachado</option>
                <option>Recibido</option>
              </select>
            </div>

            <div className="lg:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Entidad Destino</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">corporate_fare</span>
                <input 
                  value={filterRecipient}
                  onChange={(e) => setFilterRecipient(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold placeholder:text-slate-400 dark:text-white focus:ring-4 focus:ring-primary/10 transition-all" 
                  placeholder="Ej: Ministerio de..." 
                  type="text"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <button 
                onClick={() => { setSearchQuery(''); setFilterStatus('Todos los estados'); setFilterRecipient(''); }}
                className="w-full h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">NUR / Folio</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha Salida</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Destinatario</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4">Referencia</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsable</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-base font-black text-primary uppercase tracking-tight">{doc.nur}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">ID Interno: {doc.id}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{doc.date}</p>
                      <p className="text-[10px] text-slate-400 font-bold tabular-nums mt-0.5">{doc.time} hrs</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase truncate max-w-[180px]">{doc.recipient}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter truncate max-w-[180px] mt-1">{doc.recipientOffice}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed italic">"{doc.reference}"</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <img className="size-8 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm shrink-0" src={doc.responsibleAvatar} alt={doc.responsible}/>
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{doc.responsible}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                        doc.status === 'Pendiente' ? 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700' :
                        doc.status === 'Despachado' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30' :
                        'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30'
                      }`}>
                        <span className={`size-1.5 rounded-full mr-2 ${
                          doc.status === 'Pendiente' ? 'bg-slate-400' :
                          doc.status === 'Despachado' ? 'bg-amber-500 animate-pulse' :
                          'bg-emerald-500'
                        }`}></span>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        {doc.status === 'Pendiente' ? (
                          <button 
                            onClick={() => handleDispatch(doc.id)}
                            className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95"
                          >
                            Despachar
                          </button>
                        ) : doc.status === 'Despachado' ? (
                          <>
                            <button 
                              onClick={() => handleCancelDerivation(doc.id)}
                              className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border border-red-100 transition-all active:scale-95"
                            >
                              Cancelar Derivación
                            </button>
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined !text-2xl">visibility</span>
                            </button>
                          </>
                        ) : (
                          <button className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                            <span className="material-symbols-outlined !text-lg">verified</span>
                            Ver Acuse
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-32 text-center">
                      <div className="size-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <span className="material-symbols-outlined !text-5xl text-slate-300 dark:text-slate-600">outgoing_mail</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Sin envíos que mostrar</h3>
                      <p className="text-slate-400 dark:text-slate-600 mt-2 font-medium">Ajuste los criterios de búsqueda o realice un nuevo envío.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-6 transition-colors">
            <div className="flex items-center gap-3">
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Mostrando <span className="text-slate-900 dark:text-white font-black tabular-nums">{filteredDocs.length}</span> trámites de salida
               </p>
               <span className="text-slate-200 dark:text-slate-700">|</span>
               <p className="text-[10px] font-bold text-slate-400 uppercase italic">Sincronizado: {new Date().toLocaleTimeString()}</p>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button className="size-10 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 bg-primary text-white rounded-xl text-[10px] font-black shadow-lg shadow-primary/20 scale-110">1</button>
              <button className="size-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-[10px] font-black hover:bg-slate-50">2</button>
              <button className="size-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 hover:text-primary">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Statistics Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Pendientes Despacho', val: documents.filter(d => d.status === 'Pendiente').length, icon: 'pending_actions', color: 'slate' },
            { label: 'En Tránsito / Despachados', val: documents.filter(d => d.status === 'Despachado').length, icon: 'local_shipping', color: 'amber' },
            { label: 'Confirmados Externos', val: documents.filter(d => d.status === 'Recibido').length, icon: 'fact_check', color: 'emerald' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-6 transition-all hover:shadow-md dark:hover:shadow-primary/5 hover:border-primary/20 group">
              <div className={`size-16 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-[1.5rem] flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 shadow-inner shrink-0 transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined !text-4xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] leading-none mb-2">{stat.label}</p>
                <p className={`text-4xl font-black text-${stat.color}-600 dark:text-${stat.color}-400 tabular-nums leading-none`}>{stat.val}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Outbox;
