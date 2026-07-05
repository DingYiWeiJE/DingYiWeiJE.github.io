import type { TrainingTask } from '../types';

// 生成Loss曲线数据（递减趋势）
const generateLossData = (epochs: number): number[] => {
  const data: number[] = [];
  let loss = 2.5;
  for (let i = 0; i < epochs; i++) {
    loss = loss * 0.95 + (Math.random() - 0.5) * 0.05;
    data.push(Number(loss.toFixed(4)));
  }
  return data;
};

// 生成Accuracy曲线数据（递增趋势）
const generateAccuracyData = (epochs: number): number[] => {
  const data: number[] = [];
  let acc = 0.65;
  for (let i = 0; i < epochs; i++) {
    acc = Math.min(0.98, acc + (1 - acc) * 0.08 + (Math.random() - 0.5) * 0.02);
    data.push(Number((acc * 100).toFixed(2)));
  }
  return data;
};

export const mockTrainingTasks: TrainingTask[] = [
  {
    id: 'task-001',
    modelName: 'ResNet-50',
    modelType: 'Image Classification',
    status: 'training',
    epoch: {
      current: 45,
      total: 100,
    },
    metrics: {
      loss: generateLossData(45),
      accuracy: generateAccuracyData(45),
      learningRate: 0.0001,
      batchSize: 32,
    },
    gpu: {
      utilization: 87,
      memory: 78,
      temperature: 72,
    },
    logs: [
      { timestamp: '2024-07-05 14:32:15', message: 'Epoch 45/100 started', level: 'info' },
      { timestamp: '2024-07-05 14:32:16', message: 'Batch 1/1563: Loss=0.0234, Acc=94.5%', level: 'info' },
      { timestamp: '2024-07-05 14:32:18', message: 'Batch 10/1563: Loss=0.0228, Acc=94.7%', level: 'info' },
      { timestamp: '2024-07-05 14:32:20', message: 'Batch 20/1563: Loss=0.0225, Acc=94.8%', level: 'info' },
      { timestamp: '2024-07-05 14:32:22', message: 'GPU Memory: 7.8GB/10GB', level: 'info' },
      { timestamp: '2024-07-05 14:32:25', message: 'Batch 30/1563: Loss=0.0221, Acc=95.0%', level: 'info' },
    ],
    startTime: '2024-07-05 10:00:00',
    estimatedEndTime: '2024-07-05 18:30:00',
    datasetId: 'ds-001',
  },
  {
    id: 'task-002',
    modelName: 'YOLOv8',
    modelType: 'Object Detection',
    status: 'completed',
    epoch: {
      current: 80,
      total: 80,
    },
    metrics: {
      loss: generateLossData(80),
      accuracy: generateAccuracyData(80),
      learningRate: 0.00005,
      batchSize: 16,
    },
    gpu: {
      utilization: 0,
      memory: 0,
      temperature: 45,
    },
    logs: [
      { timestamp: '2024-07-04 16:45:30', message: 'Training completed successfully', level: 'info' },
      { timestamp: '2024-07-04 16:45:31', message: 'Final Loss: 0.0156, Final Acc: 96.8%', level: 'info' },
      { timestamp: '2024-07-04 16:45:32', message: 'Model saved to: models/yolov8_final.pt', level: 'info' },
    ],
    startTime: '2024-07-04 08:00:00',
    datasetId: 'ds-003',
  },
  {
    id: 'task-003',
    modelName: 'BERT-Base',
    modelType: 'NLP',
    status: 'paused',
    epoch: {
      current: 12,
      total: 50,
    },
    metrics: {
      loss: generateLossData(12),
      accuracy: generateAccuracyData(12),
      learningRate: 0.00002,
      batchSize: 64,
    },
    gpu: {
      utilization: 0,
      memory: 0,
      temperature: 38,
    },
    logs: [
      { timestamp: '2024-07-05 11:20:00', message: 'Training paused by user', level: 'warning' },
      { timestamp: '2024-07-05 11:19:58', message: 'Epoch 12/50 completed', level: 'info' },
      { timestamp: '2024-07-05 11:19:55', message: 'Current Loss: 0.1234, Acc: 85.6%', level: 'info' },
    ],
    startTime: '2024-07-05 09:00:00',
    datasetId: 'ds-006',
  },
];
