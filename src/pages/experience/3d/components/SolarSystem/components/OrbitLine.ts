import * as THREE from 'three';

export class OrbitLine {
  public readonly object3D: THREE.Line;

  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.LineBasicMaterial;

  constructor(radius: number, color = '#334155') {
    const points: THREE.Vector3[] = [];

    const segments = 160;

    for (let i = 0; i <= segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }

    this.geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.55,
    });

    this.object3D = new THREE.Line(this.geometry, this.material);
  }

  public setHighlighted(highlighted: boolean) {
    this.material.color.set(highlighted ? '#facc15' : '#334155');
    this.material.opacity = highlighted ? 0.95 : 0.55;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}