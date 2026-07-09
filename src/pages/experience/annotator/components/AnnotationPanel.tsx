import { useState } from 'react';
import type { AnnotationData } from 'react-vision-annotator';

// 自定义图标组件
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

interface AnnotationPanelProps {
  annotations: AnnotationData[];
  onAnnotationsChange: (annotations: AnnotationData[]) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function AnnotationPanel({
  annotations,
  onAnnotationsChange,
  onSelectionChange,
}: AnnotationPanelProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = annotations.map((annotation) =>
      annotation.id === id
        ? { ...annotation, visible: annotation.visible === false ? true : false }
        : annotation
    );
    onAnnotationsChange(updated);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = annotations.filter((annotation) => annotation.id !== id);
    onAnnotationsChange(updated);

    // 如果删除的是选中项，清空选中列表
    if (selectedIds.includes(id)) {
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  const handleItemClick = (id: string) => {
    const newSelectedIds = [id];
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  return (
    <div className="flex h-full flex-col">
      {/* 上部分：标注列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-slate-700 px-4 py-3">
          <h3 className="text-sm font-medium text-slate-300">
            标注列表 ({annotations.length})
          </h3>
        </div>

        <div className="space-y-1 p-2">
          {annotations.map((annotation, index) => {
            const isSelected = selectedIds.includes(annotation.id);
            const isVisible = annotation.visible !== false;

            return (
              <div
                key={annotation.id}
                onClick={() => handleItemClick(annotation.id)}
                className={`
                  flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors
                  ${
                    isSelected
                      ? 'bg-orange-500/20 ring-1 ring-orange-500'
                      : 'hover:bg-slate-800'
                  }
                `}
              >
                {/* 序号 */}
                <span className="text-xs font-medium text-slate-400 w-6">
                  {index + 1}
                </span>

                {/* 可见性切换 */}
                <button
                  onClick={(e) => handleToggleVisibility(annotation.id, e)}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                  title={isVisible ? '隐藏' : '显示'}
                >
                  {isVisible ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" />
                  )}
                </button>

                {/* 颜色标识 */}
                <div
                  className="h-4 w-4 rounded border border-slate-600 shrink-0"
                  style={{ backgroundColor: annotation.color }}
                  title="标注颜色"
                />

                {/* 标注名称 */}
                <span className="flex-1 truncate text-sm text-slate-200">
                  {annotation.label || '未命名'}
                </span>

                {/* 删除按钮 */}
                <button
                  onClick={(e) => handleDelete(annotation.id, e)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                  title="删除"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          {annotations.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">
              暂无标注
            </div>
          )}
        </div>
      </div>

      {/* 下部分：预留区域 */}
      <div className="border-t border-slate-700 p-4">
        <div className="text-xs text-slate-500">
          {/* 预留区域 */}
        </div>
      </div>
    </div>
  );
}
