import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function ThreeJSPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 清空当前组件容器里的旧 canvas
    // 注意：只会清空这个 div 里的内容，不会影响页面其他 canvas
    container.innerHTML = '';

    // 1. 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#d6dee8');

    // 2. 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    // 把相机抬高一点，并看向 cube
    // camera.position.set(0, 2, 5); // 相机位置
    // camera.lookAt(0, 0.5, 0);  // 相机看向哪个坐标
    camera.position.set(3, 2.5, 5);
    camera.lookAt(0, 0.5, 0);

    // 3. 创建渲染器
    const renderer = new THREE.WebGLRenderer();  // 渲染器：将场景和相机渲染成图像
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 设置像素比，提高渲染质量

    renderer.shadowMap.enabled = true; // 开启阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 阴影类型

    renderer.setSize(container.clientWidth, container.clientHeight);

    // 把 Three.js 生成的 canvas 加到 div 里
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.enableDamping = true;
    controls.update();

    // 4. 创建立方体几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // 5. 创建材质：不同方向的面会显示不同颜色
    const material = new THREE.MeshStandardMaterial({
      color: '#4f8cff',
      roughness: 0.4, // 粗糙度，越低越亮、越像抛光表面
      metalness: 0.2, // 金属感，0 是非金属，1 是金属
    });

    // 6. 创建网格物体：几何体 + 材质
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;

    cube.position.y = 0.9;

    // 环境光：让暗面不要完全黑
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.4);
    scene.add(ambientLight);

    // 平行光：模拟太阳光，有明确方向
    const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
    directionalLight.position.set(9, 120, -50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    //创建地面
    const floorGeometry = new THREE.PlaneGeometry(8, 8);

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#e0e0e0',
      roughness: 0.8,
      metalness: 0,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;

    scene.add(floor);

    // 7. 把立方体加入场景
    scene.add(cube);

    function handleResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    // 8. 动画循环
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.03;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // 9. 组件卸载时清理资源
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();

      controls.dispose();

      floorGeometry.dispose();
      floorMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="w-full h-full bg-pink" >32423</div>;

  return <div ref={containerRef} className="w-full h-full" />;
}