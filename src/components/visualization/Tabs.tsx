import type { ReactNode } from 'react';
import { useState } from 'react';

interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

export function Tabs({ items, defaultActiveKey, onChange }: TabsProps) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0]?.key);

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const activeTab = items.find(item => item.key === activeKey);

  return (
    <div>
      <div className="border-b border-slate-800">
        <nav className="-mb-px flex gap-2" aria-label="Tabs">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeKey === item.key
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {activeTab?.children}
      </div>
    </div>
  );
}
