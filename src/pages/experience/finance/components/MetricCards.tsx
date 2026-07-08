import type { MarketMetrics } from '../types';
import { formatPrice, formatPercent, formatVolume } from '../utils/formatters';

interface MetricCardsProps {
  metrics: MarketMetrics;
}

export function MetricCards({ metrics }: MetricCardsProps) {
  const changeColor = metrics.changePercent >= 0 ? 'text-red-500' : 'text-green-500';
  const changeBg = metrics.changePercent >= 0 ? 'bg-red-500/10' : 'bg-green-500/10';

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {/* 当前价格 */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">当前价格</div>
        <div className="mt-1 text-lg font-bold text-white sm:text-xl">{formatPrice(metrics.currentPrice)}</div>
      </div>

      {/* 涨跌幅 */}
      <div className={`rounded-lg border border-slate-700/50 p-3 sm:p-4 ${changeBg}`}>
        <div className="text-xs text-slate-400 sm:text-sm">涨跌幅</div>
        <div className={`mt-1 text-lg font-bold sm:text-xl ${changeColor}`}>
          {metrics.changePercent >= 0 ? '+' : ''}
          {formatPercent(metrics.changePercent)}
        </div>
      </div>

      {/* 成交量 */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">成交量</div>
        <div className="mt-1 text-lg font-bold text-white sm:text-xl">{formatVolume(metrics.volume)}</div>
      </div>

      {/* VWAP */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">VWAP</div>
        <div className="mt-1 text-lg font-bold text-white sm:text-xl">{formatPrice(metrics.vwap)}</div>
      </div>

      {/* 波动率 */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">年化波动率</div>
        <div className="mt-1 text-lg font-bold text-white sm:text-xl">{formatPercent(metrics.volatility)}</div>
      </div>

      {/* 最大回撤 */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">最大回撤</div>
        <div className="mt-1 text-lg font-bold text-red-400 sm:text-xl">{formatPercent(metrics.maxDrawdown)}</div>
      </div>

      {/* Spread */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">买卖价差</div>
        <div className="mt-1 text-lg font-bold text-white sm:text-xl">{formatPrice(metrics.spread)}</div>
      </div>

      {/* Order Imbalance */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
        <div className="text-xs text-slate-400 sm:text-sm">盘口失衡</div>
        <div className={`mt-1 text-lg font-bold sm:text-xl ${metrics.imbalance >= 0 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.imbalance >= 0 ? '+' : ''}
          {formatPercent(metrics.imbalance)}
        </div>
      </div>
    </div>
  );
}
