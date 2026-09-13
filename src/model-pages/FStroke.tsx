"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Link } from "react-router-dom";
//import * as THREE from "three";

function FourStrokeModel() {
  const { scene } = useGLTF(
    import.meta.env.BASE_URL + "models/Four_stroke6.glb",
  );

 
 

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

useGLTF.preload(import.meta.env.BASE_URL + "models/Four_stroke6.glb");

export default function FStroke() {
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

      <div
        style={{
          position: "absolute",
          top: "120px",
          right: "20px",
          zIndex: 10,
          padding: "12px 18px",
          background: "#2cf803",
          color: "black",
          borderRadius: "10px",
          border: "1px solid #333",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        Mouse to scroll and zoom
      </div>

      <Canvas
        orthographic
        camera={{
          position: [0, 0, 10],
          zoom: 100,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />

          <directionalLight position={[5, 5, 5]} intensity={2} />

          <FourStrokeModel />

          <Environment preset="warehouse" />

          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}
