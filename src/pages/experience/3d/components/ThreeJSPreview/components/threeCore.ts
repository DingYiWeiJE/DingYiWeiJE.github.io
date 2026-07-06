import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#d6dee8');

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
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(container.clientWidth, container.clientHeight);

  return renderer;
}

export function createControls(
  camera: THREE.PerspectiveCamera,
  domElement: HTMLElement
) {
  const controls = new OrbitControls(camera, domElement);

  controls.target.set(0, 3, 0);
  controls.enableDamping = true;
  controls.update();

  return controls;
}