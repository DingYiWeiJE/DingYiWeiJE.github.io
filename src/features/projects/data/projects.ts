export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  highlights: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'realtime-financial-charting-platform',
    title: '实时金融图表平台',
    description:
      '一个高频市场数据接口，具有实时更新、交互式图表和针对大数据流量的优化渲染功能。',
    category: '实时 / 可视化',
    techStack: ['React', 'TypeScript', 'WebSocket', 'D3.js', 'ECharts'],
    highlights: [
      '实时市场数据渲染',
      '大数据集性能优化',
      '交互式金融图表组件',
    ],
    featured: true,
  },
  {
    slug: 'iot-device-monitoring-dashboard',
    title: 'IoT 设备监控仪表板',
    description:
      '一个用于设备遥测、在线状态、警报和操作数据可视化的实时监控仪表板。',
    category: 'IoT / 仪表板',
    techStack: ['Vue', 'TypeScript', 'MQTT', 'ECharts', 'WebSocket'],
    highlights: [
      '实时设备状态监控',
      '遥测数据可视化',
      '警报和日志流式传输界面',
    ],
    featured: true,
  },
  {
    slug: 'image-annotation-tool',
    title: '图像标注工具',
    description:
      '一个为视觉相关工作流和交互式编辑场景构建的复杂图像标记和标注界面。',
    category: 'Canvas / AI 工具',
    techStack: ['React', 'Canvas', 'Konva', 'TypeScript'],
    highlights: [
      '拖拽、调整大小和编辑标注形状',
      '基于 Canvas 的交互优化',
      '可重用的标注组件架构',
    ],
    featured: true,
  },
];