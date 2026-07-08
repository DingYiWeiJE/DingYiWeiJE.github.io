import type { OHLCV } from '../types';

/**
 * 检查是否是工作日（跳过周六周日）
 */
function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

/**
 * 生成模拟的 A 股风格 OHLCV 数据
 * 包含趋势、震荡、跳空、放量和缩量等市场特征
 */
export function generateMockOHLCV(days: number = 300): OHLCV[] {
  const data: OHLCV[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days - 200); // 多留一些缓冲

  const currentDate = new Date(startDate);
  let currentPrice = 100;
  let trend = 0.001; // 初始趋势
  let volatility = 0.02; // 波动率
  let trendDays = 0; // 趋势持续天数
  let trendTarget = Math.floor(Math.random() * 20) + 10; // 趋势目标天数

  while (data.length < days) {
    // 跳过周末
    if (!isWeekday(currentDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
      continue;
    }

    // 趋势切换逻辑
    trendDays++;
    if (trendDays >= trendTarget) {
      // 切换趋势
      const rand = Math.random();
      if (rand < 0.35) {
        // 上涨趋势
        trend = 0.002 + Math.random() * 0.003;
        volatility = 0.015 + Math.random() * 0.01;
      } else if (rand < 0.70) {
        // 横盘震荡
        trend = -0.0005 + Math.random() * 0.001;
        volatility = 0.01 + Math.random() * 0.015;
      } else {
        // 下跌趋势
        trend = -0.004 - Math.random() * 0.002;
        volatility = 0.02 + Math.random() * 0.015;
      }
      trendDays = 0;
      trendTarget = Math.floor(Math.random() * 30) + 10;
    }

    // 偶发跳空（概率 3%）
    let gapFactor = 1;
    if (Math.random() < 0.03) {
      gapFactor = Math.random() < 0.5 ? 1.02 : 0.98; // 高开或低开
    }

    // 计算开盘价
    const open = currentPrice * gapFactor;

    // 日内波动
    const dailyChange = trend + (Math.random() - 0.5) * volatility;
    const close = open * (1 + dailyChange);

    // 计算最高价和最低价
    const highLowRange = volatility * (0.5 + Math.random() * 0.5);
    const high = Math.max(open, close) * (1 + highLowRange * Math.random());
    const low = Math.min(open, close) * (1 - highLowRange * Math.random());

    // 计算成交量（与价格波动相关）
    const baseVolume = 50000000 + Math.random() * 30000000;
    const volatilityFactor = 1 + Math.abs(dailyChange) * 10;

    // 偶发放量（概率 5%）
    let volumeFactor = 1;
    if (Math.random() < 0.05) {
      volumeFactor = 1.5 + Math.random() * 1.5;
    }

    const volume = Math.floor(baseVolume * volatilityFactor * volumeFactor);

    // 偶发大阳线或大阴线（概率 2%）
    let finalClose = close;
    if (Math.random() < 0.02) {
      finalClose = open * (1 + (Math.random() < 0.5 ? 0.05 : -0.05));
    }

    data.push({
      date: new Date(currentDate),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(finalClose.toFixed(2)),
      volume,
    });

    currentPrice = finalClose;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}
