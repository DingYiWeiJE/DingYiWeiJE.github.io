import { useState } from 'react';
import { ETLNode } from './ETLNode';
import { NodeDetailModal } from './NodeDetailModal';
import type { ETLNode as ETLNodeType } from '../../types';

interface ETLPipelineProps {
  nodes: ETLNodeType[];
}

export function ETLPipeline({ nodes }: ETLPipelineProps) {
  const [selectedNode, setSelectedNode] = useState<ETLNodeType | null>(null);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-4 md:p-6">
      {/* 标题 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white md:text-xl">ETL Pipeline</h2>
        <p className="mt-1 text-xs text-slate-400 md:text-sm">
          数据流处理 · 点击节点查看详情
        </p>
      </div>

      {/* 流程图 - 横向滚动容器 */}
      <div className="overflow-x-auto pb-4 pt-5">
        <div className="flex min-w-max items-center gap-3 pr-6 md:gap-4">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center">
              <ETLNode node={node} onClick={() => setSelectedNode(node)} />

              {index < nodes.length - 1 && (
                <div className="mx-2 flex items-center md:mx-3">
                  {/* 连接线和箭头 - 整体闪烁动画 */}
                  <div
                    className={
                      nodes[index].status === 'completed' && nodes[index + 1].status === 'running'
                        ? 'animate-pulse scale-3'
                        : ''
                    }
                  >
                    {/* 连接线 */}
                    <div
                      className={`relative h-0.5 w-8 md:w-12 ${
                        nodes[index].status === 'completed' && nodes[index + 1].status === 'running'
                          ? 'bg-cyan-400'
                          : 'bg-slate-700'
                      }`}
                    />
                  </div>
                  {/* 箭头 */}
                  <div
                    className={`h-0 w-0 border-y-4 border-l-4 border-y-transparent ${
                      nodes[index].status === 'completed' && nodes[index + 1].status === 'running'
                        ? 'animate-pulse border-l-cyan-400'
                        : 'border-l-slate-700'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 提示 */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>点击节点查看详细信息和统计数据</span>
      </div>

      {/* 节点详情Modal */}
      <NodeDetailModal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
