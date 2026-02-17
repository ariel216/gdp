
import React, { useState } from 'react';

interface TrackingMovement {
  id: string;
  status: 'Actual' | 'Derivado' | 'Inicial';
  date: string;
  time: string;
  user: string;
  office: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  provido: string;
  avatar: string;
  elapsed?: string;
  highlight?: boolean;
}

interface TrackingData {
  nuri: string;
  hr: string;
  status: string;
  title: string;
  ref: string;
  startDate: string;
  startOffice: string;
  processDays: number;
  currentCustodian: string;
  lastUpdate: string;
  route: { label: string, icon: string, active: boolean | 'current', line: boolean, pulse?: boolean }[];
  history: TrackingMovement[];
}

const MOCK_DB: Record<string, TrackingData> = {
  'HR-2024-0012': {
    nuri: '2024-AD-105',
    hr: 'HR-2024-0012',
    status: 'Activo',
    title: 'Adquisición de Equipos de Cómputo 2024',
    ref: 'Nota Externa No. 456/2024 - Dir. de Tecnología',
    startDate: '12 Ene, 2024',
    startOffice: 'Unidad de Activos Fijos',
    processDays: 15,
    currentCustodian: 'Contabilidad Gral',
    lastUpdate: 'Hace 4 horas',
    route: [
      { label: 'Inicio', icon: 'home', active: true, line: true },
      { label: 'Tecnología', icon: 'corporate_fare', active: true, line: true },
      { label: 'Jurídica', icon: 'balance', active: true, line: true },
      { label: 'Contabilidad', icon: 'payments', active: 'current', line: true, pulse: true },
      { label: 'Despacho', icon: 'task_alt', active: false, line: false },
    ],
    history: [
      {
        id: 'mv-3',
        status: 'Actual',
        date: '27 Ene, 2024',
        time: '15:45',
        user: 'Lic. Maria Delgado',
        office: 'Unidad de Contabilidad y Finanzas',
        icon: 'send',
        iconBg: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-primary dark:text-blue-400',
        provido: 'Se procede a la revisión de la disponibilidad presupuestaria para el ítem 24. Documentación completa recibida.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDufm9eh2kaFpDmR9VZbdBmMVRPlTbEwlHOILaA8t9q1fm1VpOXyPMn7YpsNdmu9hsv-Wi-7zBlHn4-APv_FBS0eCqyyosjD638QcXeQtpgdmphbas6aj1nMEmdXLyUlSdb7gQdxhCL1M4e-boa2mUz3lC-Qy_XsN1SS2mZgMKYSpc7heeLCz8u201_dTpKSDMAGI8bXKOn2RaDbUWuhxhpskoENLU7OfP76BcYQQfC4eHxDm_u2HBtPfAYmo-ZQV87-HdHxScQA90_',
        elapsed: '+ 2 días',
        highlight: true
      },
      {
        id: 'mv-2',
        status: 'Derivado',
        date: '25 Ene, 2024',
        time: '09:12',
        user: 'Dr. Roberto Gomez',
        office: 'Asuntos Jurídicos',
        icon: 'check_circle',
        iconBg: 'bg-green-50 dark:bg-green-900/20',
        iconColor: 'text-green-600 dark:text-green-400',
        provido: 'Documentación conforme a normativa vigente. Se remite para el trámite de pago.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABm273eV1O6nu-q6lowNjj_LR6U87iKPN2zVptdLKwtwyXYd9eD-lDe2LsOZrXPz3_aMeCkFpvPseuTwv2mctgXXrcwbLr2hxQPIZeiogrBBrGl3DorUE0TLqgsHSMXy7GsimbSoF0vJyhY0MLMaIW1snKKHgSmsEz89HMq6z8Y2FVmlfob79_G3eKzOKp6FPYY3oJOKTfH77A8gYMgic5e655q_DVKiL7E2yBc6OCmg67OFl8qnDEchHGKSXIR12dkj_w0zHRS-Rv',
        elapsed: '+ 5 días'
      },
      {
        id: 'mv-1',
        status: 'Inicial',
        date: '12 Ene, 2024',
        time: '08:00',
        user: 'Ventanilla Única',
        office: 'Recepción',
        icon: 'rocket_launch',
        iconBg: 'bg-slate-100 dark:bg-slate-800',
        iconColor: 'text-slate-600 dark:text-slate-400',
        provido: 'Registro inicial del trámite. Se genera Hoja de Ruta física y digital.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBscuNZLuj69KIwF_uDcMaHAjTA94tD291P3pj9iiy_xvMnfmYWCge-djmmrQZ8xM0gzGjR91peLeHGZ8-os70lHnSxnwdi6HS3Jr44IJErrswdeBt0HglWQdSLIPzB_Y-a9L7oNfbxt9tXOx1W_89UClAynLTitBE8KnwiJ4rMG6gczP_DBy_3d2-eKxAWEk1mRuF-qVkFN-3FtO3CfjahvX926pQBFhaeDsagUlh8-W-EgMzoQ4IsLJJij2nZd3lt-fb5FKOoQuZI',
      }
    ]
  }
};

