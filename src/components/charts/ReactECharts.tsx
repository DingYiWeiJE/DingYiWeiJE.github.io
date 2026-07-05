import { useEffect, useRef } from 'react';
import echarts from '../../utils/echarts';

interface ReactEChartsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: any; // 使用 any 避免严格的类型检查问题
  style?: React.CSSProperties;
  className?: string;
}

export function ReactECharts({ option, style, className }: ReactEChartsProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ReturnType<typeof echarts.init> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表实例
    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current);
    }

    // 设置图表配置
    instanceRef.current.setOption(option);

    // 响应式处理
    const handleResize = () => {
      instanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [option]);

  // 组件卸载时销毁实例
  useEffect(() => {
    return () => {
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, []);

  return <div ref={chartRef} style={style} className={className} />;
}
