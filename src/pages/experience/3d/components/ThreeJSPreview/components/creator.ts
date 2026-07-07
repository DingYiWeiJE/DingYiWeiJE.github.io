import * as THREE from 'three';
import type { Interactable, InteractiveSceneEntity, SceneEntity, SceneObject } from './types';
import { createTextSprite } from './sprite';

export function createHeroCore(): SceneEntity {
  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4); //segments 控制几何体细分程度。

  // const material = new THREE.MeshBasicMaterial({ // MeshBasicMaterial 不参与光照的
  //   color: '#4f8cff',
  // });

  // MeshBasicMaterial：不吃光，适合 UI、调试、纯色展示
  // MeshStandardMaterial：吃光，适合真实材质、PBR、模型展示

  const material = new THREE.MeshStandardMaterial({
    color: '#4f8cff',
    roughness: 0.4,
    metalness: 0.2,
    // emissive: '#1d4ed8', // 自发光
    // emissiveIntensity: 0.5, // 自发光强度
    // transparent: true, // 启用透明
    // opacity: 0.35,  // 透明度 只有启用透明之后才生效
    // depthWrite: false, // 是否写入深度缓冲区， 默认是 true， 如果是透明物体， 需要设置为 false, ,如果非透明物体， false的话， 会让所有对象都渲染在自己前面
    // wireframe: true, //wireframe 用来观察几何体的三角面 / 网格结构。
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.castShadow = true;
  cube.position.set(0, 0, 0);
  cube.scale.set(1, 1, 1);
  cube.rotation.z = Math.PI / 4;

  const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 16);//radius：半径 widthSegments：横向细分 eightSegments：纵向细分

  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: '#ff8a4f',
    roughness: 0.35,
    metalness: 0.25,
    emissive: '#7c2d12',
    emissiveIntensity: 0.15,
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.castShadow = true;

  // 小球相对于 group 中心的位置
  sphere.position.set(1.2, 0.5, 0);

  group.position.set(0, 1.2, 0);

  group.add(cube);
  group.add(sphere);

  const rotationSpeed = 1.2;
  const elapsedTime = 0;

  const tick = (deltaTime: number) => {
    group.rotation.y += rotationSpeed * deltaTime;
    group.rotation.x = Math.sin(elapsedTime * 1.4) * 0.18;
  };

  const dispose = () => {
    group.clear();
    sphereGeometry.dispose();
    sphereMaterial.dispose();
    geometry.dispose();
    material.dispose();
  }

  return {
    object3D: group,
    tick,
    dispose,
  };
}


