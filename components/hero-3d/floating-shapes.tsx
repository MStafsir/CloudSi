"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "box" | "sphere" | "octahedron" | "torus" | "icosahedron";
  size?: number;
  color?: string;
  rotationSpeed?: number;
}

function FloatingShape({
  position,
  geometry,
  size = 1,
  color = "#87CEEB",
  rotationSpeed = 0.01,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    try {
      // Rotation only - Floating handled by parent <Float> component
      meshRef.current.rotation.x += rotationSpeed * 0.5;
      meshRef.current.rotation.y += rotationSpeed;
    } catch (error) {
      console.warn("Frame update error in FloatingShape:", error);
      // Silently continue - don't crash the render loop
    }
  });

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[size, size, size]} />;
      case "sphere":
        return <sphereGeometry args={[size * 0.5, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[size * 0.6]} />;
      case "torus":
        return <torusGeometry args={[size * 0.5, size * 0.2, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[size * 0.5]} />;
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  }, [geometry, size]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometryComponent}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  const shapes: FloatingShapeProps[] = useMemo(
    () => [
      // Left side shapes
      {
        position: [-4, 2, -2],
        geometry: "octahedron",
        size: 1.2,
        color: "#87CEEB",
      },
      {
        position: [-3, -1, -1],
        geometry: "torus",
        size: 0.8,
        color: "#E0F2FE",
      },
      {
        position: [-5, 0, -3],
        geometry: "icosahedron",
        size: 1,
        color: "#0369A1",
      },

      // Right side shapes
      { position: [4, 1, -2], geometry: "box", size: 1, color: "#87CEEB" },
      {
        position: [3, -2, -1],
        geometry: "sphere",
        size: 1.2,
        color: "#E0F2FE",
      },
      {
        position: [5, 0.5, -3],
        geometry: "octahedron",
        size: 0.9,
        color: "#0369A1",
      },

      // Center background shapes
      {
        position: [0, 3, -5],
        geometry: "icosahedron",
        size: 1.5,
        color: "#87CEEB",
      },
      {
        position: [-2, -3, -4],
        geometry: "torus",
        size: 0.7,
        color: "#E0F2FE",
      },
      { position: [2, -2.5, -4], geometry: "box", size: 0.8, color: "#87CEEB" },

      // Additional depth shapes
      {
        position: [-1, 2.5, -6],
        geometry: "sphere",
        size: 0.6,
        color: "#0369A1",
      },
      {
        position: [1, -1, -5],
        geometry: "octahedron",
        size: 0.7,
        color: "#E0F2FE",
      },
    ],
    []
  );

  return (
    <group>
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          {...shape}
          rotationSpeed={0.008 + index * 0.001}
        />
      ))}
    </group>
  );
}
