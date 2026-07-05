import type { ReactNode } from 'react';
import { useState } from 'react';

interface PanelProps {
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export function Panel({
  title,
  subtitle,
  extra,
  collapsible = false,
  defaultCollapsed = false,
  loading = false,
  children,
  className = ''
}: PanelProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`rounded-lg border border-slate-800 bg-slate-900 ${className}`}>
      {(title || subtitle || extra) && (
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {extra}
            {collapsible && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label={collapsed ? '展开' : '收起'}
              >
                <svg
                  className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {!collapsed && (
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-500" />
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}
