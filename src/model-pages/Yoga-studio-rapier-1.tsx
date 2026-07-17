import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import { Physics } from "@react-three/rapier";

import * as THREE from "three";
import { useEffect, useState } from "react";

/* =========================================
   STUDIO (VISUAL ONLY)
========================================= */

function YogaStudio({ onFloorReady }: { onFloorReady: (y: number) => void }) {
  const studio = useGLTF(`${import.meta.env.BASE_URL}models/yoga-studio-lite-2.glb`);

  const floorTexture = useTexture(`${import.meta.env.BASE_URL}/textures/laminate_floor_03_diff_4k.jpg`);
  const shelfTexture = useTexture(
    `${import.meta.env.BASE_URL}/textures/wood_cabinet_worn_long_diff_1k.jpg`,
  );
  const wallTexture = useTexture(`${import.meta.env.BASE_URL}/textures/medieval_red_brick_diff_1k.jpg`);

  useEffect(() => {
    [floorTexture, shelfTexture, wallTexture].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.needsUpdate = true;
    });

    floorTexture.repeat.set(2, 2);
    shelfTexture.repeat.set(1, 1);
    wallTexture.repeat.set(2, 2);

    studio.scene.traverse((child: any) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.name === "Floor") {
        const box = new THREE.Box3().setFromObject(child);
        onFloorReady(box.max.y);

        child.material = new THREE.MeshStandardMaterial({
          map: floorTexture,
          side: THREE.DoubleSide,
        });
      }

      if (child.name === "Shelf") {
        child.material = new THREE.MeshStandardMaterial({ map: shelfTexture });
      }

      if (child.name === "Wall") {
        child.material = new THREE.MeshStandardMaterial({ map: wallTexture });
      }
    });
  }, [studio, floorTexture, shelfTexture, wallTexture, onFloorReady]);

  return <primitive object={studio.scene} />;
}

/* =========================================
   YOGA MAT (ALL LOGIC HERE)
========================================= */

import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

function YogaMat({ floorY }: { floorY: number }) {
  const mat = useGLTF(`${import.meta.env.BASE_URL}/models/yoga-mat-2-base.glb`);

  const rigidRef = useRef<any>(null);

  const bonesRef = useRef<THREE.Bone[]>([]);
  const restPose = useRef<THREE.Vector3[]>([]);

  const time = useRef(0);
  const [active, setActive] = useState(false);
  const hasLanded = useRef(false);

  /**
   * ---------------------------------------
   * EXTRACT BONES (ONE TIME)
   * ---------------------------------------
   */
  useEffect(() => {
    const bones: THREE.Bone[] = [];

    mat.scene.traverse((obj: any) => {
      if (obj.isBone) bones.push(obj);
    });

    bones.sort((a, b) => a.name.localeCompare(b.name));

    bonesRef.current = bones;
    restPose.current = bones.map((b) => b.position.clone());
  }, [mat]);

  /**
   * ---------------------------------------
   * IMPACT TRIGGER
   * ---------------------------------------
   */
  const onImpact = () => {
    if (hasLanded.current) return;

    hasLanded.current = true;

    rigidRef.current?.sleep();

    time.current = 0;
    setActive(true);
  };

  /**
   * ---------------------------------------
   * ANIMATION LOOP (ROLL + RIPPLE)
   * ---------------------------------------
   */
  useFrame((_, delta) => {
    if (!active) return;

    time.current += delta;

    const t = time.current;

    const bones = bonesRef.current;
    const rest = restPose.current;

    const roll = THREE.MathUtils.clamp(t * 0.7, 0, 1);
    const ripple = Math.exp(-t * 1.6);

    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      const r = rest[i];

      const x = i % 10;
      const y = Math.floor(i / 10);

      const dist = Math.sqrt(x * x + y * y);

      const wave = Math.sin(dist * 3 - t * 6) * ripple * 0.003;

      const curl = roll * (i / bones.length) * Math.PI * 1.5;

      bone.position.set(r.x, r.y + wave, r.z);

      bone.rotation.set(wave * 10, curl, wave * 8);
    }
  });

  /**
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */
  return (
    <RigidBody
      ref={rigidRef}
      type="dynamic"
      position={[0, floorY + 2, 2]}
      restitution={0.15}
      friction={1}
      colliders="hull"
      onCollisionEnter={onImpact}
    >
      <primitive object={mat.scene} />
    </RigidBody>
  );
}

/* =========================================
   PAGE
========================================= */

export default function VLaBBottle1() {
  const [floorY, setFloorY] = useState<number | null>(null);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Link
        to="/"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "12px 18px",
          background: "#111",
          color: "white",
          borderRadius: 10,
          textDecoration: "none",
        }}
      >
        ← Back
      </Link>

      <Canvas shadows camera={{ position: [0, 1, 6], fov: 55 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

        <Environment preset="apartment" />

        <Physics gravity={[0, -9.81, 0]}>
          <YogaStudio onFloorReady={setFloorY} />

          {floorY !== null && <YogaMat floorY={floorY} />}
        </Physics>

        <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
      </Canvas>
    </div>
  );
}
