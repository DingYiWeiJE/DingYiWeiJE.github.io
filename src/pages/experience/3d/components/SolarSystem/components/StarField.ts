import * as THREE from 'three';

export class StarField {
  public readonly object3D: THREE.Points;

  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.PointsMaterial;

  constructor(count = 1200, radius = 90) {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      const direction = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();

      const distance = radius * (0.6 + Math.random() * 0.4);

      positions[i3] = direction.x * distance;
      positions[i3 + 1] = direction.y * distance;
      positions[i3 + 2] = direction.z * distance;
    }

    this.geometry = new THREE.BufferGeometry();

    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    this.material = new THREE.PointsMaterial({
      color: '#e2e8f0',
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    this.object3D = new THREE.Points(this.geometry, this.material);
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}