import type { ReactNode } from 'react';
import { useState } from 'react';

interface Column<T> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  width?: number | string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  loading?: boolean;
  rowKey: keyof T | ((record: T) => string);
  pagination?: boolean;
  pageSize?: number;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  loading = false,
  rowKey,
  pagination = true,
  pageSize = 10
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataSource.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pagination ? dataSource.slice(startIndex, endIndex) : dataSource;

  const getKey = (record: T) => {
    return typeof rowKey === 'function' ? rowKey(record) : String(record[rowKey]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-500" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 移动端：卡片视图 */}
      <div className="block md:hidden space-y-4">
        {paginatedData.map((record) => (
          <div
            key={getKey(record)}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            {columns.map((column) => {
              const value = column.dataIndex ? record[column.dataIndex] : undefined;
              const content = column.render ? column.render(value, record, 0) : String(value || '');

              return (
                <div key={column.key} className="flex justify-between py-2 border-b border-slate-800 last:border-0">
                  <span className="text-sm font-medium text-slate-400">{column.title}</span>
                  <span className="text-sm text-white">{content}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 桌面端：表格视图 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-300"
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((record) => (
              <tr
                key={getKey(record)}
                className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors"
              >
                {columns.map((column) => {
                  const value = column.dataIndex ? record[column.dataIndex] : undefined;
                  const content = column.render ? column.render(value, record, 0) : String(value || '');

                  return (
                    <td key={column.key} className="px-4 py-3 text-sm text-slate-300">
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {pagination && totalPages > 1 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-400">
            共 {dataSource.length} 条记录
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded px-3 py-1 text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              上一页
            </button>
            <span className="text-sm text-slate-400">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded px-3 py-1 text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              下一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
