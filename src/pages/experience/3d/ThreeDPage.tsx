import { HeroSection } from './components/HeroSection';
import { DemoSection } from './components/DemoSection';

export function ThreeDPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeroSection />
      <DemoSection />
    </div>
  );
}
