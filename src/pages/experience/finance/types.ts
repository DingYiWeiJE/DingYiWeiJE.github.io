// 金融数据可视化类型定义

export type OHLCV = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type MovingAveragePoint = {
  date: Date;
  value: number | null;
};

export type ReturnPoint = {
  date: Date;
  value: number;
};

export type DrawdownPoint = {
  date: Date;
  value: number;
};

export type VolatilityPoint = {
  date: Date;
  value: number | null;
};

export type OrderBookLevel = {
  price: number;
  size: number;
  cumulativeSize: number;
};

export type OrderBookSnapshot = {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
};

export type OrderBookMetrics = {
  bestBid: number;
  bestAsk: number;
  spread: number;
  midPrice: number;
  bidVolume: number;
  askVolume: number;
  imbalance: number;
};

export type MarketMetrics = {
  currentPrice: number;
  changePercent: number;
  volume: number;
  vwap: number;
  volatility: number;
  maxDrawdown: number;
  spread: number;
  imbalance: number;
};
