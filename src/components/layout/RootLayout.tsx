import { Outlet } from 'react-router';

import { Header } from './Header';
import { Footer } from './Footer';

export function RootLayout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}