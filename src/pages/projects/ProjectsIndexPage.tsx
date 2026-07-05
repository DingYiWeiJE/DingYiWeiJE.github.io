import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { NAVIGATION_MENU } from '../../config/navigation';

interface ModuleCard {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  description: string;
  status: 'ready' | 'developing' | 'planning';
  tags: string[];
  badge?: string | number;
}

const MODULE_CARDS: ModuleCard[] = [
  {
    id: 'dashboard',
    label: '数据驾驶舱',
    icon: NAVIGATION_MENU[0].icon,
    path: '/projects/dashboard',
    description: '实时业务数据监控，包含销售趋势、用户分布、订单管理等核心指标可视化',
    status: 'ready',
    tags: ['数据分析', '可视化', '实时监控']
  },
  {
    id: 'ai-platform',
    label: 'AI数据平台',
    icon: NAVIGATION_MENU[1].icon,
    path: '/projects/ai-platform',
    description: 'AI驱动的智能数据分析平台，提供自然语言查询和智能数据洞察',
    status: 'ready',
    tags: ['AI', '智能分析', '自然语言'],
    badge: 'AI助理'
  },
  {
    id: 'finance',
    label: '金融交易系统',
    icon: NAVIGATION_MENU[2].icon,
    path: '/projects/finance',
    description: '实时股票行情、K线图表、深度图、交易监控等金融数据可视化',
    status: 'planning',
    tags: ['金融', '交易', 'K线']
  },
  {
    id: 'mes',
    label: '工业MES系统',
    icon: NAVIGATION_MENU[3].icon,
    path: '/projects/mes',
    description: '制造执行系统，包含设备监控、工艺流程管理、生产告警等功能',
    status: 'planning',
    tags: ['工业', '制造', '设备监控']
  },
  {
    id: 'hmi',
    label: 'HMI控制系统',
    icon: NAVIGATION_MENU[4].icon,
    path: '/projects/hmi',
    description: '人机交互界面，用于工业设备的实时控制和状态监控',
    status: 'planning',
    tags: ['控制', 'HMI', '工业']
  },
  {
    id: 'im',
    label: '实时通信IM',
    icon: NAVIGATION_MENU[5].icon,
    path: '/projects/im',
    description: '企业级即时通讯系统，支持多人会话、文件传输、音视频通话',
    status: 'planning',
    tags: ['通信', 'IM', '实时']
  },
  {
    id: '3d',
    label: '三维可视化',
    icon: NAVIGATION_MENU[6].icon,
    path: '/projects/3d',
    description: '基于 WebGL 的三维数据可视化平台，支持场景漫游和交互',
    status: 'planning',
    tags: ['3D', 'WebGL', '可视化']
  }
];

const STATUS_CONFIG = {
  ready: { label: '已完成', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  developing: { label: '开发中', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  planning: { label: '规划中', color: 'text-slate-400 bg-slate-400/10 border-slate-400/20' }
};

export function ProjectsIndexPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // 加载最近访问记录（初始化）
  const [recentVisits, setRecentVisits] = useState<string[]>(() => {
    const stored = localStorage.getItem('projects_recent_visits');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load recent visits:', e);
        return [];
      }
    }
    return [];
  });

  // 筛选模块
  const filteredModules = useMemo(() => {
    return MODULE_CARDS.filter(module => {
      const matchesSearch =
        module.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = selectedStatus === 'all' || module.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  // 处理卡片点击
  const handleCardClick = (module: ModuleCard) => {
    // 更新最近访问
    const newRecentVisits = [module.id, ...recentVisits.filter(id => id !== module.id)].slice(0, 5);
    setRecentVisits(newRecentVisits);
    localStorage.setItem('projects_recent_visits', JSON.stringify(newRecentVisits));

    navigate(module.path);
  };

  // 获取最近访问的模块
  const recentModules = useMemo(() => {
    return recentVisits
      .map(id => MODULE_CARDS.find(m => m.id === id))
      .filter(Boolean) as ModuleCard[];
  }, [recentVisits]);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            项目展示
          </h1>
          <p className="mt-2 text-slate-400">
            浏览我的可视化项目集合，涵盖数据分析、AI平台、工业系统等多个领域
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* 搜索框 */}
          <div className="relative flex-1 md:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索项目、标签..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* 状态筛选 */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setSelectedStatus('ready')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedStatus === 'ready'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              已完成
            </button>
            <button
              onClick={() => setSelectedStatus('planning')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedStatus === 'planning'
                  ? 'bg-slate-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              规划中
            </button>
          </div>
        </div>

        {/* 最近访问 */}
        {recentModules.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-white">最近访问</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentModules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleCardClick(module)}
                  className="group flex min-w-[200px] items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 transition-all hover:border-blue-500 hover:bg-slate-800"
                >
                  <div className="flex-shrink-0 text-slate-400 transition-colors group-hover:text-blue-400">
                    {module.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{module.label}</div>
                    <div className={`text-xs ${STATUS_CONFIG[module.status].color.split(' ')[0]}`}>
                      {STATUS_CONFIG[module.status].label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 项目卡片网格 */}
        {filteredModules.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleCardClick(module)}
                className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-6 text-left transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* 状态标签 */}
                <div className="absolute right-4 top-4">
                  <span className={`rounded-full border px-2 py-1 text-xs font-medium ${STATUS_CONFIG[module.status].color}`}>
                    {STATUS_CONFIG[module.status].label}
                  </span>
                </div>

                {/* Badge（如果有） */}
                {module.badge && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-medium text-white">
                      {module.badge}
                    </span>
                  </div>
                )}

                {/* 图标 */}
                <div className="mb-4 mt-8 inline-flex rounded-lg bg-slate-800 p-3 text-slate-400 transition-all group-hover:bg-blue-500 group-hover:text-white">
                  {module.icon}
                </div>

                {/* 标题 */}
                <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                  {module.label}
                </h3>

                {/* 描述 */}
                <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                  {module.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 箭头图标 */}
                <div className="absolute bottom-4 right-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-blue-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="mb-4 h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-slate-400">未找到匹配的项目</p>
            <p className="mt-1 text-sm text-slate-500">请尝试其他搜索关键词或筛选条件</p>
          </div>
        )}

        {/* 统计信息 */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <div className="text-2xl font-bold text-white">{MODULE_CARDS.length}</div>
            <div className="text-sm text-slate-400">总项目数</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <div className="text-2xl font-bold text-green-400">
              {MODULE_CARDS.filter(m => m.status === 'ready').length}
            </div>
            <div className="text-sm text-slate-400">已完成</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <div className="text-2xl font-bold text-blue-400">
              {MODULE_CARDS.filter(m => m.status === 'planning').length}
            </div>
            <div className="text-sm text-slate-400">规划中</div>
          </div>
        </div>
      </div>
    </div>
  );
}
