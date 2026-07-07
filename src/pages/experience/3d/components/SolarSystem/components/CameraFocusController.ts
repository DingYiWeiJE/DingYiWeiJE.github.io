import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CelestialBody } from './CelestialBody';

type CameraFocusControllerParams = {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
};

type FocusMode = 'idle' | 'transitionToBody' | 'transitionToDefault' | 'follow';

export class CameraFocusController {
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;

  private focusedBody: CelestialBody | null = null;
  private mode: FocusMode = 'idle';

  private readonly defaultCameraPosition = new THREE.Vector3(0, 8, 18);
  private readonly defaultTarget = new THREE.Vector3(0, 0, 0);

  private readonly startCameraPosition = new THREE.Vector3();
  private readonly startTarget = new THREE.Vector3();

  private readonly desiredCameraPosition = new THREE.Vector3();
  private readonly desiredTarget = new THREE.Vector3();

  private readonly currentBodyPosition = new THREE.Vector3();
  private readonly previousBodyPosition = new THREE.Vector3();
  private readonly delta = new THREE.Vector3();

  private transitionElapsed = 0;
  private transitionDuration = 0.8;

  constructor({ camera, controls }: CameraFocusControllerParams) {
    this.camera = camera;
    this.controls = controls;
  }

  public focus(body: CelestialBody | null) {
    this.focusedBody = body;

    this.startCameraPosition.copy(this.camera.position);
    this.startTarget.copy(this.controls.target);

    this.transitionElapsed = 0;

    if (!body) {
      this.mode = 'transitionToDefault';
      this.transitionDuration = 0.8;

      this.desiredCameraPosition.copy(this.defaultCameraPosition);
      this.desiredTarget.copy(this.defaultTarget);
      return;
    }

    this.mode = 'transitionToBody';
    this.transitionDuration = 0.8;

    body.mesh.getWorldPosition(this.currentBodyPosition);
    this.previousBodyPosition.copy(this.currentBodyPosition);

    const direction = new THREE.Vector3(1, 0.65, 1).normalize();
    const distance = Math.max(body.data.radius * 7, 2.2);

    this.desiredTarget.copy(this.currentBodyPosition);
    this.desiredCameraPosition
      .copy(this.currentBodyPosition)
      .addScaledVector(direction, distance);
  }

  public tick(deltaTime: number) {
    if (this.mode === 'transitionToBody') {
      this.tickTransitionToBody(deltaTime);
    } else if (this.mode === 'transitionToDefault') {
      this.tickTransitionToDefault(deltaTime);
    } else if (this.mode === 'follow') {
      this.tickFollow();
    }

    this.controls.update();
  }

  private tickTransitionToBody(deltaTime: number) {
    if (!this.focusedBody) {
      this.mode = 'idle';
      return;
    }

    this.transitionElapsed += deltaTime;

    const progress = Math.min(
      this.transitionElapsed / this.transitionDuration,
      1
    );

    const easedProgress = this.easeOutCubic(progress);

    this.focusedBody.mesh.getWorldPosition(this.currentBodyPosition);

    const bodyMoveDelta = this.delta.subVectors(
      this.currentBodyPosition,
      this.previousBodyPosition
    );

    this.desiredTarget.add(bodyMoveDelta);
    this.desiredCameraPosition.add(bodyMoveDelta);

    this.camera.position
      .copy(this.startCameraPosition)
      .lerp(this.desiredCameraPosition, easedProgress);

    this.controls.target
      .copy(this.startTarget)
      .lerp(this.desiredTarget, easedProgress);

    this.previousBodyPosition.copy(this.currentBodyPosition);

    if (progress < 1) {
      return;
    }

    this.focusedBody.mesh.getWorldPosition(this.previousBodyPosition);
    this.mode = 'follow';
  }

  private tickTransitionToDefault(deltaTime: number) {
    this.transitionElapsed += deltaTime;

    const progress = Math.min(
      this.transitionElapsed / this.transitionDuration,
      1
    );

    const easedProgress = this.easeOutCubic(progress);

    this.camera.position
      .copy(this.startCameraPosition)
      .lerp(this.defaultCameraPosition, easedProgress);

    this.controls.target
      .copy(this.startTarget)
      .lerp(this.defaultTarget, easedProgress);

    if (progress >= 1) {
      this.mode = 'idle';
    }
  }

  private tickFollow() {
    if (!this.focusedBody) {
      this.mode = 'idle';
      return;
    }

    this.focusedBody.mesh.getWorldPosition(this.currentBodyPosition);

    this.delta.subVectors(this.currentBodyPosition, this.previousBodyPosition);

    this.controls.target.add(this.delta);
    this.camera.position.add(this.delta);

    this.previousBodyPosition.copy(this.currentBodyPosition);
  }

  private easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  public dispose() {
    this.focusedBody = null;
    this.mode = 'idle';
  }
}