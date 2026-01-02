"use client";

import { Suspense, useRef, useState, useEffect, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { FloatingShapes } from "./floating-shapes";
import { ParticleSystem } from "./particle-system";

// Mouse tracking for 3D scene
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    try {
      if (!camera) return;
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        mouseRef.current.x * 0.5,
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -mouseRef.current.y * 0.3 + 0.5,
        0.05
      );
      camera.lookAt(0, 0, 0);
    } catch (error) {
      // Ignore frame errors
    }
  });

  return null;
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.3}
        color="#87CEEB"
      />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#E0F2FE" />

      {/* 3D Elements */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <FloatingShapes />
      </Float>

      <ParticleSystem count={150} spread={20} color="#87CEEB" size={0.04} />

      {/* Environment: Switched to 'sunset' (lighter than 'city') */}
      <Environment preset="sunset" />
    </>
  );
}

// Loading fallback for Canvas
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#E0F2FE] to-white">
      <div className="w-12 h-12 border-4 border-[#87CEEB] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Memoized Canvas component - HIGHLY OPTIMIZED
const CanvasRenderer = memo(function CanvasRenderer({
  isMobile,
  onCanvasCreated,
  onCanvasError,
}: {
  isMobile: boolean;
  onCanvasCreated: (state: any) => void;
  onCanvasError: (error: any) => void;
}) {
  return (
    <Suspense fallback={<CanvasLoader />}>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]} // Reduced max DPR
        flat // No tone mapping (faster)
        gl={{
          antialias: false, // DISABLED for performance
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false, // DISABLED to save memory
          logarithmicDepthBuffer: false,
          stencil: false,
          precision: "lowp", // LOWER precision to save GPU memory
        }}
        className="three-canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onCreated={onCanvasCreated}
        onError={onCanvasError}
      >
        <Scene />
      </Canvas>
    </Suspense>
  );
});

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasErrorRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    setIsLoaded(true);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCanvasCreated = (state: any) => {
    // Only set size, avoid heavy pixel ratio operations
    state.gl.setSize(window.innerWidth, window.innerHeight);
    console.log("[Canvas] Initialized successfully");
  };

  const handleCanvasError = (error: any) => {
    console.error("[Canvas] Initialization error:", error);
    canvasErrorRef.current = true;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        {isLoaded && (
          <CanvasRenderer
            isMobile={isMobile}
            onCanvasCreated={handleCanvasCreated}
            onCanvasError={handleCanvasError}
          />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-transparent to-white/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#E0F2FE]/80 backdrop-blur-sm rounded-full border border-[#87CEEB]/30"
        >
          <span className="w-2 h-2 bg-[#0369A1] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-[#0369A1]">
            Universitas Tanjungpura
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1E293B] mb-4 tracking-tight"
        >
          <span className="block">Sistem Informasi</span>
          <span className="block mt-2 text-gradient glow">CloudSI 2025</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-8 text-lg sm:text-xl text-[#64748B] leading-relaxed"
        >
          Cloud: Rumah, SI: Sistem Informasi — Bersama membangun masa depan
          digital. Selamat datang di perjalanan kami sebagai generasi inovator.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={() => scrollToSection("gallery")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 bg-[#0369A1] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#87CEEB]/30 transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Explore Gallery</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0369A1] to-[#87CEEB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("about")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#0369A1] font-semibold rounded-xl border-2 border-[#E0F2FE] hover:border-[#87CEEB] hover:bg-white transition-all duration-300"
          >
            Tentang CloudSI
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <span className="text-xs text-[#64748B] uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-6 h-10 border-2 border-[#87CEEB] rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-[#0369A1] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
