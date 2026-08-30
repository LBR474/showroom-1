"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

function ClimbingFrameModel() {
  const { scene } = useGLTF(
    import.meta.env.BASE_URL + "models/Four_stroke6.glb",
  );
  // ============================================================
  // BLACK METALLIC MATERIAL
  // ============================================================

  
  // ============================================================
  // APPLY MATERIAL TO LONG UPRIGHTS + CROSS PIECES
  // ============================================================

  // ============================================================
  // BLACK METALLIC MATERIAL
  // ============================================================

  const blackMetal = new THREE.MeshStandardMaterial({
    color: "#111111",
    metalness: 0.85,
    roughness: 0.25,
  });

  // ============================================================
  // SILVER / STEEL METALLIC MATERIAL
  // ============================================================

  const steelMetal = new THREE.MeshStandardMaterial({
    color: "#8a8d91",
    metalness: 0.9,
    roughness: 0.78,
  });

  // ============================================================
  // APPLY MATERIALS
  // ============================================================

  scene.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;

      const name = mesh.name.toLowerCase();

      // ----------------------------------------------------------
      // SILVER STEEL COMPONENTS
      // ----------------------------------------------------------

      if (
        name.includes("t-piece") ||
        name.includes("elbow") ||
        name.includes("foot") ||
        name.includes("sleeve")
      ) {
        mesh.material = steelMetal.clone();
      }

      // ----------------------------------------------------------
      // BLACK METALLIC COMPONENTS
      // ----------------------------------------------------------
      else if (name.includes("long_upright") || name.includes("cross")) {
        mesh.material = blackMetal.clone();
      }
    }
  });

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Optional: Preload the model
useGLTF.preload("models/Four_stroke6.glb");

export default function growplay4() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: `
    linear-gradient(
      to bottom,
      #55c7df 0%,
      #087da8 18%,
      #064d78 45%,
      #032b50 70%,
      #01152d 100%
    )
  `,
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

      <Canvas
        camera={{
          position: [0, 1, 8],
          fov: 45,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />

          <directionalLight position={[5, 5, 5]} intensity={2} />

          <ClimbingFrameModel />

          <Environment preset="warehouse" />

          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}
