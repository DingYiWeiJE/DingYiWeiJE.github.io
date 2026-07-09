import { useState, useEffect, useRef } from 'react';
import type { TrainingTask } from '../types';

/**
 * 训练模拟Hook - 模拟实时训练过程
 */
export function useTrainingSimulation(initialTask: TrainingTask | null) {
  const [simulatedTask, setSimulatedTask] = useState<TrainingTask | null>(initialTask);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const taskIdRef = useRef<string | null>(initialTask?.id || null);

  // 当传入的task的id改变时，重置状态
  if (initialTask?.id !== taskIdRef.current) {
    taskIdRef.current = initialTask?.id || null;
    if (simulatedTask?.id !== initialTask?.id) {
      setSimulatedTask(initialTask);
    }
  }

  useEffect(() => {
    if (!simulatedTask || simulatedTask.status !== 'training') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // 每2秒更新一次训练指标
    intervalRef.current = setInterval(() => {
      setSimulatedTask((prev) => {
        if (!prev || prev.status !== 'training') return prev;

        const { epoch, metrics } = prev;

        // 如果已经完成所有epoch
        if (epoch.current >= epoch.total) {
          return { ...prev, status: 'completed' };
        }

        // 计算新的Loss和Accuracy
        const lastLoss = metrics.loss[metrics.loss.length - 1];
        const lastAcc = metrics.accuracy[metrics.accuracy.length - 1];

        const newLoss = Math.max(0.01, lastLoss * 0.98 + (Math.random() - 0.5) * 0.002);
        const newAcc = Math.min(99.9, lastAcc + (100 - lastAcc) * 0.02 + (Math.random() - 0.5) * 0.1);

        // 更新GPU利用率（80-95%波动）
        const newGpuUtil = 80 + Math.random() * 15;

        // 生成新日志
        const timestamp = new Date().toLocaleTimeString('zh-CN', { hour12: false });
        const newLog = {
          timestamp,
          message: `Batch ${Math.floor(Math.random() * 100)}/1563: Loss=${newLoss.toFixed(4)}, Acc=${newAcc.toFixed(1)}%`,
          level: 'info' as const,
        };

        return {
          ...prev,
          metrics: {
            ...metrics,
            loss: [...metrics.loss, Number(newLoss.toFixed(4))],
            accuracy: [...metrics.accuracy, Number(newAcc.toFixed(2))],
          },
          gpu: {
            ...prev.gpu,
            utilization: Number(newGpuUtil.toFixed(1)),
          },
          logs: [newLog, ...prev.logs].slice(0, 10), // 保留最新10条
        };
      });
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [simulatedTask]);

  return simulatedTask;
}
