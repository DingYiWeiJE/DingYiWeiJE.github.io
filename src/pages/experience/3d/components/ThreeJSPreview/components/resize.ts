import * as THREE from 'three';

type ResizeParams = {
  container: HTMLDivElement;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
};

export function createResizeHandler({
  container,
  camera,
  renderer,
}: ResizeParams) {
  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener('resize', resize);

  resize();

  const dispose = () => {
    window.removeEventListener('resize', resize);
  };

  return {
    resize,
    dispose,
  };
}