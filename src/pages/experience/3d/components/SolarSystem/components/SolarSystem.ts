import * as THREE from 'three';
import { CelestialBody } from './CelestialBody';
import { solarBodiesData } from './solarData';

export class SolarSystem {
  public readonly object3D: THREE.Group;
  public readonly bodies: CelestialBody[];

  private readonly bodyMap: Map<string, CelestialBody>;

  constructor() {
    this.object3D = new THREE.Group();
    this.bodyMap = new Map();

    for (const data of solarBodiesData) {
      const body = new CelestialBody(data);

      this.bodyMap.set(data.id, body);
    }

    const sun = this.getBody('sun');

    for (const body of this.bodyMap.values()) {
      if (body.id === 'sun' || body.id === 'moon') {
        continue;
      }

      sun.object3D.add(body.object3D);
    }

    const earth = this.getBody('earth');
    const moon = this.getBody('moon');

    earth.add(moon);

    this.object3D.add(sun.object3D);

    this.bodies = Array.from(this.bodyMap.values());
  }

  public getBody(id: string) {
    const body = this.bodyMap.get(id);

    if (!body) {
      throw new Error(`Solar body not found: ${id}`);
    }

    return body;
  }

  public getInteractiveObjects() {
    return this.bodies.map((body) => body.mesh);
  }

  public getBodyByObject(object: THREE.Object3D) {
    return this.bodies.find((body) => body.mesh === object) ?? null;
  }

  public tick(deltaTime: number, speedMultiplier: number) {
    for (const body of this.bodies) {
      body.tick(deltaTime, speedMultiplier);
    }
  }

  public dispose() {
    for (const body of this.bodies) {
      body.dispose();
    }

    this.object3D.clear();
    this.bodyMap.clear();
  }
}