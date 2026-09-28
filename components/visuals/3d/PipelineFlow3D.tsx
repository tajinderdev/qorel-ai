'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface PipelineStage {
  id: string;
  name: string;
  throughput: string;
  status: 'active' | 'bottleneck' | 'idle';
}

function StageCylinder({
  stage,
  position,
}: {
  stage: PipelineStage;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isBottleneck = stage.status === 'bottleneck';

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isBottleneck ? 0.4 : 1.2);
    }
  });

  const color = isBottleneck ? '#f43f5e' : '#06b6d4';

  return (
    <group position={position}>
      <Cylinder ref={meshRef} args={[0.7, 0.7, 1.4, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.7}
          wireframe
        />
      </Cylinder>

      <Text position={[0, 1.1, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        {stage.name}
      </Text>

      <Text position={[0, -1.1, 0]} fontSize={0.15} color="#94a3b8" anchorX="center" anchorY="middle">
        {stage.throughput}
      </Text>
    </group>
  );
}

export default function PipelineFlow3D({
  stages = [
    { id: '1', name: 'Ingress Parser', throughput: '150k req/s', status: 'active' },
    { id: '2', name: 'CRC16 Slot Hash', throughput: '150k req/s', status: 'active' },
    { id: '3', name: 'Replica Sync Queue', throughput: '45k req/s', status: 'bottleneck' },
    { id: '4', name: 'AOF Disk Flush', throughput: '80k req/s', status: 'active' },
  ],
}: {
  stages?: PipelineStage[];
}) {
  return (
    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e111d] to-[#08090e] border border-border/80 shadow-2xl">
      <div className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300">
        3D Execution & Replication Pipeline Flow
      </div>

      <Canvas camera={{ position: [0, 3, 7], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <OrbitControls enablePan={false} maxDistance={12} minDistance={4} />

        {stages.map((stage, idx) => {
          const x = (idx - 1.5) * 2.2;
          return <StageCylinder key={stage.id} stage={stage} position={[x, 0, 0]} />;
        })}
      </Canvas>
    </div>
  );
}
