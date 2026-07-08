// 格式化工具函数

/**
 * 格式化价格，保留两位小数
 */
export function formatPrice(price: number): string {
  return price.toFixed(2);
}

/**
 * 格式化百分比，保留两位小数
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

/**
 * 格式化成交量，使用万/亿简化显示
 */
export function formatVolume(volume: number): string {
  if (volume >= 100000000) {
    return `${(volume / 100000000).toFixed(2)}亿`;
  } else if (volume >= 10000) {
    return `${(volume / 10000).toFixed(2)}万`;
  }
  return volume.toFixed(0);
}

/**
 * 格式化日期
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 格式化日期（短格式）
 */
export function formatDateShort(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}
