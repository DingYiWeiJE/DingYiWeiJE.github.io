import type { ETLNode as ETLNodeType } from '../../types';

interface ETLNodeProps {
  node: ETLNodeType;
  onClick: () => void;
}

export function ETLNode({ node, onClick }: ETLNodeProps) {
  const getStatusColor = () => {
    switch (node.status) {
      case 'running':
        return 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/50';
      case 'completed':
        return 'border-green-500 bg-green-500/20';
      case 'error':
        return 'border-red-500 bg-red-500/20';
      default:
        return 'border-slate-700 bg-slate-800/50';
    }
  };

  const getStatusIcon = () => {
    switch (node.status) {
      case 'running':
        return (
          <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
        );
      case 'completed':
        return (
          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
            <span className="text-xs">!</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={`relative flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 transition-all hover:scale-110 md:h-20 md:w-20 ${getStatusColor()}`}
      >
        <span className="text-2xl md:text-3xl">{node.icon}</span>
        {getStatusIcon()}
      </button>
      <div className="text-center">
        <div className="text-xs font-medium text-white md:text-sm">{node.name}</div>
        {node.status === 'running' && (
          <div className="mt-1 text-xs text-cyan-400">{node.progress.toFixed(2)}%</div>
        )}
      </div>
    </div>
  );
}
