import { NAVIGATION_MENU } from '../../../config/navigation';

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  highlights: string[];
  path: string;
  badge?: string | number;
};

// 项目详细信息映射
const projectDetailsMap: Record<string, Omit<Project, 'id' | 'title' | 'path' | 'badge'>> = {
  annotator: {
    description:
      '一个为视觉相关工作流和交互式编辑场景构建的复杂图像标记和标注界面，支持多种标注形状和智能编辑功能。',
    category: 'Canvas / AI 工具',
    techStack: ['React', 'TypeScript', 'Canvas', 'Konva', 'Fabric.js'],
    highlights: [
      '拖拽、调整大小和编辑标注形状',
      '基于 Canvas 的交互优化',
      '可重用的标注组件架构',
      '支持矩形、多边形、点标注',
    ],
  },
  dashboard: {
    description:
      '一个用于设备遥测、在线状态、警报和操作数据可视化的实时监控仪表板，提供全面的数据洞察和分析能力。',
    category: 'IoT / 仪表板',
    techStack: ['React', 'TypeScript', 'ECharts', 'WebSocket', 'Ant Design'],
    highlights: [
      '实时设备状态监控',
      '遥测数据可视化',
      '警报和日志流式传输界面',
      '自定义仪表盘组件',
    ],
  },
  'ai-platform': {
    description:
      '基于大语言模型的智能数据平台，集成AI助理能力，为用户提供智能化的数据处理和分析服务。',
    category: 'AI / 平台',
    techStack: ['React', 'TypeScript', 'OpenAI API', 'LangChain', 'Vector DB'],
    highlights: [
      '集成大语言模型对话能力',
      '智能数据查询和分析',
      'AI驱动的业务洞察',
      '自然语言交互界面',
    ],
  },
  '3d': {
    description:
      '基于 Three.js 的三维可视化平台，提供沉浸式的3D场景展示和交互体验，支持复杂的空间数据可视化。',
    category: '3D / 可视化',
    techStack: ['React', 'TypeScript', 'Three.js', 'WebGL', 'GLSL'],
    highlights: [
      '高性能 3D 渲染引擎',
      '交互式场景编辑器',
      '复杂几何体建模与展示',
      '物理引擎集成',
    ],
  },
  finance: {
    description:
      '实时金融数据交易平台，具有高频市场数据接口、实时更新、交互式图表和针对大数据流量的优化渲染功能。',
    category: '实时 / 金融',
    techStack: ['React', 'TypeScript', 'WebSocket', 'D3.js', 'ECharts'],
    highlights: [
      '实时市场数据渲染',
      '大数据集性能优化',
      '交互式金融图表组件',
      'K线图、深度图等专业图表',
    ],
  },
};

// 从 NAVIGATION_MENU 生成项目列表
export const projects: Project[] = NAVIGATION_MENU.filter(item => item.path).map((item) => ({
  id: item.id,
  title: item.label,
  path: item.path!,
  badge: item.badge,
  ...projectDetailsMap[item.id],
}));
