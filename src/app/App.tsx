import { AppRoutes } from './routes';
import { LayoutProvider } from '../contexts/LayoutContext';

export function App() {
  return (
    <LayoutProvider>
      <AppRoutes />
    </LayoutProvider>
  );
}