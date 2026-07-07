import * as THREE from 'three';

export class StarSphere {
  public readonly object3D: THREE.Mesh;

  private readonly geometry: THREE.SphereGeometry;
  private readonly material: THREE.MeshBasicMaterial;
  private readonly texture: THREE.Texture;

  constructor(textureUrl: string, radius = 95) {
    this.geometry = new THREE.SphereGeometry(radius, 64, 32);

    this.texture = new THREE.TextureLoader().load(textureUrl);
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.BackSide,
      depthWrite: false,
    });

    this.object3D = new THREE.Mesh(this.geometry, this.material);
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}