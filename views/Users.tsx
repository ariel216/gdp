
import React, { useState, useMemo } from 'react';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  alias: string;
  role: string;
  office: string;
  level: 'L-1' | 'L-2' | 'L-3' | 'L-4' | 'L-5';
  gender: 'M' | 'F';
  lastLogin: string;
  logins: number;
  created: string;
  status: 'Active' | 'Inactive';
  initials: string;
  color: string;
}

const INITIAL_USERS: UserRecord[] = [
  { id: '001', name: 'Juan Pérez', email: 'j.perez@gpd.gob.bo', alias: 'jperez', role: 'Administrador', office: 'Sistemas', level: 'L-5', gender: 'M', lastLogin: '2023-10-24 14:32', logins: 142, created: '2023-01-12', status: 'Active', initials: 'JP', color: 'blue' },
  { id: '002', name: 'Adriana Villarroel', email: 'a.villarroel@gpd.gob.bo', alias: 'avillarroel', role: 'Editor', office: 'Dirección Técnica', level: 'L-3', gender: 'F', lastLogin: '2023-10-23 09:15', logins: 89, created: '2023-02-05', status: 'Active', initials: 'AV', color: 'purple' },
  { id: '003', name: 'Roberto Brown', email: 'r.brown@gpd.gob.bo', alias: 'rbrown', role: 'Visor', office: 'Ventanilla Única', level: 'L-1', gender: 'M', lastLogin: '2023-10-20 18:44', logins: 12, created: '2023-08-20', status: 'Inactive', initials: 'RB', color: 'slate' },
  { id: '004', name: 'Carla Méndez', email: 'c.mendez@gpd.gob.bo', alias: 'cmendez', role: 'Editor', office: 'Recursos Humanos', level: 'L-3', gender: 'F', lastLogin: 'Hoy, 08:45', logins: 210, created: '2023-03-15', status: 'Active', initials: 'CM', color: 'pink' },
];

