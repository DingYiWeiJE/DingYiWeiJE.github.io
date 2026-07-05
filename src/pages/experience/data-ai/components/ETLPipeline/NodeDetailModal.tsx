import type { ETLNode as ETLNodeType } from '../../types';

interface NodeDetailModalProps {
  node: ETLNodeType | null;
  onClose: () => void;
}

export function NodeDetailModal({ node, onClose }: NodeDetailModalProps) {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{node.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{node.name}</h3>
              <p className="text-sm text-slate-400">{node.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 状态 */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">状态:</span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                node.status === 'completed'
                  ? 'bg-green-500/20 text-green-400'
                  : node.status === 'running'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : node.status === 'error'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {node.status === 'completed' && '已完成'}
              {node.status === 'running' && '运行中'}
              {node.status === 'pending' && '等待中'}
              {node.status === 'error' && '错误'}
            </span>
          </div>

          {node.status === 'running' && (
            <div className="mt-2">
              <div className="mb-1 flex justify-between text-xs text-slate-400">
                <span>进度</span>
                <span>{node.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                  style={{ width: `${node.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 统计 */}
        <div className="mb-4 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">已处理:</span>
              <span className="font-medium text-white">{node.stats.processed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">总计:</span>
              <span className="font-medium text-white">{node.stats.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">吞吐量:</span>
              <span className="font-medium text-cyan-400">{node.stats.throughput}</span>
            </div>
            {node.stats.duration && (
              <div className="flex justify-between">
                <span className="text-slate-400">耗时:</span>
                <span className="font-medium text-white">{node.stats.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* 详细信息 */}
        {node.details && (
          <div className="space-y-3 text-sm">
            {node.details.input && (
              <div>
                <span className="text-slate-400">输入:</span>
                <span className="ml-2 text-white">{node.details.input}</span>
              </div>
            )}
            {node.details.output && (
              <div>
                <span className="text-slate-400">输出:</span>
                <span className="ml-2 text-white">{node.details.output}</span>
              </div>
            )}
            {node.details.config && (
              <div>
                <div className="mb-1 text-slate-400">配置:</div>
                <div className="rounded-lg bg-slate-950/80 p-3">
                  <pre className="text-xs text-slate-300">
                    {JSON.stringify(node.details.config, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
