import type * as THREE from 'three';

export type Updatable = {
  tick: (deltaTime: number) => void;
};

export type Disposable = {
  dispose: () => void;
};

export type SceneObject = Disposable & {
  object3D: THREE.Object3D;
};

export type SceneEntity = SceneObject & Updatable;