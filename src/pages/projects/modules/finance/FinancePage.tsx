export function FinancePage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">金融交易系统</h1>
          <p className="mt-1 text-sm text-slate-400">实时股票行情、K线图表、深度图等</p>
        </div>
        <span className="rounded-full border border-slate-400/20 bg-slate-400/10 px-3 py-1 text-sm text-slate-400">
          规划中
        </span>
      </div>

      {/* 功能介绍 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-blue-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">实时行情</h3>
          <p className="text-sm text-slate-400">实时股票价格、涨跌幅、成交量等核心数据展示</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-green-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">K线图表</h3>
          <p className="text-sm text-slate-400">专业的蜡烛图、技术指标、趋势分析工具</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">深度图</h3>
          <p className="text-sm text-slate-400">买卖盘口数据、市场深度可视化分析</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-orange-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">交易监控</h3>
          <p className="text-sm text-slate-400">实时交易记录、资金流向、异常监控</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-cyan-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">数据报表</h3>
          <p className="text-sm text-slate-400">收益统计、风险分析、投资组合报告</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-pink-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">智能提醒</h3>
          <p className="text-sm text-slate-400">价格预警、突破提示、重要事件通知</p>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">计划技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'ECharts', 'WebSocket', 'TradingView', 'D3.js', 'Tailwind CSS'].map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 开发计划 */}
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-6">
        <div className="flex items-start gap-3">
          <svg className="h-6 w-6 flex-shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-yellow-500">开发中</h3>
            <p className="mt-1 text-sm text-slate-300">
              该模块正在规划设计阶段，将实现完整的金融数据可视化功能。预计完成时间：待定
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
