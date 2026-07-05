import { Route, Routes } from 'react-router';

import { RootLayout } from '../../components/layout/RootLayout';
import { HomePage } from '../../pages/home/HomePage';
import { ProjectsPage } from '../../pages/projects/ProjectsPage';
import { OpenSourcePage } from '../../pages/open-source/OpenSourcePage';
import { AboutPage } from '../../pages/about/AboutPage';
import { ContactPage } from '../../pages/contact/ContactPage';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="open-source" element={<OpenSourcePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}