import { useState } from 'react';
import { EnterpriseLayout } from '../../components/visualization/EnterpriseLayout';
import type { ModuleType } from '../../types/visualization';

export function ProjectsPage() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('dashboard');

  return (
    <EnterpriseLayout>
      <div className="space-y-6">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-white">
            {currentModule === 'dashboard' && '数据驾驶舱'}
            {currentModule === 'ai-platform' && 'AI数据平台'}
            {currentModule === 'finance' && '金融交易系统'}
            {currentModule === 'mes' && '工业MES系统'}
            {currentModule === 'hmi' && 'HMI控制系统'}
            {currentModule === 'im' && '实时通信IM'}
            {currentModule === '3d' && '三维可视化'}
          </h2>
          <p className="mt-2 text-slate-400">
            当前模块: {currentModule}（待实现具体功能）
          </p>
        </div>

        {/* 模块切换测试（临时） */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">模块切换</h3>
          <div className="flex flex-wrap gap-2">
            {(['dashboard', 'ai-platform', 'finance', 'mes', 'hmi', 'im', '3d'] as ModuleType[]).map((module) => (
              <button
                key={module}
                onClick={() => setCurrentModule(module)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentModule === module
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {module}
              </button>
            ))}
          </div>
        </div>

        {/* 模块内容区域 */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          {currentModule === 'dashboard' && (
            <div className="text-slate-300">
              <h3 className="mb-2 text-lg font-semibold text-white">数据驾驶舱</h3>
              <p>将展示企业关键指标、图表和实时数据。</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm">
                <li>统计卡片：订单数、销售额、用户数等</li>
                <li>销售趋势折线图</li>
                <li>用户分布饼图</li>
                <li>实时订单列表</li>
              </ul>
            </div>
          )}

          {currentModule === 'ai-platform' && (
            <div className="text-slate-300">
              <h3 className="mb-2 text-lg font-semibold text-white">AI数据平台</h3>
              <p>展示AI模型训练、ETL工作流、数据集管理等功能。</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm">
                <li>数据集管理</li>
                <li>ETL工作流配置</li>
                <li>模型训练任务</li>
                <li>训练日志与AI总结</li>
              </ul>
            </div>
          )}

          {currentModule === 'finance' && (
            <div className="text-slate-300">
              <h3 className="mb-2 text-lg font-semibold text-white">金融交易系统</h3>
              <p>实时股票行情、K线图表、深度图等。</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm">
                <li>自选股列表</li>
                <li>实时K线图</li>
                <li>买卖深度图</li>
                <li>AI行情解释</li>
              </ul>
            </div>
          )}

          {currentModule === 'mes' && (
            <div className="text-slate-300">
              <h3 className="mb-2 text-lg font-semibold text-white">工业MES系统</h3>
              <p>设备监控、工艺流程、告警管理等。</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm">
                <li>设备实时状态监控</li>
                <li>生产工艺流程图</li>
                <li>告警中心</li>
                <li>设备效率分析</li>
              </ul>
            </div>
          )}

          {['hmi', 'im', '3d'].includes(currentModule) && (
            <div className="text-slate-300">
              <p>该模块功能正在规划中...</p>
            </div>
          )}
        </div>
      </div>
    </EnterpriseLayout>
  );
}