const Users: React.FC = () => {
  // --- STATE ---
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOffice, setFilterOffice] = useState('Todas las Oficinas');
  const [filterRole, setFilterRole] = useState('Todos los Roles');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<Partial<UserRecord>>({});
  const [activeTab, setActiveTab] = useState(1);

  // --- DERIVED DATA (Filtering) ---
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            u.alias.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOffice = filterOffice === 'Todas las Oficinas' || u.office === filterOffice;
      const matchesRole = filterRole === 'Todos los Roles' || u.role === filterRole;
      
      return matchesSearch && matchesOffice && matchesRole;
    });
  }, [users, searchQuery, filterOffice, filterRole]);

  // --- HANDLERS ---
  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
  };

  const handleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('¿Está seguro de eliminar definitivamente a este usuario? Esta acción es irreversible.')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingUser({ 
      status: 'Active', 
      level: 'L-1', 
      office: 'Ventanilla Única', 
      role: 'Visor',
      color: 'blue' 
    });
    setActiveTab(1);
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserRecord) => {
    setModalMode('edit');
    setEditingUser(user);
    setActiveTab(1);
    setIsModalOpen(true);
  };

  const saveUser = () => {
    if (modalMode === 'create') {
      const newUser: UserRecord = {
        ...editingUser as UserRecord,
        id: (users.length + 1).toString().padStart(3, '0'),
        lastLogin: 'Nunca',
        logins: 0,
        created: new Date().toISOString().split('T')[0],
        initials: (editingUser.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase(),
      };
      setUsers(prev => [...prev, newUser]);
    } else {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...editingUser } : u));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-32">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Gestión de Usuarios</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Control centralizado de identidades, roles jerárquicos y auditoría de accesos.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
              <span className="material-symbols-outlined !text-xl">file_download</span>
              Exportar
            </button>
            <button 
              onClick={openCreateModal}
              className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:bg-blue-600 transition-all active:scale-95 group"
            >
              <span className="material-symbols-outlined !text-xl group-hover:rotate-90 transition-transform">add</span>
              Nuevo Usuario
            </button>
          </div>
        </div>

        {/* Global Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Total Registrados', val: users.length, icon: 'group', color: 'blue' },
            { label: 'Usuarios Activos', val: users.filter(u => u.status === 'Active').length, icon: 'verified_user', color: 'emerald' },
            { label: 'Roles de Editor', val: users.filter(u => u.role === 'Editor').length, icon: 'edit_square', color: 'amber' },
            { label: 'Nivel Crítico (L5)', val: users.filter(u => u.level === 'L-5').length, icon: 'shield_lock', color: 'red' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-primary/5 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`size-10 rounded-2xl bg-${s.color}-50 dark:bg-${s.color}-900/20 text-${s.color}-600 dark:text-${s.color}-400 flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <span className="material-symbols-outlined !text-2xl font-bold">{s.icon}</span>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">GPD-V4</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{s.val}</h3>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-4 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Búsqueda Global</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400" 
                  placeholder="Nombre, alias o correo electrónico..." 
                  type="text" 
                />
              </div>
            </div>
            
            <div className="md:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Unidad de Dependencia</label>
              <select 
                value={filterOffice}
                onChange={(e) => setFilterOffice(e.target.value)}
                className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest px-5 dark:text-white appearance-none focus:ring-4 focus:ring-primary/10 transition-all"
              >
                <option>Todas las Oficinas</option>
                <option>Sistemas</option>
                <option>Dirección Técnica</option>
                <option>Recursos Humanos</option>
                <option>Ventanilla Única</option>
              </select>
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Privilegios de Acceso</label>
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest px-5 dark:text-white appearance-none focus:ring-4 focus:ring-primary/10 transition-all"
              >
                <option>Todos los Roles</option>
                <option>Administrador</option>
                <option>Editor</option>
                <option>Visor</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button 
                onClick={() => { setSearchQuery(''); setFilterOffice('Todas las Oficinas'); setFilterRole('Todos los Roles'); }}
                className="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-8 py-6 w-12">
                    <input 
                      checked={selectedIds.size > 0 && selectedIds.size === filteredUsers.length}
                      onChange={() => selectedIds.size === filteredUsers.length ? setSelectedIds(new Set()) : setSelectedIds(new Set(filteredUsers.map(u => u.id)))}
                      className="rounded-lg border-slate-300 dark:border-slate-700 text-primary focus:ring-primary size-5 bg-white dark:bg-slate-800" 
                      type="checkbox" 
                    />
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identidad</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acceso / Nivel</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Auditoría</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Estado</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                  <tr key={u.id} className={`group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${selectedIds.has(u.id) ? 'bg-primary/[0.02]' : ''}`}>
                    <td className="px-8 py-6">
                      <input 
                        checked={selectedIds.has(u.id)}
                        onChange={() => handleSelect(u.id)}
                        className="rounded-lg border-slate-300 dark:border-slate-700 text-primary focus:ring-primary size-5 bg-white dark:bg-slate-800 transition-all" 
                        type="checkbox" 
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className={`size-12 rounded-2xl bg-${u.color}-100 dark:bg-${u.color}-900/20 text-${u.color}-600 dark:text-${u.color}-400 flex items-center justify-center font-black text-sm uppercase shadow-sm border-2 border-white dark:border-slate-800`}>
                          {u.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{u.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold mt-1 tracking-tight">{u.alias} • {u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                           <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-slate-700">{u.role}</span>
                           <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${u.level === 'L-5' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{u.level}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter truncate max-w-[200px]">{u.office}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <p className="text-xs font-black text-slate-700 dark:text-slate-300 tabular-nums uppercase">{u.lastLogin}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{u.logins} ingresos totales</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button 
                        onClick={() => toggleStatus(u.id)}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border transition-all ${
                          u.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' 
                            : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                        {u.status === 'Active' ? 'Activo' : 'Suspendido'}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => openEditModal(u)} className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all" title="Editar Perfil"><span className="material-symbols-outlined !text-2xl font-bold">edit</span></button>
                        <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all" title="Seguridad"><span className="material-symbols-outlined !text-2xl font-bold">security</span></button>
                        <button onClick={() => handleDeleteUser(u.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Eliminar"><span className="material-symbols-outlined !text-2xl font-bold">delete_forever</span></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="py-32 text-center">
                      <div className="size-24 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <span className="material-symbols-outlined !text-5xl text-slate-200 dark:text-slate-700">person_off</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Sin usuarios encontrados</h3>
                      <p className="text-slate-400 dark:text-slate-600 mt-2 font-medium">Ajuste los términos de búsqueda o filtros de oficina.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Floating Action Bar for Bulk Selection */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
           <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-6 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex items-center gap-10 border border-white/10 dark:border-slate-200 backdrop-blur-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Seleccionados</span>
                <span className="text-3xl font-black tabular-nums">{selectedIds.size}</span>
              </div>
              <div className="h-14 w-px bg-white/10 dark:bg-slate-200"></div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    if(confirm(`¿Desea suspender el acceso de ${selectedIds.size} usuarios?`)) {
                      setUsers(prev => prev.map(u => selectedIds.has(u.id) ? { ...u, status: 'Inactive' } : u));
                      setSelectedIds(new Set());
                    }
                  }}
                  className="bg-primary text-white px-8 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95"
                >
                  Suspender Lote
                </button>
                <button 
                  onClick={() => setSelectedIds(new Set())}
                  className="px-6 h-14 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors"
                >
                  Cancelar
                </button>
              </div>
           </div>
        </div>
      )}

      {/* --- USER PROFILE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#1a2632] w-full max-w-[1000px] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-10 py-10 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5">
              <div className="flex items-center gap-6">
                <div className="size-20 rounded-[2rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 relative">
                   <span className="material-symbols-outlined !text-4xl font-black">{modalMode === 'create' ? 'person_add' : 'account_circle'}</span>
                   <div className="absolute -bottom-1 -right-1 size-8 bg-white dark:bg-slate-900 rounded-full border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center">
                     <span className="material-symbols-outlined !text-sm text-primary font-black">verified</span>
                   </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                    {modalMode === 'create' ? 'Crear Nuevo Perfil' : 'Editar Configuración de Usuario'}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
                    <span className="size-2 bg-primary rounded-full"></span>
                    Módulo Administrativo GPD v4.0 • SISTEMA DE IDENTIDADES
                  </p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 p-4 rounded-full transition-all active:scale-90">
                <span className="material-symbols-outlined !text-4xl">close</span>
              </button>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="px-12 py-6 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex gap-10">
               {[
                 { id: 1, label: 'Información Personal', icon: 'badge' },
                 { id: 2, label: 'Cuenta y Acceso', icon: 'key' },
                 { id: 3, label: 'Permisos de Oficina', icon: 'corporate_fare' }
               ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   <span className="material-symbols-outlined !text-xl">{tab.icon}</span>
                   {tab.label}
                   {activeTab === tab.id && <div className="absolute -bottom-[26px] left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-5px_15px_rgba(19,127,236,0.5)]"></div>}
                 </button>
               ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white dark:bg-slate-900/50">
              
              {/* Tab 1: Datos Personales */}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nombre Completo *</label>
                    <input 
                      value={editingUser.name || ''}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full h-16 rounded-[1.5rem] border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase" 
                      placeholder="Ej: MARCO ANTONIO CASTRO" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Correo Institucional *</label>
                    <input 
                      value={editingUser.email || ''}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full h-16 rounded-[1.5rem] border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm lowercase" 
                      placeholder="usuario@gpd.gob.bo" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Género</label>
                    <div className="grid grid-cols-2 gap-4 p-2 bg-slate-50 dark:bg-white/5 rounded-[1.5rem]">
                      <button 
                        onClick={() => setEditingUser({...editingUser, gender: 'M'})}
                        className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editingUser.gender === 'M' ? 'bg-white dark:bg-slate-700 text-primary shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Masculino
                      </button>
                      <button 
                        onClick={() => setEditingUser({...editingUser, gender: 'F'})}
                        className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editingUser.gender === 'F' ? 'bg-white dark:bg-slate-700 text-primary shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Femenino
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Alias de Sistema</label>
                    <input 
                      value={editingUser.alias || ''}
                      onChange={(e) => setEditingUser({...editingUser, alias: e.target.value})}
                      className="w-full h-16 rounded-[1.5rem] border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-mono font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm" 
                      placeholder="mcastro" 
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Acceso */}
              {activeTab === 2 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Rol Operativo *</label>
                      <select 
                        value={editingUser.role || 'Visor'}
                        onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                        className="w-full h-16 rounded-[1.5rem] border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase appearance-none shadow-sm"
                      >
                        <option>Administrador</option>
                        <option>Editor</option>
                        <option>Visor</option>
                        <option>Auditor Externo</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nivel de Seguridad</label>
                      <select 
                        value={editingUser.level || 'L-1'}
                        onChange={(e) => setEditingUser({...editingUser, level: e.target.value as any})}
                        className="w-full h-16 rounded-[1.5rem] border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase appearance-none shadow-sm"
                      >
                        <option>L-1 (Básico)</option>
                        <option>L-2 (Regular)</option>
                        <option>L-3 (Avanzado)</option>
                        <option>L-4 (Crítico)</option>
                        <option>L-5 (Master / Root)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-800/50 rounded-[2.5rem] flex items-center gap-8">
                     <div className="size-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined !text-3xl font-black">lock_reset</span>
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest leading-none mb-2">Restablecer Credenciales</h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300 font-medium italic">Al marcar esta opción, el sistema enviará un código de autenticación multifactor al correo institucional para forzar el cambio de contraseña en el próximo inicio de sesión.</p>
                     </div>
                     <button className="ml-auto px-6 py-3 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-amber-600 shadow-sm hover:bg-amber-100 transition-all active:scale-95">Solicitar Cambio</button>
                  </div>
                </div>
              )}

              {/* Tab 3: Oficinas */}
              {activeTab === 3 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 block">Dependencia Principal *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Sistemas', 'Dirección Técnica', 'Recursos Humanos', 'Ventanilla Única'].map((office) => (
                        <button
                          key={office}
                          onClick={() => setEditingUser({...editingUser, office})}
                          className={`p-6 rounded-[1.5rem] border-2 text-left transition-all flex items-center gap-5 group/item ${editingUser.office === office ? 'border-primary bg-primary/5' : 'border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/5 hover:border-slate-200'}`}
                        >
                          <div className={`size-12 rounded-2xl flex items-center justify-center transition-all ${editingUser.office === office ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-white dark:bg-slate-800 text-slate-300 group-hover/item:text-primary'}`}>
                             <span className="material-symbols-outlined !text-2xl">{editingUser.office === office ? 'check_circle' : 'corporate_fare'}</span>
                          </div>
                          <div>
                            <p className={`text-sm font-black uppercase tracking-tight ${editingUser.office === office ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>{office}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Nivel Central Operativo</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-8 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2.5rem] border-2 border-blue-100 dark:border-blue-800/30">
                    <h4 className="text-xs font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                       <span className="material-symbols-outlined !text-xl">info</span>
                       Reglas de Visibilidad
                    </h4>
                    <p className="text-xs text-blue-700/70 dark:text-blue-300/50 leading-relaxed font-medium">El usuario tendrá acceso total a los trámites radicados en la oficina seleccionada. Según el nivel jerárquico asignado (L3+), también podrá visualizar la correspondencia de las sub-unidades dependientes de su oficina principal.</p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-12 py-10 border-t border-slate-100 dark:border-white/5 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5 shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-4 text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest rounded-2xl transition-all hover:bg-red-50 active:scale-95"
              >
                Cancelar
              </button>
              <div className="flex gap-4">
                {activeTab > 1 && (
                  <button 
                    onClick={() => setActiveTab(activeTab - 1)}
                    className="px-10 py-4 text-[10px] font-black text-slate-700 dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 rounded-2xl transition-all flex items-center gap-3 uppercase tracking-widest active:scale-95"
                  >
                    <span className="material-symbols-outlined !text-xl font-bold">arrow_back</span>
                    Atrás
                  </button>
                )}
                
                {activeTab < 3 ? (
                  <button 
                    onClick={() => setActiveTab(activeTab + 1)}
                    className="px-14 py-4 text-[10px] font-black text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-2xl transition-all shadow-2xl flex items-center gap-3 uppercase tracking-widest active:scale-95 group"
                  >
                    Continuar
                    <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform font-bold">arrow_forward</span>
                  </button>
                ) : (
                  <button 
                    onClick={saveUser}
                    className="px-20 py-5 text-[10px] font-black text-white bg-primary hover:bg-blue-600 rounded-2xl transition-all shadow-[0_20px_60px_rgba(19,127,236,0.35)] flex items-center gap-4 uppercase tracking-widest active:scale-95 group"
                  >
                    {modalMode === 'create' ? 'Registrar Usuario' : 'Actualizar Perfil'}
                    <span className="material-symbols-outlined !text-2xl group-hover:scale-125 transition-transform font-black">save</span>
                  </button> 
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
