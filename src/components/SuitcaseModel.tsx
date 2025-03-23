
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh, MeshStandardMaterial } from 'three';

// Update to use a more reliable model source with CORS support
const SUITCASE_MODEL_URL = 'https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/model.glb';

interface SuitcaseModelProps {
  className?: string;
}

const Model = () => {
  const { color } = useSuitcase();
  const { scene, nodes } = useGLTF(SUITCASE_MODEL_URL);
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
  
  // Apply color to the model and log model structure to debug
  useEffect(() => {
    try {
      if (scene) {
        console.log('Model loaded:', scene);
        
        scene.traverse((node) => {
          if ((node as Mesh).isMesh) {
            const mesh = node as Mesh;
            console.log('Found mesh:', mesh.name);
            
            // Apply material color to all meshes for visibility
            if (mesh.material) {
              if (mesh.material instanceof MeshStandardMaterial) {
                mesh.material.color.set(getColorValue());
                mesh.material.needsUpdate = true;
                console.log('Applied color to:', mesh.name);
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Error in model effect:', error);
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
        {/* Enhanced lighting setup for better realism */}
        <ambientLight intensity={1} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          shadow-mapSize={1024}
        />
        <spotLight 
          position={[-10, 5, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[0, 5, 0]} intensity={1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={1024}
        />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, 0, 0]}>
            {/* Center-positioned Model */}
            <Model />
            
            {/* Contact shadow beneath the model */}
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

// Preload the model with error handling
try {
  useGLTF.preload(SUITCASE_MODEL_URL);
} catch (error) {
  console.error("Failed to preload model:", error);
}
