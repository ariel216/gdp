
import React, { useState, useMemo } from 'react';
import { Entity } from '../types';

const INITIAL_ENTITIES: Entity[] = [
  { id: '1', name: 'Ministerio de Economía y Finanzas Públicas', sigla: 'MEFP', type: 'Pública', address: 'Av. Mariscal Santa Cruz, La Paz', phone: '2-220000', officeCount: 12, status: 'Activo' },
  { id: '2', name: 'Banco Central de Bolivia', sigla: 'BCB', type: 'Autárquica', address: 'Calle Ayacucho esq. Mercado', phone: '2-240000', officeCount: 8, status: 'Activo' },
  { id: '3', name: 'Caja Nacional de Salud', sigla: 'CNS', type: 'Descentralizada', address: 'Av. Arce No. 2525', phone: '2-210101', officeCount: 45, status: 'Activo' },
  { id: '4', name: 'Telefónica Nacional S.A.', sigla: 'TEL-SA', type: 'Privada', address: 'Equipetrol Calle 7 Este', phone: '3-345000', officeCount: 5, status: 'Inactivo' },
];

const Entities: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>(INITIAL_ENTITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Partial<Entity>>({});

  const filteredEntities = useMemo(() => {
    return entities.filter(e => 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.sigla.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [entities, searchQuery]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntity.id) {
      setEntities(prev => prev.map(ent => ent.id === editingEntity.id ? { ...ent, ...editingEntity } as Entity : ent));
    } else {
      const newEnt: Entity = {
        ...editingEntity as Entity,
        id: Math.random().toString(36).substr(2, 9),
        officeCount: 0,
        status: 'Activo'
      };
      setEntities(prev => [...prev, newEnt]);
    }
    setIsModalOpen(false);
    setEditingEntity({});
  };

  const openEdit = (e: Entity) => {
    setEditingEntity(e);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Gestión de Entidades</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Instituciones registradas en el ecosistema GPD.</p>
          </div>
            <button 
            onClick={() => { setEditingEntity({}); setIsModalOpen(true); }}
            className="bg-primary text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-3"
          >
            <span className="material-symbols-outlined">add_business</span>
            Nueva Entidad
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Total Entidades', val: entities.length, color: 'blue', icon: 'corporate_fare' },
             { label: 'Entidades Públicas', val: entities.filter(e => e.type === 'Pública').length, color: 'emerald', icon: 'account_balance' },
             { label: 'Oficinas Totales', val: entities.reduce((acc, curr) => acc + curr.officeCount, 0), color: 'amber', icon: 'domain' },
             { label: 'Suspendidas', val: entities.filter(e => e.status === 'Inactivo').length, color: 'red', icon: 'domain_disabled' },
           ].map((s, i) => (
             <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className={`size-12 rounded-2xl bg-${s.color}-50 dark:bg-${s.color}-900/20 text-${s.color}-600 dark:text-${s.color}-400 flex items-center justify-center mb-4`}>
                  <span className="material-symbols-outlined !text-3xl font-bold">{s.icon}</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{s.val}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
             </div>
           ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
          <div className="relative group max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400" 
              placeholder="Buscar por nombre o sigla institucional..." 
            />
          </div>
        </div>

        {/* Grid of Entities */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEntities.map((e) => (
            <div key={e.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                  <span className="material-symbols-outlined !text-[8rem]">business</span>
               </div>
               
               <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="size-16 rounded-[1.5rem] bg-primary/10 text-primary flex items-center justify-center text-xl font-black shadow-inner">
                    {e.sigla}
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${e.status === 'Activo' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                    {e.status}
                  </span>
               </div>

               <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight mb-2 line-clamp-2 min-h-[3.5rem]">{e.name}</h4>
               <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">{e.type}</p>

               <div className="space-y-4 border-t border-slate-50 dark:border-slate-800 pt-6">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined !text-lg">location_on</span>
                    <span className="text-xs font-medium truncate">{e.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined !text-lg">call</span>
                    <span className="text-xs font-bold tabular-nums">{e.phone}</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase">Oficinas vinculadas</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">{e.officeCount}</span>
                    </div>
                    <button onClick={() => openEdit(e)} className="size-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm flex items-center justify-center">
                       <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

      </main>

      {/* --- MODAL ENTIDAD --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <form onSubmit={handleSave} className="bg-white dark:bg-[#1a2632] w-full max-w-[800px] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200">
            <div className="px-10 py-10 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-[#fcfdfe] dark:bg-white/5">
               <div className="flex items-center gap-5">
                  <div className="size-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30">
                    <span className="material-symbols-outlined !text-3xl font-black">business</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{editingEntity.id ? 'Editar Institución' : 'Registrar Institución'}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Configuración estructural del sistema</p>
                  </div>
               </div>
               <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                 <span className="material-symbols-outlined !text-4xl">close</span>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-8 custom-scrollbar">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nombre Completo de la Entidad *</label>
                 <input 
                    required
                    value={editingEntity.name || ''}
                    onChange={e => setEditingEntity({...editingEntity, name: e.target.value})}
                    className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase" 
                    placeholder="Ej: Ministerio de Salud y Deportes"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sigla / Código Institucional *</label>
                    <input 
                      required
                      value={editingEntity.sigla || ''}
                      onChange={e => setEditingEntity({...editingEntity, sigla: e.target.value})}
                      className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-mono font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-lg uppercase" 
                      placeholder="MIN-SALUD"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipo de Entidad</label>
                    <select 
                      value={editingEntity.type || 'Pública'}
                      onChange={e => setEditingEntity({...editingEntity, type: e.target.value as any})}
                      className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase"
                    >
                      <option>Pública</option>
                      <option>Privada</option>
                      <option>Descentralizada</option>
                      <option>Autárquica</option>
                    </select>
                  </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Dirección Principal</label>
                 <textarea 
                    value={editingEntity.address || ''}
                    onChange={e => setEditingEntity({...editingEntity, address: e.target.value})}
                    className="w-full h-24 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-medium p-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm resize-none" 
                    placeholder="Ubicación física..."
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Teléfono Central</label>
                    <input 
                      value={editingEntity.phone || ''}
                      onChange={e => setEditingEntity({...editingEntity, phone: e.target.value})}
                      className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm" 
                      placeholder="2-220000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Estado Operativo</label>
                    <select 
                      value={editingEntity.status || 'Activo'}
                      onChange={e => setEditingEntity({...editingEntity, status: e.target.value as any})}
                      className="w-full h-16 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase"
                    >
                      <option>Activo</option>
                      <option>Inactivo</option>
                    </select>
                  </div>
               </div>
            </div>

            <div className="px-12 py-10 border-t border-slate-100 dark:border-white/5 bg-[#fcfdfe] dark:bg-white/5 flex justify-end gap-4">
               <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-all">Cancelar</button>
               <button type="submit" className="px-12 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95">Guardar Cambios</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Entities;
