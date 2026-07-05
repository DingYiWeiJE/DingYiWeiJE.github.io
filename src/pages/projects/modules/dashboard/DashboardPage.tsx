import { useState, useEffect } from 'react';
import { Grid } from '../../../../components/visualization/Grid';
import { Panel } from '../../../../components/visualization/Panel';
import { StatCard } from '../../../../components/visualization/StatCard';
import { SalesTrendChart } from './components/SalesTrendChart';
import { UserDistributionChart } from './components/UserDistributionChart';
import { CategoryRankChart } from './components/CategoryRankChart';
import { OrdersTable } from './components/OrdersTable';
import { mockDataService } from '../../../../services/mockDataService';
import type { DashboardData } from '../../../../data/types/dashboard';

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const dashboardData = await mockDataService.fetchData(
      mockDataService.getDashboardData(),
      20
    );
    setData(dashboardData);
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      const dashboardData = await mockDataService.fetchData(
        mockDataService.getDashboardData(),
        20
      );
      if (isMounted) {
        setData(dashboardData);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">数据驾驶舱</h1>
          <p className="mt-1 text-sm text-slate-400">企业关键指标实时监控</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <svg className="mr-2 inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            刷新
          </button>
          <button
            className="rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20"
          >
            <svg className="mr-2 inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            导出
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <Grid cols={4} gap="medium">
        {data.stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </Grid>

      {/* 图表区域 */}
      <Grid cols={2} gap="medium">
        <Panel title="销售趋势" subtitle="最近6个月">
          <SalesTrendChart data={data.salesChart} />
        </Panel>

        <Panel title="用户分布" subtitle="按地域统计">
          <UserDistributionChart data={data.userDistribution} />
        </Panel>
      </Grid>

      {/* 订单列表 */}
      <Panel title="实时订单" subtitle={`最近${data.recentOrders.length}条订单`}>
        <OrdersTable orders={data.recentOrders} />
      </Panel>

      {/* 产品类目排行 */}
      <Panel title="产品类目排行" subtitle="Top 10 销售额">
        <CategoryRankChart data={data.categoryRank} />
      </Panel>
    </div>
  );
}
