import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color('#020617');
  scene.fog = new THREE.Fog('#020617', 5, 14);
  /**
   *  离相机 5 以内：基本不受雾影响
      从 5 到 14：逐渐被背景色融合
      超过 14：基本接近背景色
   */

  return scene;
}

export function createCamera(container: HTMLDivElement) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(
    75, // 广角 小：画面更窄，物体看起来更近 大：画面更广，物体看起来更远，透视感更强（画面会被拉伸）
    width / height,
    0.1,
    1000
  );

  camera.position.set(3, 2.5, 5);
  camera.lookAt(0, 0.5, 0);

  return camera;
}

export function createRenderer(container: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
     alpha: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(container.clientWidth, container.clientHeight);

  return renderer;
}

export function createControls(camera: THREE.Camera, domElement: HTMLElement) {

  /**
   * enablePan = false
      禁止平移，避免用户把主体拖出画面。

      minDistance / maxDistance
      限制缩放距离，避免太近穿模或太远看不清。

      minPolarAngle / maxPolarAngle
      限制上下旋转角度，避免钻到地面下面或俯视太狠。
   */

  const controls = new OrbitControls(camera, domElement);

  controls.target.set(0, 1.2, 0);
  controls.enableDamping = true;

  controls.enablePan = false;

  controls.minDistance = 3.2;
  controls.maxDistance = 7;

  controls.minPolarAngle = Math.PI * 0.18;
  controls.maxPolarAngle = Math.PI * 0.48;

  controls.update();

  return controls;
}