import type { ReactNode } from 'react';

interface EnterpriseLayoutProps {
  children: ReactNode;
}

export function EnterpriseLayout({ children }: EnterpriseLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950">
      {/* 顶部工具栏 - 后续实现 */}
      <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/10 text-sm font-bold text-cyan-400">
            EV
          </div>
          <h1 className="text-lg font-semibold text-white">企业级可视化交互系统</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">后续添加工具栏</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 侧边导航 - 后续实现 */}
        <aside className="w-60 border-r border-slate-800 bg-slate-900 overflow-y-auto">
          <div className="p-4">
            <p className="text-sm text-slate-400">侧边导航（后续实现）</p>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
