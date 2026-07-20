import { ToolMode } from "react-labele-me";
import type { ReactElement } from "react";

interface ToolButtonsProps {
  currentTool?: ToolMode;
  onToolChange?: (tool: ToolMode) => void;
  brushSize?: number;
  onBrushSizeChange?: (size: number) => void;
  brushColor?: string;
  onBrushColorChange?: (color: string) => void;
}

interface ToolConfig {
  type: ToolMode;
  label: string;
  icon: ReactElement;
}

const tools: ToolConfig[] = [
  {
    type: "DRAW_RECT" as ToolMode,
    label: "矩形",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    type: "DRAW_CIRCLE" as ToolMode,
    label: "圆圈",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    type: "BRUSH_DRAW" as ToolMode,
    label: "涂鸦",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    type: "MOSAIC_DRAW" as ToolMode,
    label: "马赛克",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="4" height="4" />
        <rect x="9" y="3" width="4" height="4" />
        <rect x="15" y="3" width="4" height="4" />
        <rect x="3" y="9" width="4" height="4" />
        <rect x="9" y="9" width="4" height="4" />
        <rect x="15" y="9" width="4" height="4" />
        <rect x="3" y="15" width="4" height="4" />
        <rect x="9" y="15" width="4" height="4" />
        <rect x="15" y="15" width="4" height="4" />
      </svg>
    ),
  },
  {
    type: "ERASER" as ToolMode,
    label: "橡皮擦",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20H7L3 16L12 7L17 12" />
        <path d="M7 20L12 15" />
      </svg>
    ),
  },
];

export function ToolButtons({
  currentTool = "DRAW_CIRCLE" as ToolMode,
  onToolChange,
  brushSize = 5,
  onBrushSizeChange,
  brushColor = "#FF0000",
  onBrushColorChange
}: ToolButtonsProps) {
  // 判断当前工具是否需要画笔大小控制
  const needsBrushSize = currentTool === "BRUSH_DRAW" || currentTool === "MOSAIC_DRAW" || currentTool === "ERASER";
  // 判断当前工具是否需要颜色控制（只有画笔需要）
  const needsColorPicker = currentTool === "BRUSH_DRAW";

  return (
    <div className="hidden h-full w-[50px] flex-col items-center gap-2 pr-2 py-4 md:flex">
      {/* 工具按钮 */}
      {tools.map((tool) => {
        const isActive = currentTool === tool.type;
        return (
          <button
            key={tool.type}
            onClick={() => onToolChange?.(tool.type)}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-orange-500"
            }`}
            title={tool.label}
            aria-label={tool.label}
          >
            {tool.icon}
            {/* Tooltip */}
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {tool.label}
            </span>
          </button>
        );
      })}

      {/* 颜色选择器 - 只在画笔工具时显示 */}
      {needsColorPicker && onBrushColorChange && (
        <div className="mt-4 flex flex-col items-center gap-2 border-t border-gray-200 pt-4">
          {/* 当前颜色显示和调色板 */}
          <label className="relative flex flex-col items-center gap-1 cursor-pointer group">
            <div
              className="h-8 w-8 rounded-lg border-2 border-gray-300 shadow-sm group-hover:border-orange-400 transition-colors"
              style={{ backgroundColor: brushColor }}
              title="点击选择颜色"
            />
            <input
              type="color"
              value={brushColor}
              onChange={(e) => onBrushColorChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="选择画笔颜色"
            />
          </label>
        </div>
      )}

      {/* 画笔大小控制 */}
      {needsBrushSize && onBrushSizeChange && (
        <div className="mt-4 flex flex-col items-center gap-2 border-t border-gray-200 pt-4">
          {/* 画笔大小图标和数值 */}
          <div className="flex flex-col items-center gap-1">
            <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r={Math.max(2, Math.min(8, brushSize / 2))} />
            </svg>
            <span className="text-xs font-medium text-gray-600">{brushSize}</span>
          </div>

          {/* 垂直滑块 */}
          <div className="relative h-32 w-10 flex items-center justify-center">
            <input
              type="range"
              min="1"
              max="100"
              value={brushSize}
              onChange={(e) => onBrushSizeChange(Number(e.target.value))}
              className="slider-vertical h-28 w-1 cursor-pointer appearance-none rounded-full bg-gray-200"
              style={{
                writingMode: 'horizontal-tb',
                WebkitAppearance: 'slider-vertical',
              }}
              aria-label="画笔大小"
            />
          </div>

          {/* 快捷大小按钮 */}
          <div className="flex flex-col gap-1">
            {[5, 50, 100].map((size) => (
              <button
                key={size}
                onClick={() => onBrushSizeChange(size)}
                className={`h-6 w-6 rounded flex items-center justify-center text-xs transition-colors ${
                  brushSize === size
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={`大小 ${size}`}
              >
                {size === 5 ? "S" : size === 50 ? "M" : "L"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
