export function MESPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">工业MES系统</h1>
          <p className="mt-1 text-sm text-slate-400">制造执行系统，设备监控、工艺流程、生产告警</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">设备监控</h3>
          <p className="text-sm text-slate-400">实时设备状态、运行参数、效能分析</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-green-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">工艺流程</h3>
          <p className="text-sm text-slate-400">生产流程可视化、工序管理、质量控制</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-red-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">告警管理</h3>
          <p className="text-sm text-slate-400">异常告警、故障诊断、预警提示</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">生产计划</h3>
          <p className="text-sm text-slate-400">订单管理、排产调度、进度跟踪</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-orange-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">数据分析</h3>
          <p className="text-sm text-slate-400">产能统计、效率分析、趋势预测</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-cyan-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">质量追溯</h3>
          <p className="text-sm text-slate-400">批次追踪、质检记录、不良品分析</p>
        </div>
      </div>

      {/* 系统架构 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">系统架构</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 rounded-lg bg-blue-500/10 p-2 text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">数据采集层</div>
              <div className="text-sm text-slate-400">PLC、传感器、SCADA系统数据接入</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 rounded-lg bg-green-500/10 p-2 text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">业务逻辑层</div>
              <div className="text-sm text-slate-400">生产调度、流程控制、规则引擎</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">展示层</div>
              <div className="text-sm text-slate-400">Web界面、大屏展示、移动端</div>
            </div>
          </div>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">计划技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'ECharts', 'MQTT', 'WebSocket', 'Three.js', 'Node.js', 'PostgreSQL'].map((tech) => (
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
              该模块正在规划设计阶段，将实现完整的工业MES系统功能。预计完成时间：待定
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
