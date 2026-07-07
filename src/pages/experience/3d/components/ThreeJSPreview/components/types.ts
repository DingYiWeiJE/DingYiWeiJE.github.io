import type * as THREE from 'three';

export type Interactable = {
  object3D: THREE.Object3D;
  title: string;
  description: string;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onSelect?: () => void;
  onDeselect?: () => void;
};

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

export type InteractiveSceneEntity = SceneEntity & {
  interactables: Interactable[];
};