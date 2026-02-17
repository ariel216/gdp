
import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  viewTitle: string;
  onAction?: () => void;
  actionLabel?: string;
  breadcrumb?: string[];
  onMenuToggle?: () => void;
  onSearch?: (query: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  viewTitle, 
  onAction, 
  actionLabel, 
  breadcrumb = ['Admin', 'Dashboard'], 
  onMenuToggle,
  onSearch,
  theme,
  onToggleTheme
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue);
      setSearchValue('');
    }
  };

  const notifications = [
    { id: 1, title: 'Nuevo Documento Recibido', desc: 'HR-2024-0892 asignado a su oficina.', time: 'Hace 5 min', type: 'info', read: false },
    { id: 2, title: 'Derivación Cancelada', desc: 'V. Arancibia recuperó el trámite GPD-2023-4592.', time: 'Hace 25 min', type: 'warning', read: false },
    { id: 3, title: 'Recordatorio de Plazo', desc: 'El informe técnico #442 vence en 24 horas.', time: 'Hace 2 horas', type: 'error', read: true },
  ];

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"
          aria-label="Open Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <nav className="hidden sm:flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 overflow-hidden">
          {breadcrumb.map((crumb, idx) => (
            <React.Fragment key={crumb}>
              <span className="hover:text-primary dark:hover:text-primary transition-colors cursor-pointer whitespace-nowrap">{crumb}</span>
              {idx < breadcrumb.length - 1 && (
                <span className="mx-1 md:mx-2 material-symbols-outlined text-sm shrink-0">chevron_right</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex-1 max-w-xl px-4 md:px-12 hidden md:block">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            placeholder="Buscar Hoja de Ruta (HR-...) o NURI..."
            type="text"
          />
        </form>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="hidden sm:inline">{actionLabel}</span>
          </button>
        )}
        
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            onClick={onToggleTheme}
            className="size-9 md:size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all"
            title={theme === 'light' ? 'Activar Modo Oscuro' : 'Activar Modo Claro'}
          >
            <span className="material-symbols-outlined">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative size-9 md:size-10 flex items-center justify-center rounded-xl transition-all ${isNotificationsOpen ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'}`}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notificaciones</h4>
                  <button className="text-[9px] font-black uppercase text-primary hover:underline">Marcar todas</button>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/20 dark:bg-blue-900/5' : ''}`}>
                      <div className="flex justify-between items-start gap-3">
                        <div className={`size-8 rounded-lg shrink-0 flex items-center justify-center ${n.type === 'info' ? 'bg-blue-50 text-blue-500' : n.type === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'}`}>
                          <span className="material-symbols-outlined !text-lg">{n.type === 'info' ? 'inbox' : n.type === 'warning' ? 'warning' : 'priority_high'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase truncate">{n.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">{n.desc}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase tabular-nums">{n.time}</p>
                        </div>
                        {!n.read && <div className="size-1.5 rounded-full bg-primary mt-1"></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors border-t border-slate-50 dark:border-slate-800">
                  Ver todo el historial
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 md:mx-2"></div>
        
        {/* User Profile Menu */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 md:gap-3 group transition-all"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs md:text-sm font-black text-slate-900 dark:text-white leading-none group-hover:text-primary transition-colors uppercase tracking-tight">Juan Pérez</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-bold uppercase tracking-widest">Admin</p>
            </div>
            <div className="relative">
              <img
                alt="Profile"
                className={`size-9 md:size-10 rounded-xl border-2 object-cover shadow-sm transition-all ${isUserMenuOpen ? 'border-primary ring-4 ring-primary/10' : 'border-slate-100 dark:border-slate-800 group-hover:border-primary/50'}`}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoqklH1cieTaMabQ-DfpmY5eV7dWBeQC-nplEGuXQSKKa_8ABcVmmyDHyWb7Dv1ZVqNtKYj1Y8bEZwLAbncF97wl-28YHwVpJlxeG1sRGozGl5HT4MgHBtblVR8aeHiAVaEXNHwuLhYYnLbtX64URagb4PgtYB2_Q-D_GFPjQ053kMGBh7IlhqIrEcGyG3CLtZXsTVyB6dtCp-EwyxEGU3MTuY2fTieKzFom4GxDQOB2LLXJtxSplUU7LDFsh2yRSZQxHpPHZNmcCD"
              />
              <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Identidad de Acceso</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase truncate">Juan Pérez V.</p>
                  <p className="text-[10px] text-slate-500 font-bold truncate">j.perez@gpd.gob.bo</p>
               </div>
               <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all uppercase tracking-widest">
                    <span className="material-symbols-outlined !text-xl">account_circle</span>
                    Mi Perfil
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all uppercase tracking-widest">
                    <span className="material-symbols-outlined !text-xl">shield_person</span>
                    Seguridad
                  </button>
                  <div className="h-px bg-slate-50 dark:bg-slate-800 my-2"></div>
                  <button 
                    onClick={() => alert('Sesión finalizada correctamente.')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined !text-xl">logout</span>
                    Cerrar Sesión
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
