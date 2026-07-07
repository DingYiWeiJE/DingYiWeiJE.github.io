import { DemoCard } from './DemoCard';
import { UnityStylePreview } from './UnityStylePreview';
import { DataVisualizationPreview } from './DataVisualizationPreview';
import { SolarSystemPreview } from './SolarSystem/SolarSystemPreview';

const demos = [
  {
    demoNumber: 'Demo 1',
    title: 'Three.js 产品展示场景',
    description: '基于 Three.js 实现的实时 3D 产品展示页面，支持模型旋转、热点标注、材质切换与相机动画。',
    techStack: ['Three.js', 'GLTFLoader', 'OrbitControls', 'GSAP', 'WebGL'],
    responsibilities: [
      '3D 场景搭建与渲染管线配置',
      '模型加载与材质优化',
      '交互控制与热点标注系统',
      '性能优化与响应式适配',
    ],
    color: 'cyan' as const,
    imageOnLeft: false,
    preview: <SolarSystemPreview />,
  },
  {
    demoNumber: 'Demo 2',
    title: 'Unity 交互场景',
    description: '使用 Unity 构建的交互式 3D 场景，包含角色控制、物理碰撞、UI 面板与场景切换逻辑。',
    techStack: ['Unity', 'C#', 'Animator', 'Rigidbody', 'Canvas UI'],
    responsibilities: [
      'Unity 场景搭建与资源管理',
      'C# 交互脚本与逻辑开发',
      '动画状态机控制',
      'UI 系统与逻辑开发',
    ],
    color: 'purple' as const,
    imageOnLeft: true,
    preview: <UnityStylePreview />,
  },
  {
    demoNumber: 'Demo 3',
    title: 'Web 端 3D 可视化',
    description: '将 3D 模型与前端页面结合，实现数据标签、相机过渡、模型高亮和交互展示。',
    techStack: ['Three.js', 'TypeScript', 'React', 'Shader', 'Postprocessing'],
    responsibilities: [
      '前端架构设计与组件开发',
      '3D 渲染逻辑与 React 集成',
      '交互状态管理与事件系统',
      '动画过渡设计与性能优化',
    ],
    color: 'blue' as const,
    imageOnLeft: false,
    preview: <DataVisualizationPreview />,
  },
];

export function DemoSection() {
  return (
    <section className="py-24 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {demos.map((demo) => (
            <DemoCard key={demo.demoNumber} {...demo} />
          ))}
        </div>
      </div>
    </section>
  );
}
