import { ReactECharts } from "../../../../components/charts/ReactECharts";

interface CategoryRankChartProps {
  data: { name: string; value: number }[];
}

export function CategoryRankChart({ data }: CategoryRankChartProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: {
        color: '#e2e8f0'
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const item = params[0];
        return `${item.name}<br/>销售额: ¥${(item.value / 10000).toFixed(1)}万`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#94a3b8',
        formatter: (value: number) => `${(value / 10000).toFixed(0)}万`
      },
      splitLine: {
        lineStyle: {
          color: '#1e293b'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        color: '#94a3b8'
      },
      axisLine: {
        lineStyle: {
          color: '#334155'
        }
      }
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: data.map(item => item.value),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#06b6d4' },
              { offset: 1, color: '#3b82f6' }
            ]
          },
          borderRadius: [0, 4, 4, 0]
        },
        barMaxWidth: 30
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
}
