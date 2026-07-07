import { useEffect, useRef, useState } from 'react';

import {
  createHeroCore,
  createFloor,
  createLights,
  createOrbitNodes,
} from './components/creator';

import {
  createScene,
  createCamera,
  createRenderer,
  createControls,
} from './components/threeCore';
import { startAnimationLoop } from './components/animation';
import { createResizeHandler } from './components/resize';
import type { Disposable } from './components/types';
import { createInteraction } from './components/interaction';

export function ThreeJSPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 清空当前组件容器里的旧 canvas
    container.innerHTML = '';

    // 1. 创建 three.js 基础设施
    const scene = createScene();
    const camera = createCamera(container);
    const renderer = createRenderer(container);

    container.appendChild(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);

    // 2. 创建 3D 对象
    const heroCore  = createHeroCore();
    const orbitNodes = createOrbitNodes();
    const floorObject = createFloor();
    const lightsObject = createLights();

    // 3. 添加到场景

    // 3. 添加到场景
    const sceneObjects = [
      heroCore ,
      floorObject,
      lightsObject,
      orbitNodes
    ];

    for (const item of sceneObjects) {
      scene.add(item.object3D);
    }

    // 4. resize
    const resizeHandler = createResizeHandler({
      container,
      camera,
      renderer,
    });

    // 5. 动画循环
    const animationLoop = startAnimationLoop({
      scene,
      camera,
      renderer,
      controls,
      updatables: [
        heroCore,
        orbitNodes
      ],
    });

    const interactables = [
      ...orbitNodes.interactables,
    ];

    const interaction = createInteraction({
      container,
      camera,
      interactables,
      onSelect: (item) => {
        if (!item) {
          setSelectedInfo(null);
          return;
        }

        setSelectedInfo({
          title: item.title,
          description: item.description,
        });
      },
    });

    const disposables: Disposable[] = [
      heroCore ,
      floorObject,
      lightsObject,
      orbitNodes
    ];

    // 6. cleanup
    return () => {
      resizeHandler.dispose();
      animationLoop.stop();
      interaction.dispose();

      for (const item of disposables) {
        item.dispose();
      }

      controls.dispose()

      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

return (
  <div className="relative h-[560px] w-full overflow-hidden rounded-3xl bg-slate-950 md:h-[640px]">
    <div className="pointer-events-none absolute -left-24 -top-24 z-0 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl" />

<div className="pointer-events-none absolute -bottom-24 -right-24 z-0 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />

    <div ref={containerRef} className="h-full w-full" style={{ touchAction: 'none' }} />

    <div className="pointer-events-none absolute left-3 right-3 top-3 rounded-2xl border border-white/10 bg-black/35 p-3 text-white shadow-2xl backdrop-blur-md md:left-4 md:right-auto md:top-4 md:max-w-[320px] md:p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-purple-300">
          Three.js 作品展示
        </div>

        <div className="mt-2 text-lg font-semibold md:text-xl">
          可交互 3D 技术能力图谱
        </div>

        <div className="mt-2 text-sm leading-6 text-white/70">
          点击或触摸环绕节点，查看我在前端工程、3D 可视化、性能优化和工程架构方面的能力。
        </div>
    </div>

    {selectedInfo && (
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-2xl border border-purple-400/30 bg-black/55 p-3 text-white shadow-2xl backdrop-blur-md md:bottom-4 md:left-auto md:right-4 md:max-w-[360px] md:p-4">
        <div className="text-xs uppercase tracking-[0.24em] text-purple-300">
          当前能力点
        </div>

        <div className="mt-2 text-base font-semibold md:text-lg">
          {selectedInfo.title}
        </div>

        <div className="mt-2 text-sm leading-6 text-white/70">
          {selectedInfo.description}
        </div>
      </div>
    )}
  </div>
);
}