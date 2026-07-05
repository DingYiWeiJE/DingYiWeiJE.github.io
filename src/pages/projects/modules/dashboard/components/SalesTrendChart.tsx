import ReactECharts from 'echarts-for-react';

interface SalesTrendChartProps {
  data: {
    categories: string[];
    data: number[];
  };
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: {
        color: '#e2e8f0'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.categories,
      axisLine: {
        lineStyle: {
          color: '#334155'
        }
      },
      axisLabel: {
        color: '#94a3b8'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#334155'
        }
      },
      axisLabel: {
        color: '#94a3b8',
        formatter: (value: number) => {
          return value >= 1000000 ? `${(value / 10000).toFixed(0)}万` : value;
        }
      },
      splitLine: {
        lineStyle: {
          color: '#1e293b'
        }
      }
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        smooth: true,
        data: data.data,
        lineStyle: {
          color: '#06b6d4',
          width: 3
        },
        itemStyle: {
          color: '#06b6d4'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(6, 182, 212, 0.3)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0.05)' }
            ]
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}
