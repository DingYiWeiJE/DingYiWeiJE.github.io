import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function DataVisualizationPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Create data points
    const points: THREE.Mesh[] = [];
    const group = new THREE.Group();

    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(i / 50, 1, 0.5),
        emissive: new THREE.Color().setHSL(i / 50, 1, 0.3),
      });
      const point = new THREE.Mesh(geometry, material);

      const angle = (i / 50) * Math.PI * 2;
      const radius = 3;
      point.position.x = Math.cos(angle) * radius;
      point.position.y = Math.sin(angle) * radius;
      point.userData = { angle, radius, offset: i };

      group.add(point);
      points.push(point);
    }

    scene.add(group);

    // Animation
    let time = 0;
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      group.rotation.z = time * 0.2;

      points.forEach((point) => {
        const scale = 1 + Math.sin(time * 2 + point.userData.offset) * 0.3;
        point.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
