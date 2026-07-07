import * as THREE from 'three';

type CreateBodyLabelParams = {
  text: string;
  radius: number;
};

export function createBodyLabel({ text, radius }: CreateBodyLabelParams) {
  const canvas = document.createElement('canvas');

  canvas.width = 512;
  canvas.height = 160;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is not available.');
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '600 48px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const textMetrics = context.measureText(text);
  const textWidth = textMetrics.width;

  const paddingX = 42;

  const boxWidth = Math.min(textWidth + paddingX * 2, canvas.width - 24);
  const boxHeight = 88;

  const x = (canvas.width - boxWidth) / 2;
  const y = (canvas.height - boxHeight) / 2;
  const radiusCorner = 32;

  context.beginPath();
  context.moveTo(x + radiusCorner, y);
  context.lineTo(x + boxWidth - radiusCorner, y);
  context.quadraticCurveTo(x + boxWidth, y, x + boxWidth, y + radiusCorner);
  context.lineTo(x + boxWidth, y + boxHeight - radiusCorner);
  context.quadraticCurveTo(
    x + boxWidth,
    y + boxHeight,
    x + boxWidth - radiusCorner,
    y + boxHeight
  );
  context.lineTo(x + radiusCorner, y + boxHeight);
  context.quadraticCurveTo(x, y + boxHeight, x, y + boxHeight - radiusCorner);
  context.lineTo(x, y + radiusCorner);
  context.quadraticCurveTo(x, y, x + radiusCorner, y);
  context.closePath();

  context.fillStyle = 'rgba(2, 6, 23, 0.72)';
  context.fill();

  context.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = '#ffffff';
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);

  const scale = Math.max(radius * 2.2, 0.7);

  sprite.scale.set(scale * 2.4, scale * 0.75, 1);
  sprite.position.set(0, radius * 1.9, 0);
  sprite.visible = false;
  sprite.renderOrder = 20;

  const dispose = () => {
    texture.dispose();
    material.dispose();
  };

  return {
    sprite,
    dispose,
  };
}