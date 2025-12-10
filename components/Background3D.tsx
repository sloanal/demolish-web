"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-100 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Lighting />
        <GlassShardField />
        {/* Environment map for realistic reflections */}
        <Environment preset="city" /> 
      </Canvas>
    </div>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4f46e5" />
      <directionalLight position={[0, 5, 5]} intensity={1} />
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
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const count = 300; // Drastically reduced for high-quality geometry & material rendering
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      // Wide spread
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      
      tempObject.position.set(x, y, z);
      
      // Random rotation
      tempObject.rotation.set(
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        Math.random() * Math.PI
      );
      
      // Aspect ratio 16:9 scaling
      // Base size: width = 1.6, height = 0.9
      // Random scale factor
      const scale = Math.random() * 0.5 + 0.2; 
      tempObject.scale.set(scale, scale, scale); // Geometry handles ratio
      
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, tempObject]);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    // Slow drift of the entire group
    groupRef.current.rotation.x -= delta / 80;
    groupRef.current.rotation.y -= delta / 100;

    // Interactive sway
    const targetX = mouseRef.current.y * 0.2; 
    const targetY = mouseRef.current.x * 0.2; 

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * delta;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * delta;
    
    // Individually rotate shards slightly for glinting effect
    // Note: Mutating instance matrix every frame is expensive, so strictly limiting count is key
    // We'll skip individual rotation for now to ensure 60fps on all devices, relying on light/camera movement for glints
  });

  // 16:9 Rounded Plane Geometry
  // BoxGeometry gives "dimension" (thickness)
  // Width 1.6, Height 0.9, Depth 0.05
  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <meshPhysicalMaterial 
          transmission={0.95}  // High transparency
          thickness={0.5}      // Reduced refraction thickness
          roughness={0.05}     // Very smooth
          clearcoat={1}        // Shiny coating
          clearcoatRoughness={0.05}
          metalness={0.0}
          color="#ffffff"      // Base color
          emissive="#00f0ff"
          emissiveIntensity={0.02} // Very faint glow
          transparent={true}
          opacity={0.3}        // Base opacity
        />
      </instancedMesh>
    </group>
  );
}
