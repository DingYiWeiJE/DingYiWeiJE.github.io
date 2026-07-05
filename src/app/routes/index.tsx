import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { RootLayout } from '../../components/layout/RootLayout';

// 懒加载所有页面组件
const HomePage = lazy(() => import('../../pages/home/HomePage').then(m => ({ default: m.HomePage })));
const ProjectsPage = lazy(() => import('../../pages/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectsIndexPage = lazy(() => import('../../pages/projects/ProjectsIndexPage').then(m => ({ default: m.ProjectsIndexPage })));
const DashboardPage = lazy(() => import('../../pages/projects/modules/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const DataAIPage = lazy(() => import('../../pages/experience/data-ai').then(m => ({ default: m.DataAIPage })));
const FinancePage = lazy(() => import('../../pages/projects/modules/finance/FinancePage').then(m => ({ default: m.FinancePage })));
const MESPage = lazy(() => import('../../pages/projects/modules/mes/MESPage').then(m => ({ default: m.MESPage })));
const HMIPage = lazy(() => import('../../pages/projects/modules/hmi/HMIPage').then(m => ({ default: m.HMIPage })));
const IMPage = lazy(() => import('../../pages/projects/modules/im/IMPage').then(m => ({ default: m.IMPage })));
const ThreeDPage = lazy(() => import('../../pages/projects/modules/3d/ThreeDPage').then(m => ({ default: m.ThreeDPage })));
const OpenSourcePage = lazy(() => import('../../pages/open-source/OpenSourcePage').then(m => ({ default: m.OpenSourcePage })));
const AboutPage = lazy(() => import('../../pages/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('../../pages/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('../../pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// 加载中组件
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="sr-only">加载中...</span>
        </div>
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />

        {/* Projects 路由 - 带子路由 */}
        <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>}>
          <Route index element={<Suspense fallback={<PageLoader />}><ProjectsIndexPage /></Suspense>} />
          <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
          <Route path="ai-platform" element={<Suspense fallback={<PageLoader />}><DataAIPage /></Suspense>} />
          <Route path="finance" element={<Suspense fallback={<PageLoader />}><FinancePage /></Suspense>} />
          <Route path="mes" element={<Suspense fallback={<PageLoader />}><MESPage /></Suspense>} />
          <Route path="hmi" element={<Suspense fallback={<PageLoader />}><HMIPage /></Suspense>} />
          <Route path="im" element={<Suspense fallback={<PageLoader />}><IMPage /></Suspense>} />
          <Route path="3d" element={<Suspense fallback={<PageLoader />}><ThreeDPage /></Suspense>} />
        </Route>

        <Route path="open-source" element={<Suspense fallback={<PageLoader />}><OpenSourcePage /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
      </Route>
    </Routes>
  );
}