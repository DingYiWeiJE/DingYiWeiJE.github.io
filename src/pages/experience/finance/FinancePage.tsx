import { useState, useEffect, useMemo, useCallback } from 'react';
import { CandlestickChart } from './components/CandlestickChart';
import { DepthChart } from './components/DepthChart';
import { OrderBookTable } from './components/OrderBookTable';
import { MetricCards } from './components/MetricCards';
import { RiskAnalyticsCharts } from './components/RiskAnalyticsCharts';
import { MarketReplayControls } from './components/MarketReplayControls';
import { generateMockOHLCV } from './utils/mockMarketData';
import { generateMockOrderBook, calculateOrderBookMetrics } from './utils/orderBook';
import {
  calculateMovingAverage,
  calculateVWAP,
  calculateAnnualizedVolatility,
  calculateMaxDrawdown,
} from './utils/indicators';
import type { OrderBookSnapshot, MarketMetrics } from './types';

export function FinancePage() {
  // 生成模拟数据
  const fullData = useMemo(() => generateMockOHLCV(300), []);

  // 回放状态
  const [currentIndex, setCurrentIndex] = useState(100); // 从第100条开始显示
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Brush 选中范围
  const [brushRange, setBrushRange] = useState<[Date, Date] | null>(null);

  // 当前可见数据
  const visibleData = useMemo(() => fullData.slice(0, currentIndex + 1), [fullData, currentIndex]);

  // 计算移动平均线
  const ma5 = useMemo(() => calculateMovingAverage(visibleData, 5), [visibleData]);
  const ma20 = useMemo(() => calculateMovingAverage(visibleData, 20), [visibleData]);
  const ma60 = useMemo(() => calculateMovingAverage(visibleData, 60), [visibleData]);

  // 当前价格和指标
  const currentPrice = visibleData[visibleData.length - 1]?.close || 0;
  const previousPrice = visibleData.length > 1 ? visibleData[visibleData.length - 2].close : currentPrice;
  const changePercent = previousPrice > 0 ? (currentPrice - previousPrice) / previousPrice : 0;

  // 生成订单簿
  const orderBook = useMemo<OrderBookSnapshot>(() => {
    if (currentPrice === 0) {
      return { bids: [], asks: [] };
    }
    return generateMockOrderBook(currentPrice);
  }, [currentPrice]);

  const orderBookMetrics = useMemo(() => {
    if (orderBook.bids.length === 0) {
      return {
        bestBid: 0,
        bestAsk: 0,
        spread: 0,
        midPrice: 0,
        bidVolume: 0,
        askVolume: 0,
        imbalance: 0,
      };
    }
    return calculateOrderBookMetrics(orderBook);
  }, [orderBook]);

  // 风险分析数据（基于 brush 选中区间或全部可见数据）
  const analysisData = useMemo(() => {
    if (!brushRange) return visibleData;

    const [start, end] = brushRange;
    return visibleData.filter(d => d.date >= start && d.date <= end);
  }, [visibleData, brushRange]);

  // 计算市场指标
  const metrics = useMemo<MarketMetrics>(() => {
    const volume = visibleData[visibleData.length - 1]?.volume || 0;
    const vwap = calculateVWAP(visibleData);
    const volatility = calculateAnnualizedVolatility(analysisData);
    const maxDrawdown = calculateMaxDrawdown(analysisData);

    return {
      currentPrice,
      changePercent,
      volume,
      vwap,
      volatility,
      maxDrawdown,
      spread: orderBookMetrics.spread,
      imbalance: orderBookMetrics.imbalance,
    };
  }, [currentPrice, changePercent, visibleData, analysisData, orderBookMetrics]);

  // 回放控制
  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(100);
    setBrushRange(null);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleBrushChange = useCallback((range: [Date, Date] | null) => {
    setBrushRange(range);
  }, []);

  // 回放循环
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= fullData.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, fullData.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl space-y-4 p-4 sm:space-y-6 sm:p-6 lg:p-8">

        {/* 指标卡片 */}
        <MetricCards metrics={metrics} />

        {/* 核心行情区 */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
                K 线图表 · 自定义 D3 渲染
              </h2>
              <div className="text-xs text-slate-400 sm:text-sm mb-4">
                交易日压缩坐标 · 十字光标 · Tooltip · Brush 选择 · MA5/MA20/MA60
              </div>
              <CandlestickChart
                data={visibleData}
                ma5={ma5}
                ma20={ma20}
                ma60={ma60}
                onBrushChange={handleBrushChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <MarketReplayControls
              isPlaying={isPlaying}
              speed={speed}
              currentIndex={currentIndex}
              totalBars={fullData.length}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
            />

            {/* 当前 K 线详情 */}
            {visibleData.length > 0 && (
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-white sm:text-base">当前 K 线</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">日期</span>
                    <span className="font-mono text-white">
                      {visibleData[visibleData.length - 1].date.toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">开盘</span>
                    <span className="font-mono text-white">
                      {visibleData[visibleData.length - 1].open.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">收盘</span>
                    <span className={`font-mono ${changePercent >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {visibleData[visibleData.length - 1].close.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">最高</span>
                    <span className="font-mono text-white">
                      {visibleData[visibleData.length - 1].high.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">最低</span>
                    <span className="font-mono text-white">
                      {visibleData[visibleData.length - 1].low.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 盘口深度区 */}
        <div className="grid gap-4 lg:grid-cols-2">
          <OrderBookTable
            orderBook={orderBook}
            midPrice={orderBookMetrics.midPrice}
            spread={orderBookMetrics.spread}
          />

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
              深度图 · Order Book Visualization
            </h2>
            <div className="text-xs text-slate-400 sm:text-sm mb-4">
              阶梯面积图 · 动态更新 · D3 Transition
            </div>
            <DepthChart orderBook={orderBook} midPrice={orderBookMetrics.midPrice} />
          </div>
        </div>

        {/* 风险分析区 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
            风险分析 · Risk Analytics
          </h2>
          <div className="text-xs text-slate-400 sm:text-sm mb-4">
            {brushRange
              ? `分析区间: ${brushRange[0].toLocaleDateString('zh-CN')} - ${brushRange[1].toLocaleDateString('zh-CN')}`
              : '分析全部数据（可在 K 线图上拖动选择时间范围）'}
          </div>
          <RiskAnalyticsCharts data={analysisData} />
        </div>

      </div>
    </div>
  );
}
