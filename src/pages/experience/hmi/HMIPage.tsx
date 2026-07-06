export function HMIPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">HMI控制系统</h1>
          <p className="mt-1 text-sm text-slate-400">人机交互界面，工业设备实时控制与状态监控</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">实时控制</h3>
          <p className="text-sm text-slate-400">设备启停、参数调节、远程操作</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-green-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">数据监控</h3>
          <p className="text-sm text-slate-400">实时数据采集、趋势曲线、历史回溯</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-red-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">告警系统</h3>
          <p className="text-sm text-slate-400">异常检测、告警推送、应急响应</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">组态设计</h3>
          <p className="text-sm text-slate-400">拖拽式界面设计、组件库、模板管理</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-orange-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">权限管理</h3>
          <p className="text-sm text-slate-400">用户认证、角色分配、操作审计</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-cyan-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">多屏支持</h3>
          <p className="text-sm text-slate-400">响应式设计、大屏展示、移动端适配</p>
        </div>
      </div>

      {/* 典型应用场景 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">典型应用场景</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">电力监控</div>
              <div className="text-sm text-slate-400">变电站、配电室实时监控</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">化工生产</div>
              <div className="text-sm text-slate-400">反应釜、管道流程控制</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">楼宇自控</div>
              <div className="text-sm text-slate-400">空调、照明、安防集成</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-orange-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">智能制造</div>
              <div className="text-sm text-slate-400">生产线、机器人控制</div>
            </div>
          </div>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">计划技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'SVG', 'Canvas', 'WebSocket', 'Modbus', 'OPC UA', 'MQTT'].map((tech) => (
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
              该模块正在规划设计阶段，将实现完整的HMI控制系统功能。预计完成时间：待定
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
