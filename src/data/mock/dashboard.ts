import type { DashboardData } from '../types/dashboard';

// 生成随机订单数据
function generateOrders(count: number) {
  const statuses = ['completed', 'processing', 'cancelled'] as const;
  const customers = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];

  return Array.from({ length: count }, (_, i) => ({
    id: `ORD${String(10000 + i).padStart(6, '0')}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    amount: Math.floor(Math.random() * 10000) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    time: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
  }));
}

export const mockDashboardData: DashboardData = {
  stats: [
    {
      title: '总订单数',
      value: 12345,
      unit: '单',
      trend: 'up',
      trendValue: '+12.5%',
      color: 'blue'
    },
    {
      title: '总销售额',
      value: '¥8,456,789',
      trend: 'up',
      trendValue: '+8.2%',
      color: 'green'
    },
    {
      title: '活跃用户',
      value: 4567,
      unit: '人',
      trend: 'down',
      trendValue: '-2.1%',
      color: 'orange'
    },
    {
      title: '转化率',
      value: '3.24%',
      trend: 'up',
      trendValue: '+0.3%',
      color: 'blue'
    }
  ],

  salesChart: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [820000, 932000, 901000, 934000, 1290000, 1330000]
  },

  userDistribution: [
    { name: '华东', value: 3500 },
    { name: '华南', value: 2800 },
    { name: '华北', value: 2200 },
    { name: '西南', value: 1500 },
    { name: '其他', value: 1000 }
  ],

  recentOrders: generateOrders(20),

  categoryRank: [
    { name: '电子产品', value: 2850000 },
    { name: '服装鞋帽', value: 2340000 },
    { name: '食品饮料', value: 1890000 },
    { name: '家居用品', value: 1650000 },
    { name: '图书音像', value: 1420000 },
    { name: '美妆个护', value: 1280000 },
    { name: '运动户外', value: 980000 },
    { name: '母婴用品', value: 850000 },
    { name: '汽车配件', value: 720000 },
    { name: '办公用品', value: 560000 }
  ]
};
