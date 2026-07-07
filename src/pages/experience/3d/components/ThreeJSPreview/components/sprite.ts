import * as THREE from 'three';

type TextSpriteOptions = {
  text: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
};

export function createTextSprite({
  text,
  color = '#ffffff',
  backgroundColor = 'rgba(15, 23, 42, 0.78)',
  borderColor = 'rgba(168, 85, 247, 0.8)',
}: TextSpriteOptions) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is not available.');
  }

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  const paddingX = 28;
  const paddingY = 16;
  const fontSize = 28;
  const borderRadius = 18;

  context.font = `${fontSize * pixelRatio}px sans-serif`;

  const textMetrics = context.measureText(text);
  const textWidth = textMetrics.width;

  const width = Math.ceil(textWidth + paddingX * 2 * pixelRatio);
  const height = Math.ceil((fontSize + paddingY * 2) * pixelRatio);

  canvas.width = width;
  canvas.height = height;

  context.scale(pixelRatio, pixelRatio);

  const displayWidth = width / pixelRatio;
  const displayHeight = height / pixelRatio;

  context.clearRect(0, 0, displayWidth, displayHeight);

  drawRoundedRect(
    context,
    0,
    0,
    displayWidth,
    displayHeight,
    borderRadius,
    backgroundColor,
    borderColor
  );

  context.font = `600 ${fontSize}px sans-serif`;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillText(text, displayWidth / 2, displayHeight / 2);

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

  sprite.scale.set(displayWidth / 180, displayHeight / 180, 1);
  sprite.renderOrder = 999;

  const dispose = () => {
    texture.dispose();
    material.dispose();
  };

  return {
    sprite,
    dispose,
  };
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillStyle: string,
  strokeStyle: string
) {
  context.beginPath();

  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);

  context.closePath();

  context.fillStyle = fillStyle;
  context.fill();

  context.lineWidth = 1;
  context.strokeStyle = strokeStyle;
  context.stroke();
}