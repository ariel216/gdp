
import React from 'react';

const Procurement: React.FC = () => {
  const metrics = [
    { label: 'Procesos Activos', value: '124', change: '+4%', color: 'primary', icon: 'inventory_2', trend: 'up' },
    { label: 'En Evaluación', value: '38', change: '0%', color: 'amber-500', icon: 'find_in_page', trend: 'neutral' },
    { label: 'Adjudicados 2024', value: '156', change: '+12%', color: 'emerald-500', icon: 'task_alt', trend: 'up' },
    { label: 'Monto Total', value: '$42.8M', change: '+8%', color: 'red-500', icon: 'payments', trend: 'up' },
  ];

  const processes = [
    { id: 'LP-2024-001', title: 'Suministro Insalubres Hospital', modality: 'Licitación Pública', budget: '$1.200.000', opening: '15 Oct 2024', remaining: '2 días', status: 'Abierto', statusColor: 'blue' },
    { id: 'CD-2024-045', title: 'Mantenimiento de Redes', modality: 'Contratación Directa', budget: '$450.000', opening: '22 Oct 2024', remaining: '8 días', status: 'Evaluación', statusColor: 'amber' },
    { id: 'LP-2024-002', title: 'Renovación Parque Lumínico', modality: 'Licitación Pública', budget: '$3.850.000', opening: '05 Nov 2024', remaining: '24 días', status: 'Publicado', statusColor: 'emerald' },
    { id: 'CP-2024-012', title: 'Insumos Oficina Anual', modality: 'Concurso Precios', budget: '$125.000', opening: '12 Oct 2024', remaining: 'Vencido', status: 'Cerrado', statusColor: 'red' },
  ];

  const milestones = [
    { time: 'Mañana, 09:00 AM', title: 'Apertura de Sobres', desc: 'LP-2024-001', type: 'Licitación', color: 'blue' },
    { time: '15 Oct, 14:00 PM', title: 'Impugnaciones', desc: 'Concurso CP-2024-012', type: 'Concurso', color: 'amber' },
    { time: '18 Oct, Todo el día', title: 'Adjudicación', desc: 'CD-2024-045', type: 'Directa', color: 'emerald' },
    { time: '22 Oct, 10:00 AM', title: 'Reunión Comisión', desc: 'Evaluación Trimestral', type: null, color: 'slate' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background-light custom-scrollbar">
      <main className="p-4 md:p-8 animate-in fade-in duration-500 space-y-6 md:space-y-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">Panel de Contrataciones</h2>
            <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest opacity-80 mt-1">Monitoreo operativo de adquisiciones públicas.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <span className="material-symbols-outlined !text-lg">analytics</span>
              Estadísticas
            </button>
            <div className="relative shrink-0">
              <span className="material-symbols-outlined p-2 bg-white border border-slate-200 rounded-xl text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">notifications</span>
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </header>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-primary/5 transition-all group cursor-default">
              <div className="flex items-center justify-between mb-4">
                <div className={`size-10 md:size-11 rounded-xl flex items-center justify-center bg-${m.color === 'primary' ? 'primary/10' : m.color.split('-')[0] + '-50'} text-${m.color === 'primary' ? 'primary' : m.color.split('-')[0] + '-' + m.color.split('-')[1]} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined !text-xl md:!text-2xl font-bold">{m.icon}</span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${m.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'} px-2 py-1 rounded-lg border border-slate-100`}>{m.change}</span>
              </div>
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tabular-nums">{m.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Main Table Panel */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-800/30">
              <h4 className="font-black text-xs md:text-sm text-slate-900 uppercase tracking-widest shrink-0">Procesos Activos</h4>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                <select className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-200 bg-white focus:ring-primary h-9 px-3">
                  <option>Modalidad</option>
                  <option>Licitación</option>
                </select>
                <select className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-200 bg-white focus:ring-primary h-9 px-3">
                  <option>Estado</option>
                  <option>Abierto</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-5 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Código / Título</th>
                    <th className="px-5 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Presupuesto</th>
                    <th className="px-5 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Apertura</th>
                    <th className="px-5 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Restante</th>
                    <th className="px-5 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
                    <th className="px-5 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {processes.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-5 md:px-6 py-4 md:py-5 min-w-[200px]">
                        <p className="text-xs md:text-sm font-black text-primary leading-tight uppercase tracking-tight">{p.id}</p>
                        <p className="text-[10px] md:text-xs text-slate-500 font-bold mt-1 line-clamp-1">{p.title}</p>
                      </td>
                      <td className="px-5 md:px-6 py-4 md:py-5">
                        <p className="text-xs md:text-sm font-black text-slate-900 tabular-nums">{p.budget}</p>
                        <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Moneda: USD</p>
                      </td>
                      <td className="px-5 md:px-6 py-4 md:py-5 text-[10px] md:text-xs font-bold text-slate-500 tabular-nums">{p.opening}</td>
                      <td className="px-5 md:px-6 py-4 md:py-5">
                        <span className={`flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-wider ${p.remaining === 'Vencido' || p.remaining === '2 días' ? 'text-red-500' : 'text-slate-500'}`}>
                          {(p.remaining === '2 días') && (
                            <span className="relative flex h-2 w-2 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                          )}
                          {p.remaining}
                        </span>
                      </td>
                      <td className="px-5 md:px-6 py-4 md:py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest border shadow-sm
                          ${p.statusColor === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                            p.statusColor === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                            p.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            'bg-red-50 text-red-600 border-red-100'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 md:px-6 py-4 md:py-5 text-right">
                        <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          <button className="p-1.5 md:p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all active:scale-90"><span className="material-symbols-outlined !text-lg">visibility</span></button>
                          <button className="p-1.5 md:p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all active:scale-90"><span className="material-symbols-outlined !text-lg">folder_open</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 md:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-slate-50/50 gap-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Página 1 de 31 • Total 124</p>
              <div className="flex gap-1.5">
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-white transition-all bg-white shadow-sm disabled:opacity-30"><span className="material-symbols-outlined !text-lg">chevron_left</span></button>
                <button className="px-4 py-2 bg-primary text-white font-black text-xs rounded-xl shadow-lg shadow-primary/20">1</button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-400 font-black text-xs rounded-xl hover:bg-slate-50 transition-all">2</button>
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-white transition-all bg-white shadow-sm"><span className="material-symbols-outlined !text-lg">chevron_right</span></button>
              </div>
            </div>
          </div>

          {/* Right Panel: Calendar/Milestones - Stacks on small screens */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 flex flex-col h-fit">
            <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
              <h4 className="font-black text-sm md:text-base text-slate-900 uppercase tracking-widest">Hitos Críticos</h4>
              <div className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 cursor-pointer hover:bg-primary/10 hover:text-primary transition-all shadow-sm">
                <span className="material-symbols-outlined !text-lg">calendar_today</span>
              </div>
            </div>
            <div className="space-y-10 relative">
              {/* Vertical line connector */}
              <div className="absolute left-[11px] top-2 bottom-6 w-[2px] bg-slate-100"></div>
              
              {milestones.map((m, i) => (
                <div key={i} className="relative pl-10 group">
                  <div className={`absolute left-0 top-1 w-[22px] h-[22px] rounded-full bg-${m.color}-500 border-[5px] border-white shadow-md z-10 transition-transform group-hover:scale-125`}></div>
                  <div className="transition-transform group-hover:translate-x-1 duration-300">
                    <p className={`text-[10px] font-black uppercase mb-1.5 tracking-widest ${m.color === 'blue' ? 'text-blue-600' : m.color === 'amber' ? 'text-amber-600' : m.color === 'emerald' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {m.time}
                    </p>
                    <h5 className="text-xs md:text-sm font-black text-slate-900 leading-tight uppercase">{m.title}</h5>
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold mt-1 opacity-70">{m.desc}</p>
                    {m.type && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-${m.color}-500 shadow-sm shadow-${m.color}-200`}></span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{m.type}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-primary rounded-2xl border-2 border-slate-50 transition-all active:scale-95 shadow-sm">
              Agenda Completa
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Procurement;
