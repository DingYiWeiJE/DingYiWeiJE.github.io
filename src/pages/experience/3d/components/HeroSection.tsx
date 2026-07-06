import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 2);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 2);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create central geometry
    const torusGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Wireframe overlay
    const wireframeGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    torus.add(wireframe);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate torus
      torus.rotation.x = time * 0.3 + mouseY * 0.5;
      torus.rotation.y = time * 0.5 + mouseX * 0.5;

      // Rotate particles
      particles.rotation.y = time * 0.05;

      // Animate lights
      pointLight1.position.x = Math.sin(time) * 10;
      pointLight1.position.z = Math.cos(time) * 10;

      pointLight2.position.x = Math.cos(time * 0.7) * 10;
      pointLight2.position.z = Math.sin(time * 0.7) * 10;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = canvas.clientWidth;
      const newHeight = canvas.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-6 text-sm tracking-widest text-cyan-400 uppercase">
          Real-time 3D Interactive Developer
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
          3D / Three.js / Unity
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-slate-300 mb-12">
          实时交互开发
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {['Three.js', 'WebGL', 'Shader', 'Unity', 'C#', 'TypeScript'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-sm hover:border-cyan-500/50 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-500 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-slate-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
