
import React from 'react';

const CreateProcess: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight uppercase">Creación de Proceso de Contratación</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Complete los datos requeridos para iniciar un nuevo proceso administrativo.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-4 items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progreso Global</span>
                <span className="text-sm font-bold text-primary">25% Completado</span>
              </div>
              <div className="w-64 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wizard Stepper */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 overflow-hidden transition-colors">
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
            {/* Step 1: Active */}
            <div className="flex-1 min-w-[150px] flex items-center justify-center p-4 border-b-2 border-primary bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                <span className="text-primary font-bold text-sm uppercase tracking-tight">Datos Básicos</span>
              </div>
            </div>
            {/* Steps 2-4 (Inactive) */}
            {['Cronograma', 'Responsables', 'Documentos'].map((step, i) => (
              <div key={step} className="flex-1 min-w-[150px] flex items-center justify-center p-4 border-b-2 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-200 dark:border-slate-700">{i + 2}</div>
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-tight">{step}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Step Content: Datos Básicos */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column: Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Información General</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Número de Proceso</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 py-3 px-4 font-black cursor-not-allowed" disabled type="text" value="GPD-LP-0001-2024"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Gestión</label>
                    <select className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-primary text-sm font-bold h-11 px-4 dark:text-white">
                      <option>2024</option>
                      <option>2025</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Presupuesto Referencial (Bs.)</label>
                    <input className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-primary font-black text-xl text-primary py-3 px-4" placeholder="0.00" type="number"/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Objeto de Contratación</label>
                    <textarea className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-2xl focus:ring-primary min-h-[120px] p-4 text-sm font-medium dark:text-white" placeholder="Describa el propósito..." rows={4}></textarea>
                  </div>
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 sticky top-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Resumen del Proceso</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-y border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Ref.</span>
                      <span className="text-lg font-black text-primary">0,00 Bs.</span>
                    </div>
                    <button className="w-full bg-primary text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95">
                      Siguiente Paso
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProcess;
