
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh, MeshStandardMaterial } from 'three';

// Updated model URL with a more reliable CDN
const SUITCASE_MODEL_URL = 'https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/model.glb';
// Fallback URL if needed
const FALLBACK_MODEL_URL = 'https://raw.githubusercontent.com/Dr31K0/3DSuitcase/main/model.glb';

interface SuitcaseModelProps {
  className?: string;
}

const Model = () => {
  const { color } = useSuitcase();
  const [error, setError] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState(SUITCASE_MODEL_URL);
  const retryCount = useRef(0);
  
  // Handle model loading with better error handling
  const { scene, nodes } = useGLTF(modelUrl, true, undefined, (e) => {
    console.error("GLB loading error:", e);
    setError(`Failed to load 3D model: ${e.message || 'Unknown error'}`);
    
    // Try fallback URL if main URL fails and we haven't tried it yet
    if (modelUrl === SUITCASE_MODEL_URL && retryCount.current < 1) {
      console.log("Trying fallback model URL");
      setModelUrl(FALLBACK_MODEL_URL);
      retryCount.current += 1;
    }
  });
  
  // Additional monitoring for model loading errors
  useEffect(() => {
    const handleModelError = (e: ErrorEvent) => {
      if (e.message && (e.message.includes('GLB') || e.message.includes('three'))) {
        console.error("3D model error:", e);
        setError("3D model loading issue: " + e.message);
      }
    };
    
    window.addEventListener('error', handleModelError);
    return () => window.removeEventListener('error', handleModelError);
  }, [modelUrl]);
  
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
              }
            }
          }
        });
      }
    } catch (e) {
      const error = e as Error;
      console.error('Error in model effect:', error);
      setError(error.message);
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
  
  if (error) {
    // Return a simple colored box as fallback
    return (
      <mesh>
        <boxGeometry args={[1, 0.6, 0.2]} />
        <meshStandardMaterial color={getColorValue()} />
      </mesh>
    );
  }
  
  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
};

// Fallback component to show while loading
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
  
  return (
    <mesh>
      <boxGeometry args={[1, 0.6, 0.2]} />
      <meshStandardMaterial color={getColorValue()} />
    </mesh>
  );
};

// Fallback component for when 3D isn't available
const StaticSuitcaseImage = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className="w-64 h-48 rounded-xl" 
        style={{ 
          backgroundColor: color === 'purple' ? '#9333ea' : 
                          color === 'blue' ? '#2563eb' : 
                          color === 'orange' ? '#f97316' : '#9333ea',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
      >
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3/4 h-3/4 border-4 border-white/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

const SuitcaseModel: React.FC<SuitcaseModelProps> = ({ className }) => {
  const { color } = useSuitcase();
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Check WebGL support on component mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.error("WebGL not supported");
        setWebglSupported(false);
      } else {
        console.log("WebGL is supported");
        
        // Monitor for context loss
        gl.canvas.addEventListener('webglcontextlost', () => {
          console.error("WebGL context lost");
          setWebglSupported(false);
        });
      }
    } catch (e) {
      console.error("Error checking WebGL support:", e);
      setWebglSupported(false);
    }
  }, []);
  
  // Handler for Canvas errors
  const handleCanvasError = (error: any) => {
    console.error("Canvas error:", error);
    setRenderError(error instanceof Error ? error.message : "Unknown rendering error");
    setWebglSupported(false);
  };
  
  // If WebGL isn't supported, show static image
  if (!webglSupported || renderError) {
    return (
      <div className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30 flex items-center justify-center',
        className
      )}>
        <StaticSuitcaseImage color={color} />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 text-white text-sm text-center">
          3D model display not available. Your browser may not support WebGL.
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
        onCreated={(state) => {
          console.log("Canvas created successfully", state);
        }}
        onError={handleCanvasError}
      >
        {/* Enhanced lighting setup for better realism */}
        <ambientLight intensity={1.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2.5} 
          castShadow 
        />
        <spotLight 
          position={[-10, 5, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
        />
        <pointLight position={[0, 5, 0]} intensity={1.5} />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, 0, 0]}>
            <Model />
            
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.8}
              scale={10}
              blur={2.5}
              far={4}
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
      
      <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default SuitcaseModel;

// Preload both model URLs with error handling
try {
  useGLTF.preload(SUITCASE_MODEL_URL);
} catch (error) {
  console.warn("Preloading main model failed:", error);
  try {
    useGLTF.preload(FALLBACK_MODEL_URL);
  } catch (fallbackError) {
    console.warn("Preloading fallback model failed:", fallbackError);
  }
}
