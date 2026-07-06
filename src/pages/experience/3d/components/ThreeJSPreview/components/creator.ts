import * as THREE from 'three';
import type { SceneEntity, SceneObject } from './types';

export function createRotatingCubeGroup():SceneEntity   {
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
    roughness: 0.4,
    metalness: 0.1,
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.castShadow = true;

  // 小球相对于 group 中心的位置
  sphere.position.set(1.2, 0.5, 0);

  group.position.set(0, 3, 0);

  group.add(cube);
  group.add(sphere);

  const rotationSpeed = 1.8;

  const tick = (deltaTime: number) => {
    group.rotation.y += rotationSpeed * deltaTime;
    group.rotation.x += rotationSpeed * deltaTime;
  };

  const dispose = () => {
    group.remove(cube);
    group.remove(sphere);
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

export function createFloor(): SceneObject  {
  const geometry = new THREE.PlaneGeometry(8, 8);

  const material = new THREE.MeshStandardMaterial({
    color: '#e0e0e0',
    roughness: 0.8,
    metalness: 0,
    side: THREE.FrontSide, // 默认的， 不写也行， 默认只是前面看能看到， 背面看就会消失
    // side: THREE.DoubleSide, // 两面都能看到， 但渲染成本高
  });

  const floor = new THREE.Mesh(geometry, material);

  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const dispose = () => {
    geometry.dispose();
    material.dispose();
  }

  return {
    object3D: floor,
    dispose,
  };
}

export function createLights(): SceneObject {
  const group = new THREE.Group();

  const ambientLight = new THREE.AmbientLight('#ffffff', 0.4);

  const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
  directionalLight.position.set(9, 120, -50);
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