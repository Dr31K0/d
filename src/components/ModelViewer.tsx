
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { cn } from '@/lib/utils';

interface ModelViewerProps {
  className?: string;
}

const SuitcaseModel = () => {
  const { color, isRotating, rotationSpeed } = useSuitcase();
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/suitcase.glb');
  
  // Apply color to the model
  useEffect(() => {
    if (scene) {
      scene.traverse((node) => {
        if ((node as Mesh).isMesh) {
          const mesh = node as Mesh;
          if (mesh.material && mesh.material instanceof MeshStandardMaterial) {
            mesh.material.color.set(getColorValue(color));
            mesh.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, color]);
  
  // Handle rotation animation
  useFrame((state) => {
    if (modelRef.current) {
      if (isRotating) {
        modelRef.current.rotation.y += 0.01 * rotationSpeed;
      } else {
        // Subtle floating animation
        const t = state.clock.getElapsedTime();
        modelRef.current.rotation.y = Math.sin(t / 4) * 0.1;
      }
    }
  });
  
  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
};

// Helper function to get color value based on selected color
const getColorValue = (color: string) => {
  switch (color) {
    case 'purple':
      return '#9333ea';
    case 'blue':
      return '#2563eb';
    case 'orange':
      return '#f97316';
    case 'green':
      return '#22c55e';
    case 'red':
      return '#ef4444';
    default:
      return '#9333ea';
  }
};

// Loading placeholder
const ModelFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 0.6, 0.2]} />
      <meshStandardMaterial color="#9333ea" />
    </mesh>
  );
};

const ModelViewer: React.FC<ModelViewerProps> = ({ className }) => {
  const { isRotating, toggleRotation, zoom, setZoom } = useSuitcase();
  
  return (
    <div className={cn('relative w-full h-[400px] rounded-xl overflow-hidden bg-crystal-light/30', className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, zoom }}
        shadows
      >
        <ambientLight intensity={1.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2.5} 
          castShadow 
        />
        <pointLight position={[0, 5, 0]} intensity={1.5} />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, 0, 0]}>
            <SuitcaseModel />
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.8}
              scale={10}
              blur={2.5}
              far={4}
              resolution={512}
              color="#000000"
            />
          </group>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={7}
        />
      </Canvas>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 space-x-2">
        <button 
          onClick={toggleRotation}
          className="bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-black/20 transition-colors"
        >
          {isRotating ? 'Stop Rotation' : 'Auto Rotate'}
        </button>
        
        <button 
          onClick={() => setZoom(Math.min(zoom + 0.1, 1.5))}
          className="bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-black/20 transition-colors"
        >
          Zoom In
        </button>
        
        <button 
          onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
          className="bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-black/20 transition-colors"
        >
          Zoom Out
        </button>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ModelViewer;

// Preload the model
useGLTF.preload('/models/suitcase.glb');
