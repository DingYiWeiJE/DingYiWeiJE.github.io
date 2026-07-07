import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SolarSystem } from './components/SolarSystem';
import { StarField } from './components/StarField';

export function SolarSystemPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();

    scene.background = new THREE.Color('#020617');

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 18;
    controls.target.set(0, 0, 0);
    controls.update();

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.18);

    const sunLight = new THREE.PointLight('#ffffff', 4, 80);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;

    scene.add(ambientLight);
    scene.add(sunLight);

    const starField = new StarField();
    const solarSystem = new SolarSystem();

    scene.add(starField.object3D);
    scene.add(solarSystem.object3D);

    const timer = new THREE.Timer();

    let animationId = 0;
    const speedMultiplier = 1;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      timer.update();
      const deltaTime = timer.getDelta();

      solarSystem.tick(deltaTime, speedMultiplier);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      cancelAnimationFrame(animationId);
      starField.dispose();
      solarSystem.dispose();

      controls.dispose();

      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-3xl bg-slate-950 md:h-[680px]">
      <div ref={containerRef} className="h-full w-full touch-none" />

      <div className="pointer-events-none absolute left-3 right-3 top-3 rounded-2xl border border-white/10 bg-black/35 p-3 text-white shadow-2xl backdrop-blur-md md:left-4 md:right-auto md:top-4 md:max-w-[360px] md:p-4">
        <div className="text-xs uppercase tracking-[0.24em] text-yellow-300">
          Three.js 太阳系
        </div>

        <div className="mt-2 text-lg font-semibold md:text-xl">
          交互式太阳系模拟器
        </div>

        <div className="mt-2 text-sm leading-6 text-white/70">
          当前阶段先验证太阳、地球和月球的层级运动结构。
        </div>
      </div>
    </div>
  );
}