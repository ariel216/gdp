
import React, { useState, useMemo } from 'react';

interface Office {
  id: string;
  code: string;
  name: string;
  fullName: string;
  type: 'Dirección' | 'Departamento' | 'Unidad';
  status: 'Activo' | 'Inactivo';
  parentId: string | null;
  entityId: string; // New field
  children?: Office[];
}

const INITIAL_OFFICES: Office[] = [
  {
    id: '1',
    code: 'DG-001',
    name: 'Dirección General de Planificación',
    fullName: 'Dirección General de Planificación y Coordinación Institucional',
    type: 'Dirección',
    status: 'Activo',
    parentId: null,
    entityId: '1'
  },
  {
    id: '2',
    code: 'DEP-042',
    name: 'Departamento de Proyectos',
    fullName: 'Departamento de Planificación de Proyectos Estratégicos',
    type: 'Departamento',
    status: 'Activo',
    parentId: '1',
    entityId: '1'
  },
  {
    id: '3',
    code: 'UNI-012',
    name: 'Unidad de Seguimiento',
    fullName: 'Unidad de Seguimiento y Monitoreo de Metas',
    type: 'Unidad',
    status: 'Activo',
    parentId: '2',
    entityId: '1'
  },
  {
    id: '4',
    code: 'DEP-043',
    name: 'Departamento de Presupuesto',
    fullName: 'Departamento de Gestión Presupuestaria',
    type: 'Departamento',
    status: 'Activo',
    parentId: '1',
    entityId: '1'
  },
  {
    id: '5',
    code: 'DG-002',
    name: 'Dirección Administrativa',
    fullName: 'Dirección General de Asuntos Administrativos',
    type: 'Dirección',
    status: 'Activo',
    parentId: null,
    entityId: '2'
  }
];

// Mock entities list for selection
const MOCK_ENTITIES = [
  { id: '1', name: 'Min. Economía', sigla: 'MEFP' },
  { id: '2', name: 'Banco Central', sigla: 'BCB' },
  { id: '3', name: 'Caja Nac. Salud', sigla: 'CNS' }
];

