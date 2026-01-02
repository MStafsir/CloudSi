"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

interface ParticleSystemProps {
  count?: number;
  size?: number;
  spread?: number;
  color?: string;
}

export function ParticleSystem({
  count = 150,
  size = 0.03,
  spread = 15,
  color = "#87CEEB",
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions in a sphere
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread - 5;

      // Random velocities for floating effect
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return [positions, velocities];
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    try {
      const positionAttribute = pointsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const posArray = positionAttribute.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Sine wave floating motion
        posArray[i3] += velocities[i3] + Math.sin(time + i * 0.1) * 0.001;
        posArray[i3 + 1] +=
          velocities[i3 + 1] + Math.cos(time + i * 0.1) * 0.001;

        // Boundary check and reset
        if (Math.abs(posArray[i3]) > spread / 2) posArray[i3] *= -0.9;
        if (Math.abs(posArray[i3 + 1]) > spread / 2) posArray[i3 + 1] *= -0.9;
      }

      positionAttribute.needsUpdate = true;
    } catch (error) {
      console.warn("Particle system frame update error:", error);
      // Don't crash on error - particles will maintain last valid state
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
