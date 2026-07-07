import * as THREE from 'three';
import type { Interactable } from './types';

type InteractionParams = {
  container: HTMLDivElement;
  camera: THREE.Camera;
  interactables: Interactable[];
  onSelect?: (item: Interactable | null) => void;
};

export function createInteraction({
  container,
  camera,
  interactables,
  onSelect,
}: InteractionParams) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  let currentHovered: Interactable | null = null;
  let currentSelected: Interactable | null = null;

  const updatePointer = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();

    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const getIntersectedItem = () => {
    raycaster.setFromCamera(pointer, camera);

    const objects = interactables.map((item) => item.object3D);
    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length === 0) {
      return null;
    }

    const hitObject = intersects[0].object;

    return (
      interactables.find((item) => item.object3D === hitObject) ?? null
    );
  };

  const handlePointerMove = (event: PointerEvent) => {
    updatePointer(event);

    const nextHovered = getIntersectedItem();

    if (nextHovered === currentHovered) {
      return;
    }

    if (currentHovered && currentHovered !== currentSelected) {
      currentHovered.onPointerLeave?.();
    }

    currentHovered = nextHovered;

    if (currentHovered && currentHovered !== currentSelected) {
      currentHovered.onPointerEnter?.();
    }

    container.style.cursor = currentHovered ? 'pointer' : 'default';
  };

  const handlePointerDown = (event: PointerEvent) => {
    updatePointer(event);

    const selected = getIntersectedItem();

    if (!selected) {
      if (currentSelected) {
        currentSelected.onDeselect?.();
        currentSelected = null;
      }

      onSelect?.(null);
      return;
    }

    if (currentSelected && currentSelected !== selected) {
      currentSelected.onDeselect?.();
    }

    currentSelected = selected;
    currentSelected.onSelect?.();

    onSelect?.(selected);
  };

  container.addEventListener('pointermove', handlePointerMove);
  container.addEventListener('pointerdown', handlePointerDown);

  const dispose = () => {
    container.removeEventListener('pointermove', handlePointerMove);
    container.removeEventListener('pointerdown', handlePointerDown);
    container.style.cursor = 'default';
  };

  return {
    dispose,
  };
}