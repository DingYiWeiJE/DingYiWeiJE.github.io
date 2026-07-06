import { useRef, useEffect } from 'react';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // TODO: Initialize Three.js scene here
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-6 text-sm tracking-widest text-cyan-400 uppercase">
          Real-time 3D Interactive Developer
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
          3D / Three.js / Unity
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-slate-300 mb-12">
          实时交互开发
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {['Three.js', 'WebGL', 'Shader', 'Unity', 'C#', 'TypeScript'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-sm hover:border-cyan-500/50 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-500 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-slate-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
