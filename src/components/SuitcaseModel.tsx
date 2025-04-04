
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, SpotLight } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh, MeshStandardMaterial } from 'three';

const SUITCASE_MODEL_URL = 'https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/model.glb';
const FALLBACK_MODEL_URL = 'https://raw.githubusercontent.com/Dr31K0/3DSuitcase/main/model.glb';

interface SuitcaseModelProps {
  className?: string;
}

const SuitcaseLights = () => {
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const pointLightRef = useRef();
  const directionalRef = useRef();

  return (
    <>
      <spotLight
        ref={spotLightRef1}
        position={[3, 5, 3]}
        angle={0.5}
        penumbra={0.5}
        intensity={5} // Reduced from 8
        castShadow
        shadow-bias={-0.0001}
      />
      
      <spotLight
        ref={spotLightRef2}
        position={[-3, 3, -1]}
        angle={0.6}
        penumbra={0.8}
        intensity={3} // Reduced from 6
        castShadow
      />
      
      <pointLight
        ref={pointLightRef}
        position={[0, 4, -5]}
        intensity={2} // Reduced from 4
      />
      
      <directionalLight
        ref={directionalRef}
        position={[5, 8, 5]}
        intensity={2} // Reduced from 3
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      <ambientLight intensity={0.8} /> // Reduced from 1.5
      
      <pointLight position={[-2, 1, 1]} intensity={1.5} color="#7a6bc4" /> // Darker purple
      <pointLight position={[2, 0, -2]} intensity={1} color="#B094F0" /> // Darker lavender
    </>
  );
};

const Model = () => {
  const { color } = useSuitcase();
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  
  const { scene, nodes } = useGLTF(SUITCASE_MODEL_URL, undefined, true);
  
  useEffect(() => {
    const handleModelError = (e: ErrorEvent) => {
      if (e.message && e.message.includes('GLB')) {
        console.error("Error loading model:", e);
        setError("Failed to load 3D model: " + e.message);
      }
    };
    
    window.addEventListener('error', handleModelError);
    return () => window.removeEventListener('error', handleModelError);
  }, []);
  
  const modelRef = useRef<Group>(null);
  
  const getColorValue = () => {
    switch (color) {
      case 'purple':
        return '#9678d9'; // Darker purple
      case 'blue':
        return '#6096e0'; // Darker blue
      case 'orange':
        return '#e68a4e'; // Darker orange
      default:
        return '#9678d9'; // Darker purple default
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
                mesh.material.emissive.set(getColorValue());
                mesh.material.emissiveIntensity = 0.1; // Reduced from 0.2
                mesh.material.metalness = 0.9;
                mesh.material.roughness = 0.3; // Increased slightly from 0.2
                mesh.material.needsUpdate = true;
                
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                
                console.log('Applied color and material settings to:', mesh.name);
              } else {
                console.log('Material is not MeshStandardMaterial:', mesh.material);
              }
            } else {
              console.log('Mesh has no material:', mesh.name);
            }
          }
        });
        
        setLoaded(true);
      } else {
        console.warn('Scene is undefined');
      }
    } catch (e) {
      const error = e as Error;
      console.error('Error in model effect:', error);
      setError(error.message);
      logError(error, 'SuitcaseModel:ApplyColor');
    }
  }, [scene, color]);
  
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
      <meshStandardMaterial color={getColorValue()} emissive={getColorValue()} emissiveIntensity={0.2} />
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
  
  console.log("Rendering SuitcaseModel component");
  
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
              opacity={0.7} // Increased from 0.6
              scale={10}
              blur={3}
              far={4}
              resolution={512}
              color="#333" // Darker shadow color
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
  console.error("Failed to preload model:", error);
  try {
    console.log("Attempting to preload fallback model:", FALLBACK_MODEL_URL);
    useGLTF.preload(FALLBACK_MODEL_URL);
  } catch (fallbackError) {
    console.error("Failed to preload fallback model:", fallbackError);
  }
}
