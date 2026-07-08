import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { OHLCV, MovingAveragePoint } from '../types';
import { formatPrice, formatPercent, formatVolume, formatDate } from '../utils/formatters';

interface CandlestickChartProps {
  data: OHLCV[];
  ma5: MovingAveragePoint[];
  ma20: MovingAveragePoint[];
  ma60: MovingAveragePoint[];
  onBrushChange?: (range: [Date, Date] | null) => void;
}

export function CandlestickChart({ data, ma5, ma20, ma60, onBrushChange }: CandlestickChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const margins = useMemo(() => ({ top: 20, right: 60, bottom: 80, left: 60 }), []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const width = containerWidth - margins.left - margins.right;
    const height = 500 - margins.top - margins.bottom;
    const volumeHeight = 80;

    // 清空之前的内容
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', 500);

    const g = svg.append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    // X 轴：使用索引而非日期，避免周末空白
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    // Y 轴：价格
    const priceExtent = d3.extent([
      ...data.map(d => d.high),
      ...data.map(d => d.low),
      ...ma5.filter(d => d.value !== null).map(d => d.value as number),
      ...ma20.filter(d => d.value !== null).map(d => d.value as number),
      ...ma60.filter(d => d.value !== null).map(d => d.value as number),
    ]) as [number, number];

    const yScale = d3.scaleLinear()
      .domain([priceExtent[0] * 0.98, priceExtent[1] * 1.02])
      .range([height - volumeHeight - 20, 0]);

    // Y 轴：成交量
    const volumeScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.volume) || 1])
      .range([height - volumeHeight, height]);

    // 绘制网格
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(() => ''));

    // 绘制 X 轴
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(Math.min(10, data.length))
          .tickFormat((d) => {
            const index = Number(d);
            if (index >= 0 && index < data.length) {
              const date = data[index].date;
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }
            return '';
          })
      );

    xAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '11px');

    xAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制 Y 轴
    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale).ticks(8));

    yAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '11px');

    yAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制右侧 Y 轴
    const yAxisRight = g.append('g')
      .attr('transform', `translate(${width},0)`)
      .call(d3.axisRight(yScale).ticks(8));

    yAxisRight.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '11px');

    yAxisRight.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制成交量
    g.selectAll('.volume-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'volume-bar')
      .attr('x', (_, i) => xScale(i) - 1)
      .attr('y', d => volumeScale(d.volume))
      .attr('width', Math.max(2, width / data.length - 1))
      .attr('height', d => height - volumeScale(d.volume))
      .attr('fill', d => d.close >= d.open ? '#ef4444' : '#22c55e')
      .attr('opacity', 0.3);

    // 绘制移动平均线
    const drawMA = (maData: MovingAveragePoint[], color: string, label: string) => {
      const validData = maData
        .map((d, i) => ({ ...d, index: i }))
        .filter(d => d.value !== null);

      if (validData.length === 0) return;

      const line = d3.line<typeof validData[0]>()
        .x(d => xScale(d.index))
        .y(d => yScale(d.value as number))
        .curve(d3.curveLinear);

      g.append('path')
        .datum(validData)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1.5)
        .attr('d', line);

      // 图例
      const legendY = -5;
      g.append('text')
        .attr('x', width - 180 + (label === 'MA5' ? 0 : label === 'MA20' ? 60 : 120))
        .attr('y', legendY)
        .attr('fill', color)
        .attr('font-size', '11px')
        .text(label);
    };

    drawMA(ma5, '#3b82f6', 'MA5');
    drawMA(ma20, '#f59e0b', 'MA20');
    drawMA(ma60, '#8b5cf6', 'MA60');

    // 绘制蜡烛图
    const candleWidth = Math.max(2, Math.min(10, width / data.length * 0.8));

    // 上下影线
    g.selectAll('.candle-line')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'candle-line')
      .attr('x1', (_, i) => xScale(i))
      .attr('x2', (_, i) => xScale(i))
      .attr('y1', d => yScale(d.high))
      .attr('y2', d => yScale(d.low))
      .attr('stroke', d => d.close >= d.open ? '#ef4444' : '#22c55e')
      .attr('stroke-width', 1);

    // 实体
    g.selectAll('.candle-body')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'candle-body')
      .attr('x', (_, i) => xScale(i) - candleWidth / 2)
      .attr('y', d => yScale(Math.max(d.open, d.close)))
      .attr('width', candleWidth)
      .attr('height', d => Math.max(1, Math.abs(yScale(d.open) - yScale(d.close))))
      .attr('fill', d => d.close >= d.open ? '#ef4444' : '#22c55e')
      .attr('stroke', d => d.close >= d.open ? '#ef4444' : '#22c55e');

    // Tooltip
    const tooltip = d3.select(container)
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(15, 23, 42, 0.95)')
      .style('border', '1px solid #334155')
      .style('border-radius', '6px')
      .style('padding', '8px 12px')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('z-index', '1000')
      .style('color', '#e2e8f0');

    // 十字光标
    const crosshair = g.append('g').style('display', 'none');

    crosshair.append('line')
      .attr('class', 'crosshair-x')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('y1', 0)
      .attr('y2', height);

    crosshair.append('line')
      .attr('class', 'crosshair-y')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('x1', 0)
      .attr('x2', width);

    // 交互区域
    const overlay = g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all');

    overlay.on('mousemove', function(event) {
      const [mx] = d3.pointer(event);
      const index = Math.round(xScale.invert(mx));

      if (index >= 0 && index < data.length) {
        const d = data[index];
        const changePercent = index > 0 ? (d.close - data[index - 1].close) / data[index - 1].close : 0;

        crosshair.style('display', null);
        crosshair.select('.crosshair-x')
          .attr('x1', xScale(index))
          .attr('x2', xScale(index));

        const my = yScale(d.close);
        crosshair.select('.crosshair-y')
          .attr('y1', my)
          .attr('y2', my);

        tooltip.html(`
          <div style="margin-bottom: 4px; font-weight: 600; color: #fff;">${formatDate(d.date)}</div>
          <div style="display: grid; grid-template-columns: auto auto; gap: 4px 12px;">
            <span style="color: #94a3b8;">开盘:</span> <span style="color: #fff;">${formatPrice(d.open)}</span>
            <span style="color: #94a3b8;">最高:</span> <span style="color: #fff;">${formatPrice(d.high)}</span>
            <span style="color: #94a3b8;">最低:</span> <span style="color: #fff;">${formatPrice(d.low)}</span>
            <span style="color: #94a3b8;">收盘:</span> <span style="color: #fff;">${formatPrice(d.close)}</span>
            <span style="color: #94a3b8;">成交量:</span> <span style="color: #fff;">${formatVolume(d.volume)}</span>
            <span style="color: #94a3b8;">涨跌幅:</span> <span style="color: ${changePercent >= 0 ? '#ef4444' : '#22c55e'};">${changePercent >= 0 ? '+' : ''}${formatPercent(changePercent)}</span>
          </div>
        `)
          .style('visibility', 'visible')
          .style('left', `${event.pageX - container.getBoundingClientRect().left + 15}px`)
          .style('top', `${event.pageY - container.getBoundingClientRect().top - 10}px`);
      }
    });

    overlay.on('mouseout', () => {
      crosshair.style('display', 'none');
      tooltip.style('visibility', 'hidden');
    });

    // Brush
    const brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on('end', (event) => {
        if (!event.selection) {
          onBrushChange?.(null);
          return;
        }

        const [x0, x1] = event.selection as [number, number];
        const i0 = Math.round(xScale.invert(x0));
        const i1 = Math.round(xScale.invert(x1));

        if (i0 >= 0 && i1 < data.length && i0 < i1) {
          onBrushChange?.([data[i0].date, data[i1].date]);
        }
      });

    g.append('g')
      .attr('class', 'brush')
      .call(brush);

    // 清理函数
    return () => {
      tooltip.remove();
    };
  }, [data, ma5, ma20, ma60, margins, onBrushChange]);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg ref={svgRef} className="w-full" />
    </div>
  );
}
