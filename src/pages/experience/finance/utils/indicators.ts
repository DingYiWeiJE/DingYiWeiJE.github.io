import type { OHLCV, MovingAveragePoint, ReturnPoint, DrawdownPoint, VolatilityPoint } from '../types';

/**
 * 计算移动平均线
 */
export function calculateMovingAverage(data: OHLCV[], window: number): MovingAveragePoint[] {
  const result: MovingAveragePoint[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) {
      result.push({ date: data[i].date, value: null });
      continue;
    }

    let sum = 0;
    for (let j = 0; j < window; j++) {
      sum += data[i - j].close;
    }
    result.push({
      date: data[i].date,
      value: sum / window,
    });
  }

  return result;
}

/**
 * 计算日收益率
 */
export function calculateReturns(data: OHLCV[]): ReturnPoint[] {
  const result: ReturnPoint[] = [];

  for (let i = 1; i < data.length; i++) {
    const ret = (data[i].close - data[i - 1].close) / data[i - 1].close;
    result.push({
      date: data[i].date,
      value: ret,
    });
  }

  return result;
}

/**
 * 计算回撤
 */
export function calculateDrawdown(data: OHLCV[]): DrawdownPoint[] {
  const result: DrawdownPoint[] = [];
  let peak = data[0].close;

  for (const item of data) {
    if (item.close > peak) {
      peak = item.close;
    }
    const drawdown = (item.close - peak) / peak;
    result.push({
      date: item.date,
      value: drawdown,
    });
  }

  return result;
}

/**
 * 计算滚动波动率（基于收益率标准差）
 */
export function calculateRollingVolatility(data: OHLCV[], window: number): VolatilityPoint[] {
  const returns = calculateReturns(data);
  const result: VolatilityPoint[] = [];

  for (let i = 0; i < returns.length; i++) {
    if (i < window - 1) {
      result.push({ date: data[i + 1].date, value: null });
      continue;
    }

    const windowReturns = returns.slice(i - window + 1, i + 1);
    const mean = windowReturns.reduce((sum, r) => sum + r.value, 0) / window;
    const variance = windowReturns.reduce((sum, r) => sum + Math.pow(r.value - mean, 2), 0) / window;
    const volatility = Math.sqrt(variance);

    result.push({
      date: data[i + 1].date,
      value: volatility,
    });
  }

  return result;
}

/**
 * 计算 VWAP (Volume Weighted Average Price)
 */
export function calculateVWAP(data: OHLCV[]): number {
  if (data.length === 0) return 0;

  let sumPriceVolume = 0;
  let sumVolume = 0;

  for (const item of data) {
    const avgPrice = (item.high + item.low + item.close) / 3;
    sumPriceVolume += avgPrice * item.volume;
    sumVolume += item.volume;
  }

  return sumVolume > 0 ? sumPriceVolume / sumVolume : 0;
}

/**
 * 计算最大回撤
 */
export function calculateMaxDrawdown(data: OHLCV[]): number {
  const drawdowns = calculateDrawdown(data);
  return Math.min(...drawdowns.map(d => d.value));
}

/**
 * 计算年化波动率
 */
export function calculateAnnualizedVolatility(data: OHLCV[]): number {
  const returns = calculateReturns(data);
  if (returns.length === 0) return 0;

  const mean = returns.reduce((sum, r) => sum + r.value, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r.value - mean, 2), 0) / returns.length;
  const dailyVol = Math.sqrt(variance);

  // 年化：假设 252 个交易日
  return dailyVol * Math.sqrt(252);
}
