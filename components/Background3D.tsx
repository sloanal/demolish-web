"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={1}
      >
        <Lighting />
        <GlassShardField />
      </Canvas>
    </div>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#CDFF00" />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7C3AED" />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />
    </>
  );
}

function GlassShardField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const count = 150;
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      tempObject.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
      );

      tempObject.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      const scale = Math.random() * 0.5 + 0.2;
      tempObject.scale.set(scale, scale, scale);

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, tempObject]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x -= delta / 80;
    groupRef.current.rotation.y -= delta / 100;

    const targetX = mouseRef.current.y * 0.2;
    const targetY = mouseRef.current.x * 0.2;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * delta;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * delta;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#CDFF00"
          emissiveIntensity={0.02}
          metalness={0.4}
          roughness={0.15}
          transparent
          opacity={0.12}
        />
      </instancedMesh>
    </group>
  );
}