export function createOrbitNodes(): InteractiveSceneEntity {
  const group = new THREE.Group();

  const radius = 1.8;
  const nodeCount = 4;
  const nodeInfos = [
    {
      title: '前端工程',
      description: 'React、TypeScript、组件架构和响应式 UI。',
    },
    {
      title: 'Three.js 3D',
      description: '场景、相机、渲染器、灯光、材质、动画和交互。',
    },
    {
      title: '性能优化',
      description: '渲染循环控制、资源释放、像素比和运行时优化。',
    },
    {
      title: '系统设计',
      description: '模块化结构、类型化实体、可复用生命周期和可扩展场景设计。',
    },
  ];

  const ringGeometry = new THREE.TorusGeometry(
    radius,
    0.012,
    8,
    128
  );

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: '#8b5cf6',
    roughness: 0.45,
    metalness: 0.35,
    transparent: true,
    opacity: 0.45,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.5;

  group.add(ring);

  const nodeGeometry = new THREE.SphereGeometry(0.12, 24, 12);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: '#8b5cf6',
    transparent: true,
    opacity: 0.28,
  });

  const interactables: Interactable[] = [];
  const labelDisposers: Array<() => void> = [];
  const nodeMaterials: THREE.MeshStandardMaterial[] = [];

  for (let i = 0; i < nodeCount; i += 1) {
    const info = nodeInfos[i];
    const label = createTextSprite({
      text: info.title,
    });

    group.add(label.sprite);
    const angle = (i / nodeCount) * Math.PI * 2;

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: '#8b5cf6',
      roughness: 0.35,
      metalness: 0.25,
      emissive: '#000000',
      emissiveIntensity: 0,
    });
    nodeMaterials.push(nodeMaterial);

    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

    

    label.sprite.position.copy(node.position);
    label.sprite.position.y += 0.35;
    label.sprite.visible = false;

    labelDisposers.push(label.dispose);
    
    interactables.push({
      object3D: node,
      title: info.title,
      description: info.description,
      onPointerEnter: () => {
        node.scale.setScalar(1.6);
        nodeMaterial.emissive.set('#8b5cf6');
        nodeMaterial.emissiveIntensity = 0.45;
      },
      onPointerLeave: () => {
        node.scale.setScalar(1);
        nodeMaterial.emissive.set('#000000');
        nodeMaterial.emissiveIntensity = 0;
      },
      onSelect: () => {
        node.scale.setScalar(1.9);
        nodeMaterial.emissive.set('#a855f7');
        nodeMaterial.emissiveIntensity = 0.9;

        for (const child of group.children) {
          if (child instanceof THREE.Sprite) {
            child.visible = false;
          }
        }

        label.sprite.visible = true;
      },
      onDeselect: () => {
        node.scale.setScalar(1);
        nodeMaterial.emissive.set('#000000');
        nodeMaterial.emissiveIntensity = 0;
        label.sprite.visible = false;
      },
    });

    node.castShadow = true;
    node.position.set(
      Math.cos(angle) * radius,
      0.5,
      Math.sin(angle) * radius
    );

    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.5, 0),
      node.position.clone(),
    ]);

    const line = new THREE.Line(lineGeometry, lineMaterial);  

    group.add(node);
    group.add(line);
  }

  group.position.set(0, 1.2, 0);

  const rotationSpeed = -0.8;

  const tick = (deltaTime: number) => {
    group.rotation.y += rotationSpeed * deltaTime;
  };

  const dispose = () => {
    group.traverse((child) => {
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
      }
    });
    for (const material of nodeMaterials) {
      material.dispose();
    }
    for (const disposeLabel of labelDisposers) {
      disposeLabel();
    }
    group.clear();

    ringGeometry.dispose();
    ringMaterial.dispose();

    nodeGeometry.dispose();
    lineMaterial.dispose();
  };

  return {
    object3D: group,
    tick,
    dispose,
    interactables,
  };
}

export function createFloor(): SceneObject {
  const group = new THREE.Group();

  const geometry = new THREE.PlaneGeometry(8, 8);

  const material = new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.9,
    metalness: 0.15,
  });

  const floor = new THREE.Mesh(geometry, material);

  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const grid = new THREE.GridHelper(8, 24, '#475569', '#334155');
  // new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid) // 中心线的颜色，网格线的颜色 divisions表示网格线数量 size 表示网格大小

  grid.position.y = 0.01;

  group.add(floor);
  group.add(grid);

  const dispose = () => {
    group.clear();

    geometry.dispose();
    material.dispose();

    grid.dispose();
  };

  return {
    object3D: group,
    dispose,
  };
}

export function createLights(): SceneObject {
  const group = new THREE.Group();

  const ambientLight = new THREE.AmbientLight('#ffffff', 0.25);

  const directionalLight = new THREE.DirectionalLight('#ffffff', 2.6);
  directionalLight.position.set(4, 8, 5);
  directionalLight.castShadow = true;

  group.add(ambientLight);
  group.add(directionalLight);

  const dispose = () => {
    directionalLight.shadow.map?.dispose();

    group.remove(ambientLight);
    group.remove(directionalLight);
  };

  return {
    object3D: group,
    dispose,
  };
}


export function createHelpers(): SceneObject  {
  const axesHelper = new THREE.AxesHelper(3);

  const dispose = () => {
    axesHelper.dispose();
  };

  return {
    object3D: axesHelper,
    dispose,
  };
}