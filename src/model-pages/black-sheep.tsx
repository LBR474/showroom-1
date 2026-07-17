"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Link } from "react-router-dom";

function ShortsModel() {
  const { scene } = useGLTF("/models/BLACK SHEEP BIKE SHORTS 5.glb");

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 1, 0]}
    />
  );
}

// Optional: Preload the model
useGLTF.preload("/black-sheep-shorts-5.glb");

export default function BlackSheepShorts() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          padding: "12px 18px",
          background: "#111",
          color: "white",
          textDecoration: "none",
          borderRadius: "10px",
          border: "1px solid #333",
          fontFamily: "Arial, sans-serif",
        }}
      >
        ← Back to Showroom
      </Link>

      <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />

          <ShortsModel />

          <Environment preset="warehouse" />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}
