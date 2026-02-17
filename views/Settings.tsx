
import React, { useState } from 'react';

type SettingsTab = 'general' | 'documentos' | 'notificaciones' | 'seguridad' | 'catalogos';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showToast, setShowToast] = useState(false);

  const tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'documentos', label: 'Documentos', icon: 'description' },
    { id: 'notificaciones', label: 'Notificaciones', icon: 'notifications_active' },
    { id: 'seguridad', label: 'Seguridad', icon: 'security' },
    { id: 'catalogos', label: 'Catálogos', icon: 'database' },
  ];

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="h-full bg-background-light dark:bg-background-dark relative flex flex-col transition-colors">
      <main className="max-w-7xl mx-auto w-full px-4 py-6 md:py-8 pb-32 animate-in fade-in duration-500 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 shrink-0 overflow-x-auto no-scrollbar lg:overflow-visible">
            <div className="flex lg:flex-col gap-1 md:gap-2 p-1 bg-slate-200/30 dark:bg-slate-800/30 rounded-2xl lg:bg-transparent lg:rounded-none lg:p-0 min-w-max lg:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 text-[10px] md:text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-sm ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 ring-1 ring-primary/20'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-primary bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined !text-lg md:!text-xl">{tab.icon}</span>
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Configuration Content Area */}
          <div className="flex-1 space-y-6 md:space-y-8 min-w-0">
            {activeTab === 'general' && (
              <section className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                  <div className="p-5 md:p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                    <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Identidad del Sistema</h2>
                    <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Configuración base y estética visual.</p>
                  </div>
                  <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-5 md:space-y-6">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nombre Global GPD</label>
                        <input className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary text-sm py-3 font-bold px-4 transition-all" type="text" defaultValue="Sistema de Gestión Pública Digital (GPD)"/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Timeout (min)</label>
                          <input className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary text-sm py-3 font-bold px-4 transition-all" type="number" defaultValue="30"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Gestión Vigente</label>
                          <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary text-sm py-3 font-bold px-4 transition-all">
                            <option selected>2024</option>
                            <option>2025</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {['documentos', 'notificaciones', 'seguridad', 'catalogos'].includes(activeTab) && (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in zoom-in-95 duration-300 transition-colors">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-4">construction</span>
                <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Configuración en desarrollo</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Bar */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.05)] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <span className="material-symbols-outlined text-lg">info</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Cambio global del sistema</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-5 md:px-6 py-2.5 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95">
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none bg-primary text-white px-6 md:px-10 py-2.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20 hover:bg-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined !text-base">save</span>
              Aplicar
            </button>
          </div>
        </div>
      </footer>

      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          Configuración actualizada con éxito
        </div>
      )}
    </div>
  );
};

export default Settings;