const Tracking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('HR-2024-0012');
  const [isPublic, setIsPublic] = useState(false);
  const [foundData, setFoundData] = useState<TrackingData | null>(MOCK_DB['HR-2024-0012']);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFoundData(MOCK_DB[searchQuery.toUpperCase()] || null);
  };

  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 md:space-y-10 pb-24 animate-in fade-in duration-500">
        
        {/* Superior Search Area */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
          <div className="flex-1 w-full max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Seguimiento de Trámites</h1>
            <form className="relative group" onSubmit={handleSearch}>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary text-xl transition-colors">tag</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-lg font-black dark:text-white shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300" 
                placeholder="Ingrese NURI o Hoja de Ruta..." 
                type="text" 
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="button" className="p-2 text-slate-400 hover:text-primary transition-colors hidden sm:flex" title="Escanear QR">
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                </button>
                <button type="submit" className="bg-primary text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95">Rastrear</button>
              </div>
            </form>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">Acceso Público</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vista para ciudadanos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input checked={isPublic} onChange={() => setIsPublic(!isPublic)} className="sr-only peer" type="checkbox"/>
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>

        {foundData ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10">
            {/* Left Side: Summary and Flow */}
            <div className="xl:col-span-8 space-y-6 md:space-y-10">
              
              {/* Metadata Card */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                <div className="bg-primary h-2"></div>
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">NURI: {foundData.nuri}</span>
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-sm">ESTADO: {foundData.status}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight mb-4">{foundData.title}</h2>
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-slate-500 dark:text-slate-400 text-sm italic font-medium">
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined !text-base">tag</span> {foundData.hr}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined !text-base">history</span> Ref: {foundData.ref}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 pt-10 border-t border-slate-50 dark:border-slate-800 transition-colors">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Iniciado</p>
                      <p className="font-black text-slate-900 dark:text-white uppercase text-base">{foundData.startDate}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mt-1">{foundData.startOffice}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Días en Trámite</p>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-primary text-3xl tabular-nums">{foundData.processDays}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase leading-none">Días<br/>Hábiles</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Custodio Actual</p>
                      <p className="font-black text-slate-900 dark:text-white uppercase text-base">{foundData.currentCustodian}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 flex items-center gap-1.5">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                        {foundData.lastUpdate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flow Visualizer */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm transition-colors overflow-hidden">
                <div className="flex items-center gap-3 mb-10">
                  <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined !text-2xl font-bold">route</span>
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-slate-100 text-sm uppercase tracking-widest">Trayectoria Institucional Proyectada</h4>
                </div>
                
                <div className="overflow-x-auto custom-scrollbar pb-6">
                  <div className="flex items-center min-w-max px-4">
                    {foundData.route.map((step, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex flex-col items-center gap-4 group">
                          <div className={`size-14 md:size-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                            step.active === true ? 'bg-primary border-primary/20 text-white shadow-2xl shadow-primary/40' : 
                            step.active === 'current' ? 'border-primary border-dashed bg-white dark:bg-slate-900 text-primary' : 
                            'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-600'
                          } ${step.pulse ? 'animate-pulse' : ''}`}>
                            <span className="material-symbols-outlined !text-xl md:!text-2xl font-bold">{step.icon}</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-tighter w-24 text-center transition-colors ${step.active ? 'text-primary' : 'text-slate-400 dark:text-slate-600'}`}>{step.label}</span>
                        </div>
                        {step.line && (
                          <div className="w-16 md:w-24 h-0.5 relative mx-2">
                             <div className={`absolute inset-0 transition-colors duration-500 ${step.active === true ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                             {step.active === true && <span className="material-symbols-outlined absolute -top-[11px] right-0 text-primary !text-[14px] font-bold">chevron_right</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex-1 min-w-[160px] bg-slate-900 dark:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <span className="material-symbols-outlined !text-xl">picture_as_pdf</span> Imprimir Informe de Ruta
                </button>
                <button className="flex-1 min-w-[160px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <span className="material-symbols-outlined !text-xl">qr_code</span> Descargar Etiqueta QR
                </button>
              </div>
            </div>

            {/* Right Side: Timeline History */}
            <div className="xl:col-span-4 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-600">history</span>
                  Historial de Movimientos
                </h3>
              </div>
              
              <div className="space-y-0 relative pl-4">
                {/* Vertical Line */}
                <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800 transition-colors"></div>

                {foundData.history.map((move) => (
                  <div key={move.id} className="relative pl-12 pb-10 last:pb-0 group">
                    <div className={`absolute left-0 top-0 size-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 z-10 shadow-lg ${move.iconBg} ${move.iconColor} transition-transform group-hover:scale-110`}>
                      <span className="material-symbols-outlined !text-xl font-bold">{move.icon}</span>
                    </div>
                    
                    <div className={`bg-white dark:bg-slate-900 p-5 rounded-3xl border transition-all ${move.highlight ? 'border-primary/20 shadow-xl ring-1 ring-primary/5' : 'border-slate-100 dark:border-slate-800 shadow-sm'} group-hover:border-primary/30`}>
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-3 min-w-0">
                            <img className="size-8 rounded-xl object-cover shrink-0" src={move.avatar} alt={move.user}/>
                            <div className="min-w-0">
                               <p className="text-xs font-black text-slate-900 dark:text-white uppercase truncate">{move.user}</p>
                               <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest truncate">{move.office}</p>
                            </div>
                         </div>
                      </div>
                      <div className="bg-slate-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 relative overflow-hidden transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 opacity-60">Proveído / Instrucción</p>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">"{move.provido}"</p>
                      </div>
                      <div className="mt-3 flex justify-between items-center px-1">
                        <span className="text-[9px] font-black text-slate-400 tabular-nums uppercase">{move.date} • {move.time}</span>
                        {move.elapsed && <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-lg uppercase">{move.elapsed}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500">
            <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mx-auto mb-6 shadow-inner">
              <span className="material-symbols-outlined !text-5xl">search_off</span>
            </div>
            <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Sin resultados</h3>
            <p className="text-slate-400 dark:text-slate-600 mt-2 max-w-sm mx-auto font-medium">Verifique que el código ingresado sea correcto o intente escaneando el código QR del documento físico.</p>
            <button 
              onClick={() => setSearchQuery('HR-2024-0012')}
              className="mt-10 px-10 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
            >
              Probar con ejemplo: HR-2024-0012
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
