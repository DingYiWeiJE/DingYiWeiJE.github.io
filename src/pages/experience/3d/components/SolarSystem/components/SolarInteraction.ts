import * as THREE from 'three';
import { SolarSystem } from './SolarSystem';
import { CelestialBody } from './CelestialBody';

type SolarInteractionParams = {
  container: HTMLDivElement;
  camera: THREE.Camera;
  solarSystem: SolarSystem;
  onHoverChange?: (body: CelestialBody | null) => void;
  onSelect?: (body: CelestialBody | null) => void;
};

export class SolarInteraction {
  private readonly container: HTMLDivElement;
  private readonly camera: THREE.Camera;
  private readonly solarSystem: SolarSystem;

  private readonly raycaster: THREE.Raycaster;
  private readonly pointer: THREE.Vector2;

  private hoveredBody: CelestialBody | null = null;

  private pointerDownPosition: THREE.Vector2 | null = null;
  private hasDragged = false;

  private readonly dragThreshold = 6;

  private readonly onHoverChange?: (body: CelestialBody | null) => void;
  private readonly onSelect?: (body: CelestialBody | null) => void;

  constructor({
    container,
    camera,
    solarSystem,
    onHoverChange,
    onSelect,
  }: SolarInteractionParams) {
    this.container = container;
    this.camera = camera;
    this.solarSystem = solarSystem;
    this.onHoverChange = onHoverChange;
    this.onSelect = onSelect;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.container.addEventListener('pointermove', this.handlePointerMove);
    this.container.addEventListener('pointerdown', this.handlePointerDown);
    this.container.addEventListener('pointerup', this.handlePointerUp);
    this.container.addEventListener('pointercancel', this.handlePointerCancel);
  }

  private updatePointer(event: MouseEvent | PointerEvent) {
    const rect = this.container.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private getIntersectedBody() {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.solarSystem.getInteractiveObjects(),
      false
    );

    if (intersects.length === 0) {
      return null;
    }

    return this.solarSystem.getBodyByObject(intersects[0].object);
  }

  private handlePointerDown = (event: PointerEvent) => {
    this.pointerDownPosition = new THREE.Vector2(event.clientX, event.clientY);
    this.hasDragged = false;

    if (this.container.hasPointerCapture?.(event.pointerId) === false) {
      this.container.setPointerCapture?.(event.pointerId);
    }
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (this.pointerDownPosition) {
      const currentPosition = new THREE.Vector2(event.clientX, event.clientY);

      if (
        currentPosition.distanceTo(this.pointerDownPosition) >
        this.dragThreshold
      ) {
        this.hasDragged = true;
      }
    }

    this.updatePointer(event);

    const nextBody = this.getIntersectedBody();

    if (nextBody === this.hoveredBody) {
      return;
    }

    this.hoveredBody?.setHovered(false);
    nextBody?.setHovered(true);

    this.hoveredBody = nextBody;
    this.container.style.cursor = nextBody ? 'pointer' : 'default';

    this.onHoverChange?.(nextBody);
  };

  private handlePointerUp = (event: PointerEvent) => {
    if (!this.pointerDownPosition) {
      return;
    }

    if (this.container.hasPointerCapture?.(event.pointerId)) {
      this.container.releasePointerCapture?.(event.pointerId);
    }

    const pointerUpPosition = new THREE.Vector2(event.clientX, event.clientY);
    const moveDistance = pointerUpPosition.distanceTo(this.pointerDownPosition);

    this.pointerDownPosition = null;

    if (this.hasDragged || moveDistance > this.dragThreshold) {
      this.hasDragged = false;
      return;
    }

    this.updatePointer(event);

    const selectedBody = this.getIntersectedBody();

    this.onSelect?.(selectedBody);
  };

  private handlePointerCancel = (event: PointerEvent) => {
    if (this.container.hasPointerCapture?.(event.pointerId)) {
      this.container.releasePointerCapture?.(event.pointerId);
    }

    this.pointerDownPosition = null;
    this.hasDragged = false;
  };

  public dispose() {
    this.hoveredBody?.setHovered(false);
    this.hoveredBody = null;

    this.container.removeEventListener('pointermove', this.handlePointerMove);
    this.container.removeEventListener('pointerdown', this.handlePointerDown);
    this.container.removeEventListener('pointerup', this.handlePointerUp);
    this.container.removeEventListener('pointercancel', this.handlePointerCancel);

    this.container.style.cursor = 'default';
  }
}