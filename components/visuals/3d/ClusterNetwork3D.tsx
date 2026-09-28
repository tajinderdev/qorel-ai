'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  label: string;
  role: 'primary' | 'replica' | 'sentinel';
  status: 'healthy' | 'failed';
  slots?: string;
}

interface LinkData {
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
}

interface Cluster3DProps {
  nodes?: NodeData[];
  links?: LinkData[];
  autoRotate?: boolean;
}

function NodeSphere({
  node,
  position,
  isSelected,
  onClick,
}: {
  node: NodeData;
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHealthy = node.status === 'healthy';
  const isMaster = node.role === 'primary';

  const baseColor = isHealthy
    ? isMaster
      ? '#6366f1' // Indigo Master
      : '#10b981' // Emerald Replica
    : '#f43f5e'; // Rose Failed

  useFrame((_, delta) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          scale={isSelected ? 1.25 : 1}
        >
          <sphereGeometry args={[isMaster ? 0.75 : 0.55, 32, 32]} />
          <meshStandardMaterial
            color={baseColor}
            emissive={baseColor}
            emissiveIntensity={isSelected ? 0.8 : 0.35}
            roughness={0.2}
            metalness={0.8}
            wireframe={!isHealthy}
          />
        </mesh>

        {/* Node Label in 3D Space */}
        <Text
          position={[0, -1.0, 0]}
          fontSize={0.26}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#090a0f"
        >
          {node.label}
        </Text>

        {node.slots && (
          <Text
            position={[0, -1.35, 0]}
            fontSize={0.2}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            {`Slots: ${node.slots}`}
          </Text>
        )}
      </Float>
    </group>
  );
}

function PulsingConnection({
  start,
  end,
  animated,
}: {
  start: [number, number, number];
  end: [number, number, number];
  animated?: boolean;
}) {
  const color = animated ? '#818cf8' : '#334155';

  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={animated ? 2.5 : 1.2}
      dashed={animated}
      dashScale={2}
      dashSize={0.5}
      gapSize={0.2}
    />
  );
}

export default function ClusterNetwork3D({
  nodes = [],
  links = [],
  autoRotate = true,
}: Cluster3DProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Position nodes in a 3D circular layout
  const positions: Record<string, [number, number, number]> = {};
  const radius = 3.8;
  const count = nodes.length || 1;

  nodes.forEach((node, i) => {
    const angle = (i / count) * Math.PI * 2;
    const yOffset = node.role === 'replica' ? -1.2 : 0.8;
    positions[node.id] = [
      Math.cos(angle) * (radius * (node.role === 'replica' ? 1.15 : 0.85)),
      yOffset,
      Math.sin(angle) * (radius * (node.role === 'replica' ? 1.15 : 0.85)),
    ];
  });

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e111d] to-[#08090e] border border-border/80 shadow-2xl">
      {/* HUD Info Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm" />
          <span className="text-slate-300 font-medium">Master Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
          <span className="text-slate-300 font-medium">Replica Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
          <span className="text-slate-300 font-medium">Failed / PFAIL</span>
        </div>
      </div>

      {selectedNode && (
        <div className="absolute bottom-3 left-3 z-10 bg-card/90 backdrop-blur-md p-3 rounded-xl border border-indigo-500/40 text-xs text-foreground max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <p className="font-semibold text-indigo-300">{selectedNode.label}</p>
          <p className="text-muted-foreground mt-0.5">Role: <span className="text-slate-200 capitalize">{selectedNode.role}</span></p>
          <p className="text-muted-foreground">Status: <span className={selectedNode.status === 'healthy' ? 'text-emerald-400' : 'text-rose-400'}>{selectedNode.status.toUpperCase()}</span></p>
          {selectedNode.slots && <p className="text-muted-foreground">Hash Slots: <span className="text-cyan-300">{selectedNode.slots}</span></p>}
        </div>
      )}

      <div className="absolute bottom-3 right-3 z-10 text-[11px] text-muted-foreground/80 bg-background/50 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none">
        Drag to Orbit | Scroll to Zoom | Click node to inspect
      </div>

      <Canvas
        camera={{ position: [0, 4, 7.5], fov: 48 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <OrbitControls
          enablePan={false}
          maxDistance={12}
          minDistance={3.5}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />

        {/* Render Links */}
        {links.map((link, idx) => {
          const start = positions[link.source];
          const end = positions[link.target];
          if (!start || !end) return null;
          return (
            <PulsingConnection
              key={`link-${idx}`}
              start={start}
              end={end}
              animated={link.animated}
            />
          );
        })}

        {/* Render Nodes */}
        {nodes.map((node) => {
          const pos = positions[node.id] || [0, 0, 0];
          return (
            <NodeSphere
              key={node.id}
              node={node}
              position={pos}
              isSelected={selectedNodeId === node.id}
              onClick={() =>
                setSelectedNodeId((prev) => (prev === node.id ? null : node.id))
              }
            />
          );
        })}
      </Canvas>
    </div>
  );
}