const Offices: React.FC = () => {
  // --- STATE ---
  const [offices, setOffices] = useState<Office[]>(INITIAL_OFFICES);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>('1');
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'flat'>('hierarchy');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2']));

  // --- DERIVED DATA ---
  const selectedOffice = useMemo(() => 
    offices.find(o => o.id === selectedOfficeId) || null
  , [selectedOfficeId, offices]);

  const toggleExpand = (id: string) => {
    const next = new Set(expandedNodes);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedNodes(next);
  };

  const buildTree = (data: Office[], parentId: string | null = null): Office[] => {
    return data
      .filter(item => item.parentId === parentId)
      .map(item => ({ ...item, children: buildTree(data, item.id) }));
  };

  const treeData = useMemo(() => buildTree(offices), [offices]);

  const flatData = useMemo(() => {
    if (!searchQuery) return offices;
    return offices.filter(o => 
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [offices, searchQuery]);

  // --- HANDLERS ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cambios guardados exitosamente.');
    setIsEditing(false);
  };

  const handleCreateNew = (parentId: string | null = null) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newOffice: Office = {
      id: newId,
      code: 'NUEVO-' + Math.floor(Math.random() * 1000),
      name: 'Nueva Oficina',
      fullName: '',
      type: 'Unidad',
      status: 'Activo',
      parentId: parentId,
      entityId: selectedOffice?.entityId || '1'
    };
    setOffices([...offices, newOffice]);
    setSelectedOfficeId(newId);
    setIsEditing(true);
  };

  const handleUpdateField = (field: keyof Office, value: any) => {
    setOffices(prev => prev.map(o => o.id === selectedOfficeId ? { ...o, [field]: value } : o));
  };

  // --- RENDER HELPERS ---
  const renderTreeNode = (node: Office, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = (node.children?.length || 0) > 0;
    const isSelected = selectedOfficeId === node.id;

    const typeIcons = {
      'Dirección': 'corporate_fare',
      'Departamento': 'domain',
      'Unidad': 'person_pin_circle'
    };

    const typeColors = {
      'Dirección': 'text-primary bg-primary/10',
      'Departamento': 'text-blue-600 bg-blue-50',
      'Unidad': 'text-amber-600 bg-amber-50'
    };

    return (
      <div key={node.id} className="relative">
        <div 
          className={`flex items-center gap-3 group p-2 rounded-xl transition-all border border-transparent cursor-pointer 
            ${isSelected ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          onClick={() => setSelectedOfficeId(node.id)}
          style={{ marginLeft: `${depth * 24}px` }}
        >
          {/* Connector Line for visual depth */}
          {depth > 0 && (
            <div className="absolute left-[-16px] top-[-10px] bottom-1/2 w-4 border-l-2 border-b-2 border-slate-100 dark:border-slate-800 rounded-bl-lg pointer-events-none"></div>
          )}

          <button 
            className={`size-6 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${!hasChildren ? 'opacity-0 pointer-events-none' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
          >
            <span className={`material-symbols-outlined !text-sm transition-transform ${isExpanded ? 'rotate-90' : ''}`}>chevron_right</span>
          </button>

          <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${typeColors[node.type]}`}>
            <span className="material-symbols-outlined !text-lg">{typeIcons[node.type]}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className={`text-xs md:text-sm truncate uppercase tracking-tight ${isSelected ? 'font-black text-primary' : 'font-bold text-slate-700 dark:text-slate-300'}`}>
              {node.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">{node.code}</span>
              {node.status === 'Inactivo' && (
                <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">Inactivo</span>
              )}
              <span className="text-[8px] font-black text-slate-400 uppercase opacity-60">Entidad ID: {node.entityId}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="p-1.5 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm text-slate-400 hover:text-primary rounded-lg transition-all"
              onClick={(e) => { e.stopPropagation(); setSelectedOfficeId(node.id); setIsEditing(true); }}
              title="Editar"
            >
              <span className="material-symbols-outlined !text-lg">edit</span>
            </button>
            <button 
              className="p-1.5 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm text-slate-400 hover:text-primary rounded-lg transition-all"
              onClick={(e) => { e.stopPropagation(); handleCreateNew(node.id); }}
              title="Añadir Dependencia"
            >
              <span className="material-symbols-outlined !text-lg">add_box</span>
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1 relative">
            {/* Vertical pipe for tree */}
            <div className="absolute left-[35px] top-[-4px] bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 pointer-events-none" style={{ left: `${depth * 24 + 11}px` }}></div>
            {node.children?.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col xl:flex-row p-4 md:p-8 gap-6 md:gap-8 animate-in fade-in duration-500 overflow-hidden h-full bg-background-light dark:bg-background-dark transition-colors">
      
      {/* --- TREE NAVIGATION --- */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Estructura Orgánica</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm max-w-md leading-relaxed font-medium">Gestione la jerarquía institucional y dependencias gubernamentales.</p>
          </div>
          <button 
            onClick={() => handleCreateNew(null)}
            className="bg-primary hover:bg-blue-600 text-white font-black py-2.5 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 active:scale-95 text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined !text-lg">add_circle</span>
            <span>Nueva Dirección</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0 transition-colors">
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 md:p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 gap-4">
            <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto">
              <button 
                onClick={() => setViewMode('hierarchy')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 
                  ${viewMode === 'hierarchy' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined !text-base md:!text-lg">account_tree</span>
                Jerarquía
              </button>
              <button 
                onClick={() => setViewMode('flat')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 
                  ${viewMode === 'flat' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined !text-base md:!text-lg">list_alt</span>
                Plano
              </button>
            </div>
            
            <div className="relative flex-1 w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold focus:ring-primary focus:border-primary transition-all" 
                placeholder="Buscar por nombre o código..." 
                type="text" 
              />
            </div>
          </div>

          <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-1">
            {viewMode === 'hierarchy' ? (
              <div className="space-y-1">
                {treeData.map(node => renderTreeNode(node))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {flatData.map(node => (
                  <div 
                    key={node.id} 
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-center gap-4
                      ${selectedOfficeId === node.id ? 'bg-primary/5 border-primary/30' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary/20'}`}
                    onClick={() => setSelectedOfficeId(node.id)}
                  >
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm
                      ${node.type === 'Dirección' ? 'bg-primary/10 text-primary' : node.type === 'Departamento' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                      <span className="material-symbols-outlined !text-xl">
                        {node.type === 'Dirección' ? 'corporate_fare' : node.type === 'Departamento' ? 'domain' : 'person_pin_circle'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs md:text-sm font-black text-slate-900 dark:text-white uppercase truncate">{node.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">{node.code} • {node.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest gap-4">
            <div className="flex items-center gap-4 overflow-x-auto w-full sm:w-auto no-scrollbar">
              <span className="flex items-center gap-2 whitespace-nowrap"><span className="material-symbols-outlined !text-sm text-primary">corporate_fare</span> Dirección</span>
              <span className="flex items-center gap-2 whitespace-nowrap"><span className="material-symbols-outlined !text-sm text-blue-600">domain</span> Departamento</span>
              <span className="flex items-center gap-2 whitespace-nowrap"><span className="material-symbols-outlined !text-sm text-amber-600">person_pin_circle</span> Unidad</span>
            </div>
            <p className="whitespace-nowrap opacity-60">Total: {offices.length} Oficinas registradas</p>
          </div>
        </div>
      </div>

      {/* --- DETAIL PANEL --- */}
      <aside className="w-full xl:w-[420px] shrink-0 h-full">
        {selectedOffice ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-full transition-all hover:shadow-primary/5">
            <div className="bg-primary p-6 md:p-8 text-white relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined !text-[120px]">corporate_fare</span>
              </div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <h3 className="text-xl md:text-2xl font-black flex items-center gap-3 uppercase tracking-tight">
                  <span className="material-symbols-outlined !text-3xl">info_i</span>
                  Gestión de Oficina
                </h3>
                <button 
                  onClick={() => setSelectedOfficeId(null)}
                  className="hover:bg-white/20 p-2 rounded-xl transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-80 relative z-10">
                {isEditing ? 'Editando Parámetros' : 'Consulta de Dependencia'}
              </p>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0">
              <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {/* Entity Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Entidad de Pertenencia *</label>
                    <select 
                      disabled={!isEditing}
                      className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm py-3 font-black px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all dark:text-white disabled:opacity-60 appearance-none"
                      value={selectedOffice.entityId}
                      onChange={(e) => handleUpdateField('entityId', e.target.value)}
                    >
                      {MOCK_ENTITIES.map(ent => (
                        <option key={ent.id} value={ent.id}>{ent.name} ({ent.sigla})</option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nombre Corto / Identificador *</label>
                    <input 
                      disabled={!isEditing}
                      className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm py-3 font-black px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all dark:text-white disabled:opacity-60" 
                      value={selectedOffice.name} 
                      onChange={(e) => handleUpdateField('name', e.target.value)}
                      type="text" 
                    />
                  </div>

                  {/* Full Institutional Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nombre Completo Institucional</label>
                    <textarea 
                      disabled={!isEditing}
                      className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm h-24 md:h-28 resize-none font-medium p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all dark:text-white leading-relaxed disabled:opacity-60" 
                      value={selectedOffice.fullName}
                      onChange={(e) => handleUpdateField('fullName', e.target.value)}
                    />
                  </div>

                  {/* Code & Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Código Único</label>
                      <input 
                        readOnly 
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-mono font-black py-3 px-4" 
                        value={selectedOffice.code} 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Estado</label>
                      <select 
                        disabled={!isEditing}
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-black py-3 px-4 focus:ring-primary dark:text-white disabled:opacity-60"
                        value={selectedOffice.status}
                        onChange={(e) => handleUpdateField('status', e.target.value)}
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nivel Jerárquico</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Dirección', 'Departamento', 'Unidad'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          disabled={!isEditing}
                          onClick={() => handleUpdateField('type', type)}
                          className={`py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all 
                            ${selectedOffice.type === type ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-100 dark:border-slate-700'} 
                            disabled:opacity-60`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parent Dependency */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Dependencia Superior</label>
                    <div className="relative group">
                      <select 
                        disabled={!isEditing}
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm py-3 pl-10 pr-4 font-black focus:ring-primary transition-all dark:text-white disabled:opacity-60 appearance-none"
                        value={selectedOffice.parentId || ''}
                        onChange={(e) => handleUpdateField('parentId', e.target.value || null)}
                      >
                        <option value="">(Nivel Raíz)</option>
                        {offices.filter(o => o.id !== selectedOfficeId).map(o => (
                          <option key={o.id} value={o.id}>{o.name}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary !text-lg pointer-events-none">link</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 shrink-0">
                {isEditing ? (
                  <>
                    <button 
                      type="submit"
                      className="flex-1 bg-primary text-white font-black text-xs md:text-sm uppercase tracking-widest py-3.5 rounded-2xl shadow-xl shadow-primary/20 hover:bg-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all"
                    >
                      Guardar Cambios
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-black text-xs md:text-sm uppercase tracking-widest py-3.5 rounded-2xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 active:scale-95 transition-all"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-slate-900 dark:bg-slate-700 text-white font-black text-xs md:text-sm uppercase tracking-widest py-3.5 rounded-2xl shadow-xl hover:bg-slate-800 dark:hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined !text-lg">edit</span>
                    Editar Información
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="h-full bg-slate-50/50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 transition-colors">
            <div className="size-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6 shadow-sm">
              <span className="material-symbols-outlined !text-4xl">account_tree</span>
            </div>
            <h3 className="text-lg font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Seleccione una oficina</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-[220px] font-medium italic">Navegue por el árbol jerárquico para visualizar y editar los parámetros operativos.</p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Offices;
