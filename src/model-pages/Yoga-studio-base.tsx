import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* =========================================
   STUDIO
========================================= */

function YogaStudio({ onShelfReady }: { onShelfReady?: (mesh: THREE.Mesh) => void }) {
  const studio = useGLTF(
    `${import.meta.env.BASE_URL}/models/yoga-studio-lite-2.glb`,
  );

  // TEXTURES
  const floorTexture = useTexture(
    `${import.meta.env.BASE_URL}/textures/laminate_floor_03_diff_4k.jpg`,
  );

  const shelfTexture = useTexture(
    `${import.meta.env.BASE_URL}/textures/wood_cabinet_worn_long_diff_1k.jpg`,
  );

  const wallTexture = useTexture(
    `${import.meta.env.BASE_URL}/textures/medieval_red_brick_1k.blend/textures/medieval_red_brick_diff_1k.jpg`,
  );

  const shelfRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    // Texture wrapping
    [floorTexture, shelfTexture, wallTexture].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.needsUpdate = true;
    });

    // Texture tiling
    floorTexture.repeat.set(2, 2);
    shelfTexture.repeat.set(1, 1);
    wallTexture.repeat.set(1, 2);

    // Make sure world matrices are current
    studio.scene.updateMatrixWorld(true);

    // Apply materials + find floor position
    studio.scene.traverse((child) => {
      console.log(child.name, child.getWorldPosition(new THREE.Vector3()));
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.name === "Floor") {
        child.material = new THREE.MeshStandardMaterial({
          map: floorTexture,
          side: THREE.DoubleSide,
        });
      }

      if (child.name === "Shelf") {
        shelfRef.current = child;
        onShelfReady?.(child);

        child.material = new THREE.MeshStandardMaterial({
          map: shelfTexture,
          side: THREE.DoubleSide,
        });
      }

      if (child.name === "Wall") {
        child.material = new THREE.MeshStandardMaterial({
          map: wallTexture,
          side: THREE.DoubleSide,
        });
      }
    });
  }, [studio, floorTexture, shelfTexture, wallTexture]);

  return <primitive object={studio.scene} />;
}

/* =========================================
   YOGA MAT
========================================= */

function YogaMat() {
  const mat = useGLTF(`${import.meta.env.BASE_URL}/models/yoga-mat-5.glb`);
  // mat.scene.traverse((child) => {
  // console.log(child.name, child);
  //   if (!(child instanceof THREE.Mesh)) return;

  // });
  return <primitive object={mat.scene} position={[0, -1.5, 2]} 
  rotation={[0, Math.PI / 2, 0]}
/>;
}

/* =========================================
   YOGA BLOCKS
========================================= */

function YogaBlocks({ shelf }: { shelf?: THREE.Object3D | null }) {
  const blockFiles = [
    `${import.meta.env.BASE_URL}/models/yoga-block-cork.glb`,
    `${import.meta.env.BASE_URL}/models/yoga-block-camo-blue.glb`,
    `${import.meta.env.BASE_URL}/models/yoga-block-cork.glb`,
    `${import.meta.env.BASE_URL}/models/yoga-block-camo-green.glb`,
    `${import.meta.env.BASE_URL}/models/yoga-block-camo-pink.glb`,
  ];

  const models = useGLTF(blockFiles);

  const blockRefs = useRef<(THREE.Group | null)[]>([]);

  useEffect(() => {
    if (!shelf) return;

    const shelfBox = new THREE.Box3().setFromObject(shelf);
    const shelfTopY = shelfBox.max.y;

    const shelfPos = new THREE.Vector3();
    shelf.getWorldPosition(shelfPos);

    // Measure spacing using first block
    const temp = new THREE.Object3D();

    temp.rotation.z = Math.PI / 2;
    temp.add(models[0].scene.clone());

    temp.updateMatrixWorld(true);

    const baseBox = new THREE.Box3().setFromObject(temp);
    const baseSize = new THREE.Vector3();

    baseBox.getSize(baseSize);

    const spacing = baseSize.x * 1.1;

    blockRefs.current.forEach((ref, i) => {
      if (!ref) return;

      // Measure this block individually
      const measure = new THREE.Object3D();

      measure.rotation.z = Math.PI / 2;
      measure.add(models[i].scene.clone());

      measure.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(measure);
      const size = new THREE.Vector3();

      box.getSize(size);

      const xOffset = (i - 2) * spacing;

      // Different offset for camo blocks
      const sitOffset = blockFiles[i].includes("camo") ? 0.01 : 0.01;

      gsap.to(ref.position, {
        x: shelfPos.x + xOffset,
        y: shelfTopY + size.y / 2 - sitOffset,
        z: shelfPos.z,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(ref.rotation, {
        z: Math.PI / 2,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, [shelf, models]);

  return (
    <>
      {models.map((model, i) => (
        <group
          key={i}
          ref={(el) => {
            blockRefs.current[i] = el;
          }}
        >
          <primitive object={model.scene.clone()} />
        </group>
      ))}
    </>
  );
}
/* =========================================
   PAGE
========================================= */

export default function VLaBBottle1() {
  const [shelf, setShelf] = useState<THREE.Mesh | null>(null);
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

      <Canvas
        shadows
        camera={{
          position: [0, 0.5, 8],
          fov: 45,
        }}
      >
        {/* LIGHTING */}
        <ambientLight intensity={1} />

        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

        {/* ENVIRONMENT */}
        <Environment preset="apartment" />

        {/* MODELS */}
        <YogaStudio onShelfReady={setShelf} />
        <YogaBlocks shelf={shelf} />
        <YogaMat />
        

        {/* CONTROLS */}
        <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
      </Canvas>
    </div>
  );
}
