import React from 'react';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
  title,
  description,
  headerAction,
}: TableProps<T>) {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col min-h-[300px]">
      {/* Header */}
      {(title || headerAction) && (
        <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {title && <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{title}</h3>}
            {description && <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{description}</p>}
          </div>
          {headerAction}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-x-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-slate-400">Cargando...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 dark:text-slate-500">
            <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{ width: col.width }}
                    className={`px-4 md:px-6 py-3 md:py-4 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 ${getAlignClass(col.align)}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((row) => (
                <tr
                  key={String(row[rowKey])}
                  onClick={() => onRowClick?.(row)}
                  className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-4 md:px-6 py-3 md:py-4 text-sm text-slate-900 dark:text-slate-100 ${getAlignClass(col.align)}`}
                    >
                      {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
