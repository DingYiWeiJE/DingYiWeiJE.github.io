import * as THREE from 'three';
import type { CelestialBodyData } from './solarTypes';
import { OrbitLine } from './OrbitLine';
import { createGlowSprite } from './createGlowSprite';
import { createBodyLabel } from './createBodyLabel';

export class CelestialBody {
  public readonly id: string;
  public readonly data: CelestialBodyData;

  public readonly object3D: THREE.Group;
  public readonly orbitGroup: THREE.Group;
  public readonly mesh: THREE.Mesh;

  private readonly geometry: THREE.SphereGeometry;
  private readonly material: THREE.Material;
  private texture: THREE.Texture | null = null;
  private readonly label: ReturnType<typeof createBodyLabel>;

  private readonly attachments: Array<{ // 附加对象
    object3D: THREE.Object3D;
    dispose: () => void;
  }>;

  public readonly orbitLine: OrbitLine | null; // 运行轨道
  private readonly glow: ReturnType<typeof createGlowSprite> | null; // 光晕

  constructor(data: CelestialBodyData) {
    this.id = data.id;
    this.data = data;
    this.attachments = [];

    this.orbitGroup = new THREE.Group();
    
    this.object3D = this.orbitGroup;

    this.geometry = new THREE.SphereGeometry(data.radius, 48, 24);

    if (data.textureUrl) {
      this.texture = new THREE.TextureLoader().load(data.textureUrl);
      this.texture.colorSpace = THREE.SRGBColorSpace;
    }

    if (data.type === 'star') {
      this.material = new THREE.MeshBasicMaterial({
        color: this.texture ? '#ffffff' : data.color,
        map: this.texture ?? undefined,
      });
    } else {
      this.material = new THREE.MeshStandardMaterial({
        color: this.texture ? '#ffffff' : data.color,
        map: this.texture ?? undefined,
        roughness: 0.65,
        metalness: 0.05,
      });
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.label = createBodyLabel({
      text: data.name,
      radius: data.radius,
    });

    this.mesh.add(this.label.sprite);

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

    if (data.id === 'saturn') {
      const ring = this.createSaturnRing(data.radius);

      this.mesh.add(ring.object3D);
      this.attachments.push(ring);
    }
    
    this.glow = data.type === 'star'
      ? createGlowSprite('rgba(250, 204, 21, 1)', data.radius * 4)
      : null;

    if (this.glow) {
      this.mesh.add(this.glow.sprite);
    }

  }

  public setHovered(hovered: boolean) {
    this.label.sprite.visible = hovered;

    if (this.data.type !== 'star') {
      const scale = hovered ? 1.15 : 1;
      this.mesh.scale.setScalar(scale);
    }

    this.orbitLine?.setHighlighted(hovered);
  }

  private createSaturnRing(radius: number) {
    const group = new THREE.Group();

    const ringGeometries: THREE.RingGeometry[] = [];
    const ringMaterials: THREE.MeshBasicMaterial[] = [];

    const ringConfigs = [
      {
        inner: radius * 1.35,
        outer: radius * 1.55,
        opacity: 0.28,
        color: '#f8e6a0',
      },
      {
        inner: radius * 1.65,
        outer: radius * 1.95,
        opacity: 0.38,
        color: '#e8d7a0',
      },
      {
        inner: radius * 2.05,
        outer: radius * 2.25,
        opacity: 0.22,
        color: '#c7b98a',
      },
    ];

    for (const config of ringConfigs) {
      const geometry = new THREE.RingGeometry(
        config.inner,
        config.outer,
        192
      );

      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const ring = new THREE.Mesh(geometry, material);

      ring.rotation.x = Math.PI / 2;

      group.add(ring);

      ringGeometries.push(geometry);
      ringMaterials.push(material);
    }

    const particleCount = 900;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color('#f8e6a0');
    const colorB = new THREE.Color('#8a7f63');

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;

      const angle = Math.random() * Math.PI * 2;
      const distance = radius * (1.35 + Math.random() * 0.95);

      const thickness = (Math.random() - 0.5) * radius * 0.08;

      positions[i3] = Math.cos(angle) * distance;
      positions[i3 + 1] = thickness;
      positions[i3 + 2] = Math.sin(angle) * distance;

      const mixedColor = colorA.clone().lerp(colorB, Math.random());

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: radius * 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);

    group.add(particles);

    group.rotation.z = Math.PI * 0.08;

    const dispose = () => {
      for (const geometry of ringGeometries) {
        geometry.dispose();
      }

      for (const material of ringMaterials) {
        material.dispose();
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
    };

    return {
      object3D: group,
      dispose,
    };
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
    this.label.dispose();

    for (const attachment of this.attachments) {
      attachment.dispose();
    }

    this.geometry.dispose();
    this.material.dispose();
    this.texture?.dispose();
  }
}

function dataSafeSpeed(
  speed: number,
  deltaTime: number,
  speedMultiplier: number
) {
  return speed * deltaTime * speedMultiplier;
}