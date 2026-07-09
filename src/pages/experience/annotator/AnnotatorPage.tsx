import { useCallback, useRef, useState } from "react";
import { AnnotationCanvas, ToolMode, type AnnotationCanvasRef, type AnnotationData } from "react-vision-annotator";
import { ToolButtons } from "./components/ToolButtons";
import { AnnotationPanel } from "./components/AnnotationPanel";
import exampleImage from "./components/assets/example.jpg";

export function AnnotatorPage() {
  const [currentTool, setCurrentTool] = useState<ToolMode>("DRAW_CIRCLE" as ToolMode);
  const [brushSize, onBrushSizeChange] = useState(10);
  const [color, setColor] = useState("#fb923c");
  const [annotations, setAnnotations] = useState<AnnotationData[]>([])
  const canvasRef = useRef<AnnotationCanvasRef | null>(null)

  const handleChange = useCallback(
    (data: AnnotationData[]) => {
      if ( data.length > annotations.length) {
        const newAnnotation = data[data.length - 1]
        const updated = data.map((a) =>
          a.id === newAnnotation.id ? { ...a, label: '农作物', color: '#fb923c' } : a,
        )
        setAnnotations(updated)
        canvasRef.current?.select([newAnnotation.id])
        return
      }
      setAnnotations(data)
    },
    [
      setAnnotations,
      annotations,
      canvasRef,
    ],
  )

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    canvasRef.current?.select(selectedIds)
  }, [canvasRef])

  return (
    <div className="relative h-full w-full">
      {/* 移动端顶部提示 */}
      <div className="fixed left-4 right-4 top-4 z-50 rounded-xl border border-amber-300 bg-amber-100 px-4 py-3 text-center text-sm font-medium text-amber-900 shadow-lg md:hidden">
        移动端仅支持查看，若想进行标注，请使用 PC 端打开页面
      </div>

      {/* 页面主体 */}
      <div className="flex h-full w-full">
        <ToolButtons 
          currentTool={currentTool}
          onToolChange={setCurrentTool}
          brushSize={brushSize}
          onBrushSizeChange={onBrushSizeChange}
          brushColor={color}
          onBrushColorChange={setColor}
        />
        {/* 左侧画布 */}
        <div className="h-full flex-1 min-w-0">
          <AnnotationCanvas
            ref={canvasRef}
            image={exampleImage}
            tool={currentTool}
            brushSize={brushSize}
            mosaicBrushSize={brushSize}
            eraserSize={brushSize}
            color={color}
            annotations={annotations}
            onChange={handleChange}
          />
        </div>

        {/* PC 右侧区域 */}
        <div className="hidden h-full w-[300px] bg-slate-900 md:block shrink-0">
          <AnnotationPanel
            annotations={annotations}
            onAnnotationsChange={setAnnotations}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </div>
    </div>
  );
}