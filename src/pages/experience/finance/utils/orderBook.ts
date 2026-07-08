import type { OrderBookLevel, OrderBookSnapshot, OrderBookMetrics } from '../types';

/**
 * 生成模拟订单簿
 */
export function generateMockOrderBook(midPrice: number): OrderBookSnapshot {
  const tickSize = 0.01;
  const numLevels = 20;

  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];

  let cumulativeBidSize = 0;
  let cumulativeAskSize = 0;

  // 生成买盘
  for (let i = 0; i < numLevels; i++) {
    const price = parseFloat((midPrice - (i + 1) * tickSize).toFixed(2));

    // 靠近 midPrice 的档位挂单量更大
    const distanceFactor = 1 / (1 + i * 0.3);
    const baseSize = 5000 + Math.random() * 10000;

    // 偶尔出现大单
    const largOrderFactor = Math.random() < 0.1 ? 2 + Math.random() * 3 : 1;

    const size = Math.floor(baseSize * distanceFactor * largOrderFactor);
    cumulativeBidSize += size;

    bids.push({
      price,
      size,
      cumulativeSize: cumulativeBidSize,
    });
  }

  // 生成卖盘
  for (let i = 0; i < numLevels; i++) {
    const price = parseFloat((midPrice + (i + 1) * tickSize).toFixed(2));

    const distanceFactor = 1 / (1 + i * 0.3);
    const baseSize = 5000 + Math.random() * 10000;
    const largeOrderFactor = Math.random() < 0.1 ? 2 + Math.random() * 3 : 1;

    const size = Math.floor(baseSize * distanceFactor * largeOrderFactor);
    cumulativeAskSize += size;

    asks.push({
      price,
      size,
      cumulativeSize: cumulativeAskSize,
    });
  }

  return { bids, asks };
}

/**
 * 计算订单簿指标
 */
export function calculateOrderBookMetrics(orderBook: OrderBookSnapshot): OrderBookMetrics {
  const bestBid = orderBook.bids[0]?.price || 0;
  const bestAsk = orderBook.asks[0]?.price || 0;
  const spread = bestAsk - bestBid;
  const midPrice = (bestBid + bestAsk) / 2;

  const bidVolume = orderBook.bids.reduce((sum, level) => sum + level.size, 0);
  const askVolume = orderBook.asks.reduce((sum, level) => sum + level.size, 0);
  const totalVolume = bidVolume + askVolume;
  const imbalance = totalVolume > 0 ? (bidVolume - askVolume) / totalVolume : 0;

  return {
    bestBid,
    bestAsk,
    spread,
    midPrice,
    bidVolume,
    askVolume,
    imbalance,
  };
}
