import type { ReactNode } from 'react';

interface ChartContainerProps {
  title?: string;
  height?: number | string;
  loading?: boolean;
  empty?: boolean;
  emptyText?: string;
  children: ReactNode;
}

export function ChartContainer({
  title,
  height = 300,
  loading = false,
  empty = false,
  emptyText = '暂无数据',
  children
}: ChartContainerProps) {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div>
      {title && (
        <h4 className="mb-4 text-sm font-semibold text-slate-300">{title}</h4>
      )}
      <div style={{ height: heightStyle }} className="relative">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-500" />
          </div>
        ) : empty ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="mt-2 text-sm text-slate-500">{emptyText}</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
