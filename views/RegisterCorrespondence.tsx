
import React, { useState, useEffect, useRef } from 'react';

interface Entity {
  id: string;
  name: string;
  type: string;
}

interface LogEntry {
  nuri: string;
  subject: string;
  time: string;
}

const RegisterCorrespondence: React.FC = () => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    docType: 'Oficio Externo',
    nuri: 'GPD-2023-00452',
    originalNumber: '',
    remitterEntity: '',
    subject: '',
    office: '',
    official: '',
    priority: 'normal'
  });

  const [entities] = useState<Entity[]>([
    { id: '1', name: 'Ministerio de Economía', type: 'Público' },
    { id: '2', name: 'Gobierno Autónomo Departamental', type: 'Público' },
    { id: '3', name: 'Banco Central de Bolivia', type: 'Financiero' },
    { id: '4', name: 'Sindicato de Ramas Médicas', type: 'Social' },
  ]);

  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Refs for shortcuts
  const docTypeRef = useRef<HTMLSelectElement>(null);
  const originalNumberRef = useRef<HTMLInputElement>(null);
  const remitterRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- SHORTCUTS LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') { e.preventDefault(); docTypeRef.current?.focus(); }
      if (e.key === 'F2') { e.preventDefault(); originalNumberRef.current?.focus(); }
      if (e.key === 'F3') { e.preventDefault(); remitterRef.current?.focus(); }
      if (e.key === 'F4') { e.preventDefault(); subjectRef.current?.focus(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- HANDLERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearForm = () => {
    if (confirm('¿Desea limpiar todos los campos?')) {
      setFormData({
        docType: 'Oficio Externo',
        nuri: 'GPD-2023-00453', 
        originalNumber: '',
        remitterEntity: '',
        subject: '',
        office: '',
        official: '',
        priority: 'normal'
      });
      setAttachedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.originalNumber || !formData.remitterEntity || !formData.subject) {
      alert('Por favor complete los campos obligatorios (Nro. Documento, Entidad y Referencia)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newLog = {
        nuri: formData.nuri,
        subject: formData.subject,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setRecentLogs(prev => [newLog, ...prev].slice(0, 10));
      alert(`¡Trámite ${formData.nuri} registrado con éxito!`);
      
      setFormData(prev => ({
        ...prev,
        originalNumber: '',
        remitterEntity: '',
        subject: '',
        nuri: 'GPD-2023-00454'
      }));
      setAttachedFile(null);
      setPreviewUrl(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <main className="w-full max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 md:space-y-10 animate-in fade-in duration-500 pb-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-black text-[10px] md:text-xs uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                SISTEMA EN LÍNEA • {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Recepción de Documentos</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">Digitalización y registro de correspondencia externa oficial.</p>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center gap-3 text-slate-700 dark:text-slate-200"
              >
                <span className="material-symbols-outlined !text-2xl">history</span>
                Registros de Hoy ({recentLogs.length})
              </button>

              {showHistory && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Últimos movimientos</h4>
                    <button onClick={() => setShowHistory(false)} className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors text-sm">close</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                    {recentLogs.length > 0 ? recentLogs.map((log, i) => (
                      <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-2xl border-b border-slate-50 dark:border-slate-800 last:border-none">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs font-black text-primary uppercase tracking-tight">{log.nuri}</p>
                          <p className="text-[9px] text-slate-400 font-bold tabular-nums">{log.time}</p>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 font-bold line-clamp-1 italic">"{log.subject}"</p>
                      </div>
                    )) : (
                      <div className="p-12 text-center text-slate-400 italic text-xs font-medium">Sin registros hoy</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <form className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10" onSubmit={handleSubmit}>
            
            {/* Main Form Area */}
            <div className="xl:col-span-8 space-y-6 md:space-y-10">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex items-center gap-4 mb-10 border-b border-slate-50 dark:border-slate-800 pb-6 text-slate-900 dark:text-white">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <span className="material-symbols-outlined !text-3xl font-bold">description</span>
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-widest">Atributos del Documento</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-2.5">
                    <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between px-1">
                      Tipo de Instrumento *
                      <span className="text-[9px] font-bold text-slate-300">F1</span>
                    </label>
                    <select 
                      ref={docTypeRef}
                      name="docType"
                      value={formData.docType}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-sm h-14 focus:border-primary focus:ring-4 focus:ring-primary/10 font-black px-5 transition-all appearance-none"
                    >
                      <option>Oficio Externo</option>
                      <option>Carta de Solicitud</option>
                      <option>Factura / Comprobante</option>
                      <option>Informe Externo</option>
                    </select>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest px-1">Identificador NURI</label>
                    <div className="h-14 bg-primary/[0.03] dark:bg-primary/5 border border-primary/10 dark:border-primary/20 rounded-2xl flex items-center px-5 shadow-inner">
                      <span className="text-primary font-black tracking-[0.2em] text-xl">{formData.nuri}</span>
                      <span className="ml-auto material-symbols-outlined text-primary/30 !text-2xl">verified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-10">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between px-1">
                    Número de Documento Original *
                    <span className="text-[9px] font-bold text-slate-300">F2</span>
                  </label>
                  <input 
                    ref={originalNumberRef}
                    name="originalNumber"
                    value={formData.originalNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-lg h-14 focus:border-primary focus:ring-4 focus:ring-primary/10 font-mono font-black transition-all px-5 uppercase" 
                    placeholder="Ej: MIN-123/2024" 
                    type="text"
                  />
                </div>

                <div className="space-y-2.5 mb-10">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between px-1">
                    Procedencia / Entidad *
                    <span className="text-[9px] font-bold text-slate-300">F3</span>
                  </label>
                  <div className="flex gap-4">
                    <div className="relative flex-1 group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-2xl group-focus-within:text-primary transition-colors">business</span>
                      <input 
                        ref={remitterRef}
                        name="remitterEntity"
                        value={formData.remitterEntity}
                        onChange={handleInputChange}
                        list="entity-list"
                        className="w-full pl-14 pr-4 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-base h-14 focus:border-primary focus:ring-4 focus:ring-primary/10 font-black transition-all uppercase" 
                        placeholder="Nombre de la institución remitente..." 
                        type="text"
                      />
                      <datalist id="entity-list">
                        {entities.map(e => <option key={e.id} value={e.name}>{e.type}</option>)}
                      </datalist>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between px-1">
                    Referencia General / Objeto *
                    <span className="text-[9px] font-bold text-slate-300">F4</span>
                  </label>
                  <textarea 
                    ref={subjectRef}
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full rounded-[2.5rem] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-base focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none font-medium p-8 transition-all min-h-[160px] leading-relaxed" 
                    placeholder="Detalle el asunto o propósito del documento..." 
                    rows={4}
                  ></textarea>
                </div>
              </div>

              {/* Digitalization Area */}
              <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-slate-50 dark:border-slate-800 pb-8">
                  <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined !text-3xl font-bold">cloud_upload</span>
                    </div>
                    <div>
                      <h3 className="font-black text-lg uppercase tracking-widest leading-none">Soporte Digital</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Escaneo o carga de documento físico.</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95" type="button">
                    <span className="material-symbols-outlined !text-2xl">photo_camera</span>
                    Iniciar Escáner
                  </button>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[3.5rem] p-12 md:p-24 flex flex-col items-center justify-center text-center hover:border-primary dark:hover:border-primary/50 hover:bg-primary/[0.01] transition-all group cursor-pointer relative"
                >
                  <input ref={fileInputRef} className="hidden" type="file" onChange={handleFileChange} />
                  
                  {previewUrl ? (
                    <div className="animate-in zoom-in-95 duration-500">
                      <img src={previewUrl} alt="Preview" className="max-h-80 rounded-3xl shadow-2xl border-8 border-white dark:border-slate-800" />
                      <p className="mt-6 text-primary font-black text-xs uppercase tracking-widest">Click para reemplazar archivo</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="size-24 md:size-32 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-200 dark:text-slate-700 mb-8 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-inner border border-slate-100 dark:border-slate-800">
                        <span className="material-symbols-outlined !text-5xl md:!text-6xl">{attachedFile ? 'check_circle' : 'upload_file'}</span>
                      </div>
                      <h4 className="font-black text-slate-900 dark:text-slate-200 uppercase tracking-tight text-lg md:text-2xl">
                        {attachedFile ? attachedFile.name : 'Arrastre la imagen del documento aquí'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-3 font-bold uppercase tracking-widest">
                        Soportado: PDF, JPG, PNG • Máximo 25MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar: Assignment & Destination */}
            <div className="xl:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors sticky top-8">
                <div className="flex items-center gap-4 mb-10 border-b border-slate-50 dark:border-slate-800 pb-6 text-slate-900 dark:text-white">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <span className="material-symbols-outlined !text-3xl font-bold">person_add</span>
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-widest leading-tight">Asignación Directa</h3>
                </div>
                
                <div className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest px-1 block">Unidad Organizacional</label>
                    <select 
                      name="office"
                      value={formData.office}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-sm h-14 focus:border-primary focus:ring-4 focus:ring-primary/10 font-black px-5 transition-all"
                    >
                      <option value="">Seleccione destino...</option>
                      <option>Dirección General Técnica</option>
                      <option>Unidad Administrativa Financiera</option>
                      <option>Despacho Superior</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest px-1 block">Funcionario Responsable</label>
                    <select 
                      name="official"
                      value={formData.official}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-sm h-14 focus:border-primary focus:ring-4 focus:ring-primary/10 font-black px-5 transition-all"
                    >
                      <option value="">Seleccione técnico...</option>
                      <option>Lic. Marco Antonio Pérez</option>
                      <option>Dra. Elena Valenzuela</option>
                      <option>Ing. Roberto Meza</option>
                    </select>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Prioridad de Atención</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="cursor-pointer group">
                        <input 
                          checked={formData.priority === 'normal'}
                          onChange={() => setFormData(prev => ({ ...prev, priority: 'normal' }))}
                          className="hidden peer" 
                          name="priority" 
                          type="radio" 
                          value="normal"
                        />
                        <div className="flex flex-col items-center gap-3 py-6 rounded-3xl border-2 border-slate-50 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-400 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                          <span className="material-symbols-outlined !text-3xl">schedule</span>
                          Normal
                        </div>
                      </label>
                      <label className="cursor-pointer group">
                        <input 
                          checked={formData.priority === 'urgent'}
                          onChange={() => setFormData(prev => ({ ...prev, priority: 'urgent' }))}
                          className="hidden peer" 
                          name="priority" 
                          type="radio" 
                          value="urgent"
                        />
                        <div className="flex flex-col items-center gap-3 py-6 rounded-3xl border-2 border-slate-50 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-400 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/10 peer-checked:text-red-600 transition-all">
                          <span className="material-symbols-outlined !text-3xl animate-pulse">priority_high</span>
                          Urgente
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800/50 text-center animate-in fade-in duration-700">
                    <p className="text-[9px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-[0.2em] mb-2">Recordatorio</p>
                    <p className="text-xs text-amber-900 dark:text-amber-200 font-medium italic">"Asegúrese de que el Nro. de Documento coincida exactamente con el físico recibido."</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>

      {/* Fixed Footer Actions */}
      <footer className="shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-colors z-40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            onClick={clearForm}
            className="order-3 md:order-1 flex items-center gap-3 text-slate-400 hover:text-red-500 font-black text-xs uppercase tracking-widest transition-colors px-4 py-2 rounded-xl hover:bg-red-50"
          >
            <span className="material-symbols-outlined !text-2xl">delete_sweep</span>
            Descartar Registro
          </button>
          
          <div className="order-1 md:order-2 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-10 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm">
              <span className="material-symbols-outlined !text-2xl">save</span>
              Solo Guardar
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-12 md:px-20 py-4.5 bg-primary text-white rounded-[1.25rem] text-xs font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(19,127,236,0.25)] hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 active:scale-95 min-w-[280px] ${isSubmitting ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
            >
              <span className="material-symbols-outlined !text-2xl">{isSubmitting ? 'sync' : 'assignment_turned_in'}</span>
              {isSubmitting ? 'PROCESANDO...' : 'REGISTRAR Y ENVIAR'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterCorrespondence;
