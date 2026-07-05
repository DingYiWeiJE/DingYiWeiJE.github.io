import type { Dataset } from '../../types';
import { ReactECharts } from '../../../../../components/charts/ReactECharts';

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  // 饼图配置
  const chartOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    legend: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: dataset.labels.map((label) => ({
          name: label.name,
          value: label.count,
          itemStyle: { color: label.color },
        })),
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-cyan-500/50 hover:bg-slate-900">
      {/* 头部 */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">{dataset.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{dataset.version}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          {dataset.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="truncate rounded bg-slate-800 px-1.5 py-0.5 text-xs text-slate-400 sm:px-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 饼图 */}
      <div className="mb-3 h-32">
        <ReactECharts option={chartOption} style={{ height: '100%' }} />
      </div>

      {/* 统计 */}
      <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-slate-400">图片数</div>
          <div className="font-semibold text-white">{dataset.imageCount.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-slate-400">已标注</div>
          <div className="font-semibold text-cyan-400">{dataset.labeledCount.toLocaleString()}</div>
        </div>
      </div>

      {/* 标签列表 */}
      <div className="mb-3 space-y-1">
        {dataset.labels.slice(0, 3).map((label) => (
          <div key={label.name} className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: label.color }} />
            <span className="min-w-0 flex-1 truncate text-slate-300">{label.name}</span>
            <span className="shrink-0 text-slate-500">{label.count.toLocaleString()}</span>
          </div>
        ))}
        {dataset.labels.length > 3 && (
          <div className="text-xs text-slate-500">+{dataset.labels.length - 3} more</div>
        )}
      </div>

      {/* 底部信息 */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-3 text-xs">
        <span className="shrink-0 text-slate-500">{dataset.size}</span>
        <button className="shrink-0 text-cyan-400 transition-colors hover:text-cyan-300">
          查看详情 →
        </button>
      </div>
    </div>
  );
}
