
import React, { useState, useRef } from 'react';

type Step = 1 | 2 | 3;
type Priority = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
}

const CreateDocument: React.FC = () => {
  const [activeStep, setActiveStep] = useState<Step>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    docType: '',
    date: new Date().toISOString().split('T')[0],
    flow: 'entrada',
    priority: 'MEDIA' as Priority,
    isConfidential: false,
    subject: '',
    docNumber: '',
    remitter: '',
    body: '',
    recipient: {
      name: 'Lic. Adriana Villavicencio',
      role: 'Directora de Planificación',
      office: 'Dpto. de Gestión Estratégica',
      initials: 'AV'
    }
  });

  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: '1', name: 'Analisis_Presupuestario_Anual.pdf', size: '2.4 MB', type: 'pdf' },
    { id: '2', name: 'Captura_Resultados_Q3.png', size: '890 KB', type: 'image' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handlePriorityChange = (p: Priority) => {
    setFormData(prev => ({ ...prev, priority: p }));
  };

  const handleFlowChange = (flow: string) => {
    setFormData(prev => ({ ...prev, flow }));
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFile: Attachment = {
        id: Math.random().toString(36).substr(2, 9),
        name: files[0].name,
        size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB`,
        type: files[0].type.includes('pdf') ? 'pdf' : files[0].type.includes('image') ? 'image' : 'doc'
      };
      setAttachments(prev => [...prev, newFile]);
    }
  };

  const nextStep = () => {
    if (activeStep < 3) setActiveStep((activeStep + 1) as Step);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep((activeStep - 1) as Step);
  };

  const handleSubmit = () => {
    alert(`Documento ${formData.docNumber || 'Generado'} registrado con éxito en el sistema GPD.`);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      
      {/* Header Wizard Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-stretch">
          {[
            { num: 1, label: 'Categorización', icon: 'settings_input_component' },
            { num: 2, label: 'Contenido y Atributos', icon: 'edit_document' },
            { num: 3, label: 'Despacho y Soporte', icon: 'send_and_archive' },
          ].map((step) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num as Step)}
              className={`flex-1 group relative flex flex-col items-center justify-center py-6 px-4 transition-all border-b-4 ${
                activeStep === step.num
                  ? 'text-primary border-primary bg-primary/[0.03]'
                  : 'text-slate-400 dark:text-slate-600 border-transparent hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined !text-2xl md:!text-3xl transition-transform group-hover:scale-110 ${activeStep === step.num ? 'font-variation-fill' : ''}`}>{step.icon}</span>
                <div className="hidden md:block text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Paso 0{step.num}</p>
                  <p className="text-xs font-black uppercase tracking-tight">{step.label}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
        <main className="w-full max-w-[1600px] mx-auto p-4 md:p-10 animate-in fade-in duration-500 pb-32">
          
          <div className="mb-10 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-2">Creación de Documento</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center lg:justify-start gap-2">
                <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                Editor institucional GPD v4.0
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fecha Emisión</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{new Date(formData.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            
            {/* Step 1: Categorización y Parámetros */}
            <section className={activeStep === 1 ? 'block animate-in fade-in slide-in-from-bottom-8 duration-500' : 'hidden'}>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 bg-white dark:bg-slate-900 p-8 md:p-14 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                    <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined !text-3xl">list_alt</span>
                    </div>
                    Información Clasificatoria
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Clase Documental *</label>
                      <select 
                        name="docType"
                        value={formData.docType}
                        onChange={handleInputChange}
                        className="w-full h-16 rounded-3xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm uppercase appearance-none"
                      >
                        <option value="">-- Seleccionar --</option>
                        <option>Informe Técnico</option>
                        <option>Memorándum</option>
                        <option>Nota Ministerial</option>
                        <option>Resolución Administrativa</option>
                        <option>Oficio Externo</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Fecha de Registro</label>
                      <input 
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full h-16 rounded-3xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-sm" 
                        type="date" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Sentido del Flujo</label>
                      <div className="grid grid-cols-2 gap-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-[2rem]">
                        <button type="button" onClick={() => handleFlowChange('entrada')} className={`h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${formData.flow === 'entrada' ? 'bg-white dark:bg-slate-700 text-primary shadow-xl shadow-primary/10 scale-105' : 'text-slate-400 hover:text-slate-600'}`}>Entrada</button>
                        <button type="button" onClick={() => handleFlowChange('salida')} className={`h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${formData.flow === 'salida' ? 'bg-white dark:bg-slate-700 text-primary shadow-xl shadow-primary/10 scale-105' : 'text-slate-400 hover:text-slate-600'}`}>Salida</button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Nivel de Confidencialidad</label>
                      <label className="h-16 flex items-center justify-between px-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-amber-400 transition-all group">
                        <span className="text-xs font-black text-slate-400 dark:text-slate-600 group-hover:text-amber-500 uppercase tracking-widest">Documento Reservado</span>
                        <input name="isConfidential" checked={formData.isConfidential} onChange={handleInputChange} className="rounded-lg size-6 text-amber-500 focus:ring-amber-500 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" type="checkbox"/>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-4 flex flex-col gap-8">
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors flex-1">
                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8">Urgencia Asignada</h4>
                    <div className="space-y-4">
                      {(['BAJA', 'MEDIA', 'ALTA', 'URGENTE'] as Priority[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePriorityChange(p)}
                          className={`w-full h-14 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-between px-6 ${
                            formData.priority === p 
                              ? (p === 'URGENTE' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-primary bg-primary/5 text-primary')
                              : 'border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 hover:border-slate-200'
                          }`}
                        >
                          {p}
                          {formData.priority === p && <span className="material-symbols-outlined !text-xl">check_circle</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-primary p-8 rounded-[3.5rem] text-white flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                      <span className="material-symbols-outlined !text-[12rem]">verified</span>
                    </div>
                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4">GPD IA-Assistant</p>
                    <p className="text-lg font-bold leading-tight relative z-10">"La clasificación correcta garantiza un flujo de trabajo optimizado y reportes de auditoría precisos."</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Contenido Dinámico */}
            <section className={activeStep === 2 ? 'block animate-in fade-in slide-in-from-bottom-8 duration-500' : 'hidden'}>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-12 bg-white dark:bg-slate-900 p-8 md:p-14 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 border-b border-slate-50 dark:border-slate-800 pb-8">
                    <div className="flex items-center gap-5">
                      <div className="size-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary shadow-inner shrink-0">
                        <span className="material-symbols-outlined !text-3xl font-black">history_edu</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Redacción Institucional</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Defina el asunto y el cuerpo oficial del documento</p>
                      </div>
                    </div>
                    <div className="w-full lg:w-72">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block mb-2">Número de Folio / Tracking</label>
                      <input 
                        name="docNumber"
                        value={formData.docNumber}
                        onChange={handleInputChange}
                        className="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-white font-mono font-black px-6 focus:ring-8 focus:ring-primary/10 transition-all text-center tracking-[0.2em]" 
                        placeholder="AUTO-GENERADO" 
                      />
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Referencia / Asunto del Trámite *</label>
                      <textarea 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full h-20 rounded-3xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-lg font-black px-8 py-5 focus:ring-8 focus:ring-primary/10 transition-all resize-none leading-tight" 
                        placeholder="Escriba aquí el resumen ejecutivo del documento..." 
                      ></textarea>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Contenido Oficial (Editor GPD)</label>
                      <div className="rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 p-4 md:p-10">
                        {/* Editor Toolbar Simulator */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-3 mb-8 flex flex-wrap gap-2 md:gap-4 shadow-xl shadow-slate-900/5 border border-slate-100 dark:border-slate-800 transition-colors">
                           <div className="flex gap-1 border-r border-slate-100 dark:border-slate-800 pr-4">
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_bold</span></button>
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_italic</span></button>
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_underlined</span></button>
                           </div>
                           <div className="flex gap-1 border-r border-slate-100 dark:border-slate-800 pr-4">
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_align_left</span></button>
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_align_center</span></button>
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_align_right</span></button>
                           </div>
                           <div className="flex gap-1">
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">format_list_bulleted</span></button>
                             <button type="button" className="size-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"><span className="material-symbols-outlined">attachment</span></button>
                             <button type="button" className="px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest transition-all">Plantillas</button>
                           </div>
                        </div>
                        
                        {/* Paper Sheet Simulator */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.08)] min-h-[600px] flex flex-col p-10 md:p-20 relative border border-slate-100 dark:border-slate-800 transition-colors">
                           <div className="absolute top-10 right-10 size-24 opacity-5 pointer-events-none">
                              <span className="material-symbols-outlined !text-[6rem]">account_balance</span>
                           </div>
                           <div className="mb-14 pb-8 border-b-2 border-slate-50 dark:border-slate-800">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Estado Plurinacional de Bolivia</p>
                             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Ministerio de Gestión Pública Digital - GPD</p>
                           </div>
                           <textarea 
                             name="body"
                             value={formData.body}
                             onChange={handleInputChange}
                             className="flex-1 w-full dark:bg-slate-900 dark:text-white text-lg border-none focus:ring-0 leading-relaxed font-medium placeholder:text-slate-200 dark:placeholder:text-slate-800 resize-none overflow-hidden"
                             placeholder="Inicie la redacción del cuerpo oficial aquí. El sistema guardará borradores automáticamente cada 30 segundos..."
                           ></textarea>
                           <div className="mt-14 pt-8 border-t border-slate-50 dark:border-slate-800 flex justify-between items-end">
                              <div className="text-slate-300 dark:text-slate-700 italic text-[10px]">Página 01 de 01</div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Firmado por</p>
                                 <p className="text-xs font-bold text-slate-500 uppercase">{formData.recipient.name}</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Distribución Final */}
            <section className={activeStep === 3 ? 'block animate-in fade-in slide-in-from-bottom-8 duration-500' : 'hidden'}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white dark:bg-slate-900 p-8 md:p-14 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                    <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined !text-3xl">cloud_upload</span>
                    </div>
                    Soporte Digital Adicional
                  </h3>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] p-16 flex flex-col items-center justify-center bg-slate-50/30 dark:bg-slate-950/20 hover:border-primary/50 hover:bg-primary/[0.01] transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <input ref={fileInputRef} className="hidden" type="file" onChange={handleFileUpload} />
                    <div className="size-20 rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-200 dark:text-slate-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-xl group-hover:shadow-primary/20 mb-6">
                      <span className="material-symbols-outlined !text-4xl font-black">upload_file</span>
                    </div>
                    <p className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">Cargar documentos de respaldo</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">PDF, JPG o PNG • Máximo 10MB</p>
                  </div>
                  
                  <div className="mt-10 space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Archivos en este documento ({attachments.length})</p>
                    {attachments.map(att => (
                      <div key={att.id} className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm group hover:shadow-md transition-all">
                        <div className="flex items-center gap-5">
                          <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${att.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                             <span className="material-symbols-outlined !text-2xl">{att.type === 'pdf' ? 'picture_as_pdf' : 'image'}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase truncate max-w-[200px] md:max-w-[350px]">{att.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{att.size} • Verificado</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeAttachment(att.id)} className="size-10 flex items-center justify-center rounded-xl text-slate-200 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-8 md:p-14 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                    <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined !text-3xl">share</span>
                    </div>
                    Asignación y Destinatario
                  </h3>
                  
                  <div className="space-y-10 flex-1">
                    <div className="relative group">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block mb-3">Buscar Servidor Público</label>
                       <div className="relative">
                          <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 !text-2xl">person_search</span>
                          <input className="w-full h-16 pl-16 pr-6 rounded-3xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white font-black text-sm focus:ring-8 focus:ring-primary/10 transition-all" placeholder="Nombre o cargo del funcionario..." type="text" />
                       </div>
                    </div>
                    
                    <div className="p-8 bg-primary/5 dark:bg-primary/20 rounded-[2.5rem] border-2 border-primary/10 shadow-sm animate-in zoom-in-95 duration-500 relative overflow-hidden group/card">
                       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:scale-125 transition-transform duration-700">
                          <span className="material-symbols-outlined !text-[8rem]">badge</span>
                       </div>
                       <div className="flex items-center gap-6 relative z-10">
                          <div className="size-20 rounded-[1.5rem] bg-primary text-white flex items-center justify-center text-2xl font-black shadow-2xl shadow-primary/30">{formData.recipient.initials}</div>
                          <div>
                             <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">Destinatario Seleccionado</p>
                             <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-2">{formData.recipient.name}</p>
                             <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">{formData.recipient.role}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-3 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg inline-block">{formData.recipient.office}</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-800/50 flex items-start gap-4">
                       <span className="material-symbols-outlined text-amber-500 !text-2xl mt-1">info</span>
                       <div className="flex-1">
                          <p className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1">Aviso de notificación</p>
                          <p className="text-xs text-amber-700 dark:text-amber-300 font-medium leading-relaxed italic">"El funcionario recibirá una notificación inmediata en su bandeja y un aviso en su correo institucional al momento de procesar."</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Glassmorphism Navigation Footer */}
      <footer className="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-6 md:p-8 z-40 transition-colors fixed bottom-0 left-0 right-0 md:left-64">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="hidden sm:flex items-center gap-5 text-slate-400 dark:text-slate-600">
             <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <span className="material-symbols-outlined !text-3xl">verified_user</span>
             </div>
             <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Firma Digital Activa</p>
                <p className="text-[9px] font-bold uppercase opacity-60">Cumplimiento Ley No. 164 - Bolivia</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {activeStep > 1 && (
              <button 
                onClick={prevStep} 
                className="flex-1 md:w-48 h-16 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <span className="material-symbols-outlined !text-xl">arrow_back</span>
                Paso Anterior
              </button>
            )}
            
            {activeStep < 3 ? (
              <button 
                onClick={nextStep} 
                className="flex-1 md:w-64 h-16 bg-slate-900 dark:bg-slate-800 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 active:scale-95 group"
              >
                Siguiente Paso
                <span className="material-symbols-outlined !text-xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="flex-1 md:w-80 h-16 bg-primary text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(19,127,236,0.3)] hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 active:scale-95 group"
              >
                Registrar y Derivar
                <span className="material-symbols-outlined !text-2xl animate-pulse">send</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateDocument;
