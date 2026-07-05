export function IMPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">实时通信IM</h1>
          <p className="mt-1 text-sm text-slate-400">企业级即时通讯系统，支持多人会话、文件传输、音视频通话</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">即时消息</h3>
          <p className="text-sm text-slate-400">文字、表情、图片、语音消息实时收发</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-green-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">群组聊天</h3>
          <p className="text-sm text-slate-400">创建群组、成员管理、@提醒功能</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">音视频通话</h3>
          <p className="text-sm text-slate-400">一对一、多人音视频会议、屏幕共享</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-orange-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">文件传输</h3>
          <p className="text-sm text-slate-400">文件上传下载、断点续传、在线预览</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-red-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">消息历史</h3>
          <p className="text-sm text-slate-400">聊天记录存储、搜索、导出功能</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-cyan-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">消息通知</h3>
          <p className="text-sm text-slate-400">桌面通知、未读标记、免打扰模式</p>
        </div>
      </div>

      {/* 核心特性 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">核心特性</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">低延迟通信</div>
              <div className="text-sm text-slate-400">基于 WebSocket 的实时双向通信，毫秒级消息送达</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">端到端加密</div>
              <div className="text-sm text-slate-400">采用加密算法保护消息内容，确保通信安全</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">跨平台支持</div>
              <div className="text-sm text-slate-400">Web、桌面端、移动端全平台覆盖，消息实时同步</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">离线消息</div>
              <div className="text-sm text-slate-400">支持离线消息存储，上线后自动接收未读消息</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="flex-shrink-0 text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">富文本编辑</div>
              <div className="text-sm text-slate-400">支持 Markdown、代码高亮、链接预览等富文本功能</div>
            </div>
          </div>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">计划技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'WebSocket', 'WebRTC', 'Socket.io', 'Redis', 'MongoDB', 'Node.js'].map((tech) => (
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
              该模块正在规划设计阶段，将实现完整的企业级即时通讯功能。预计完成时间：待定
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
