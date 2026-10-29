/**
 * HeroScene.tsx  –  Premium 3D hero experience
 *
 * Stack : React Three Fiber + Drei + Three.js
 * Design: deep navy bg · cyan rim · violet ambient · soft shadows
 * Focal : procedural crystalline helix ring + distort orb
 * Perf  : dpr cap · reduced-motion gate · performance.min
 */

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  Stars,
  Torus,
  MeshWobbleMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────
   Deterministic pseudo-random generator for pure React render passes
───────────────────────────────────────────────────────────────────── */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ─────────────────────────────────────────────────────────────────────
   Utility – eased lerp (for camera smoothing)
───────────────────────────────────────────────────────────────────── */
function dampV3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  lambda: number,
  dt: number,
) {
  current.lerp(target, 1 - Math.exp(-lambda * dt));
}

/* ─────────────────────────────────────────────────────────────────────
   Entrance animation helper
   – smoothly fades a group from y+offset down to 0 on mount
───────────────────────────────────────────────────────────────────── */
function useEntrance(delay = 0, duration = 1.6) {
  const progress = useRef(0);
  const started = useRef(false);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!started.current) {
      elapsed.current += delta;
      if (elapsed.current >= delay) started.current = true;
      return;
    }
    progress.current = Math.min(1, progress.current + delta / duration);
  });

  return progress;
}


