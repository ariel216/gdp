
import React from 'react';

interface ReportCategoryProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  onGenerate: () => void;
}

const ReportCategory: React.FC<ReportCategoryProps> = ({ id, icon, title, description, features, onGenerate }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all flex flex-col h-full group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <span className="material-symbols-outlined !text-6xl">{icon}</span>
    </div>
    
    <div className="flex items-start justify-between mb-4 md:mb-5">
      <div className="p-3 bg-primary/[0.03] text-primary rounded-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        <span className="material-symbols-outlined text-2xl md:text-3xl font-bold">{icon}</span>
      </div>
      <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 tracking-widest uppercase">{id}</span>
    </div>
    
    <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-6 flex-grow leading-relaxed font-medium">
      {description}
    </p>
    
    <div className="space-y-2 md:space-y-2.5 mb-6 md:mb-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2.5 text-[10px] md:text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-tight">
          <span className="material-symbols-outlined !text-sm md:!text-base text-primary font-black">check_circle</span>
          {feature}
        </div>
      ))}
    </div>
    
    <button 
      onClick={onGenerate}
      className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-primary dark:hover:bg-primary text-white font-black text-[10px] md:text-xs uppercase tracking-widest py-3 md:py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-95 z-10"
    >
      Configurar Reporte
      <span className="material-symbols-outlined !text-sm">chevron_right</span>
    </button>
  </div>
);

const ReportsSelector: React.FC<{ onNavigateToGenerator: () => void }> = ({ onNavigateToGenerator }) => {
  const categories = [
    {
      id: "DOC-01",
      icon: "description",
      title: "Documentos",
      description: "Informes detallados por periodo, oficina y usuario. Incluye métricas de tiempos y comparativa de estados.",
      features: ["Tiempos de respuesta", "Productividad oficina"],
    },
    {
      id: "CORR-02",
      icon: "mail",
      title: "Correspondencia",
      description: "Seguimiento exhaustivo de flujo de entrada y salida. Gestión de libros y trazabilidad externa.",
      features: ["Entidades externas", "Libros oficiales"],
    },
    {
      id: "PERF-03",
      icon: "bar_chart",
      title: "Rendimiento",
      description: "Estadísticas de carga de trabajo por usuario. Análisis de archivado y derivaciones.",
      features: ["Carga por usuario", "Derivaciones mes"],
    },
    {
      id: "ADM-04",
      icon: "admin_panel_settings",
      title: "Administrativos",
      description: "Auditoría de logs de actividad del sistema. Resumen global de estados documentales.",
      features: ["Logs auditoría", "Sesiones activas"],
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300">
      <main className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 space-y-8 pb-20">
        <div className="mb-6 md:mb-10 text-center sm:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Catálogo de Informes</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest opacity-70 leading-relaxed max-w-xl">
                Seleccione una categoría para configurar los parámetros de generación estadística y operativa.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm transition-all active:scale-95">
              <span className="material-symbols-outlined !text-sm font-bold">refresh</span>
              Actualizar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {categories.map((cat) => (
            <ReportCategory 
              key={cat.id} 
              {...cat} 
              onGenerate={onNavigateToGenerator}
            />
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-base md:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Acciones Globales</h4>
              <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Exportación masiva y plantillas maestras.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95">
                Plantillas
              </button>
              <button className="flex-1 sm:flex-none px-8 py-3 bg-primary text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95">
                Generar Reporte Integral
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsSelector;
