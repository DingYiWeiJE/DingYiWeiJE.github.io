export * from './etl';
export * from './dataset';
export * from './training';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PlatformStats {
  datasetCount: number;
  modelCount: number;
  trainingTasks: number;
  gpuUtilization: number;
}