/* ─────────────────────────────────────────────────────────────────────
   Pointer-tracking camera rig
   – gentle parallax: moves ±0.5 on X, ±0.3 on Y
───────────────────────────────────────────────────────────────────── */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 2, 6.5));
  const lookTarget = useRef(new THREE.Vector3(0, 1.0, 0));

  // Entrance: camera starts farther back
  const entranceProgress = useEntrance(0, 1.8);

  useFrame((state, delta) => {
    const ep = entranceProgress.current;
    // Ease-out cubic for entrance
    const ease = 1 - Math.pow(1 - Math.min(ep, 1), 3);

    const baseZ = 8.5 - ease * 2.0; // 8.5 → 6.5

    if (!reducedMotion) {
      target.current.set(
        state.mouse.x * 0.5,
        2 + state.mouse.y * 0.3,
        baseZ,
      );
    } else {
      target.current.set(0, 2, baseZ);
    }

    dampV3(camera.position as THREE.Vector3, target.current, 3.5, delta);
    dampV3(lookTarget.current, new THREE.Vector3(0, 1.0, 0), 6, delta);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────────────
   Central orb – distorted icosahedron with glowing rings
───────────────────────────────────────────────────────────────────── */
function CentralOrb({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const entranceProgress = useEntrance(0.2, 1.5);

  useFrame(({ clock }) => {
    const ep = entranceProgress.current;
    const ease = 1 - Math.pow(1 - Math.min(ep, 1), 3);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(ease * 1.0);
      groupRef.current.position.y = (1 - ease) * -0.8 + 0;
    }

    if (!reducedMotion) {
      const t = clock.getElapsedTime();
      if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.22;
      if (ring2Ref.current) ring2Ref.current.rotation.x = t * -0.18;
      if (ring3Ref.current) {
        ring3Ref.current.rotation.y = t * 0.14;
        ring3Ref.current.rotation.z = t * 0.09;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.6, 0]}>
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={reducedMotion ? 0 : 0.25} floatIntensity={reducedMotion ? 0 : 0.55}>
        {/* Core distort orb */}
        <mesh castShadow>
          <icosahedronGeometry args={[1.1, 4]} />
          <MeshDistortMaterial
            color="#060D1A"
            emissive="#091833"
            emissiveIntensity={0.75}
            distort={reducedMotion ? 0 : 0.32}
            speed={reducedMotion ? 0 : 1.4}
            roughness={0.04}
            metalness={0.96}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Cyan equatorial ring */}
        <Torus ref={ring1Ref} args={[1.42, 0.014, 12, 140]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={4.5}
            toneMapped={false}
          />
        </Torus>

        {/* Violet tilted ring */}
        <Torus ref={ring2Ref} args={[1.3, 0.009, 10, 110]} rotation={[Math.PI / 3.5, 0.55, 0]}>
          <meshStandardMaterial
            color="#7B4FFF"
            emissive="#7B4FFF"
            emissiveIntensity={3.5}
            toneMapped={false}
          />
        </Torus>

        {/* Outer faint cyan halo ring */}
        <Torus ref={ring3Ref} args={[1.72, 0.006, 8, 100]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#22EEF8"
            emissive="#22EEF8"
            emissiveIntensity={2.0}
            transparent
            opacity={0.55}
            toneMapped={false}
          />
        </Torus>
      </Float>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Procedural DNA-helix strand ring (16 paired spheres orbiting)
───────────────────────────────────────────────────────────────────── */
function HelixRing({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const entranceProgress = useEntrance(0.5, 1.8);

  const strands = useMemo(() => {
    const items: Array<{
      angle: number;
      radius: number;
      y: number;
      color: string;
      scale: number;
      phase: number;
    }> = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 4; // two full turns
      const y = (t - 0.5) * 3.6;
      const r = 2.1 + Math.sin(t * Math.PI * 2) * 0.12;
      items.push({
        angle,
        radius: r,
        y,
        color: i % 2 === 0 ? '#00D4FF' : '#7B4FFF',
        scale: 0.055 + pseudoRandom(i * 3 + 1) * 0.04,
        phase: pseudoRandom(i * 3 + 2) * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    const ep = entranceProgress.current;
    const ease = 1 - Math.pow(1 - Math.min(ep, 1), 3);

    if (!groupRef.current) return;
    groupRef.current.scale.setScalar(ease);
    if (!reducedMotion) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.11;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.6, 0]}>
      {strands.map((s, i) => {
        const x = Math.cos(s.angle) * s.radius;
        const z = Math.sin(s.angle) * s.radius;
        return (
          <mesh key={i} position={[x, s.y, z]} scale={s.scale} castShadow>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={1.6}
              roughness={0.15}
              metalness={0.85}
              transparent
              opacity={0.85}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Floating geometric shards
───────────────────────────────────────────────────────────────────── */
interface ShardProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  rotOffset: number;
  shape: 'oct' | 'tet' | 'ico';
}

function Shard({ position, color, speed, scale, rotOffset, shape, reducedMotion }: ShardProps & { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const entranceProgress = useEntrance(0.4 + rotOffset * 0.08, 1.2);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const ep = entranceProgress.current;
    const ease = 1 - Math.pow(1 - Math.min(ep, 1), 3);
    meshRef.current.scale.setScalar(ease * scale);

    if (!reducedMotion) {
      const t = clock.getElapsedTime() * speed + rotOffset;
      meshRef.current.rotation.x = t * 0.6;
      meshRef.current.rotation.y = t;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.55) * 0.22;
    }
  });

  const geo = useMemo(() => {
    if (shape === 'tet') return <tetrahedronGeometry args={[1, 0]} />;
    if (shape === 'ico') return <icosahedronGeometry args={[1, 0]} />;
    return <octahedronGeometry args={[1, 0]} />;
  }, [shape]);

  return (
    <mesh ref={meshRef} position={position} castShadow>
      {geo}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.18}
        metalness={0.88}
        transparent
        opacity={0.72}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Particle cloud (restrained – 140 pts)
───────────────────────────────────────────────────────────────────── */
function Particles({ count = 140, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const cyan = new THREE.Color('#00D4FF');
    const violet = new THREE.Color('#7B4FFF');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = pseudoRandom(i * 5 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i * 5 + 2) - 1);
      const r = 2.4 + pseudoRandom(i * 5 + 3) * 3.2;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.cos(phi) * 0.6 + 0.6;
      pos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const rnd = pseudoRandom(i * 5 + 4);
      const c = rnd < 0.45 ? cyan : rnd < 0.75 ? violet : white;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      siz[i] = 0.018 + pseudoRandom(i * 5 + 5) * 0.016;
    }
    return [pos, col, siz];
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.016;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Glowing grid floor
───────────────────────────────────────────────────────────────────── */
function GridFloor() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.04 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
      <planeGeometry args={[26, 26, 32, 32]} />
      <meshStandardMaterial
        color="#040A16"
        wireframe
        transparent
        opacity={0.13}
        emissive="#00D4FF"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Wobble satellite spheres (3 orbiting at different distances)
───────────────────────────────────────────────────────────────────── */
function SatelliteSphere({
  orbitRadius,
  orbitSpeed,
  orbitPhase,
  orbitTilt,
  color,
  size,
  reducedMotion,
}: {
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
  orbitTilt: number;
  color: string;
  size: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const entranceProgress = useEntrance(orbitPhase * 0.15, 1.4);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const ep = entranceProgress.current;
    const ease = 1 - Math.pow(1 - Math.min(ep, 1), 3);
    groupRef.current.scale.setScalar(ease);

    if (!reducedMotion) {
      const t = clock.getElapsedTime() * orbitSpeed + orbitPhase;
      groupRef.current.position.set(
        Math.cos(t) * orbitRadius,
        0.6 + Math.sin(t * orbitTilt) * 0.4,
        Math.sin(t) * orbitRadius,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow scale={size}>
        <sphereGeometry args={[1, 16, 16]} />
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          factor={reducedMotion ? 0 : 0.25}
          speed={reducedMotion ? 0 : 1.8}
          roughness={0.12}
          metalness={0.9}
          transparent
          opacity={0.78}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Full scene composition
───────────────────────────────────────────────────────────────────── */
const SHARDS: Omit<ShardProps, 'reducedMotion'>[] = [
  { position: [-2.9, 1.8, -1.0], color: '#00D4FF', speed: 0.38, scale: 0.14, rotOffset: 0, shape: 'oct' },
  { position: [2.7, 2.2, -0.6], color: '#7B4FFF', speed: 0.32, scale: 0.17, rotOffset: 1.2, shape: 'ico' },
  { position: [-2.3, 0.1, 0.5], color: '#22EEF8', speed: 0.45, scale: 0.10, rotOffset: 2.4, shape: 'tet' },
  { position: [2.2, 0.3, 0.7], color: '#9D6EFF', speed: 0.36, scale: 0.12, rotOffset: 3.6, shape: 'oct' },
  { position: [-1.5, 2.9, -0.4], color: '#00D4FF', speed: 0.42, scale: 0.09, rotOffset: 0.8, shape: 'tet' },
  { position: [1.9, 3.1, 0.3], color: '#7B4FFF', speed: 0.40, scale: 0.11, rotOffset: 1.9, shape: 'ico' },
  { position: [0.5, -0.2, 1.3], color: '#22EEF8', speed: 0.34, scale: 0.08, rotOffset: 4.2, shape: 'oct' },
  { position: [-0.6, 3.5, 0.9], color: '#9D6EFF', speed: 0.46, scale: 0.13, rotOffset: 5.1, shape: 'tet' },
];

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <CameraRig reducedMotion={reducedMotion} />

      {/* ── Lighting ──────────────────────────────────────────── */}
      {/* Violet ambient */}
      <ambientLight color="#1A0D40" intensity={1.4} />

      {/* Cyan key from upper-right */}
      <pointLight
        color="#00D4FF"
        intensity={6}
        position={[4.5, 5.5, 2]}
        distance={22}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.001}
      />

      {/* Violet fill from left */}
      <pointLight color="#7B4FFF" intensity={4} position={[-4.5, 3, -1.5]} distance={20} />

      {/* Cyan back rim (rear-low) */}
      <pointLight color="#22EEF8" intensity={2.5} position={[0, -0.8, -5.5]} distance={16} />

      {/* Soft top-down hemisphere */}
      <hemisphereLight
        color="#0D3060"
        groundColor="#050B14"
        intensity={0.6}
      />

      {/* ── Background stars ──────────────────────────────────── */}
      <Stars
        radius={55}
        depth={45}
        count={reducedMotion ? 400 : 900}
        factor={3}
        fade
        speed={reducedMotion ? 0 : 0.35}
      />

      {/* ── Scene objects ─────────────────────────────────────── */}
      <GridFloor />

      <CentralOrb reducedMotion={reducedMotion} />
      <HelixRing reducedMotion={reducedMotion} />

      {/* Satellite orbs */}
      <SatelliteSphere orbitRadius={2.6} orbitSpeed={0.28} orbitPhase={0} orbitTilt={0.6} color="#00D4FF" size={0.11} reducedMotion={reducedMotion} />
      <SatelliteSphere orbitRadius={2.2} orbitSpeed={0.38} orbitPhase={2.1} orbitTilt={0.9} color="#7B4FFF" size={0.09} reducedMotion={reducedMotion} />
      <SatelliteSphere orbitRadius={3.0} orbitSpeed={0.22} orbitPhase={4.2} orbitTilt={0.4} color="#22EEF8" size={0.07} reducedMotion={reducedMotion} />

      {/* Geometric shards */}
      {SHARDS.map((s, i) => (
        <Shard key={i} {...s} reducedMotion={reducedMotion} />
      ))}

      {/* Particles */}
      <Particles count={reducedMotion ? 0 : 140} reducedMotion={reducedMotion} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Reduced-motion static scene (no animations, minimal objects)
───────────────────────────────────────────────────────────────────── */
function StaticScene() {
  return (
    <>
      <ambientLight color="#1A0D40" intensity={1.6} />
      <pointLight color="#00D4FF" intensity={5} position={[4, 5, 2]} />
      <pointLight color="#7B4FFF" intensity={3} position={[-4, 3, -1]} />
      <Stars radius={50} depth={40} count={500} factor={3} fade speed={0} />
      <mesh position={[0, 0.6, 0]}>
        <icosahedronGeometry args={[1.1, 3]} />
        <meshStandardMaterial
          color="#060D1A"
          emissive="#091833"
          emissiveIntensity={0.7}
          roughness={0.04}
          metalness={0.96}
        />
      </mesh>
      <Torus args={[1.42, 0.014, 12, 140]} position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={4} toneMapped={false} />
      </Torus>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Exported Canvas wrapper
───────────────────────────────────────────────────────────────────── */
interface HeroSceneProps {
  reducedMotion?: boolean;
}

const HeroScene: React.FC<HeroSceneProps> = ({ reducedMotion = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8.5], fov: 52 }}
      shadows={{ type: THREE.PCFSoftShadowMap }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
      dpr={[1, Math.min(window.devicePixelRatio, 1.8)]}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        {reducedMotion ? <StaticScene /> : <Scene reducedMotion={false} />}
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
