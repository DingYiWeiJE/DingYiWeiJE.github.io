import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { RootLayout } from '../../components/layout/RootLayout';

// 懒加载所有页面组件
const HomePage = lazy(() => import('../../pages/home/HomePage').then(m => ({ default: m.HomePage })));
const ProjectsPage = lazy(() => import('../../pages/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
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
        <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
        <Route path="open-source" element={<Suspense fallback={<PageLoader />}><OpenSourcePage /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
      </Route>
    </Routes>
  );
}