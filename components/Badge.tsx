import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  children,
  variant = 'default',
  className = '',
  icon,
  size = 'md',
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    success: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    primary: 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-[10px] font-bold',
    md: 'px-2.5 py-1.5 text-xs font-bold',
    lg: 'px-3 py-2 text-sm font-bold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[14px] leading-none">{icon}</span>}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusMap = {
    active: { variant: 'success' as BadgeVariant, icon: 'check_circle', text: label || 'Activo' },
    inactive: { variant: 'default' as BadgeVariant, icon: 'cancel', text: label || 'Inactivo' },
    pending: { variant: 'warning' as BadgeVariant, icon: 'pending', text: label || 'Pendiente' },
    completed: { variant: 'success' as BadgeVariant, icon: 'task_alt', text: label || 'Completado' },
    failed: { variant: 'error' as BadgeVariant, icon: 'error', text: label || 'Fallido' },
  };

  const config = statusMap[status];

  return <Badge variant={config.variant} icon={config.icon}>{config.text}</Badge>;
}
