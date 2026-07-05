export interface StatCardData {
  title: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

export interface ChartData {
  categories: string[];
  data: number[];
}

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'processing' | 'cancelled';
  time: string;
  [key: string]: string | number;
}

export interface DashboardData {
  stats: StatCardData[];
  salesChart: ChartData;
  userDistribution: { name: string; value: number }[];
  recentOrders: Order[];
  categoryRank: { name: string; value: number }[];
}
