import { ReactECharts } from "../../../../components/charts/ReactECharts";

interface UserDistributionChartProps {
  data: { name: string; value: number }[];
}

export function UserDistributionChart({ data }: UserDistributionChartProps) {
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: {
        color: '#e2e8f0'
      },
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      textStyle: {
        color: '#94a3b8'
      }
    },
    series: [
      {
        name: '用户分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0f172a',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        labelLine: {
          show: false
        },
        data: data,
        color: ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}
