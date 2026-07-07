import type * as THREE from 'three';

export type CelestialBodyType = 'star' | 'planet' | 'moon';

export type CelestialBodyData = { //星体数据
  id: string;
  name: string;
  type: CelestialBodyType;

  radius: number;
  orbitRadius: number;

  rotationSpeed: number;
  orbitSpeed: number;

  color: string;
  textureUrl?: string;

  description: string;
  diameter: string;
  distanceFromSun: string;
  orbitalPeriod: string;
  rotationPeriod: string;
  moons: string;
};

export type SolarUpdatable = {
  tick: (deltaTime: number, speedMultiplier: number) => void;
};

export type SolarDisposable = {
  dispose: () => void;
};

export type CelestialBodyEntity = SolarUpdatable & // 星体实例，包含 Object3D、Mesh、动画、释放
  SolarDisposable & {
    id: string;
    data: CelestialBodyData;
    object3D: THREE.Object3D;
    mesh: THREE.Mesh;
    orbitGroup: THREE.Group;
  };

export type SolarSystemEntity = SolarUpdatable & // 整个太阳系对象，统一加入 scene、统一 tick、统一 dispose
  SolarDisposable & {
    object3D: THREE.Object3D;
    bodies: CelestialBodyEntity[];
  };