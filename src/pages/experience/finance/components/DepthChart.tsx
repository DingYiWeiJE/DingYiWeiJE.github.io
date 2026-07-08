import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { OrderBookSnapshot } from '../types';
import { formatPrice, formatVolume } from '../utils/formatters';

interface DepthChartProps {
  orderBook: OrderBookSnapshot;
  midPrice: number;
}

export function DepthChart({ orderBook, midPrice }: DepthChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const margins = useMemo(() => ({ top: 20, right: 50, bottom: 40, left: 50 }), []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || orderBook.bids.length === 0) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const width = containerWidth - margins.left - margins.right;
    const height = 300 - margins.top - margins.bottom;

    // 清空之前的内容
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', 300);

    const g = svg.append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    // 准备数据
    const bids = [...orderBook.bids].reverse(); // 买盘从低到高
    const asks = [...orderBook.asks]; // 卖盘从低到高

    // X 轴：价格
    const allPrices = [...bids.map(d => d.price), ...asks.map(d => d.price)];
    const xScale = d3.scaleLinear()
      .domain([d3.min(allPrices) || 0, d3.max(allPrices) || 1])
      .range([0, width]);

    // Y 轴：累计数量
    const maxCumulative = Math.max(
      bids[bids.length - 1]?.cumulativeSize || 0,
      asks[asks.length - 1]?.cumulativeSize || 0
    );

    const yScale = d3.scaleLinear()
      .domain([0, maxCumulative])
      .range([height, 0]);

    // 绘制网格
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(() => ''));

    // 绘制 X 轴
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(8).tickFormat(d => formatPrice(d as number)));

    xAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    xAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制 Y 轴
    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d => {
        const val = d as number;
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
        return val.toString();
      }));

    yAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    yAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制买盘深度（阶梯面积图）
    const bidArea = d3.area<typeof bids[0]>()
      .x(d => xScale(d.price))
      .y0(height)
      .y1(d => yScale(d.cumulativeSize))
      .curve(d3.curveStepAfter);

    g.append('path')
      .datum(bids)
      .attr('fill', 'rgba(239, 68, 68, 0.2)')
      .attr('stroke', '#ef4444')
      .attr('stroke-width', 2)
      .attr('d', bidArea)
      .style('transition', 'all 0.3s ease');

    // 绘制卖盘深度（阶梯面积图）
    const askArea = d3.area<typeof asks[0]>()
      .x(d => xScale(d.price))
      .y0(height)
      .y1(d => yScale(d.cumulativeSize))
      .curve(d3.curveStepBefore);

    g.append('path')
      .datum(asks)
      .attr('fill', 'rgba(34, 197, 94, 0.2)')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2)
      .attr('d', askArea)
      .style('transition', 'all 0.3s ease');

    // 绘制 midPrice 线
    g.append('line')
      .attr('x1', xScale(midPrice))
      .attr('x2', xScale(midPrice))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4');

    g.append('text')
      .attr('x', xScale(midPrice))
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#3b82f6')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .text(`Mid: ${formatPrice(midPrice)}`);

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

    // 交互
    const overlay = g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all');

    overlay.on('mousemove', function(event) {
      const [mx] = d3.pointer(event);
      const price = xScale.invert(mx);

      // 找到最近的档位
      let nearestLevel: { price: number; size: number; cumulativeSize: number; type: string } | null = null;
      let minDiff = Infinity;

      for (const bid of bids) {
        const diff = Math.abs(bid.price - price);
        if (diff < minDiff) {
          minDiff = diff;
          nearestLevel = { ...bid, type: '买盘' };
        }
      }

      for (const ask of asks) {
        const diff = Math.abs(ask.price - price);
        if (diff < minDiff) {
          minDiff = diff;
          nearestLevel = { ...ask, type: '卖盘' };
        }
      }

      if (nearestLevel) {
        tooltip.html(`
          <div style="margin-bottom: 4px; font-weight: 600; color: ${nearestLevel.type === '买盘' ? '#ef4444' : '#22c55e'};">${nearestLevel.type}</div>
          <div style="display: grid; grid-template-columns: auto auto; gap: 4px 12px;">
            <span style="color: #94a3b8;">价格:</span> <span style="color: #fff;">${formatPrice(nearestLevel.price)}</span>
            <span style="color: #94a3b8;">数量:</span> <span style="color: #fff;">${formatVolume(nearestLevel.size)}</span>
            <span style="color: #94a3b8;">累计:</span> <span style="color: #fff;">${formatVolume(nearestLevel.cumulativeSize)}</span>
          </div>
        `)
          .style('visibility', 'visible')
          .style('left', `${event.pageX - container.getBoundingClientRect().left + 15}px`)
          .style('top', `${event.pageY - container.getBoundingClientRect().top - 10}px`);
      }
    });

    overlay.on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });

    // 清理函数
    return () => {
      tooltip.remove();
    };
  }, [orderBook, midPrice, margins]);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg ref={svgRef} className="w-full" />
    </div>
  );
}
