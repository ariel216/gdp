
import React, { useState } from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isCollapsed = false }) => {
  const [isBandejasOpen, setIsBandejasOpen] = useState(true);

  const menuItems: { id: ViewType; label: string; icon: string; section?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'procurement', label: 'Procesos', icon: 'description', section: 'CONTRATACIONES' },
    { id: 'providers', label: 'Proveedores', icon: 'storefront' },
    { id: 'create-document', label: 'Crear Documento', icon: 'add_box', section: 'DOCUMENTACIÓN' },
    { id: 'register-correspondence', label: 'Nuevo Registro', icon: 'app_registration' },
    { id: 'records', label: 'Registros del Día', icon: 'list_alt' },
    { id: 'tracking', label: 'Seguimiento HR', icon: 'account_tree' },
    { id: 'roadmaps', label: 'Hojas de Ruta', icon: 'description' },
    { id: 'users', label: 'Usuarios', icon: 'group', section: 'ADMINISTRACIÓN' },
    { id: 'entities', label: 'Entidades', icon: 'business' },
    { id: 'offices', label: 'Oficinas', icon: 'corporate_fare' },
    { id: 'reports', label: 'Reportes', icon: 'assessment' },
    { id: 'settings', label: 'Configuración', icon: 'settings' },
  ];

  const bandejaSubItems = [
    { id: 'inbox' as ViewType, label: 'Entrada', icon: 'inbox' },
    { id: 'pending' as ViewType, label: 'Pendientes', icon: 'pending_actions' },
    { id: 'outbox' as ViewType, label: 'Salida', icon: 'send' },
  ];

  return (
    <aside className={`bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col h-full transition-all duration-300 shadow-sm ${isCollapsed ? 'w-[72px]' : 'w-64'}`}>
      <div className={`p-4 flex items-center border-b border-slate-100 dark:border-slate-800 h-16 shrink-0 transition-all shadow-sm ${isCollapsed ? 'justify-center' : 'gap-3 px-6'}`}>
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
          <span className="material-symbols-outlined text-2xl">account_balance</span>
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden animate-in fade-in duration-300">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">GPD Admin</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Gestión Pública Digital</p>
          </div>
        )}
      </div>

      <nav className={`flex-1 overflow-y-auto custom-scrollbar transition-all ${isCollapsed ? 'p-2 space-y-1' : 'p-4 space-y-0.5'}`}>
        {/* Regular Dashboard Item */}
        <button
          onClick={() => onViewChange('dashboard')}
          title={isCollapsed ? 'Dashboard' : undefined}
          className={`w-full flex items-center rounded-xl transition-all ${isCollapsed ? 'justify-center py-2.5' : 'gap-3 px-4 py-2.5'} ${
            currentView === 'dashboard'
              ? 'bg-primary text-white shadow-sm shadow-primary/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined shrink-0">dashboard</span>
          {!isCollapsed && <span className="text-sm font-medium">Dashboard</span>}
        </button>

        {/* Bandejas Nested Section */}
        <div className="pt-2">
          <button 
            onClick={() => !isCollapsed && setIsBandejasOpen(!isBandejasOpen)}
            title={isCollapsed ? 'Bandejas' : undefined}
            className={`w-full flex items-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all ${isCollapsed ? 'justify-center py-2.5' : 'justify-between px-4 py-2.5'}`}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
              <span className="material-symbols-outlined shrink-0">mail</span>
              {!isCollapsed && <span className="text-sm font-medium">Bandejas</span>}
            </div>
            {!isCollapsed && (
              <span className={`material-symbols-outlined text-sm transition-transform ${isBandejasOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            )}
          </button>
          
          {isBandejasOpen && !isCollapsed && (
            <div className="ml-4 mt-1 border-l border-slate-100 dark:border-slate-800 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              {bandejaSubItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs transition-all ${
                      currentView === item.id
                        ? 'text-primary bg-primary/5 font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Other Sections */}
        {menuItems.filter(i => i.id !== 'dashboard').map((item) => (
          <React.Fragment key={item.id}>
            {item.section && !isCollapsed && (
              <p className="px-4 py-2 mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap overflow-hidden">
                {item.section}
              </p>
            )}
            <button
              onClick={() => onViewChange(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-xl transition-all ${isCollapsed ? 'justify-center py-2.5' : 'gap-3 px-4 py-2.5'} ${
                currentView === item.id || (item.id === 'reports' && currentView === 'reports-generator')
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          </React.Fragment>
        ))}
      </nav>

      <div className={`border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 transition-all shadow-sm ${isCollapsed ? 'p-2' : 'p-4 px-6'}`}>
        <div className={`flex items-center transition-all ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <img
            alt="Admin"
            className="size-9 rounded-full border border-white dark:border-slate-800 shadow-sm shrink-0 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFaJr75ukOFRyPjX5SusbBbT652KDB7vj7xmHYQYEbL3ZIdv8FgX2CXOgtbO1iMxRqKl67Uuc0dVpprTmQXqek6p0akZ5DuNhs7_LM6wsN1fpvXvyxUK0y0QoPZRiP-HQK_qs-GbK6-tm0p2Cw1gb02PxDIMPJMzv9GiFkUukK3DNg9EShcq2w83oui0VoUzSbJip1DMsXk2COpPvC1xxywKaWqJDFlIxla7qxLIIZwDUNKQkaxQgSoMHFb_x6nSReLiJ7-tzsMfSC"
          />
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden animate-in fade-in duration-300">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">Juan Pérez</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold truncate">Ventanilla Única</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="text-slate-400 hover:text-primary transition-colors shrink-0">
              <span className="material-symbols-outlined">logout</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
