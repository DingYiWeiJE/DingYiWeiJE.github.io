import * as THREE from 'three';
import type { CelestialBodyData } from './solarTypes';
import { OrbitLine } from './OrbitLine';
import { createGlowSprite } from './createGlowSprite';

export class CelestialBody {
  public readonly id: string;
  public readonly data: CelestialBodyData;

  public readonly object3D: THREE.Group;
  public readonly orbitGroup: THREE.Group;
  public readonly mesh: THREE.Mesh;

  private readonly geometry: THREE.SphereGeometry;
  private readonly material: THREE.MeshStandardMaterial;

  public readonly orbitLine: OrbitLine | null; // 运行轨道
  private readonly glow: ReturnType<typeof createGlowSprite> | null; // 光晕

  constructor(data: CelestialBodyData) {
    this.id = data.id;
    this.data = data;

    this.orbitGroup = new THREE.Group();
    
    this.object3D = this.orbitGroup;

    this.geometry = new THREE.SphereGeometry(data.radius, 48, 24);

    this.material = new THREE.MeshStandardMaterial({
      color: data.color,
      roughness: data.type === 'star' ? 0.35 : 0.65,
      metalness: 0.05,
      emissive: data.type === 'star' ? data.color : '#000000',
      emissiveIntensity: data.type === 'star' ? 1.2 : 0,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.name = data.id;
    this.mesh.userData.bodyId = data.id;
    this.mesh.userData.bodyType = data.type;

    this.mesh.castShadow = data.type !== 'star';
    this.mesh.receiveShadow = data.type !== 'star';

    this.mesh.position.set(data.orbitRadius, 0, 0);
    
    this.orbitLine = data.orbitRadius > 0
      ? new OrbitLine(data.orbitRadius)
      : null;

    if (this.orbitLine) {
      this.orbitGroup.add(this.orbitLine.object3D);
    }

    this.orbitGroup.add(this.mesh);
    
    this.glow = data.type === 'star'
      ? createGlowSprite('rgba(250, 204, 21, 1)', data.radius * 4)
      : null;

    if (this.glow) {
      this.mesh.add(this.glow.sprite);
    }

  }

  public add(child: CelestialBody) {
    this.mesh.add(child.object3D);
  }

  public tick(deltaTime: number, speedMultiplier: number) {
    this.mesh.rotation.y += dataSafeSpeed(this.data.rotationSpeed, deltaTime, speedMultiplier);

    if (this.data.orbitRadius > 0) {
      this.orbitGroup.rotation.y += dataSafeSpeed(this.data.orbitSpeed, deltaTime, speedMultiplier);
    }
  }

  public dispose() {
    this.orbitGroup.clear();
    this.orbitLine?.dispose();
    this.glow?.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }
}

function dataSafeSpeed(
  speed: number,
  deltaTime: number,
  speedMultiplier: number
) {
  return speed * deltaTime * speedMultiplier;
}