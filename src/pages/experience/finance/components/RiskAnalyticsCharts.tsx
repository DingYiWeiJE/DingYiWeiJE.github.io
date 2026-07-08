import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { OHLCV, DrawdownPoint } from '../types';
import { formatPercent, formatDateShort } from '../utils/formatters';
import { calculateReturns, calculateDrawdown, calculateRollingVolatility } from '../utils/indicators';

interface RiskAnalyticsChartsProps {
  data: OHLCV[];
}

export function RiskAnalyticsCharts({ data }: RiskAnalyticsChartsProps) {
  const returnsRef = useRef<SVGSVGElement>(null);
  const drawdownRef = useRef<SVGSVGElement>(null);
  const volatilityRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const margins = useMemo(() => ({ top: 20, right: 40, bottom: 40, left: 50 }), []);

  // 计算指标
  const returns = useMemo(() => calculateReturns(data), [data]);
  const drawdowns = useMemo(() => calculateDrawdown(data), [data]);
  const volatility = useMemo(() => calculateRollingVolatility(data, 20), [data]);

  // 计算统计指标
  const stats = useMemo(() => {
    if (returns.length === 0) {
      return {
        maxDrawdown: 0,
        annualizedVol: 0,
        bestDay: 0,
        worstDay: 0,
        positiveRatio: 0,
      };
    }

    const maxDrawdown = Math.min(...drawdowns.map(d => d.value));
    const returnValues = returns.map(r => r.value);
    const mean = returnValues.reduce((sum, r) => sum + r, 0) / returnValues.length;
    const variance = returnValues.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returnValues.length;
    const annualizedVol = Math.sqrt(variance) * Math.sqrt(252);
    const bestDay = Math.max(...returnValues);
    const worstDay = Math.min(...returnValues);
    const positiveCount = returnValues.filter(r => r > 0).length;
    const positiveRatio = positiveCount / returnValues.length;

    return {
      maxDrawdown,
      annualizedVol,
      bestDay,
      worstDay,
      positiveRatio,
    };
  }, [returns, drawdowns]);

  // 绘制收益率分布直方图
  useEffect(() => {
    if (!returnsRef.current || !containerRef.current || returns.length === 0) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const width = Math.min(400, containerWidth - margins.left - margins.right);
    const height = 200 - margins.top - margins.bottom;

    d3.select(returnsRef.current).selectAll('*').remove();

    const svg = d3.select(returnsRef.current)
      .attr('width', width + margins.left + margins.right)
      .attr('height', 200);

    const g = svg.append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    // 创建直方图
    const returnValues = returns.map(r => r.value);
    const histogram = d3.bin()
      .domain([d3.min(returnValues) || 0, d3.max(returnValues) || 0])
      .thresholds(20);

    const bins = histogram(returnValues);

    const xScale = d3.scaleLinear()
      .domain([d3.min(returnValues) || 0, d3.max(returnValues) || 0])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 1])
      .range([height, 0]);

    // 绘制坐标轴
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d => formatPercent(d as number)));

    xAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    xAxis.selectAll('path, line')
      .style('stroke', '#334155');

    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale).ticks(5));

    yAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    yAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制柱状图
    g.selectAll('.bar')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.x0 || 0))
      .attr('y', d => yScale(d.length))
      .attr('width', d => Math.max(0, xScale(d.x1 || 0) - xScale(d.x0 || 0) - 1))
      .attr('height', d => height - yScale(d.length))
      .attr('fill', d => {
        const midPoint = ((d.x0 || 0) + (d.x1 || 0)) / 2;
        return midPoint >= 0 ? '#ef4444' : '#22c55e';
      })
      .attr('opacity', 0.7);

    // 标题
    g.append('text')
      .attr('x', width / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text('收益率分布');

  }, [returns, margins]);

  // 绘制回撤曲线
  useEffect(() => {
    if (!drawdownRef.current || !containerRef.current || drawdowns.length === 0) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const width = Math.min(400, containerWidth - margins.left - margins.right);
    const height = 200 - margins.top - margins.bottom;

    d3.select(drawdownRef.current).selectAll('*').remove();

    const svg = d3.select(drawdownRef.current)
      .attr('width', width + margins.left + margins.right)
      .attr('height', 200);

    const g = svg.append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    const xScale = d3.scaleLinear()
      .domain([0, drawdowns.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([Math.min(...drawdowns.map(d => d.value)), 0])
      .range([height, 0]);

    // 坐标轴
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(i => {
        const index = Number(i);
        if (index >= 0 && index < drawdowns.length) {
          return formatDateShort(drawdowns[index].date);
        }
        return '';
      }));

    xAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    xAxis.selectAll('path, line')
      .style('stroke', '#334155');

    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => formatPercent(d as number)));

    yAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    yAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制面积图
    const area = d3.area<DrawdownPoint>()
      .x((_, i) => xScale(i))
      .y0(height)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(drawdowns)
      .attr('fill', 'rgba(239, 68, 68, 0.2)')
      .attr('stroke', '#ef4444')
      .attr('stroke-width', 2)
      .attr('d', area);

    // 标题
    g.append('text')
      .attr('x', width / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text('回撤曲线');

  }, [drawdowns, margins]);

  // 绘制滚动波动率
  useEffect(() => {
    if (!volatilityRef.current || !containerRef.current || volatility.length === 0) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const width = Math.min(400, containerWidth - margins.left - margins.right);
    const height = 200 - margins.top - margins.bottom;

    d3.select(volatilityRef.current).selectAll('*').remove();

    const svg = d3.select(volatilityRef.current)
      .attr('width', width + margins.left + margins.right)
      .attr('height', 200);

    const g = svg.append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    const validData = volatility
      .map((d, i) => ({ ...d, index: i }))
      .filter(d => d.value !== null);

    if (validData.length === 0) return;

    const xScale = d3.scaleLinear()
      .domain([0, volatility.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(validData, d => d.value as number) || 0.1])
      .range([height, 0]);

    // 坐标轴
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(i => {
        const index = Number(i);
        if (index >= 0 && index < volatility.length) {
          return formatDateShort(volatility[index].date);
        }
        return '';
      }));

    xAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    xAxis.selectAll('path, line')
      .style('stroke', '#334155');

    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => formatPercent(d as number)));

    yAxis.selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-size', '10px');

    yAxis.selectAll('path, line')
      .style('stroke', '#334155');

    // 绘制线图
    const line = d3.line<typeof validData[0]>()
      .x(d => xScale(d.index))
      .y(d => yScale(d.value as number))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(validData)
      .attr('fill', 'none')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2)
      .attr('d', line);

    // 标题
    g.append('text')
      .attr('x', width / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text('滚动波动率 (20日)');

  }, [volatility, margins]);

  return (
    <div ref={containerRef} className="space-y-4 sm:space-y-6">
      {/* 统计指标 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-xs text-slate-400">最大回撤</div>
          <div className="mt-1 text-base font-bold text-red-400 sm:text-lg">{formatPercent(stats.maxDrawdown)}</div>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-xs text-slate-400">年化波动率</div>
          <div className="mt-1 text-base font-bold text-white sm:text-lg">{formatPercent(stats.annualizedVol)}</div>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-xs text-slate-400">最好单日</div>
          <div className="mt-1 text-base font-bold text-red-400 sm:text-lg">+{formatPercent(stats.bestDay)}</div>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-xs text-slate-400">最差单日</div>
          <div className="mt-1 text-base font-bold text-green-400 sm:text-lg">{formatPercent(stats.worstDay)}</div>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-xs text-slate-400">正收益占比</div>
          <div className="mt-1 text-base font-bold text-white sm:text-lg">{formatPercent(stats.positiveRatio)}</div>
        </div>
      </div>

      {/* 图表 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
          <svg ref={returnsRef} className="mx-auto" />
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
          <svg ref={drawdownRef} className="mx-auto" />
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
          <svg ref={volatilityRef} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
