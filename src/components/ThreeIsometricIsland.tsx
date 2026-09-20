import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sun, Moon, Grid, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';
import { LEON_PROFILE_FALLBACK } from '../data/projects';

interface ThreeIsometricIslandProps {
  className?: string;
  portraitUrl?: string;
}

export const ThreeIsometricIsland: React.FC<ThreeIsometricIslandProps> = ({
  className = '',
  portraitUrl
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const islandGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    // Scene
    const scene = new THREE.Scene();

    // Isometric-like camera
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(5.5, 4.8, 6.0);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Island Group
    const islandGroup = new THREE.Group();
    islandGroupRef.current = islandGroup;

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x223355 : 0xffffff, 
      isNightMode ? 1.2 : 0.9
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      isNightMode ? 0x60a5fa : 0xffedd5, 
      isNightMode ? 1.5 : 2.2
    );
    dirLight.position.set(4, 8, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 10);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Materials
    const grassColor = isNightMode ? 0x166534 : 0x22c55e;
    const dirtColor = isNightMode ? 0x334155 : 0x78350f;
    const pathColor = isNightMode ? 0x475569 : 0xd97706;

    const grassMat = new THREE.MeshStandardMaterial({
      color: grassColor,
      roughness: 0.6,
      wireframe: isWireframe
    });

    const dirtMat = new THREE.MeshStandardMaterial({
      color: dirtColor,
      roughness: 0.9,
      wireframe: isWireframe
    });

    const pathMat = new THREE.MeshStandardMaterial({
      color: pathColor,
      roughness: 0.8,
      wireframe: isWireframe
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.8,
      wireframe: isWireframe
    });

    const leavesMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x064e3b : 0x15803d,
      roughness: 0.5,
      wireframe: isWireframe
    });

    // Helper block
    const createBlock = (w: number, h: number, d: number, x: number, y: number, z: number, topMat: THREE.Material, baseMat: THREE.Material) => {
      // Base dirt/stone
      const baseGeo = new THREE.BoxGeometry(w, h * 0.8, d);
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.set(x, y - (h * 0.1), z);
      islandGroup.add(baseMesh);

      // Top grass layer
      const topGeo = new THREE.BoxGeometry(w * 1.02, h * 0.22, d * 1.02);
      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.position.set(x, y + (h * 0.4), z);
      islandGroup.add(topMesh);

      if (isWireframe) {
        const edges = new THREE.EdgesGeometry(baseGeo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x38bdf8 }));
        line.position.copy(baseMesh.position);
        islandGroup.add(line);
      }
    };

    // 1. Center tiered island blocks
    createBlock(3.2, 1.0, 3.2, 0, 0, 0, grassMat, dirtMat);
    createBlock(1.8, 0.6, 2.0, 0.4, 0.8, -0.3, grassMat, dirtMat);
    createBlock(1.2, 0.5, 1.2, -0.6, 0.6, 0.6, pathMat, dirtMat);
    createBlock(0.8, 0.4, 0.8, 0.8, 1.2, -0.5, grassMat, dirtMat);

    // 2. Stepped path blocks
    const pathPositions = [
      [-0.8, 0.45, 0.2],
      [-0.4, 0.45, -0.2],
      [0.1, 0.45, -0.6],
      [0.6, 0.55, 0.3]
    ];
    pathPositions.forEach(([px, py, pz]) => {
      const stepGeo = new THREE.BoxGeometry(0.5, 0.08, 0.5);
      const stepMesh = new THREE.Mesh(stepGeo, pathMat);
      stepMesh.position.set(px, py, pz);
      islandGroup.add(stepMesh);
    });

    // 3. Low-poly stylized trees
    const addTree = (tx: number, ty: number, tz: number, scale = 1) => {
      const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.12 * scale, 0.6 * scale, 5);
      const trunk = new THREE.Mesh(trunkGeo, woodMat);
      trunk.position.set(tx, ty + (0.3 * scale), tz);
      islandGroup.add(trunk);

      // Tiered foliage cones
      const foliage1 = new THREE.ConeGeometry(0.45 * scale, 0.7 * scale, 5);
      const foliage1Mesh = new THREE.Mesh(foliage1, leavesMat);
      foliage1Mesh.position.set(tx, ty + (0.8 * scale), tz);
      islandGroup.add(foliage1Mesh);

      const foliage2 = new THREE.ConeGeometry(0.35 * scale, 0.55 * scale, 5);
      const foliage2Mesh = new THREE.Mesh(foliage2, leavesMat);
      foliage2Mesh.position.set(tx, ty + (1.15 * scale), tz);
      islandGroup.add(foliage2Mesh);
    };

    addTree(-1.1, 0.5, -0.9, 1.1);
    addTree(-1.2, 0.5, 0.8, 0.8);
    addTree(1.1, 0.5, 1.1, 0.9);
    addTree(1.2, 0.9, -0.8, 0.7);

    // 4. Floating Voxel Mystery Block / Gem (rotating)
    const floatGemGeo = new THREE.OctahedronGeometry(0.24);
    const floatGemMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const floatGem = new THREE.Mesh(floatGemGeo, floatGemMat);
    floatGem.position.set(-1.4, 1.5, -0.2);
    islandGroup.add(floatGem);

    // Floating Voxel Grass Cube
    const floatCubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const floatCube = new THREE.Mesh(floatCubeGeo, grassMat);
    floatCube.position.set(1.5, 1.3, 0.5);
    islandGroup.add(floatCube);

    // 5. Base Cyber Grid below
    const gridHelper = new THREE.GridHelper(6, 12, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -0.9;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    islandGroup.add(gridHelper);

    scene.add(islandGroup);

    // Animation
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isAutoRotate && !isDraggingRef.current) {
        islandGroup.rotation.y += 0.006;
      }

      // Gentle floating bob
      islandGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Rotate floating gem & cube
      floatGem.rotation.y += 0.02;
      floatGem.position.y = 1.5 + Math.sin(elapsed * 2.5) * 0.1;

      floatCube.rotation.x += 0.01;
      floatCube.rotation.y += 0.015;
      floatCube.position.y = 1.3 + Math.cos(elapsed * 2.0) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    // Mouse Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      islandGroup.rotation.y += deltaX * 0.01;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      islandGroup.rotation.y += deltaX * 0.01;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [isWireframe, isNightMode, isAutoRotate]);

  return (
    <div className={`relative group select-none cursor-grab active:cursor-grabbing ${className}`}>
      {/* 3D Canvas */}
      <div 
        ref={containerRef} 
        className="w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden flex items-center justify-center"
      />

      {/* Center Developer Portrait Frame overlay matching the exact design */}
      {portraitUrl && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 shadow-2xl shadow-cyan-500/40 animate-pulse-glow">
            <img
              src={portraitUrl}
              onError={(e) => {
                e.currentTarget.src = LEON_PROFILE_FALLBACK;
              }}
              alt="Leon Developer"
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-contain bg-slate-950/80"
            />
            {/* Level badge */}
            <div className="absolute -bottom-1 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono-code shadow">
              DEV LVL.99
            </div>
          </div>
        </div>
      )}

      {/* Floating Island HUD Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2 text-cyan-300 font-mono-code text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>ISLAND WORLD // RUNTIME</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              playSound('blip');
              setIsWireframe(!isWireframe);
            }}
            title="Toggle Wireframe"
            className={`p-1.5 rounded-lg border transition-all ${
              isWireframe 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                : 'border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              playSound('coin');
              setIsNightMode(!isNightMode);
            }}
            title="Toggle Day / Night"
            className={`p-1.5 rounded-lg border transition-all ${
              isNightMode 
                ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300' 
                : 'border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isNightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              playSound('click');
              setIsAutoRotate(!isAutoRotate);
            }}
            title="Toggle Orbit Rotation"
            className={`p-1.5 rounded-lg border transition-all ${
              isAutoRotate 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                : 'border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
