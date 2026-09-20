import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Eye } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ThreeWireframeCarProps {
  interactive?: boolean;
  className?: string;
  glowColor?: string;
  autoRotateSpeed?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ThreeWireframeCar: React.FC<ThreeWireframeCarProps> = ({
  interactive = true,
  className = '',
  glowColor = '#38bdf8',
  autoRotateSpeed = 0.012,
  size = 'md'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWireframeOnly, setIsWireframeOnly] = useState(true);
  const [currentColor, setCurrentColor] = useState(glowColor);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const carGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.5, 2.2, 4.5);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Car Group
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;

    // Materials
    const edgeColorHex = new THREE.Color(currentColor);
    const lineMat = new THREE.LineBasicMaterial({
      color: edgeColorHex,
      transparent: true,
      opacity: 0.9,
      linewidth: 1
    });

    const meshMat = new THREE.MeshBasicMaterial({
      color: 0x070c18,
      wireframe: false,
      transparent: true,
      opacity: isWireframeOnly ? 0.35 : 0.85
    });

    // Helper to add wireframe mesh
    const addCarPart = (geometry: THREE.BufferGeometry, posX: number, posY: number, posZ: number, rotZ = 0) => {
      const mesh = new THREE.Mesh(geometry, meshMat);
      mesh.position.set(posX, posY, posZ);
      mesh.rotation.z = rotZ;
      carGroup.add(mesh);

      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, lineMat);
      line.position.set(posX, posY, posZ);
      line.rotation.z = rotZ;
      carGroup.add(line);
      return { mesh, line };
    };

    // 1. Main body / chassis
    const chassisGeo = new THREE.BoxGeometry(3.2, 0.55, 1.4);
    addCarPart(chassisGeo, 0, 0.45, 0);

    // 2. Cabin / Cockpit (aerodynamic slope)
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.5, 1.15);
    addCarPart(cabinGeo, -0.2, 0.9, 0);

    // 3. Hood slope
    const hoodGeo = new THREE.BoxGeometry(1.0, 0.2, 1.25);
    addCarPart(hoodGeo, 0.9, 0.65, 0, -0.15);

    // 4. Rear spoiler
    const spoilerGeo = new THREE.BoxGeometry(0.35, 0.08, 1.35);
    addCarPart(spoilerGeo, -1.45, 1.05, 0);
    const spoilerPostL = new THREE.BoxGeometry(0.08, 0.35, 0.08);
    addCarPart(spoilerPostL, -1.45, 0.85, 0.45);
    const spoilerPostR = new THREE.BoxGeometry(0.08, 0.35, 0.08);
    addCarPart(spoilerPostR, -1.45, 0.85, -0.45);

    // 5. Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
    wheelGeo.rotateX(Math.PI / 2);

    const wheelPositions = [
      [0.95, 0.32, 0.72],
      [-0.95, 0.32, 0.72],
      [0.95, 0.32, -0.72],
      [-0.95, 0.32, -0.72]
    ];

    wheelPositions.forEach(([x, y, z]) => {
      addCarPart(wheelGeo, x, y, z);
    });

    // 6. Glowing ground wireframe circle
    const groundGeo = new THREE.RingGeometry(0.5, 2.5, 24);
    groundGeo.rotateX(-Math.PI / 2);
    const groundEdges = new THREE.EdgesGeometry(groundGeo);
    const groundLine = new THREE.LineSegments(
      groundEdges,
      new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.25 })
    );
    groundLine.position.y = 0.02;
    carGroup.add(groundLine);

    scene.add(carGroup);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDraggingRef.current) {
        carGroup.rotation.y += autoRotateSpeed;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Mouse & Touch interactions
    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive || !isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      carGroup.rotation.y += deltaX * 0.01;
      carGroup.rotation.x = Math.max(-0.4, Math.min(0.6, carGroup.rotation.x + deltaY * 0.01));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!interactive || !isDraggingRef.current || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      carGroup.rotation.y += deltaX * 0.01;
      carGroup.rotation.x = Math.max(-0.4, Math.min(0.6, carGroup.rotation.x + deltaY * 0.01));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
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
  }, [interactive, currentColor, isWireframeOnly, autoRotateSpeed]);

  const handleToggleStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('blip');
    setIsWireframeOnly(!isWireframeOnly);
  };

  const handleColorChange = (color: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('coin');
    setCurrentColor(color);
  };

  const heights = {
    sm: 'h-40',
    md: 'h-52 md:h-64',
    lg: 'h-64 md:h-80'
  };

  return (
    <div className={`relative group select-none cursor-grab active:cursor-grabbing ${className}`}>
      <div 
        ref={containerRef} 
        className={`w-full ${heights[size]} rounded-xl overflow-hidden flex items-center justify-center`}
      />

      {interactive && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-cyan-500/30 text-xs text-cyan-300">
          <button
            onClick={handleToggleStyle}
            title="Toggle Wireframe / Solid"
            className="p-1 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1 pl-1 border-l border-cyan-500/20">
            {['#38bdf8', '#c084fc', '#4ade80'].map((c) => (
              <button
                key={c}
                onClick={(e) => handleColorChange(c, e)}
                style={{ backgroundColor: c }}
                className="w-2.5 h-2.5 rounded-full hover:scale-125 transition-transform"
              />
            ))}
          </div>
        </div>
      )}

      {/* Model Spec Badge */}
      <div className="absolute bottom-2 left-2 pointer-events-none text-[10px] tracking-wider uppercase font-mono-code text-cyan-400/70 bg-slate-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
        3D WIREFRAME // CHASSIS_V2
      </div>
    </div>
  );
};
