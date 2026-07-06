import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Updatable } from './types';

type AnimationLoopParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  updatables: Updatable[];
};

export function startAnimationLoop({
  scene,
  camera,
  renderer,
  controls,
  updatables,
}: AnimationLoopParams) {
  let animationId = 0;

  const timer = new THREE.Timer();

  function animate() {
    animationId = requestAnimationFrame(animate);

    timer.update();

    const deltaTime = timer.getDelta();

    for (const item of updatables) {
      item.tick(deltaTime);
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  const stop = () => {
    cancelAnimationFrame(animationId);
  };

  return {
    stop,
  };
}