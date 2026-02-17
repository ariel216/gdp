
import React from 'react';

const Roadmaps: React.FC = () => {
  const roadmapsData = [
    { nuri: 'GPD-2024-0842', year: '2024', used: true, doc: 'FACT-A928.pdf', date: '15 Oct 2024, 14:30', qr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkMTBvKiu4dp0xRTCFpkvea-wxpWax-AVdDCwfMc93ZBjV4RbOTitV-kYFx1_XH1dSV2B65v-299byK-6uojzLVxXQQZoiSisTCjpU0WNHjwop44JIMeMDzCI2etEYdRlUrjPJlcFalOHzooz_dzmEbdojfRCiBhWAwLhOS4eHA8Yvmaj00umwYFqG-Pvz8gDdtybTTiYxUwYOK5sqzHhyI5GdM-0KfL3vE_VmABaWWRLL6joTr-qWpe5vR07r5WyatsagQjVCHyY' },
    { nuri: 'GPD-2024-0843', year: '2024', used: false, doc: 'No asignado', date: 'Pendiente', qr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnh8fEEkNlvNHoi2otMp6H1bV2ywZgCqYxThoB56C7__8n5nVoiiqj5ASFafGYQVlWbuvGWxgzbSsV_NmkoU8A8k61r5JlwQXkRHIT4AB5XkuIDiGL5Tktz3Zns6PvcN5TN6qFN1QIZRTwcE70WL5vhz3FAOxTwDlHGcKE6YKaZudRyFamfIm7ZreR8f8HVb721c-Jfln6RO1mbUzG5aMV_mKNnm_ntbdi4qtliLSk2LdP2_5HudMCGoJ5W1bPRGfraeiMVGM6eR6o' },
    { nuri: 'GPD-2024-0844', year: '2024', used: false, doc: 'No asignado', date: 'Pendiente', qr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn2XjPQnYCpDGSG6z3IwrsQTmxglpt2JmWco6suGWinen1TvA3tiIU2M0UworqPqk8apbE0W9WLm4DjCeVgG804EFKM31hUREdH9YnMjzKr7s5qdkFsbVygE9-kkqyaU4zhe1-9yIp15EGOuc3epehyLMl7vwXVY2nUjTnoHRzeti-eyYIOj9tmj2lQMAkbCpVqryh3T0Vl28FYv4otyxwCeY_j98No93wJurs7Hb4ZxSZnUD--FPW3b4qsOo2H6FrumhUPV3ITWXv' },
  ];

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden animate-in fade-in duration-500 transition-colors">
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Gestión de Hojas de Ruta</h2>
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded uppercase">Lotes 2024</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary/20">
            <span className="material-symbols-outlined !text-lg">add_circle</span>
            Generar Lote
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
        {/* Panel de Generación */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-3 uppercase tracking-widest text-sm">
                <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined !text-xl">dynamic_feed</span>
                </div>
                Configuración de Lote
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic opacity-60">Última generación: hace 2 días</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Cantidad a Generar</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary text-sm p-3 font-black dark:text-white transition-all" placeholder="Ej: 50" type="number" defaultValue="100"/>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Prefijo de Folio</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary text-sm p-3 font-black dark:text-white transition-all" placeholder="Ej: GPD-2024-" type="text" defaultValue="GPD-2024-"/>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Progreso de generación</p>
                <p className="text-xs font-black text-primary tabular-nums">75%</p>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden transition-colors">
                <div className="bg-primary h-full w-3/4 rounded-full shadow-lg shadow-primary/20 transition-all duration-700"></div>
              </div>
            </div>
          </div>

          {/* Label Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-[0.2em] opacity-60">Vista Previa de Etiqueta</p>
            <div className="w-48 bg-white p-5 rounded-2xl shadow-2xl flex flex-col items-center text-center ring-1 ring-slate-100">
              <div className="size-28 bg-slate-50 rounded-xl mb-4 flex items-center justify-center border border-slate-100 p-1 shadow-inner">
                <img 
                  alt="Preview QR" 
                  className="w-full h-full grayscale opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt9vUXEfjXCiB98b1m5l7fYB6gHvuplr4u-jHLaHNr8y88kCCfwIzQ1HDt0fCcQJSQexz8V6avrCb0-8DcrFSFM3U7wsGY5aNloQ87HADGYQ0IR24HzSdVY6BjKK6Ks7NeHXUSp8RGtmpbVNaOQa4eRSfE9n97p6VNjmMZEi-NZPDTmdsu0-oEiTR_sKAYwam2dyEv5iQA9294Azm6_k2Hrcl5_NyqH-HYZ0Pza5OgFu6Au_HPmlSABzK3LQvmRiDq7DUvIiwt8ebo"
                />
              </div>
              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">GPD-2024-0842</p>
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.15em] mt-1">SISTEMA GPD - HR</p>
            </div>
            <button className="mt-6 text-[10px] font-black text-primary hover:text-blue-600 uppercase tracking-widest flex items-center gap-2 transition-colors active:scale-95">
              <span className="material-symbols-outlined !text-lg">refresh</span>
              Regenerar muestra
            </button>
          </div>
        </section>

        {/* Filters and Table */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors mb-20">
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4 transition-colors">
            <div className="flex-1 min-w-[300px] relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-xs font-bold focus:ring-4 focus:ring-primary/10 placeholder:text-slate-400 dark:text-white transition-all" placeholder="Buscar por número de HR (Folio)..." type="text"/>
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-slate-50 dark:bg-slate-800 border-none text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-xl focus:ring-2 focus:ring-primary/20 p-3 pr-10">
                <option>Gestión: 2024</option>
                <option>Gestión: 2023</option>
              </select>
              <select className="bg-slate-50 dark:bg-slate-800 border-none text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-xl focus:ring-2 focus:ring-primary/20 p-3 pr-10">
                <option>Estado: Todos</option>
                <option>Usados</option>
                <option>Pendientes</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="px-6 md:px-8 py-3 bg-primary/[0.03] border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.1em]">12 Seleccionadas</span>
              <div className="h-5 w-px bg-primary/10"></div>
              <button className="text-[10px] font-black text-primary hover:text-blue-700 uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95">
                <span className="material-symbols-outlined !text-lg">print</span>
                Imprimir Lote
              </button>
            </div>
            <button className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">Descartar selección</button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <input defaultChecked className="rounded-lg border-slate-300 dark:border-slate-700 text-primary focus:ring-primary size-5 bg-white dark:bg-slate-800" type="checkbox"/>
                  </th>
                  <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Número HR</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Gestión</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Usado</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Documento Asociado</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {roadmapsData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="p-5">
                      <input defaultChecked={i < 2} className="rounded-lg border-slate-300 dark:border-slate-700 text-primary focus:ring-primary size-5 bg-white dark:bg-slate-800" type="checkbox"/>
                    </td>
                    <td className="p-5 font-black text-sm text-slate-800 dark:text-slate-200 tracking-tight uppercase">{row.nuri}</td>
                    <td className="p-5 text-xs font-black text-slate-500 dark:text-slate-400 tabular-nums">{row.year}</td>
                    <td className="p-5 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                        row.used ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {row.used ? 'ASIGNADO' : 'LIBRE'}
                      </span>
                    </td>
                    <td className="p-5">
                      {row.used ? (
                        <div className="flex flex-col">
                           <a className="text-primary hover:underline text-xs font-black flex items-center gap-1.5 uppercase" href="#">
                            <span className="material-symbols-outlined !text-lg">link</span>
                            {row.doc}
                          </a>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">{row.date}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-300 dark:text-slate-600 font-bold uppercase tracking-widest italic">{row.doc}</span>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all" title="Imprimir"><span className="material-symbols-outlined !text-xl">print</span></button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all" title="Descargar"><span className="material-symbols-outlined !text-xl">download</span></button>
                        {!row.used && <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-slate-400 hover:text-red-500 transition-all" title="Anular"><span className="material-symbols-outlined !text-xl">cancel</span></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mostrando <span className="text-slate-900 dark:text-white">1-3</span> de <span className="text-slate-900 dark:text-white">1,240</span> Hojas de Ruta</p>
            <div className="flex items-center gap-1.5">
              <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-primary disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-9 bg-primary text-white rounded-xl text-[10px] font-black shadow-lg shadow-primary/20">1</button>
              <button className="size-9 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-[10px] font-black hover:bg-slate-50">2</button>
              <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 hover:text-primary">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Roadmaps;
