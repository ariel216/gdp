
import React, { useState } from 'react';

const ReportsGenerator: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const previewData = [
    { id: '#GPD-2023-001', date: '02 Oct 2023', office: 'Central', type: 'Factura', responsible: 'Ricardo Pérez', status: 'Aprobado', statusColor: 'green' },
    { id: '#GPD-2023-014', date: '05 Oct 2023', office: 'Norte 02', type: 'Contrato', responsible: 'María Delgado', status: 'Pendiente', statusColor: 'amber' },
    { id: '#GPD-2023-022', date: '08 Oct 2023', office: 'Sur 01', type: 'Factura', responsible: 'Juan Gómez', status: 'Aprobado', statusColor: 'green' },
    { id: '#GPD-2023-039', date: '12 Oct 2023', office: 'Central', type: 'Factura', responsible: 'Ricardo Pérez', status: 'Rechazado', statusColor: 'red' },
    { id: '#GPD-2023-045', date: '15 Oct 2023', office: 'Sur 01', type: 'Acta', responsible: 'Ana Torres', status: 'Aprobado', statusColor: 'green' },
  ];

  return (
    <div className="flex flex-col h-full bg-background-light overflow-hidden animate-in fade-in duration-500">
      {/* View Header */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 shrink-0 flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 uppercase">Parametrización de Reportes</h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Definición de criterios operativos estadísticos.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden flex items-center justify-center size-10 bg-slate-100 rounded-xl text-slate-600"
            >
              <span className="material-symbols-outlined">{isSidebarOpen ? 'close_fullscreen' : 'filter_alt'}</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-slate-200 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined !text-lg">bookmark</span>
              <span className="hidden sm:inline">Guardar</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2 bg-primary text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 active:scale-95">
              <span className="material-symbols-outlined !text-lg">download</span>
              Procesar
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar: Configuration - Responsive Toggle */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:p-0 lg:border-none'}
          absolute lg:relative z-20 inset-y-0 left-0 w-80 md:w-96 bg-white border-r border-slate-200 overflow-y-auto p-6 flex flex-col gap-6 md:gap-8 custom-scrollbar transition-all duration-300 shadow-2xl lg:shadow-none
        `}>
          <div className="flex items-center justify-between lg:hidden mb-2">
            <h4 className="font-black text-sm uppercase text-slate-900">Configuración</h4>
            <button onClick={() => setIsSidebarOpen(false)} className="material-symbols-outlined">close</button>
          </div>

          <section className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clase de Informe</label>
            <select className="w-full h-11 px-4 rounded-xl border-slate-200 text-sm font-bold focus:ring-primary focus:border-primary transition-all bg-slate-50/50">
              <option selected>Productividad Oficinas</option>
              <option>Control Documental</option>
            </select>
          </section>

          <section className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Rango Temporal</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <input className="w-full h-10 px-3 rounded-xl border-slate-200 text-xs font-bold focus:ring-primary bg-slate-50/50" type="date" value="2023-10-01"/>
              </div>
              <div className="space-y-1">
                <input className="w-full h-10 px-3 rounded-xl border-slate-200 text-xs font-bold focus:ring-primary bg-slate-50/50" type="date" value="2023-11-07"/>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Oficinas (Filtro)</label>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2">
              {['Central', 'Sur 01'].map((office) => (
                <div key={office} className="flex items-center gap-1 px-2 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-wider rounded-lg shadow-sm">
                  {office}
                  <button className="hover:text-white/70 transition-colors shrink-0">
                    <span className="material-symbols-outlined !text-xs">close</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-4 border-t border-slate-100 mt-auto">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Formato Salida</label>
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                {['PDF', 'EXCEL'].map((format) => (
                  <label key={format} className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-2 rounded-lg hover:bg-white transition-all has-[:checked]:bg-white has-[:checked]:text-primary has-[:checked]:shadow-sm">
                    <input defaultChecked={format === 'EXCEL'} className="hidden" name="format" type="radio" value={format.toLowerCase()}/>
                    <span className="text-[10px] font-black uppercase tracking-widest">{format}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-background-light overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="size-10 md:size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-inner">
                  <span className="material-symbols-outlined !text-2xl md:!text-3xl font-black">analytics</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight">Análisis Operativo</h3>
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5 truncate">Total de registros proyectados en base a filtros</p>
                </div>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <p className="text-2xl md:text-3xl font-black text-primary leading-none">1,245</p>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mt-1">Registros</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 md:px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <h2 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary !text-xl font-black">visibility</span>
                  Muestra Preliminar
                </h2>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-tighter italic">Top 5 registros</span>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-5 md:px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Referencia</th>
                      <th className="px-5 md:px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Oficina</th>
                      <th className="px-5 md:px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {previewData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 md:px-6 py-4">
                          <p className="text-xs font-black text-slate-700 leading-tight uppercase">{row.id}</p>
                          <p className="text-[10px] text-slate-400 font-bold tabular-nums mt-0.5">{row.date} • {row.type}</p>
                        </td>
                        <td className="px-5 md:px-6 py-4">
                          <p className="text-xs font-bold text-slate-800 uppercase truncate max-w-[150px]">{row.office}</p>
                          <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{row.responsible}</p>
                        </td>
                        <td className="px-5 md:px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm border
                            ${row.statusColor === 'green' ? 'bg-green-50 text-green-700 border-green-100' : 
                              row.statusColor === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                              row.statusColor === 'red' ? 'bg-red-50 text-red-700 border-red-100' : 
                              'bg-blue-50 text-blue-700 border-blue-100'}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 text-center">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] opacity-80 leading-relaxed">La vista previa es parcial. El reporte procesado incluirá la data histórica completa según parámetros.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsGenerator;
