import type { OrderBookSnapshot } from '../types';
import { formatPrice, formatVolume } from '../utils/formatters';

interface OrderBookTableProps {
  orderBook: OrderBookSnapshot;
  midPrice: number;
  spread: number;
}

export function OrderBookTable({ orderBook, midPrice, spread }: OrderBookTableProps) {
  // 取前10档
  const topAsks = [...orderBook.asks].slice(0, 10).reverse();
  const topBids = orderBook.bids.slice(0, 10);

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:p-4">
      <h3 className="mb-3 text-sm font-semibold text-white sm:text-base">盘口订单簿</h3>

      <div className="space-y-2">
        {/* 卖盘 */}
        <div className="overflow-hidden rounded-lg border border-slate-700/50">
          <div className="grid grid-cols-3 gap-2 bg-slate-900/50 px-2 py-1.5 text-xs text-slate-400 sm:px-3 sm:text-sm">
            <div>价格</div>
            <div className="text-right">数量</div>
            <div className="text-right">累计</div>
          </div>
          {topAsks.map((ask, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-2 border-t border-slate-700/30 px-2 py-1 text-xs sm:px-3 sm:text-sm"
            >
              <div className="font-mono text-green-400">{formatPrice(ask.price)}</div>
              <div className="text-right font-mono text-slate-300">{formatVolume(ask.size)}</div>
              <div className="text-right font-mono text-slate-400">{formatVolume(ask.cumulativeSize)}</div>
            </div>
          ))}
        </div>

        {/* 中间价和价差 */}
        <div className="flex items-center justify-between rounded-lg border border-blue-500/30 bg-blue-500/5 px-3 py-2">
          <div className="text-xs text-slate-400 sm:text-sm">
            Mid: <span className="font-mono text-blue-400">{formatPrice(midPrice)}</span>
          </div>
          <div className="text-xs text-slate-400 sm:text-sm">
            Spread: <span className="font-mono text-orange-400">{formatPrice(spread)}</span>
          </div>
        </div>

        {/* 买盘 */}
        <div className="overflow-hidden rounded-lg border border-slate-700/50">
          <div className="grid grid-cols-3 gap-2 bg-slate-900/50 px-2 py-1.5 text-xs text-slate-400 sm:px-3 sm:text-sm">
            <div>价格</div>
            <div className="text-right">数量</div>
            <div className="text-right">累计</div>
          </div>
          {topBids.map((bid, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-2 border-t border-slate-700/30 px-2 py-1 text-xs sm:px-3 sm:text-sm"
            >
              <div className="font-mono text-red-400">{formatPrice(bid.price)}</div>
              <div className="text-right font-mono text-slate-300">{formatVolume(bid.size)}</div>
              <div className="text-right font-mono text-slate-400">{formatVolume(bid.cumulativeSize)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
