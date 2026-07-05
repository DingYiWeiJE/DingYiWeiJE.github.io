import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

const colorStyles = {
  blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
  green: 'from-green-500/10 to-green-600/5 border-green-500/20',
  orange: 'from-orange-500/10 to-orange-600/5 border-orange-500/20',
  red: 'from-red-500/10 to-red-600/5 border-red-500/20'
};

const iconColorStyles = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  red: 'text-red-400'
};

export function StatCard({
  title,
  value,
  unit,
  trend,
  trendValue,
  icon,
  color = 'blue'
}: StatCardProps) {
  return (
    <div className={`rounded-lg border bg-gradient-to-br p-6 ${colorStyles[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
          {trend && trendValue && (
            <div className="mt-2 flex items-center gap-1">
              {trend === 'up' && (
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-400' :
                trend === 'down' ? 'text-red-400' :
                'text-slate-400'
              }`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`rounded-lg bg-slate-950/50 p-3 ${iconColorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
