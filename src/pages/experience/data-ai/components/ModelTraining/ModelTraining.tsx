import { ReactECharts } from '../../../../../components/charts/ReactECharts';
import type { TrainingTask } from '../../types';

interface ModelTrainingProps {
  task: TrainingTask;
}

export function ModelTraining({ task }: ModelTrainingProps) {
  // GPU仪表盘配置
  const gpuGaugeOption = {
    series: [
      {
        type: 'gauge',
        radius: '90%',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [0.6, '#22d3ee'],
              [0.8, '#facc15'],
              [1, '#ef4444'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: '#22d3ee',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 8,
          lineStyle: {
            width: 2,
            color: '#1e293b',
          },
        },
        axisLabel: {
          distance: 12,
          color: '#64748b',
          fontSize: 10,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: '#e2e8f0',
          fontSize: 20,
          fontWeight: 'bold',
          offsetCenter: [0, '70%'],
        },
        data: [
          {
            value: task.gpu.utilization,
            name: 'GPU',
          },
        ],
      },
    ],
  };

  // Loss曲线配置
  const lossChartOption = {
    grid: {
      left: 40,
      right: 20,
      top: 20,
      bottom: 30,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: task.metrics.loss.map((_, i) => i + 1),
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 10 },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    series: [
      {
        name: 'Loss',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'lttb',
        lineStyle: {
          color: '#ef4444',
          width: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0)' },
            ],
          },
        },
        data: task.metrics.loss,
      },
    ],
  };

  // Accuracy曲线配置
  const accChartOption = {
    ...lossChartOption,
    series: [
      {
        name: 'Accuracy',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'lttb',
        lineStyle: {
          color: '#22c55e',
          width: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
              { offset: 1, color: 'rgba(34, 197, 94, 0)' },
            ],
          },
        },
        data: task.metrics.accuracy,
      },
    ],
  };

  const progress = (task.epoch.current / task.epoch.total) * 100;

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-4 md:p-6">
      {/* 标题 */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white md:text-xl">Model Training</h2>
          <p className="mt-1 text-xs text-slate-400 md:text-sm">
            {task.modelName} · {task.modelType}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              task.status === 'training'
                ? 'bg-cyan-500/20 text-cyan-400'
                : task.status === 'completed'
                ? 'bg-green-500/20 text-green-400'
                : task.status === 'paused'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {task.status === 'training' && '训练中'}
            {task.status === 'completed' && '已完成'}
            {task.status === 'paused' && '已暂停'}
            {task.status === 'failed' && '失败'}
          </span>
        </div>
      </div>

      {/* Epoch进度 */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Epoch: {task.epoch.current}/{task.epoch.total}
          </span>
          <span className="font-medium text-white">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 指标网格 */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* GPU利用率 */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <h3 className="mb-2 text-sm font-medium text-slate-400">GPU Utilization</h3>
          <div className="h-40">
            <ReactECharts option={gpuGaugeOption} style={{ height: '100%' }} />
          </div>
          <div className="mt-2 text-center text-xs text-slate-500">
            Memory: {task.gpu.memory}% · Temp: {task.gpu.temperature}°C
          </div>
        </div>

        {/* Loss曲线 */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <h3 className="mb-2 text-sm font-medium text-slate-400">Loss</h3>
          <div className="h-40">
            <ReactECharts option={lossChartOption} style={{ height: '100%' }} />
          </div>
          <div className="mt-2 text-center text-xs">
            <span className="text-slate-400">当前: </span>
            <span className="font-medium text-red-400">
              {task.metrics.loss[task.metrics.loss.length - 1]?.toFixed(4) || 'N/A'}
            </span>
          </div>
        </div>

        {/* Accuracy曲线 */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <h3 className="mb-2 text-sm font-medium text-slate-400">Accuracy</h3>
          <div className="h-40">
            <ReactECharts option={accChartOption} style={{ height: '100%' }} />
          </div>
          <div className="mt-2 text-center text-xs">
            <span className="text-slate-400">当前: </span>
            <span className="font-medium text-green-400">
              {task.metrics.accuracy[task.metrics.accuracy.length - 1]?.toFixed(2) || 'N/A'}%
            </span>
          </div>
        </div>
      </div>

      {/* 训练日志 */}
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
        <h3 className="mb-2 text-sm font-medium text-slate-400">Training Log</h3>
        <div className="max-h-32 space-y-1 overflow-y-auto text-xs [scrollbar-width:thin]">
          {task.logs.map((log, index) => (
            <div key={index} className="flex gap-2 font-mono text-slate-400">
              <span className="text-slate-600">[{log.timestamp}]</span>
              <span
                className={
                  log.level === 'error'
                    ? 'text-red-400'
                    : log.level === 'warning'
                    ? 'text-yellow-400'
                    : 'text-slate-300'
                }
              >
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 训练配置 */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
        <div className="rounded-lg bg-slate-950/50 p-3">
          <div className="text-slate-400">Learning Rate</div>
          <div className="mt-1 font-medium text-white">{task.metrics.learningRate}</div>
        </div>
        <div className="rounded-lg bg-slate-950/50 p-3">
          <div className="text-slate-400">Batch Size</div>
          <div className="mt-1 font-medium text-white">{task.metrics.batchSize}</div>
        </div>
        <div className="rounded-lg bg-slate-950/50 p-3">
          <div className="text-slate-400">Start Time</div>
          <div className="mt-1 font-medium text-white">{task.startTime.split(' ')[1]}</div>
        </div>
        <div className="rounded-lg bg-slate-950/50 p-3">
          <div className="text-slate-400">ETA</div>
          <div className="mt-1 font-medium text-cyan-400">
            {task.estimatedEndTime?.split(' ')[1] || '--:--:--'}
          </div>
        </div>
      </div>
    </div>
  );
}
