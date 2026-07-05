import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { EnterpriseLayout } from '../../components/visualization/EnterpriseLayout';
import { useLayout } from '../../contexts/LayoutContext';
import { NAVIGATION_MENU } from '../../config/navigation';

export function ProjectsPage() {
  const { setShowHeader, setShowFooter } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();

  // 根据路由获取当前激活的模块
  const activeModule = NAVIGATION_MENU.find(
    item => item.path && location.pathname.startsWith(item.path)
  )?.id || '';

  useEffect(() => {
    // 进入页面时隐藏 Header 和 Footer
    setShowHeader(false);
    setShowFooter(false);

    // 离开页面时恢复显示
    return () => {
      setShowHeader(true);
      setShowFooter(true);
    };
  }, [setShowHeader, setShowFooter]);

  // 处理模块切换
  const handleModuleChange = (moduleId: string) => {
    const menuItem = NAVIGATION_MENU.find(item => item.id === moduleId);
    if (menuItem?.path) {
      navigate(menuItem.path);
    }
  };

  // 如果在 /projects 根路径，不使用 EnterpriseLayout
  const isIndexPage = location.pathname === '/projects' || location.pathname === '/projects/';

  if (isIndexPage) {
    return <Outlet />;
  }

  // 子页面使用 EnterpriseLayout
  return (
    <EnterpriseLayout
      activeModule={activeModule}
      onModuleChange={handleModuleChange}
    >
      <Outlet />
    </EnterpriseLayout>
  );
}
