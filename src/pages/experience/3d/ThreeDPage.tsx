import { HeroSection } from './components/HeroSection';
import { DemoSection } from './components/DemoSection';
import { SolarSystemPreview } from './components/SolarSystem/SolarSystemPreview';

export function ThreeDPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div style={{width: '100vw', height: '100vw'}}>
        <SolarSystemPreview />
      </div>
      {/* <HeroSection />
      <DemoSection /> */}
    </div>
  );
}
