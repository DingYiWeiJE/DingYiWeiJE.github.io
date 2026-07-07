import * as THREE from 'three';

export function createGlowSprite(
  color = 'rgba(250, 204, 21, 1)',
  size = 5
) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is not available.');
  }

  const gradient = context.createRadialGradient(
    128,
    128,
    0,
    128,
    128,
    128
  );

  gradient.addColorStop(0, color);
  gradient.addColorStop(0.25, 'rgba(250, 204, 21, 0.45)');
  gradient.addColorStop(0.55, 'rgba(250, 204, 21, 0.16)');
  gradient.addColorStop(1, 'rgba(250, 204, 21, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const sprite = new THREE.Sprite(material);

  sprite.scale.set(size, size, 1);
  sprite.renderOrder = -1;

  const dispose = () => {
    texture.dispose();
    material.dispose();
  };

  return {
    sprite,
    dispose,
  };
}