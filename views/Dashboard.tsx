
import React from 'react';

const Dashboard: React.FC = () => {
  const primaryStats = [
    { label: 'Pendientes', value: '124', change: '+12% hoy', color: 'blue', icon: 'assignment' },
    { label: 'Derivados', value: '45', change: '+5% hoy', color: 'orange', icon: 'forward' },
    { label: 'En proceso', value: '89', change: '-2% hoy', color: 'green', icon: 'autorenew', isNegative: true },
    { label: 'Archivados', value: '1,032', change: '+18% hoy', color: 'red', icon: 'archive' },
  ];

  const secondaryStats = [
    { label: 'Usuarios', value: '1,205', color: 'indigo', icon: 'people' },
    { label: 'Documentos', value: '45,802', color: 'teal', icon: 'description' },
    { label: 'Entidades', value: '84', color: 'amber', icon: 'business' },
    { label: 'Hojas de Ruta', value: '12,450', color: 'purple', icon: 'map' },
  ];

  const recentActivity = [
    { time: 'Hace 2 mins', hour: '10:45 AM', user: 'Juan Pérez', action: 'derivó', target: 'HR-2023-001', ip: '192.168.1.1', icon: 'shortcut', iconColor: 'text-blue-500' },
    { time: 'Hace 8 mins', hour: '10:39 AM', user: 'Sistema', action: 'archivó', target: 'DOC-552-2023', ip: 'Localhost', icon: 'check_circle', iconColor: 'text-green-500', auto: true },
    { time: 'Hace 15 mins', hour: '10:32 AM', user: 'María García', action: 'editó metadatos de entidad', target: 'Muni-Lima', ip: '200.48.11.23', icon: 'edit_note', iconColor: 'text-orange-500' },
    { time: 'Hace 22 mins', hour: '10:25 AM', user: 'Admin', action: 'revocó acceso a', target: 'Externo-05', ip: '192.168.1.1', icon: 'person_remove', iconColor: 'text-red-500' },
    { time: 'Hace 31 mins', hour: '10:16 AM', user: 'Sistemas', action: 'generó reporte trimestral', target: '', ip: '10.0.0.155', icon: 'folder_zip', iconColor: 'text-purple-500' },
    { time: 'Hace 45 mins', hour: '10:02 AM', user: '', action: 'Nuevo documento cargado', target: 'RESOL-2023-A', ip: '192.168.5.10', icon: 'cloud_upload', iconColor: 'text-blue-500' },
    { time: 'Hace 1 hora', hour: '09:45 AM', user: 'root', action: 'Intento de login fallido', target: '', ip: '45.122.1.8', icon: 'security', iconColor: 'text-amber-500', isAlert: true },
  ];

  const activeUsers = [
    { name: 'María García', role: 'Analista II - Trámite', time: 'Hace 30s', status: 'online', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZr9Rx0tpaX4-c0SYJKYR3y49CxCzCWP0iY2iJ-QFRksWNUh1BBH6L2v80sAEZLmu05FWAaFrzE3cHz8zY-VGf-hy9d2lYncbeFDRLpYNdhRtkwDrX7Pb4htV4CA4A8Jcc-9K-G0P780B_0OqKu9WJyZWv2mqrQWWfVbOzDFWj9a-Qg-W4XaA0nhjuB4CR2bhZCnZsCsBBWwE0XPC2QnOPFQWUfsKCtStBksUGoW8eYd52MLHnrm_Hlms8WQjNB2_GhHPYMiplAREI' },
    { name: 'Roberto Díaz', role: 'Jefe de Área', time: 'Hace 1m', status: 'online', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlSUuwASgZrnN_MdRdGEVFHVdeaI4wMiZkvd40dyt-kqEHbmlZCnd4bN5Pn9Grzs39w9RTCHK-FGOBb086a5Y41M4_OfJTHzP-WC_B2J-f8N73mv5oAUf4yYW3XukB2KY-SRwXME360TcYJmodm3BAoXFclK-o_ryqzqS6r7-RwnBgLenRwCnY3ooKrUNOyOe6hrWb_f67EmXeQTvlV7Q8pA4tHkEuWfDo40cRZBpD4LpvnJ6AHYAQYuK8kBfV9AfBokmiXYm4xJ-a' },
    { name: 'Elena Ruiz', role: 'Asistente Administrativo', time: 'Hace 3m', status: 'online', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBij9RxJ0pBfov15anXfbZgSiA2CniKM4g4ikpHPSfpoufWo26-om8TJ5hcVnvP687ddTc02-r9bwfvTi_Bsg3ZDFZU-7i5L0okOfOt0etpsk8dvXfsdqsuR1GVqNLZxyD0vYnApm_IhObhEC30UWuUfEs7LtLU-mHFzPlNsHi2E_AFE_Z7WB82zh3HLnfpupATq-GWTz43THVdXY9Wd3FrZCFZCxiRayXlGY5xZiLg7JZNEgPE7DZud9wnEKpaykdNb7SnB5p5RXJ1' },
    { name: 'Carlos Méndez', role: 'Técnico TI', time: 'Hace 5m', status: 'away', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2LEKfxLfNUQ4c2OJ4xkzFTWMYVXW6kfbja8hLSv1hFOdP0Cpk7cCF2_JSyFFP9hpe7wK3I839KySyilPCFqy3KNLEQCR6ijDrkoDrTvIJ8vTmkb6q5BRAMT36XwfFn1jidtZ-WeDus6ntEiwM7Akw6HbCCy8zzBVm4yaaEvH1DZbqhbXtnHdWr4Y-Qakh9ulI8a1i7s_ovExz6uVFvpSWRtHw3d4rfkwA60tr6pfO1QBTrVDcAaq0WV-cB1vnN8ho_lAm_5ZlU3M' },
    { name: 'Ana Sofía Luna', role: 'Secretaria General', time: 'Hace 6m', status: 'online', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUi6yf_oLNPUFWxToKKhqCZEVqClqbNqqKdIq_4Cr_NhvZmBnk1xoCBblT22z84Bof0ghPJD3LKZ-KSVYbS38_2jclfLGZFjSvPpAzNf39DSCsWZEAZ-sH1w7vHr0OkghmoA8hEfGCTbca6x8oyKcA1p2Sw2-rrwvUw7rKy6il-Tj6s7N46NzfWzvIBVl2Lw2fmtvIigP7-3ifir46JHigIxerstfI6mloB59FQB3ViVgUqoq3NS78y-HJHhRAOvcsnoEK9EXdLpty' },
    { name: 'Marcos Villa', role: 'Coordinador', time: 'Hace 9m', status: 'online', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ReX6x8Y1zjhFUmq7FTgBbIvgKVXgrs8-wLpstOxrzlgC-Ko8H0oIrMr8TL7G865Wsa5IJc6Fqw0ZfoSz9KxSLixAndKdx73U2yo462FNoggbCsizTGPHIvavfGRjsrPFklyEfWzm8azdp5jqTjijtgklRDXRV79gHGawyqPzUcLE7pdhLP5GGmGRTPwsh44pJLRJwmYE0UozEzKxJCFmjcih0tvUfksu59pN4aG0khqHDCJEHeWr4_M97zBzbP1Qrqx_ji5mSCXI' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 overflow-y-auto h-full custom-scrollbar bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* KPI Section - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {primaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-primary/5 transition-all group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className={`size-10 md:size-12 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined !text-[24px] md:!text-[28px]">{stat.icon}</span>
              </div>
              <span className={`text-${stat.isNegative ? 'red' : stat.color}-600 dark:text-${stat.isNegative ? 'red' : stat.color}-400 text-[10px] md:text-xs font-bold px-2 py-1 bg-${stat.isNegative ? 'red' : stat.color}-50 dark:bg-${stat.isNegative ? 'red' : stat.color}-900/20 rounded-full`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums leading-none">{stat.value}</h3>
              <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* KPI Section - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {secondaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-primary/5 transition-all group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className={`size-10 md:size-12 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined !text-[24px] md:!text-[28px]">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums leading-none">{stat.value}</h3>
              <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Panels Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 pb-8">
        {/* Recent Activity Panel */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col min-h-[400px]">
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">Actividad Reciente</h2>
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium">Historial en tiempo real</p>
            </div>
            <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all">Ver todo</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">Fecha / Hora</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">Acción Realizada</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 text-right">Origen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {recentActivity.map((act, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <p className="text-xs md:text-sm text-slate-900 dark:text-slate-200 font-medium tabular-nums">{act.time}</p>
                      <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold">{act.hour}</p>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${act.iconColor} text-base md:text-lg`}>{act.icon}</span>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                          <span className="font-bold text-slate-900 dark:text-white">{act.user}</span> {act.action} <span className="font-bold text-primary">{act.target}</span>
                        </p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right whitespace-nowrap">
                      <span className={`text-[10px] md:text-xs font-mono px-1.5 md:px-2 py-1 rounded ${act.isAlert ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                        {act.ip}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Users Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">Conectados</h2>
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium">Últimos 10 min</p>
            </div>
            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[9px] md:text-[10px] font-extrabold rounded-full animate-pulse">
              12 ACTIVOS
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] xl:max-h-none custom-scrollbar">
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {activeUsers.map((user, i) => (
                <div key={i} className="p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="relative shrink-0">
                    <img alt={user.name} className="size-8 md:size-10 rounded-full border-2 border-white dark:border-slate-800 shadow-sm object-cover" src={user.img} />
                    <span className={`absolute bottom-0 right-0 size-2.5 md:size-3 rounded-full border-2 border-white dark:border-slate-800 ${user.status === 'online' ? 'bg-green-500' : 'bg-orange-400'}`}></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-slate-200 truncate group-hover:text-primary transition-colors">{user.name}</p>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 truncate font-medium">{user.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">{user.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 md:p-4 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 text-center">
            <a className="text-[10px] md:text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1" href="#">
              Gestionar todos
              <span className="material-symbols-outlined !text-xs">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
