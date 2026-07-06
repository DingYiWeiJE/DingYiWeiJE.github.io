import type { ReactNode } from 'react';

interface DemoCardProps {
  demoNumber: string;
  title: string;
  description: string;
  techStack: string[];
  responsibilities: string[];
  color: 'cyan' | 'purple' | 'blue';
  imageOnLeft?: boolean;
  preview?: ReactNode;
}

const colorMap = {
  cyan: {
    badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    border: 'hover:border-cyan-500/50',
    bullet: 'text-cyan-500',
  },
  purple: {
    badge: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    border: 'hover:border-purple-500/50',
    bullet: 'text-purple-500',
  },
  blue: {
    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    border: 'hover:border-blue-500/50',
    bullet: 'text-blue-500',
  },
};

export function DemoCard({
  demoNumber,
  title,
  description,
  techStack,
  responsibilities,
  color,
  imageOnLeft = false,
  preview,
}: DemoCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 ${colors.border} transition-all duration-500`}>
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        <div className={`space-y-6 ${imageOnLeft ? 'order-2 md:order-2' : 'order-1 md:order-1'}`}>
          <div className={`inline-block px-3 py-1 rounded-full ${colors.badge} text-sm`}>
            {demoNumber}
          </div>
          <h3 className="text-3xl font-bold text-white">{title}</h3>
          <p className="text-slate-300 text-lg leading-relaxed">{description}</p>

          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">技术栈</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">负责内容</h4>
            <ul className="space-y-2 text-slate-300">
              {responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className={`${colors.bullet} mr-2 mt-1`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`relative aspect-video bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 ${imageOnLeft ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
          {preview || <div className="flex items-center justify-center h-full text-slate-500 text-sm">Demo 预览 / 视频区域</div>}
        </div>
      </div>
    </div>
  );
}
