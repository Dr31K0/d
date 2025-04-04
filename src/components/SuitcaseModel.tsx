
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh } from 'three';

const SUITCASE_MODEL_URL = 'https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/suitcase_texture.glb';
const FALLBACK_MODEL_URL = 'https://raw.githubusercontent.com/Dr31K0/3DSuitcase/main/suitcase_texture.glb';

interface SuitcaseModelProps {
  className?: string;
}

const SuitcaseLights = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.5} 
      />
    </>
  );
};

const Model = () => {
  const { color } = useSuitcase();
  const [error, setError] = useState<string | null>(null);
  
  // Load the 3D model
  const { scene } = useGLTF(SUITCASE_MODEL_URL, undefined, undefined, (e) => {
    console.error('Error loading model:', e);
    setError(e.message);
  });
  
  useEffect(() => {
    try {
      if (scene) {
        console.log('Model loaded successfully:', scene);
        
        // Apply suitcase settings and enable shadows but DON'T modify the materials
        scene.traverse((node) => {
          if ((node as Mesh).isMesh) {
            const mesh = node as Mesh;
            console.log('Found mesh:', mesh.name);
            
            // Enable shadows on all meshes
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            // Just log the material info for debugging - don't modify it
            if (mesh.material) {
              console.log('Material found:', mesh.material);
            }
          }
        });
      } else {
        console.warn('Scene is undefined');
      }
    } catch (e) {
      const error = e as Error;
      console.error('Error in model effect:', error);
      setError(error.message);
      logError(error, 'SuitcaseModel:ApplyColor');
    }
  }, [scene]);
  
  const modelRef = useRef<Group>(null);
  
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
  
  return <primitive ref={modelRef} object={scene} scale={2.0} position={[0, 0, 0]} />;
};

const ModelFallback = () => {
  const { color } = useSuitcase();
  
  const getColorValue = () => {
    switch (color) {
      case 'purple':
        return '#B794F6';
      case 'blue':
        return '#7AB7FF';
      case 'orange':
        return '#FFAC74';
      default:
        return '#B794F6';
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
  
  return (
    <div 
      className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30',
        className
      )}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        shadows
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        onCreated={(state) => {
          console.log("Canvas created successfully", state);
        }}
        onError={handleCanvasCreationError}
      >
        <SuitcaseLights />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, 0, 0]}>
            <Model />
            <ContactShadows
              position={[0, -1.0, 0]}
              opacity={0.6}
              scale={10}
              blur={3}
              far={4}
              resolution={512}
              color="#555"
            />
          </group>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={5}
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
  console.log("Attempting to preload model:", SUITCASE_MODEL_URL);
  useGLTF.preload(SUITCASE_MODEL_URL);
} catch (error) {
  console.error("Failed to preload model or texture:", error);
  try {
    console.log("Attempting to preload fallback model:", FALLBACK_MODEL_URL);
    useGLTF.preload(FALLBACK_MODEL_URL);
  } catch (fallbackError) {
    console.error("Failed to preload fallback model:", fallbackError);
  }
}
