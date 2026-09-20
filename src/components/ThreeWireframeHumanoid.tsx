import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeWireframeHumanoidProps {
  className?: string;
}

export const ThreeWireframeHumanoid: React.FC<ThreeWireframeHumanoidProps> = ({
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 140;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const charGroup = new THREE.Group();

    // Material
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.85
    });

    const jointMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    });

    const addLimb = (geo: THREE.BufferGeometry, px: number, py: number, pz: number, rx = 0, ry = 0, rz = 0) => {
      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, lineMat);
      line.position.set(px, py, pz);
      line.rotation.set(rx, ry, rz);
      charGroup.add(line);

      // joint dot
      const dotGeo = new THREE.SphereGeometry(0.04, 6, 6);
      const dot = new THREE.Mesh(dotGeo, jointMat);
      dot.position.set(px, py, pz);
      charGroup.add(dot);
      return line;
    };

    // 1. Head
    const headGeo = new THREE.IcosahedronGeometry(0.22, 1);
    addLimb(headGeo, 0, 2.1, 0);

    // 2. Neck
    const neckGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.12, 6);
    addLimb(neckGeo, 0, 1.88, 0);

    // 3. Torso (Chest & Pelvis)
    const chestGeo = new THREE.BoxGeometry(0.48, 0.5, 0.28);
    addLimb(chestGeo, 0, 1.55, 0);

    const pelvisGeo = new THREE.BoxGeometry(0.4, 0.25, 0.25);
    addLimb(pelvisGeo, 0, 1.15, 0);

    // 4. Arms
    // Left arm
    const upperArmGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.42, 6);
    addLimb(upperArmGeo, -0.38, 1.5, 0, 0, 0, 0.3);
    const forearmGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.4, 6);
    addLimb(forearmGeo, -0.55, 1.15, 0.1, 0.4, 0, 0.1);

    // Right arm
    addLimb(upperArmGeo, 0.38, 1.5, 0, 0, 0, -0.3);
    addLimb(forearmGeo, 0.55, 1.15, 0.1, 0.4, 0, -0.1);

    // 5. Legs
    const thighGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.55, 6);
    addLimb(thighGeo, -0.16, 0.75, 0, 0, 0, 0.05);
    addLimb(thighGeo, 0.16, 0.75, 0, 0, 0, -0.05);

    const shinGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.55, 6);
    addLimb(shinGeo, -0.16, 0.22, 0);
    addLimb(shinGeo, 0.16, 0.22, 0);

    scene.add(charGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle rotation & floating
      charGroup.rotation.y = Math.sin(t * 0.8) * 0.4;
      charGroup.position.y = Math.sin(t * 1.6) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 140;
      const h = container.clientHeight || 180;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}>
      <div ref={containerRef} className="w-28 h-36 sm:w-32 sm:h-44" />
    </div>
  );
};
