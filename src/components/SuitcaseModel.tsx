
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';

// Import suitcase GLB model
// Note: You'll need to place the GLB file in the public folder
const SUITCASE_MODEL_URL = '/suitcase.glb';

interface SuitcaseModelProps {
  className?: string;
}

const Model = () => {
  const { color } = useSuitcase();
  const { scene } = useGLTF(SUITCASE_MODEL_URL);
  const modelRef = useRef();
  
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
          if (node.isMesh && node.material) {
            // Assuming the main suitcase body has a specific material name
            // You may need to adjust this based on your actual model structure
            if (node.material.name === 'SuitcaseBody' || node.name.includes('Body')) {
              node.material.color.set(getColorValue());
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
  
  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} />;
};

// Fallback component to show while loading
const ModelFallback = () => {
  const { color } = useSuitcase();
  
  // Get color-specific styles
  const getColorStyle = () => {
    switch (color) {
      case 'purple':
        return 'bg-crystal-purple';
      case 'blue':
        return 'bg-crystal-blue';
      case 'orange':
        return 'bg-crystal-orange';
      default:
        return 'bg-crystal-purple';
    }
  };
  
  return (
    <mesh>
      <boxGeometry args={[1, 0.6, 0.2]} />
      <meshStandardMaterial color={getColorStyle().replace('bg-crystal-', '#')} />
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
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={<ModelFallback />}>
          <Model />
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
