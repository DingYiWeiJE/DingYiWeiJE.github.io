interface MarketReplayControlsProps {
  isPlaying: boolean;
  speed: number;
  currentIndex: number;
  totalBars: number;
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function MarketReplayControls({
  isPlaying,
  speed,
  currentIndex,
  totalBars,
  onPlayPause,
  onReset,
  onSpeedChange,
}: MarketReplayControlsProps) {
  const speeds = [1, 2, 5, 10];
  const progress = totalBars > 0 ? (currentIndex / totalBars) * 100 : 0;

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white sm:text-base">行情回放控制</h3>
        <span className="text-xs text-slate-400 sm:text-sm">
          {currentIndex} / {totalBars}
        </span>
      </div>

      {/* 进度条 */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={onPlayPause}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:px-4"
        >
          {isPlaying ? (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              <span className="hidden sm:inline">暂停</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="hidden sm:inline">播放</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 sm:px-4"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">重置</span>
        </button>

        {/* 速度选择 */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-600 bg-slate-700/50 p-1 sm:gap-2">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                speed === s
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-600'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-400">
        历史行情回放模拟，非实时行情
      </div>
    </div>
  );
}
