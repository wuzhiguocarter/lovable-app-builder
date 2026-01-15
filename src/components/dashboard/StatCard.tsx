import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'danger' | 'warning' | 'success';
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const iconColors = {
    default: 'bg-primary/20 text-primary',
    danger: 'bg-danger/20 text-danger',
    warning: 'bg-warning/20 text-warning',
    success: 'bg-success/20 text-success',
  };

  const valueColors = {
    default: 'text-foreground',
    danger: 'text-danger glow-text-danger',
    warning: 'text-warning',
    success: 'text-success',
  };

  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconColors[variant])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            trend.isPositive ? 'text-success' : 'text-danger'
          )}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="stat-label">{title}</p>
        <p className={cn('stat-value mt-1', valueColors[variant])}>{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
