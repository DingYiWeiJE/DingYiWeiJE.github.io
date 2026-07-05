export type Lab = {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  status: '计划中' | '进行中' | '已上线';
};

export const labs: Lab[] = [
  {
    title: 'Three.js 粒子场',
    category: 'Three.js',
    description: '用于作品集主页部分的交互式 WebGL 粒子背景实验。',
    techStack: ['Three.js', 'React Three Fiber', 'GLSL'],
    status: '计划中',
  },
  {
    title: 'D3 力导向图',
    category: 'D3.js',
    description: '用于关系网络、拓扑学和图形探索的力导向图演示。',
    techStack: ['D3.js', 'SVG', 'React'],
    status: '计划中',
  },
  {
    title: 'Canvas 绘图画板',
    category: 'Canvas',
    description: '一个高性能的绘图画板，支持画笔、橡皮擦、图层和导出功能。',
    techStack: ['Canvas', 'TypeScript'],
    status: '计划中',
  },
  {
    title: '实时 WebSocket 控制台',
    category: 'WebSocket',
    description: '一个实时日志流式传输界面，支持虚拟化渲染和连接状态处理。',
    techStack: ['React', 'WebSocket', '虚拟列表'],
    status: '计划中',
  },
];