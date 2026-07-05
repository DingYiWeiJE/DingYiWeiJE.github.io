export type TrainingStatus = 'training' | 'completed' | 'paused' | 'failed';

export interface TrainingMetrics {
  loss: number[];
  accuracy: number[];
  learningRate: number;
  batchSize: number;
}

export interface GPUStats {
  utilization: number;
  memory: number;
  temperature: number;
}

export interface TrainingLog {
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'error';
}

export interface TrainingTask {
  id: string;
  modelName: string;
  modelType: string;
  status: TrainingStatus;
  epoch: {
    current: number;
    total: number;
  };
  metrics: TrainingMetrics;
  gpu: GPUStats;
  logs: TrainingLog[];
  startTime: string;
  estimatedEndTime?: string;
  datasetId: string;
}
