import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { Group, Mesh, PCFSoftShadowMap } from 'three';

const SUITCASE_MODEL_URL = '/suitcase-texture.glb';

interface SuitcaseModelProps {
  className?: string;
}

const SuitcaseLights = React.memo(() => {
  return (
    <>
      <ambientLight intensity={0.6} />
      
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      >
        <orthographicCamera 
          attach="shadow-camera" 
          args={[-10, 10, 10, -10, 0.1, 50]} 
        />
      </directionalLight>
      
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.5} 
      />
      
      <pointLight position={[0, -2, 2]} intensity={0.3} />
      
      <spotLight 
        position={[0, 8, 0]} 
        intensity={0.8}
        angle={0.5}
        penumbra={0.8}
        castShadow
      />
    </>
  );
});

SuitcaseLights.displayName = 'SuitcaseLights';

const Model = React.memo(() => {
  const { color } = useSuitcase();
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<Group>(null);
  
  const { scene } = useGLTF(SUITCASE_MODEL_URL, true, undefined, (e) => {
    console.error('Error details:', {
      error: e,
      url: SUITCASE_MODEL_URL,
      type: e instanceof Error ? e.name : typeof e
    });
    setError(e instanceof Error ? e.message : 'Failed to load model');
    logError(e, {
      component: 'SuitcaseModel',
      action: 'Loading',
      details: {
        url: SUITCASE_MODEL_URL,
        errorType: e instanceof Error ? e.name : typeof e
      }
    });
  });
  
  useEffect(() => {
    try {
      if (scene) {
        scene.traverse((node) => {
          if ((node as Mesh).isMesh) {
            const mesh = node as Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });
      }
    } catch (e) {
      const error = e as Error;
      console.error('Error in model effect:', error);
      setError(error.message);
      logError(error, 'SuitcaseModel:ApplyColor');
    }
  }, [scene]);
  
  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(t / 5) * 0.08;
    }
  });
  
  useEffect(() => {
    // Debug the model loading
    const debugModelLoading = async () => {
      try {
        const response = await fetch(SUITCASE_MODEL_URL);
        console.log('Model fetch response:', {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          ok: response.ok
        });
      } catch (e) {
        console.error('Model fetch error:', e);
      }
    };

    debugModelLoading();
  }, []);
  
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
  
  return <primitive ref={modelRef} object={scene} scale={0.9} position={[0, 0.3, 0]} />;
});

Model.displayName = 'Model';

const ModelFallback = React.memo(() => {
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
  
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1, 0.6, 0.2]} />
      <meshStandardMaterial color={getColorValue()} />
    </mesh>
  );
});

ModelFallback.displayName = 'ModelFallback';

const EnvironmentComponent = React.memo(() => {
  return <Environment preset="city" />;
});

EnvironmentComponent.displayName = 'EnvironmentComponent';

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
        camera={{ position: [0, 0, 4.5], fov: 30 }}
        shadows={{ type: PCFSoftShadowMap }}
        gl={{ 
          preserveDrawingBuffer: true, 
          alpha: true,
          antialias: true, 
          powerPreference: "high-performance" 
        }}
        onCreated={(state) => {
          console.log("Canvas created successfully", state);
        }}
        onError={handleCanvasCreationError}
        dpr={[1, 2]}
      >
        <SuitcaseLights />
        
        <Suspense fallback={<ModelFallback />}>
          <group position={[0, 0, 0]}>
            <Model />
            <ContactShadows
              position={[0, -1.0, 0]}
              opacity={0.75}
              scale={10}
              blur={3}
              far={4}
              resolution={512}
              color="#333333"
            />
          </group>
          <EnvironmentComponent />
        </Suspense>
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={2.5}
          maxDistance={6}
          target={[0, 0.2, 0]} 
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default SuitcaseModel;

useGLTF.preload(SUITCASE_MODEL_URL, true);
