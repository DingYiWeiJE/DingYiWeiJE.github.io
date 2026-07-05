import { Outlet } from 'react-router';

import { Header } from './Header';
import { Footer } from './Footer';
import { useLayout } from '../../contexts/LayoutContext';

export function RootLayout() {
  const { showHeader, showFooter } = useLayout();

  return (
    <div className="app-shell">
      {showHeader && <Header />}

      <main className="app-main">
        <Outlet />
      </main>

      {showFooter && <Footer />}
    </div>
  );
}