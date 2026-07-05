import type { ETLNode, ETLConnection } from '../types';

export const mockETLNodes: ETLNode[] = [
  {
    id: 'raw-data',
    name: '原始数据',
    description: '从多源采集的原始数据',
    status: 'completed',
    progress: 100,
    stats: {
      processed: 150000,
      total: 150000,
      throughput: '2.5K/s',
      duration: '60s',
    },
    icon: '📦',
    details: {
      input: 'Multiple Sources',
      output: 'Raw Data Lake',
      config: {
        sources: ['S3', 'Database', 'API'],
        format: 'Mixed',
      },
    },
  },
  {
    id: 'cleaning',
    name: '数据清洗',
    description: '去除噪声和异常数据',
    status: 'completed',
    progress: 100,
    stats: {
      processed: 150000,
      total: 150000,
      throughput: '3.2K/s',
      duration: '47s',
    },
    icon: '🧹',
    details: {
      input: 'Raw Data Lake',
      output: 'Cleaned Dataset',
      config: {
        methods: ['Deduplication', 'Outlier Removal', 'Missing Value Handling'],
        quality: '98.5%',
      },
    },
  },
  {
    id: 'transform',
    name: '数据转换',
    description: '标准化和格式转换',
    status: 'running',
    progress: 68,
    stats: {
      processed: 102000,
      total: 150000,
      throughput: '2.8K/s',
      duration: '36s',
    },
    icon: '🔄',
    details: {
      input: 'Cleaned Dataset',
      output: 'Transformed Data',
      config: {
        operations: ['Normalization', 'Encoding', 'Scaling'],
        format: 'Parquet',
      },
    },
  },
  {
    id: 'feature',
    name: '特征工程',
    description: '特征提取和选择',
    status: 'pending',
    progress: 0,
    stats: {
      processed: 0,
      total: 150000,
      throughput: '0/s',
    },
    icon: '⚙️',
    details: {
      input: 'Transformed Data',
      output: 'Feature Set',
      config: {
        methods: ['PCA', 'Feature Selection', 'Embedding'],
        dimensions: 512,
      },
    },
  },
  {
    id: 'dataset',
    name: '训练数据集',
    description: '构建训练和验证集',
    status: 'pending',
    progress: 0,
    stats: {
      processed: 0,
      total: 150000,
      throughput: '0/s',
    },
    icon: '📊',
    details: {
      input: 'Feature Set',
      output: 'Train/Val/Test Split',
      config: {
        split: 'Train 70% / Val 15% / Test 15%',
        shuffle: true,
      },
    },
  },
  {
    id: 'training',
    name: '模型训练',
    description: 'AI模型训练',
    status: 'pending',
    progress: 0,
    stats: {
      processed: 0,
      total: 100,
      throughput: '0 epochs/h',
    },
    icon: '🤖',
    details: {
      input: 'Training Dataset',
      output: 'Trained Model',
      config: {
        model: 'ResNet-50',
        epochs: 100,
        batchSize: 32,
      },
    },
  },
  {
    id: 'deploy',
    name: '模型部署',
    description: '部署到生产环境',
    status: 'pending',
    progress: 0,
    stats: {
      processed: 0,
      total: 1,
      throughput: '0/s',
    },
    icon: '🚀',
    details: {
      output: 'Production API',
      config: {
        platform: 'Kubernetes',
        replicas: 3,
        endpoint: '/api/v1/predict',
      },
    },
  },
];

export const mockETLConnections: ETLConnection[] = [
  { source: 'raw-data', target: 'cleaning', active: true },
  { source: 'cleaning', target: 'transform', active: true },
  { source: 'transform', target: 'feature', active: false },
  { source: 'feature', target: 'dataset', active: false },
  { source: 'dataset', target: 'training', active: false },
  { source: 'training', target: 'deploy', active: false },
];
