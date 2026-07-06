import { useEffect, useRef } from 'react';

import {
  createRotatingCubeGroup,
  createFloor,
  createLights,
  createHelpers,
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

export function ThreeJSPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    const cubeObject = createRotatingCubeGroup();
    const floorObject = createFloor();
    const helperObject = createHelpers();
    const lightsObject = createLights();

    // 3. 添加到场景

    // 3. 添加到场景
    const sceneObjects = [
      cubeObject,
      floorObject,
      helperObject,
      lightsObject
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
        cubeObject
      ],
    });
    const disposables: Disposable[] = [
      cubeObject,
      floorObject,
      helperObject,
      lightsObject
    ];

    // 6. cleanup
    return () => {
      resizeHandler.dispose();
      animationLoop.stop();

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

  return <div ref={containerRef} className="w-full h-full" />;
}