import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Mesh, Object3D } from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import './VLaB-bottle-1.css'

function BottleModel({
  smallCapRef,
  smallCapBaseYRef,
  bigCapRef,
  bigCapBaseYRef,
}: {
  smallCapRef: React.MutableRefObject<Object3D | null>;
  smallCapBaseYRef: React.MutableRefObject<number | null>;
  bigCapRef: React.MutableRefObject<Object3D | null>;
  bigCapBaseYRef: React.MutableRefObject<number | null>;
}) {
  const model = useGLTF(`${import.meta.env.BASE_URL}/models/VLAB-bottle-8.glb`);

  useEffect(() => {
    model.scene.traverse((child) => {
      console.log({
        name: child.name,
        type: child.type,
        isMesh: child instanceof Mesh,
      });
    });

    // SMALL CAP
    const smallCap = model.scene.getObjectByName("Bottle-small-cap") ?? null;

    smallCapRef.current = smallCap;

    if (smallCap && smallCapBaseYRef.current === null) {
      smallCapBaseYRef.current = smallCap.position.y;
    }

    // BIG CAP
    const bigCap = model.scene.getObjectByName("Bottle-big-cap") ?? null;

    bigCapRef.current = bigCap;

    if (bigCap && bigCapBaseYRef.current === null) {
      bigCapBaseYRef.current = bigCap.position.y;
    }
  }, [model, smallCapRef, smallCapBaseYRef, bigCapRef, bigCapBaseYRef]);

  return <primitive object={model.scene} scale={2} position={[0, 0, 0]} />;
}

export default function VLaBBottle1() {
  // UI STATE
  const [autoRotate, setAutoRotate] = useState(true);
  const [smallCapRaised, setSmallCapRaised] = useState(false);
  const [bigCapUnscrewed, setBigCapUnscrewed] = useState(false);

  // REFS
  const smallCapRef = useRef<Object3D | null>(null);
  const smallCapBaseYRef = useRef<number | null>(null);

  const bigCapRef = useRef<Object3D | null>(null);
  const bigCapBaseYRef = useRef<number | null>(null);

  // ----------------------------
  // SMALL CAP TOGGLE
  // ----------------------------
  const handleToggleSmallCap = () => {
    if (!smallCapRef.current || smallCapBaseYRef.current === null) return;

    const offset = 0.15;

    smallCapRef.current.position.y = smallCapRaised
      ? smallCapBaseYRef.current
      : smallCapBaseYRef.current + offset;

    setSmallCapRaised((v) => !v);
    setAutoRotate(false);
  };

  // ----------------------------
  // BIG CAP UNSCREW TOGGLE
  // ----------------------------
const handleToggleBigCap = () => {
  if (!bigCapRef.current || bigCapBaseYRef.current === null) return;

  const cap = bigCapRef.current;
  const baseY = bigCapBaseYRef.current;

  const lift = 0.051;
  const spin = Math.PI * 2; // 5 full rotations

  setBigCapUnscrewed((prev) => {
    const next = !prev;

    if (next) {
      // ----------------------------
      // UNSCREW (phase 1)
      // ----------------------------
      gsap.to(cap.position, {
        y: baseY + lift,
        duration: 3,
        ease: "power2.out",
      });

      gsap.to(cap.rotation, {
        y: cap.rotation.y + spin,
        duration: 3,
        ease: "power2.out",
        onComplete: () => {
          // ----------------------------
          // INSPECTION POSE (phase 2)
          // ----------------------------

          cap.position.y = baseY + lift * 5; // your "held up" position

          gsap.to(cap.rotation, {
            x: -Math.PI / 2,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    } else {
      // ----------------------------
      // RESET INSPECTION POSE FIRST
      // ----------------------------

      gsap.to(cap.rotation, {
        x: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          // ----------------------------
          // SCREW BACK ON (phase 3)
          // ----------------------------

          const engageY = baseY + 0.03;

          const tl = gsap.timeline();

          // PHASE 1: descend to engage point (no rotation)
          tl.to(cap.position, {
            y: engageY,
            duration: 1.5,
            ease: "power2.inOut",
          });

          // PHASE 2: both happen together from engage point
          tl.add("engage");

          tl.to(
            cap.position,
            {
              y: baseY,
              duration: 2,
              ease: "power2.inOut",
            },
            "engage",
          );

          tl.to(
            cap.rotation,
            {
              y: cap.rotation.y - spin,
              duration: 2,
              ease: "power2.inOut",
            },
            "engage",
          ); // start exactly when rotation begins
        },
      });
    }

    setAutoRotate(false);
    return next;
  });
};

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* BACK BUTTON */}
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
          fontFamily: "Arial",
        }}
      >
        ← Back to Showroom
      </Link>

      {/* SMALL CAP BUTTON */}
      <div
        className="small-cap-button"
        onClick={handleToggleSmallCap}
        onMouseEnter={() => (document.body.style.cursor = "pointer")}
        onMouseLeave={() => (document.body.style.cursor = "default")}
        style={{
          
          background: smallCapRaised ? "#991b1b" : "#2563eb",
          color: "white",
          
        }}
      >
        {smallCapRaised ? "Lower Drinking Cap" : "Raise Drinking Cap"}
      </div>

      {/* BIG CAP BUTTON */}
      <div
        className="big-cap-button"
        onClick={handleToggleBigCap}
        onMouseEnter={() => (document.body.style.cursor = "pointer")}
        onMouseLeave={() => (document.body.style.cursor = "default")}
        style={{
          
          background: bigCapUnscrewed ? "#7c2d12" : "#16a34a",
         
        }}
      >
        {bigCapUnscrewed ? "Screw bottle top back on" : "Unscrew bottle top"}
      </div>

      {/* 3D SCENE */}
      <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <BottleModel
          smallCapRef={smallCapRef}
          smallCapBaseYRef={smallCapBaseYRef}
          bigCapRef={bigCapRef}
          bigCapBaseYRef={bigCapBaseYRef}
        />

        {/* Ground */}
        <mesh>
          <cylinderGeometry args={[10, 10, 10, 32, 1, true]} />
          <meshStandardMaterial color="#e8e8e8" side={1} />
        </mesh>

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate={autoRotate}
        />
      </Canvas>
    </div>
  );
}
