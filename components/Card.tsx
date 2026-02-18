import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
  clickable?: boolean;
}

export function Card({
  title,
  description,
  children,
  footer,
  headerAction,
  className = '',
  clickable = false,
}: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-primary/5 transition-all overflow-hidden ${clickable ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Header */}
      {(title || headerAction) && (
        <div className="px-5 md:px-6 py-4 md:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {title && <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{title}</h3>}
            {description && <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
          </div>
          {headerAction}
        </div>
      )}

      {/* Content */}
      <div className={`${title || headerAction ? 'p-5 md:p-6' : 'p-5 md:p-6'}`}>{children}</div>

      {/* Footer */}
      {footer && <div className="px-5 md:px-6 py-4 md:py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">{footer}</div>}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  change?: string;
  isNegative?: boolean;
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  icon,
  color = 'blue',
  change,
  isNegative = false,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-primary/5 transition-all group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className={`size-10 md:size-12 bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
          <span className="material-symbols-outlined !text-[24px] md:!text-[28px]">{icon}</span>
        </div>
        {change && (
          <span className={`text-${isNegative ? 'red' : color}-600 dark:text-${isNegative ? 'red' : color}-400 text-[10px] md:text-xs font-bold px-2 py-1 bg-${isNegative ? 'red' : color}-50 dark:bg-${isNegative ? 'red' : color}-900/20 rounded-full`}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">{value}</h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">{label}</p>
      </div>
    </div>
  );
}
