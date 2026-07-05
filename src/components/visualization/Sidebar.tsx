import type { ReactNode } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  path?: string;
  badge?: string | number;
}

interface SidebarProps {
  items: MenuItem[];
  activeId: string;
  onSelect: (id: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  items,
  activeId,
  onSelect,
  collapsed = false,
  onToggle
}: SidebarProps) {
  return (
    <aside
      className={`flex flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* 侧边栏头部 */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/10 text-sm font-bold text-cyan-400">
              EV
            </div>
            <span className="text-sm font-semibold text-white">可视化系统</span>
          </div>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* 菜单列表 */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  activeId === item.id
                    ? 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 侧边栏底部（可选） */}
      {!collapsed && (
        <div className="border-t border-slate-800 p-4">
          <div className="rounded-lg bg-slate-800/50 p-3">
            <p className="text-xs font-medium text-slate-300">技术栈展示</p>
            <p className="mt-1 text-xs text-slate-500">
              React + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
