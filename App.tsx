
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Users from './views/Users';
import Entities from './views/Entities';
import Offices from './views/Offices';
import Inbox from './views/Inbox';
import Pending from './views/Pending';
import Outbox from './views/Outbox';
import Search from './views/Search';
import Settings from './views/Settings';
import CreateProcess from './views/CreateProcess';
import CreateDocument from './views/CreateDocument';
import ReportsGenerator from './views/ReportsGenerator';
import ReportsSelector from './views/ReportsSelector';
import Roadmaps from './views/Roadmaps';
import Records from './views/Records';
import RegisterCorrespondence from './views/RegisterCorrespondence';
import Tracking from './views/Tracking';
import Procurement from './views/Procurement';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (query: string) => {
    setCurrentView('tracking');
    console.log(`Buscando trámite: ${query}`);
  };

  const toggleSidebar = () => {
    // En desktop colapsa, en mobile abre/cierra el drawer
    if (window.innerWidth >= 1024) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <Users />;
      case 'entities': return <Entities />;
      case 'offices': return <Offices />;
      case 'inbox': return <Inbox />;
      case 'pending': return <Pending />;
      case 'outbox': return <Outbox />;
      case 'search': return <Search />;
      case 'settings': return <Settings />;
      case 'create-process': return <CreateProcess />;
      case 'create-document': return <CreateDocument />;
      case 'reports': return <ReportsSelector onNavigateToGenerator={() => setCurrentView('reports-generator')} />;
      case 'reports-generator': return <ReportsGenerator />;
      case 'roadmaps': return <Roadmaps />;
      case 'records': return <Records />;
      case 'register-correspondence': return <RegisterCorrespondence />;
      case 'tracking': return <Tracking />;
      case 'procurement': return <Procurement />;
      case 'providers': return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-slate-400 dark:text-slate-500 space-y-4 text-center bg-white dark:bg-slate-900">
          <span className="material-symbols-outlined text-6xl">storefront</span>
          <p className="text-xl font-bold">Módulo de PROVEEDORES en desarrollo</p>
          <button onClick={() => setCurrentView('dashboard')} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Volver al Dashboard</button>
        </div>
      );
      default: return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-slate-400 dark:text-slate-500 space-y-4 text-center bg-white dark:bg-slate-900">
          <span className="material-symbols-outlined text-6xl">construction</span>
          <p className="text-xl font-bold">Módulo "{currentView.toUpperCase()}" en desarrollo</p>
          <button onClick={() => setCurrentView('dashboard')} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Volver al Dashboard</button>
        </div>
      );
    }
  };

  const getBreadcrumb = () => {
    const base = ['Admin'];
    switch (currentView) {
      case 'dashboard': return [...base, 'Dashboard'];
      case 'users': return [...base, 'Gestión de Usuarios'];
      case 'entities': return [...base, 'Gestión de Entidades'];
      case 'offices': return [...base, 'Estructura Orgánica'];
      case 'inbox': return [...base, 'Bandeja', 'Entrada'];
      case 'pending': return [...base, 'Bandeja', 'Pendientes'];
      case 'outbox': return [...base, 'Bandeja', 'Salida'];
      case 'search': return [...base, 'Reportes', 'Búsqueda Avanzada'];
      case 'settings': return [...base, 'Configuración del Sistema'];
      case 'create-process': return ['Inicio', 'Procesos', 'Nuevo Proceso'];
      case 'create-document': return [...base, 'Documento', 'Crear'];
      case 'reports': return [...base, 'Reportes', 'Selector de Categorías'];
      case 'reports-generator': return [...base, 'Reportes', 'Generador Parametrizado'];
      case 'roadmaps': return [...base, 'Hojas de Ruta', 'Gestión de Lotes'];
      case 'records': return [...base, 'Ventanilla', 'Registros del Día'];
      case 'register-correspondence': return [...base, 'Ventanilla', 'Nuevo Registro'];
      case 'tracking': return [...base, 'Consultas', 'Seguimiento HR'];
      case 'procurement': return [...base, 'Contrataciones', 'Panel de Procesos'];
      case 'providers': return [...base, 'Contrataciones', 'Proveedores'];
      default: return [...base, currentView];
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard General';
      case 'users': return 'Gestión de Usuarios';
      case 'entities': return 'Gestión de Entidades';
      case 'offices': return 'Gestión de Oficinas';
      case 'inbox': return 'Bandeja de Entrada';
      case 'pending': return 'Documentos Pendientes';
      case 'outbox': return 'Correspondencia Enviada';
      case 'search': return 'Búsqueda Avanzada';
      case 'settings': return 'Configuración';
      case 'create-process': return 'Nuevo Proceso de Contratación';
      case 'create-document': return 'Generar Nuevo Documento';
      case 'reports': return 'Selector de Reportes';
      case 'reports-generator': return 'Generador de Reportes';
      case 'roadmaps': return 'Hojas de Ruta';
      case 'records': return 'Registros del Día';
      case 'register-correspondence': return 'Registro de Correspondencia';
      case 'tracking': return 'Seguimiento por Hoja de Ruta';
      case 'procurement': return 'Panel de Contrataciones';
      case 'providers': return 'Gestión de Proveedores';
      default: return currentView.charAt(0).toUpperCase() + currentView.slice(1);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className={`
        fixed inset-0 z-50 transition-all duration-300 lg:relative lg:translate-x-0 lg:shrink-0
        ${isSidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          currentView={currentView === 'reports-generator' ? 'reports' : (currentView === 'create-process' ? 'procurement' : (currentView === 'create-document' ? 'create-document' : currentView))} 
          onViewChange={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }} 
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header 
          viewTitle={getViewTitle()} 
          breadcrumb={getBreadcrumb()}
          onAction={currentView === 'inbox' || currentView === 'records' ? () => setCurrentView('register-correspondence') : (currentView === 'procurement' ? () => setCurrentView('create-process') : undefined)}
          actionLabel={currentView === 'inbox' || currentView === 'records' ? 'Nuevo Registro' : (currentView === 'procurement' ? 'Nuevo Proceso' : undefined)}
          onMenuToggle={toggleSidebar}
          onSearch={handleSearch}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        
        <main className="flex-1 overflow-hidden">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
