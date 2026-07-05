import { useState } from 'react';
import { EnterpriseLayout } from '../../components/visualization/EnterpriseLayout';
import { DashboardPage } from './modules/dashboard/DashboardPage';
import type { ModuleType } from '../../types/visualization';

export function ProjectsPage() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('dashboard');

  return (
    <EnterpriseLayout
      activeModule={currentModule}
      onModuleChange={(id) => setCurrentModule(id as ModuleType)}
    >
      {currentModule === 'dashboard' && <DashboardPage />}

      {currentModule === 'ai-platform' && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-white">AI数据平台</h2>
          <p className="mt-2 text-slate-400">展示AI模型训练、ETL工作流、数据集管理等功能。</p>
        </div>
      )}

      {currentModule === 'finance' && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-white">金融交易系统</h2>
          <p className="mt-2 text-slate-400">实时股票行情、K线图表、深度图等。</p>
        </div>
      )}

      {currentModule === 'mes' && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-white">工业MES系统</h2>
          <p className="mt-2 text-slate-400">设备监控、工艺流程、告警管理等。</p>
        </div>
      )}

      {['hmi', 'im', '3d'].includes(currentModule) && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-white">
            {currentModule === 'hmi' && 'HMI控制系统'}
            {currentModule === 'im' && '实时通信IM'}
            {currentModule === '3d' && '三维可视化'}
          </h2>
          <p className="mt-4 text-slate-400">该模块功能正在规划中，敬请期待...</p>
        </div>
      )}
    </EnterpriseLayout>
  );
}
