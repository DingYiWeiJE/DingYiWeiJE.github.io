import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from './Sidebar';
import { NAVIGATION_MENU } from '../../config/navigation';

interface EnterpriseLayoutProps {
  children: ReactNode;
  activeModule?: string;
  onModuleChange?: (moduleId: string) => void;
}

export function EnterpriseLayout({
  children,
  activeModule = 'dashboard',
  onModuleChange
}: EnterpriseLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleModuleSelect = (moduleId: string) => {
    onModuleChange?.(moduleId);
    setMobileSidebarOpen(false); // 移动端选择后自动关闭
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* 移动端遮罩 */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 - 桌面端 */}
      <div className="hidden md:block">
        <Sidebar
          items={NAVIGATION_MENU}
          activeId={activeModule}
          onSelect={handleModuleSelect}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* 侧边栏 - 移动端 */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          items={NAVIGATION_MENU}
          activeId={activeModule}
          onSelect={handleModuleSelect}
          collapsed={false}
        />
      </div>

      {/* 主内容区 */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* 移动端顶部栏 */}
        <div className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 md:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="打开菜单"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold text-white">企业可视化系统</h1>
          <button
            onClick={handleExit}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="退出"
            title="返回首页"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 内容区 */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-950 p-2 md:p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
