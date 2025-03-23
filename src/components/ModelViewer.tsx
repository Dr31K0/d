
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html as DreiHtml } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ModelViewerProps {
  className?: string;
  modelUrl?: string;
}

const SuitcaseModel = ({ modelUrl = '/models/suitcase.glb' }) => {
  const { color, isRotating, rotationSpeed } = useSuitcase();
  const modelRef = useRef<Group>(null);
  const [modelError, setModelError] = useState<boolean>(false);
  
  // Use a try/catch block to handle potential model loading errors
  let scene;
  try {
    // Use the prop-provided modelUrl instead of hardcoded path
    const result = useGLTF(modelUrl);
    scene = result.scene;
  } catch (error) {
    console.error("Error loading model:", error);
    setModelError(true);
  }
  
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
  
  if (modelError) {
    return (
      <mesh>
        <boxGeometry args={[1.5, 1, 0.5]} />
        <meshStandardMaterial color="red" />
        <DreiHtml position={[0, 0, 1]}>
          <div className="bg-black/75 text-white p-2 rounded text-xs">
            Error loading model from {modelUrl}
          </div>
        </DreiHtml>
      </mesh>
    );
  }
  
  return scene ? (
    <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />
  ) : null;
};

// Helper component to display HTML content within the 3D scene
const HtmlContent = ({ children, position = [0, 0, 0] }: { children: React.ReactNode, position?: [number, number, number] }) => {
  return (
    <group position={position}>
      <DreiHtml>
        <div
          className="html-content"
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      </DreiHtml>
    </group>
  );
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
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-crystal-purple" />
    </div>
  );
};

const ModelViewer: React.FC<ModelViewerProps> = ({ className, modelUrl }) => {
  const { isRotating, toggleRotation, zoom, setZoom } = useSuitcase();
  
  return (
    <div className={cn('relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-crystal-light/40 to-white shadow-lg', className)}>
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
        
        <Suspense fallback={<></>}>
          <group position={[0, 0, 0]}>
            <SuitcaseModel modelUrl={modelUrl} />
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
      
      {/* 2D fallback content */}
      <Suspense fallback={<ModelFallback />}>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <ModelFallback />
        </div>
      </Suspense>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 space-x-2">
        <button 
          onClick={toggleRotation}
          className="bg-black/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs hover:bg-black/30 transition-colors hover:-translate-y-0.5 transform duration-200 shadow-lg"
        >
          {isRotating ? 'Stop Rotation' : 'Auto Rotate'}
        </button>
        
        <button 
          onClick={() => setZoom(Math.min(zoom + 0.1, 1.5))}
          className="bg-black/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs hover:bg-black/30 transition-colors hover:-translate-y-0.5 transform duration-200 shadow-lg"
        >
          Zoom In
        </button>
        
        <button 
          onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
          className="bg-black/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs hover:bg-black/30 transition-colors hover:-translate-y-0.5 transform duration-200 shadow-lg"
        >
          Zoom Out
        </button>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs shadow-lg">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ModelViewer;

// Preload the model
try {
  useGLTF.preload('/models/suitcase.glb');
} catch (error) {
  console.error("Error preloading model:", error);
}
