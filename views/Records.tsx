
import React, { useState, useMemo } from 'react';

interface RecordItem {
  id: string;
  time: string;
  nuri: string;
  origin: string;
  originType: string;
  subject: string;
  destination: string;
  status: 'Recibido' | 'Pendiente' | 'Anulado';
  docType: string;
  office: string;
  registeredBy: string;
}

const Records: React.FC = () => {
  // --- MOCK DATA ---
  const initialRecords: RecordItem[] = [
    { id: '1', time: '08:15 AM', nuri: '2024-VNT-0892', origin: 'Ministerio de Justicia', originType: 'Público Externo', subject: 'Solicitud de auditoría externa segundo semestre', destination: 'Ing. Carlos Meza', status: 'Recibido', docType: 'Oficio', office: 'Dir. General', registeredBy: 'Admin Ventanilla 1' },
    { id: '2', time: '09:42 AM', nuri: '2024-VNT-0893', origin: 'Gobernación Central', originType: 'Gobierno Local', subject: 'Convenio interinstitucional de cooperación técnica', destination: 'Dra. Martha Luz', status: 'Pendiente', docType: 'Carta', office: 'RR.HH.', registeredBy: 'Admin Ventanilla 2' },
    { id: '3', time: '10:15 AM', nuri: '2024-VNT-0894', origin: 'Sindicato Agrario', originType: 'Social / Civil', subject: 'Reclamo por demoras en trámite #445-A', destination: 'Ventanilla Única', status: 'Anulado', docType: 'Otros', office: 'Admin. y Finanzas', registeredBy: 'Admin Ventanilla 1' },
    { id: '4', time: '11:55 AM', nuri: '2024-VNT-0895', origin: 'Caja Nacional de Salud', originType: 'Salud', subject: 'Bajas médicas del personal administrativo', destination: 'Recursos Humanos', status: 'Recibido', docType: 'Circular', office: 'RR.HH.', registeredBy: 'Admin Ventanilla 2' },
    { id: '5', time: '12:10 PM', nuri: '2024-VNT-0896', origin: 'Banco Nacional', originType: 'Privado', subject: 'Extractos de cuenta corriente institucional', destination: 'Tesorería', status: 'Recibido', docType: 'Oficio', office: 'Admin. y Finanzas', registeredBy: 'Admin Ventanilla 1' },
  ];

  // --- STATE ---
  const [records] = useState<RecordItem[]>(initialRecords);
  const [filterNuri, setFilterNuri] = useState('');
  const [filterOffice, setFilterOffice] = useState('Todas las Oficinas');
  const [filterUser, setFilterUser] = useState('Cualquier Usuario');
  const [filterStatus, setFilterStatus] = useState('Cualquier Estado');

  // --- FILTER LOGIC ---
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchNuri = record.nuri.toLowerCase().includes(filterNuri.toLowerCase()) || 
                        record.subject.toLowerCase().includes(filterNuri.toLowerCase());
      const matchOffice = filterOffice === 'Todas las Oficinas' || record.office === filterOffice;
      const matchUser = filterUser === 'Cualquier Usuario' || record.registeredBy === filterUser;
      const matchStatus = filterStatus === 'Cualquier Estado' || record.status === filterStatus;
      
      return matchNuri && matchOffice && matchUser && matchStatus;
    });
  }, [records, filterNuri, filterOffice, filterUser, filterStatus]);

  return (
    <div className="h-full overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar transition-colors duration-300">
      <main className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Registros del Día</h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest">
              Viernes, 25 de Octubre 2024
            </p>
          </div>
          <div className="flex gap-2 md:gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm active:scale-95">
              <span className="material-symbols-outlined !text-lg">description</span> PDF
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-blue-600 active:scale-95 transition-all">
              <span className="material-symbols-outlined !text-lg">download</span> EXCEL
            </button>
          </div>
        </div>

        {/* Filters & Table Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="font-black text-xs mb-4 uppercase tracking-widest text-slate-400 border-b border-slate-50 dark:border-slate-800 pb-3">FILTROS AVANZADOS</h4>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">NURI / ASUNTO</label>
                  <input value={filterNuri} onChange={(e) => setFilterNuri(e.target.value)} className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-bold py-2.5 dark:text-white" type="text" placeholder="Buscar..."/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ESTADO</label>
                  <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-bold py-2.5 dark:text-white">
                    <option>Todos</option>
                    <option>Recibido</option>
                    <option>Pendiente</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hora / NURI</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Remitente</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Referencia</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredRecords.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-xs font-black text-primary uppercase tracking-tight">{row.nuri}</p>
                          <p className="text-[10px] text-slate-400 font-bold tabular-nums mt-0.5">{row.time}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase truncate max-w-[150px]">{row.origin}</p>
                          <p className="text-[9px] text-slate-400 font-black uppercase mt-0.5">{row.originType}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed italic">"{row.subject}"</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider
                            ${row.status === 'Recibido' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Records;
