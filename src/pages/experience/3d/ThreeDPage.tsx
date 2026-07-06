export function ThreeDPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">三维可视化</h1>
          <p className="mt-1 text-sm text-slate-400">基于 WebGL 的三维数据可视化平台，支持场景漫游和交互</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">3D场景</h3>
          <p className="text-sm text-slate-400">构建真实的三维场景，支持模型导入和编辑</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-green-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">场景漫游</h3>
          <p className="text-sm text-slate-400">第一人称/第三人称视角自由漫游</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">交互操作</h3>
          <p className="text-sm text-slate-400">点击、拖拽、缩放等丰富的交互方式</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-orange-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">数据可视化</h3>
          <p className="text-sm text-slate-400">将数据映射到三维空间，直观展示</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-red-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">性能优化</h3>
          <p className="text-sm text-slate-400">LOD、实例化、遮挡剔除等优化技术</p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 inline-flex rounded-lg bg-slate-800 p-2 text-cyan-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">特效系统</h3>
          <p className="text-sm text-slate-400">粒子、光影、后处理等视觉效果</p>
        </div>
      </div>

      {/* 应用场景 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">应用场景</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🏭</div>
            <div className="text-sm font-medium text-white">数字孪生</div>
            <div className="mt-1 text-xs text-slate-400">工厂、设备三维建模</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🏙️</div>
            <div className="text-sm font-medium text-white">智慧城市</div>
            <div className="mt-1 text-xs text-slate-400">城市规划可视化</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🏢</div>
            <div className="text-sm font-medium text-white">BIM建筑</div>
            <div className="mt-1 text-xs text-slate-400">建筑信息模型展示</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🎮</div>
            <div className="text-sm font-medium text-white">3D游戏</div>
            <div className="mt-1 text-xs text-slate-400">Web 3D游戏开发</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🌍</div>
            <div className="text-sm font-medium text-white">地理信息</div>
            <div className="mt-1 text-xs text-slate-400">GIS 三维地图</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🛒</div>
            <div className="text-sm font-medium text-white">电商展示</div>
            <div className="mt-1 text-xs text-slate-400">产品 3D 预览</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🏛️</div>
            <div className="text-sm font-medium text-white">文化遗产</div>
            <div className="mt-1 text-xs text-slate-400">文物数字化保护</div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
            <div className="mb-2 text-2xl">🔬</div>
            <div className="text-sm font-medium text-white">科学可视化</div>
            <div className="mt-1 text-xs text-slate-400">分子、天文数据展示</div>
          </div>
        </div>
      </div>

      {/* 技术特性 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">渲染技术</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              PBR 物理渲染
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              动态光照和阴影
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              HDR 和 Bloom 效果
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              环境遮蔽 (SSAO)
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">模型支持</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              glTF / GLB 格式
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              FBX / OBJ 格式
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              骨骼动画
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Morph Targets
            </li>
          </ul>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">计划技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'WebGL', 'GLSL', 'Blender'].map((tech) => (
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
              该模块正在规划设计阶段，将实现完整的三维可视化平台功能。预计完成时间：待定
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
