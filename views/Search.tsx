
import React from 'react';

const Search: React.FC = () => {
  const results = [
    { nuri: '2024-MTI-00125', date: '15/10/2024', type: 'Resolución', ref: 'Solicitud de mantenimiento para la infraestructura vial tramo A...', sender: 'Ing. Roberto Gomez', status: 'En Proceso', statusColor: 'green-500' },
    { nuri: '2024-MTI-00124', date: '14/10/2024', type: 'Informe', ref: 'Informe trimestral sobre el mantenimiento preventivo de equipos...', sender: 'Lic. Marta Silva', status: 'Archivado', statusColor: 'gray-400' },
    { nuri: '2024-ADM-00088', date: '12/10/2024', type: 'Memorándum', ref: 'Cronograma de actividades y mantenimiento de sistemas GPD...', sender: 'Dr. Juan Pérez', status: 'Urgente', statusColor: 'red-500' },
    { nuri: '2024-LEG-00211', date: '10/10/2024', type: 'Oficio', ref: 'Respuesta a la auditoría externa de gestión y mantenimiento legal...', sender: 'Legal Office', status: 'Derivado', statusColor: 'primary' },
  ];

  return (
    <div className="flex h-full animate-in fade-in duration-500 overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar: Filtros */}
      <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 sticky top-0 h-full overflow-y-auto custom-scrollbar hidden lg:flex flex-col shrink-0 transition-colors">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-1 text-primary">
            <span className="material-symbols-outlined">page_info</span>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Filtros de Búsqueda</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Refine los criterios del sistema GPD</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1">
          {/* Identificadores */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">NURI / NUR</span>
              <input className="mt-1 block w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary transition-all" placeholder="Ej: 2024-MIN-042" type="text"/>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">Hoja de Ruta (Exacto)</span>
              <input className="mt-1 block w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary transition-all" placeholder="Ingrese No. de Hoja" type="text"/>
            </label>
          </div>
          <hr className="border-slate-100 dark:border-slate-800"/>
          {/* Contenido */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">Referencia / Asunto</span>
              <div className="relative mt-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                <input className="block w-full pl-9 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary transition-all" placeholder="Buscar palabras clave..." type="text"/>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">Tipo de Documento</span>
              <select className="mt-1 block w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary min-h-[100px]" multiple>
                <option>Informe Técnico</option>
                <option>Resolución Ministerial</option>
                <option>Memorándum</option>
                <option>Oficio Externo</option>
                <option>Circular</option>
              </select>
            </label>
          </div>
          <hr className="border-slate-100 dark:border-slate-800"/>
          {/* Fechas y Estado */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">Rango de Fechas</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input className="block w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs focus:ring-primary focus:border-primary" type="date"/>
                <input className="block w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs focus:ring-primary focus:border-primary" type="date"/>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">Estado</span>
              <select className="mt-1 block w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary">
                <option>Todos los estados</option>
                <option>En Proceso</option>
                <option>Archivado</option>
                <option>Pendiente</option>
                <option>Urgente</option>
              </select>
            </label>
          </div>
        </div>
        {/* Botones de Acción */}
        <div className="mt-auto p-6 bg-slate-50 dark:bg-slate-800/50 space-y-3 border-t border-slate-200 dark:border-slate-800">
          <button className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
            <span className="material-symbols-outlined text-lg">search</span>
            Buscar
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="text-xs font-semibold py-2 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
              Limpiar
            </button>
            <button className="text-xs font-semibold py-2 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">bookmark</span>
              Guardar
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumbs & Header */}
        <header className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
          <nav className="flex text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 gap-2 items-center">
            <a className="hover:text-primary" href="#">Admin</a>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <a className="hover:text-primary" href="#">Reportes</a>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-slate-900 dark:text-white">Búsqueda Avanzada</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resultados de Búsqueda</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Sistema de Gestión de Documentos Públicos</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                124 resultados encontrados
              </span>
            </div>
          </div>
        </header>

        {/* Table Actions Toolbar */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined text-green-600 text-lg">description</span>
              Excel
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined text-red-600 text-lg">picture_as_pdf</span>
              PDF
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">Ordenado por: <strong className="text-slate-900 dark:text-white">Fecha de Registro (Desc)</strong></span>
            <button className="material-symbols-outlined text-slate-500 dark:text-slate-400 hover:text-primary p-1">filter_list</button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">HR / NURI</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Fecha</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Tipo</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Referencia</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Remitente</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {results.map((item, idx) => (
                    <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-4 py-4 text-sm font-bold text-primary">{item.nuri}</td>
                      <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.type}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-900 dark:text-slate-300 max-w-xs leading-relaxed">
                        {item.ref.split('mantenimiento').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <mark className="bg-primary/20 text-primary px-0.5 rounded">mantenimiento</mark>
                            )}
                          </React.Fragment>
                        ))}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-900 dark:text-slate-300 font-medium">{item.sender}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="material-symbols-outlined text-slate-400 hover:text-primary text-xl">visibility</button>
                          <button className="material-symbols-outlined text-slate-400 hover:text-primary text-xl">history</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between transition-colors">
              <span className="text-xs text-slate-500 dark:text-slate-400">Mostrando 1 a 4 de 124 resultados</span>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none" disabled>
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">2</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">3</button>
                <span className="text-slate-400 mx-1">...</span>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">31</button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
