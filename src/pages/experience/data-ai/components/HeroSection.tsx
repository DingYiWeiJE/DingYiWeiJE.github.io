interface HeroSectionProps {
  stats: {
    datasetCount: number;
    modelCount: number;
    trainingTasks: number;
    gpuUtilization: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <div className="mb-6 space-y-4 md:mb-8">
      {/* 标题和简介 */}
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Data AI Platform
        </h1>
        <p className="mt-2 text-sm text-slate-400 md:text-base">
          端到端的企业级AI训练与部署平台
        </p>
      </div>

      {/* 能力标签 */}
      <div className="flex flex-wrap gap-2">
        {['ETL Pipeline', 'Dataset Management', 'Model Training', 'AI Analysis'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 md:px-4 md:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-white md:text-3xl">
            {stats.datasetCount}
          </div>
          <div className="mt-1 text-xs text-slate-400 md:text-sm">数据集</div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-white md:text-3xl">
            {stats.modelCount}
          </div>
          <div className="mt-1 text-xs text-slate-400 md:text-sm">模型</div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-cyan-400 md:text-3xl">
            {stats.trainingTasks}
          </div>
          <div className="mt-1 text-xs text-slate-400 md:text-sm">训练中</div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-green-400 md:text-3xl">
            {stats.gpuUtilization}%
          </div>
          <div className="mt-1 text-xs text-slate-400 md:text-sm">GPU利用率</div>
        </div>
      </div>
    </div>
  );
}
