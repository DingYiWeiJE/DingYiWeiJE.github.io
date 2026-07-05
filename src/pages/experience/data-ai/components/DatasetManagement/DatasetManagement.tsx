import { useState, useMemo } from 'react';
import { DatasetCard } from './DatasetCard';
import { DatasetFiltersComponent } from './DatasetFilters';
import type { Dataset, DatasetFilters } from '../../types';

interface DatasetManagementProps {
  datasets: Dataset[];
}

export function DatasetManagement({ datasets }: DatasetManagementProps) {
  const [filters, setFilters] = useState<DatasetFilters>({
    search: '',
    tags: [],
    sortBy: 'latest',
  });

  // 过滤和排序数据集
  const filteredDatasets = useMemo(() => {
    let result = [...datasets];

    // 搜索过滤
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (ds) =>
          ds.name.toLowerCase().includes(search) ||
          ds.description.toLowerCase().includes(search) ||
          ds.tags.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    // 排序
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'size':
        result.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
        break;
      case 'latest':
      default:
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }

    return result;
  }, [datasets, filters]);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-4 md:p-6">
      {/* 标题 */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white md:text-xl">Dataset Management</h2>
        <p className="mt-1 text-xs text-slate-400 md:text-sm">
          {filteredDatasets.length} 个数据集
        </p>
      </div>

      {/* 筛选器 */}
      <DatasetFiltersComponent filters={filters} onFiltersChange={setFilters} />

      {/* 数据集网格 */}
      {filteredDatasets.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 text-5xl">📦</div>
          <p className="text-slate-400">没有找到匹配的数据集</p>
        </div>
      )}
    </div>
  );
}
