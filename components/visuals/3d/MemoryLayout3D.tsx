'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface MemoryBlock {
  address: string;
  label: string;
  value: string;
  state: 'allocated' | 'free' | 'dirty';
}

interface MemoryLayout3DProps {
  blocks?: MemoryBlock[];
}

function MemoryBox({
  block,
  position,
}: {
  block: MemoryBlock;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const color =
    block.state === 'allocated'
      ? '#6366f1'
      : block.state === 'dirty'
      ? '#f59e0b'
      : '#334155';

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[1.6, 0.9, 0.6]}
        radius={0.06}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </RoundedBox>

      <Text
        position={[0, 0.15, 0.35]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {block.label}
      </Text>

      <Text
        position={[0, -0.15, 0.35]}
        fontSize={0.13}
        color="#cbd5e1"
        anchorX="center"
        anchorY="middle"
      >
        {block.value}
      </Text>

      <Text
        position={[0, 0.65, 0]}
        fontSize={0.12}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {block.address}
      </Text>
    </group>
  );
}

export default function MemoryLayout3D({
  blocks = [
    { address: '0x7FFF0010', label: 'HashSlot [0..5460]', value: 'Master A Pointer', state: 'allocated' },
    { address: '0x7FFF0020', label: 'HashSlot [5461..10922]', value: 'Master B Pointer', state: 'allocated' },
    { address: '0x7FFF0030', label: 'HashSlot [10923..16383]', value: 'Master C Pointer', state: 'allocated' },
    { address: '0x7FFF0040', label: 'Replication Buffer', value: 'Offset: 129038', state: 'dirty' },
  ],
}: MemoryLayout3DProps) {
  return (
    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c0e18] to-[#07080d] border border-border/80 shadow-2xl">
      <div className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300">
        3D In-Memory Hash Slot & Buffer Allocation
      </div>

      <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <OrbitControls enablePan={false} maxDistance={10} minDistance={3} />

        {blocks.map((b, idx) => {
          const x = (idx % 2 === 0 ? -1 : 1) * 1.2;
          const y = (Math.floor(idx / 2) === 0 ? 0.7 : -0.7);
          return (
            <MemoryBox
              key={b.address || idx}
              block={b}
              position={[x, y, 0]}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
