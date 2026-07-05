export interface ModuleConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;
  priority: 'high' | 'medium' | 'low';
}

export type ModuleType =
  | 'dashboard'
  | 'ai-platform'
  | 'finance'
  | 'mes'
  | 'hmi'
  | 'im'
  | '3d';

export const MODULES: ModuleConfig[] = [
  {
    id: 'dashboard',
    name: '数据驾驶舱',
    icon: 'dashboard',
    description: '企业数据综合展示',
    path: '/projects/dashboard',
    priority: 'high'
  },
  {
    id: 'ai-platform',
    name: 'AI数据平台',
    icon: 'ai',
    description: 'ETL与模型训练',
    path: '/projects/ai-platform',
    priority: 'high'
  },
  {
    id: 'finance',
    name: '金融交易',
    icon: 'finance',
    description: '实时行情与K线',
    path: '/projects/finance',
    priority: 'medium'
  },
  {
    id: 'mes',
    name: '工业MES',
    icon: 'mes',
    description: '设备监控与工艺',
    path: '/projects/mes',
    priority: 'medium'
  },
  {
    id: 'hmi',
    name: 'HMI控制',
    icon: 'hmi',
    description: '人机交互界面',
    path: '/projects/hmi',
    priority: 'low'
  },
  {
    id: 'im',
    name: '实时通信',
    icon: 'im',
    description: '即时消息系统',
    path: '/projects/im',
    priority: 'low'
  },
  {
    id: '3d',
    name: '三维可视化',
    icon: '3d',
    description: 'Three.js与点云',
    path: '/projects/3d',
    priority: 'low'
  }
];
