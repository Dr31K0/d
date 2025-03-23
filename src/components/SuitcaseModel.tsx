
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh, MeshStandardMaterial } from 'three';

// Update to use the GitHub hosted model
const SUITCASE_MODEL_URL = 'https://raw.githubusercontent.com/Dr31K0/3DSuitcase/main/model.glb';

interface SuitcaseModelProps {
  className?: string;
}

const Model = () => {
  const { color } = useSuitcase();
  const { scene } = useGLTF(SUITCASE_MODEL_URL);
  const modelRef = useRef<Group>(null);
  
  // Map selected color to material color
  const getColorValue = () => {
    switch (color) {
      case 'purple':
        return '#9333ea'; // crystal-purple
      case 'blue':
        return '#2563eb'; // crystal-blue
      case 'orange':
        return '#f97316'; // crystal-orange
      default:
        return '#9333ea'; // default to crystal-purple
    }
  };
  
  // Apply color to the model
  React.useEffect(() => {
    try {
      if (scene) {
        scene.traverse((node) => {
          // Use type assertion to fix TypeScript errors
          if ((node as Mesh).isMesh && (node as Mesh).material) {
            // Assuming the main suitcase body has a specific material name
            // You may need to adjust this based on your actual model structure
            const mesh = node as Mesh;
            if (mesh.material instanceof MeshStandardMaterial || 
                Array.isArray(mesh.material) === false) {
              if (mesh.name.includes('Body')) {
                (mesh.material as MeshStandardMaterial).color.set(getColorValue());
              }
            }
          }
        });
      }
    } catch (error) {
      logError(error, 'SuitcaseModel:ApplyColor');
    }
  }, [scene, color]);
  
  // Add subtle animation
  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(t / 4) * 0.1;
    }
  });
  
  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
};

// Fallback component to show while loading
const ModelFallback = () => {
  const { color } = useSuitcase();
  
  // Get color value based on selection
  const getColorValue = () => {
    switch (color) {
      case 'purple':
        return '#9333ea';
      case 'blue':
        return '#2563eb';
      case 'orange':
        return '#f97316';
      default:
        return '#9333ea';
    }
  };
  
  return (
    <mesh>
      <boxGeometry args={[1, 0.6, 0.2]} />
      <meshStandardMaterial color={getColorValue()} />
    </mesh>
  );
};

const SuitcaseModel: React.FC<SuitcaseModelProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30',
        className
      )}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
      >
        {/* Improved lighting setup for better realism */}
        <ambientLight intensity={0.7} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={1024}
        />
        <spotLight 
          position={[-10, 5, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          castShadow 
        />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={1024}
        />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, -0.5, 0]}>
            {/* Center-positioned Model */}
            <Model />
            
            {/* Contact shadow beneath the model */}
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.6}
              scale={5}
              blur={2.5}
              far={4}
              resolution={256}
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
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Instruction */}
      <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default SuitcaseModel;

// Preload the model
useGLTF.preload(SUITCASE_MODEL_URL);
