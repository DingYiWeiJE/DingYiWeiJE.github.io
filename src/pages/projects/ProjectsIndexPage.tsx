import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface ProjectCard {
  slug: string;
  path: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

const PROJECTS: ProjectCard[] = [
  {
    slug: 'dashboard',
    path: '/projects/dashboard',
    category: 'BI 数据可视化',
    title: '数据驾驶舱',
    description:
      '面向业务经营场景的数据看板，集中展示销售趋势、订单转化、用户分布和关键指标，帮助管理者快速判断业务状态。',
    techStack: ['React', 'TypeScript', 'ECharts', 'Tailwind CSS'],
    highlights: [
      '支持核心 KPI、趋势图、排行图和地域分布等多种可视化模块',
      '围绕经营分析搭建完整的信息层级，适合大屏和后台首页展示',
      '组件化封装图表与指标卡片，便于后续扩展更多业务模块'
    ]
  },
  {
    slug: 'ai-platform',
    path: '/projects/ai-platform',
    category: 'AI 智能分析',
    title: 'AI 数据平台',
    description:
      '融合自然语言交互、数据洞察和智能问答能力的分析平台，降低数据查询门槛，让用户通过对话获取业务结论。',
    techStack: ['React', 'TypeScript', 'LLM', '数据分析'],
    highlights: [
      '提供自然语言提问入口，模拟从问题到图表和结论的分析流程',
      '包含智能摘要、异常提示、推荐问题等 AI 辅助分析体验',
      '适合展示 AI 产品界面、数据产品设计和复杂后台交互能力'
    ]
  },
  {
    slug: 'finance',
    path: '/projects/finance',
    category: '金融交易系统',
    title: '金融行情与交易看板',
    description:
      '围绕股票行情、盘口数据、交易明细和资产概览构建的金融可视化界面，突出实时性、信息密度和专业图表表达。',
    techStack: ['React', 'TypeScript', 'ECharts', 'WebSocket'],
    highlights: [
      '展示 K 线、分时走势、买卖盘、成交明细等金融高频信息',
      '通过深色界面和高密度布局模拟专业交易终端体验',
      '适合扩展实时推送、行情预警、组合收益分析等功能'
    ]
  },
  {
    slug: 'mes',
    path: '/projects/mes',
    category: '工业制造',
    title: '工业 MES 系统',
    description:
      '面向制造执行管理的工业后台系统，覆盖生产计划、设备状态、工序流转、质量追踪和异常告警等核心场景。',
    techStack: ['React', 'TypeScript', 'Ant Design', '工业数据'],
    highlights: [
      '围绕生产线、工单、设备、良率等关键对象组织页面结构',
      '支持设备监控、生产进度、异常告警和质量分析等业务模块展示',
      '适合体现复杂表格、状态流转、工业看板和后台系统设计能力'
    ]
  },
  {
    slug: 'hmi',
    path: '/projects/hmi',
    category: '工业控制界面',
    title: 'HMI 控制系统',
    description:
      '模拟工业现场的人机交互控制界面，用于展示设备运行状态、参数监控、流程控制和报警反馈。',
    techStack: ['React', 'TypeScript', 'SVG', 'Canvas'],
    highlights: [
      '使用图形化方式表达设备状态、管线流向、控制按钮和运行参数',
      '强调实时反馈、状态识别和操作路径，贴近工业控制台使用场景',
      '可扩展为产线监控、能源管理、设备联动和报警处理界面'
    ]
  },
  {
    slug: 'im',
    path: '/projects/im',
    category: '实时通信',
    title: '企业级 IM 系统',
    description:
      '面向企业协作场景的即时通信界面，包含会话列表、消息流、成员信息、文件消息和多人协作体验。',
    techStack: ['React', 'TypeScript', 'WebSocket', '状态管理'],
    highlights: [
      '覆盖单聊、群聊、消息状态、未读提醒和文件消息等常见 IM 场景',
      '通过清晰的信息分区提升会话切换、消息浏览和成员管理效率',
      '适合继续扩展音视频通话、消息搜索、表情回复和消息撤回功能'
    ]
  },
  {
    slug: '3d',
    path: '/projects/3d',
    category: '三维可视化',
    title: 'Web 3D 可视化平台',
    description:
      '基于浏览器端三维渲染能力构建的可视化展示项目，可用于园区、工厂、设备、机房等空间场景的交互式呈现。',
    techStack: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    highlights: [
      '支持三维场景浏览、对象选中、信息浮层和空间数据展示',
      '适合展示数字孪生、园区管理、设备监控和空间可视化能力',
      '可继续扩展模型加载、动画巡检、热点标注和实时数据联动'
    ]
  }
];

export function ProjectsIndexPage() {
  const navigate = useNavigate();

  const handleProjectOpen = (project: ProjectCard) => {
    navigate(project.path);
  };

  const handleProjectKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    project: ProjectCard
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProjectOpen(project);
    }
  };

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <p className="section-kicker">Project Gallery</p>
        <h1>项目展示</h1>
        <p>
          精选多个前端可视化与后台系统项目，覆盖数据分析、AI 平台、金融交易、工业制造、实时通信和三维可视化等方向。
        </p>
      </section>

      <section className="projects-grid" aria-label="项目列表">
        {PROJECTS.map((project) => (
          <Card
            key={project.slug}
            className="project-card"
            role="button"
            tabIndex={0}
            onClick={() => handleProjectOpen(project)}
            onKeyDown={(event) => handleProjectKeyDown(event, project)}
          >
            <p className="card-kicker">{project.category}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="card-badges">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
    </main>
  );
}
