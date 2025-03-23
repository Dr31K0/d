
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh, MeshStandardMaterial } from 'three';

interface SuitcaseModelProps {
  className?: string;
}

const Model = () => {
  const { color, modelUrl, setModelLoading } = useSuitcase();
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  
  const { scene, nodes } = useGLTF(modelUrl, undefined, true, 
    () => {
      console.log('Model loaded successfully via callback');
      setLoaded(true);
      setModelLoading(false);
    }
  );
  
  useEffect(() => {
    const handleModelError = (e: ErrorEvent) => {
      if (e.message && e.message.includes('GLB')) {
        console.error("Error loading model:", e);
        setError("Failed to load 3D model: " + e.message);
        setModelLoading(false);
      }
    };
    
    window.addEventListener('error', handleModelError);
    return () => window.removeEventListener('error', handleModelError);
  }, [setModelLoading]);
  
  const modelRef = useRef<Group>(null);
  
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
  
  useEffect(() => {
    try {
      if (scene) {
        console.log('Model loaded successfully:', scene);
        
        scene.traverse((node) => {
          if ((node as Mesh).isMesh) {
            const mesh = node as Mesh;
            console.log('Found mesh:', mesh.name);
            
            if (mesh.material) {
              if (mesh.material instanceof MeshStandardMaterial) {
                mesh.material.color.set(getColorValue());
                mesh.material.needsUpdate = true;
                console.log('Applied color to:', mesh.name);
              } else {
                console.log('Material is not MeshStandardMaterial:', mesh.material);
              }
            } else {
              console.log('Mesh has no material:', mesh.name);
            }
          }
        });
        
        setLoaded(true);
        setModelLoading(false);
      } else {
        console.warn('Scene is undefined');
      }
    } catch (e) {
      const error = e as Error;
      console.error('Error in model effect:', error);
      setError(error.message);
      setModelLoading(false);
      logError(error, 'SuitcaseModel:ApplyColor');
    }
  }, [scene, color, setModelLoading]);
  
  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(t / 4) * 0.1;
    }
  });
  
  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 0.6, 0.2]} />
        <meshStandardMaterial color="red" />
        <Html position={[0, 1, 0]}>
          <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
            Error loading model: {error}
          </div>
        </Html>
      </mesh>
    );
  }
  
  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
};

const ModelFallback = () => {
  const { color } = useSuitcase();
  
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
  
  console.log("Showing fallback model");
  
  return (
    <mesh>
      <boxGeometry args={[1, 0.6, 0.2]} />
      <meshStandardMaterial color={getColorValue()} />
    </mesh>
  );
};

const Html = ({ children, position }: { children: React.ReactNode, position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <div className="html-content" style={{
        position: 'absolute',
        fontSize: '12px',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}>
        {children}
      </div>
    </group>
  );
};

const SuitcaseModel: React.FC<SuitcaseModelProps> = ({ className }) => {
  const [canvasError, setCanvasError] = useState<string | null>(null);
  const { isModelLoading } = useSuitcase();
  
  const handleCanvasCreationError = (error: any) => {
    console.error("Canvas creation error:", error);
    if (error instanceof Error) {
      setCanvasError(error.message);
      logError(error, 'SuitcaseModel:CanvasCreation');
    } else {
      setCanvasError("Unknown canvas error occurred");
      logError(new Error("Unknown canvas error"), 'SuitcaseModel:CanvasCreation');
    }
  };
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.error("WebGL not supported");
        setCanvasError("WebGL not supported by your browser. Please try a different browser or enable hardware acceleration.");
      } else {
        console.log("WebGL is supported");
      }
    } catch (e) {
      console.error("Error checking WebGL support:", e);
    }
    
    return () => {
    };
  }, []);
  
  if (canvasError) {
    return (
      <div className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30 flex items-center justify-center',
        className
      )}>
        <div className="p-4 bg-red-500/10 rounded-lg text-red-600 max-w-md text-center">
          <h3 className="font-bold mb-2">3D Rendering Error</h3>
          <p>{canvasError}</p>
          <p className="mt-2 text-sm">
            Try using a modern browser like Chrome, Firefox, or Edge with hardware acceleration enabled.
          </p>
        </div>
      </div>
    );
  }
  
  // Show placeholder while the model is loading
  if (isModelLoading) {
    return (
      <div className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30 flex items-center justify-center',
        className
      )}>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-crystal-purple/30 border-t-crystal-purple rounded-full animate-spin mb-4"></div>
          <p className="text-crystal-medium font-medium">Loading 3D Model...</p>
          <p className="text-crystal-medium/60 text-sm mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }
  
  console.log("Rendering SuitcaseModel component");
  
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
        onCreated={(state) => {
          console.log("Canvas created successfully", state);
        }}
        onError={handleCanvasCreationError}
      >
        <ambientLight intensity={1.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2.5} 
          castShadow 
          shadow-mapSize={1024}
        />
        <spotLight 
          position={[-10, 5, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
        />
        <pointLight position={[0, 5, 0]} intensity={1.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={1024}
        />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, 0, 0]}>
            <Model />
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
      
      <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default SuitcaseModel;

try {
  const { modelUrl } = useSuitcase();
  console.log("Attempting to preload model:", modelUrl);
  useGLTF.preload(modelUrl);
} catch (error) {
  console.error("Failed to preload model:", error);
}
