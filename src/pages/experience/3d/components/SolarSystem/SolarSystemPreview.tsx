import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SolarSystem } from './components/SolarSystem';
import { StarField } from './components/StarField';
import { StarSphere } from './components/StarSphere';
import { solarTextures } from './components/solarTextures';
import { SolarInteraction } from './components/SolarInteraction';
import type { CelestialBodyData } from './components/solarTypes';
import { CameraFocusController } from './components/CameraFocusController';

export function SolarSystemPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const speedMultiplierRef = useRef(0.5);
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData | null>(null);

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

    const starSphere = new StarSphere(solarTextures.milkyWay); // 添加星空背景

    scene.add(starSphere.object3D);

    const starField = new StarField(600, 80); // 添加星星
    const solarSystem = new SolarSystem();

    const cameraFocusController = new CameraFocusController({
      camera,
      controls,
    });

    const interaction = new SolarInteraction({
      container,
      camera,
      solarSystem,
      onHoverChange: (body) => {
        speedMultiplierRef.current = body ? 0.15 : 0.5;
      },
      onSelect: (body) => {
        setSelectedBody(body?.data ?? null);
        cameraFocusController.focus(body);
      },
    });

    scene.add(starField.object3D);
    scene.add(solarSystem.object3D);

    const timer = new THREE.Timer();

    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      timer.update();
      const deltaTime = timer.getDelta();

      solarSystem.tick(deltaTime, speedMultiplierRef.current);
      cameraFocusController.tick(deltaTime);

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
      speedMultiplierRef.current = 1;
      window.removeEventListener('resize', handleResize);

      cancelAnimationFrame(animationId);
      starField.dispose();
      solarSystem.dispose();

      cameraFocusController.dispose();

      interaction.dispose();
      controls.dispose();

      starSphere.dispose();

      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      <div className="pointer-events-none absolute left-3 right-3 top-3 rounded-2xl border border-white/10 bg-black/35 p-3 text-white shadow-2xl backdrop-blur-md md:left-4 md:right-auto md:top-4 md:max-w-[360px] md:p-4">
        <div className="text-xs uppercase tracking-[0.24em] text-yellow-300">
          Three.js 太阳系
        </div>

        <div className="mt-2 text-lg font-semibold md:text-xl">
          交互式太阳系模拟器
        </div>

        <div className="mt-2 text-sm leading-6 text-white/70">
          点击星体查看详情
        </div>
      </div>

      {selectedBody && (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-black/60 p-4 text-white shadow-2xl backdrop-blur-md md:left-auto md:right-4 md:w-[360px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-yellow-300">
                当前选中
              </div>
              <div className="mt-1 text-xl font-semibold">
                {selectedBody.name}
              </div>
            </div>

            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              onClick={() => setSelectedBody(null)}
            >
              关闭
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-white/75">
            {selectedBody.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-white/40">直径</div>
              <div className="mt-1 text-white">{selectedBody.diameter}</div>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-white/40">距太阳</div>
              <div className="mt-1 text-white">{selectedBody.distanceFromSun}</div>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-white/40">公转周期</div>
              <div className="mt-1 text-white">{selectedBody.orbitalPeriod}</div>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-white/40">自转周期</div>
              <div className="mt-1 text-white">{selectedBody.rotationPeriod}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}