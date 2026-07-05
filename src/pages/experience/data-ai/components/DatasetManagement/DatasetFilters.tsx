import type { DatasetFilters } from '../../types';

interface DatasetFiltersProps {
  filters: DatasetFilters;
  onFiltersChange: (filters: DatasetFilters) => void;
}

export function DatasetFiltersComponent({ filters, onFiltersChange }: DatasetFiltersProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* 搜索框 */}
      <div className="relative flex-1 md:max-w-sm">
        <input
          type="text"
          placeholder="搜索数据集..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 pl-10 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* 排序 */}
      <div className="flex gap-2">
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFiltersChange({ ...filters, sortBy: e.target.value as DatasetFilters['sortBy'] })
          }
          className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white outline-none transition focus:border-cyan-500"
        >
          <option value="latest">最新</option>
          <option value="name">名称</option>
          <option value="size">大小</option>
        </select>
      </div>
    </div>
  );
}
