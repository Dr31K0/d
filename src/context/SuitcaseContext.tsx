
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available colors for the suitcase
export type SuitcaseColor = 'purple' | 'blue' | 'orange' | 'green' | 'red';

// Define available views for the suitcase
export type SuitcaseView = 'front' | 'side' | 'top' | 'inside' | 'back';

// Define size options
export type SuitcaseSize = 'small' | 'medium' | 'large';

// Define the context shape
interface SuitcaseContextType {
  color: SuitcaseColor;
  view: SuitcaseView;
  size: SuitcaseSize;
  modelUrl: string;
  isModelLoading: boolean;
  isRotating: boolean;
  rotationSpeed: number;
  zoom: number;
  setColor: (color: SuitcaseColor) => void;
  setView: (view: SuitcaseView) => void;
  setSize: (size: SuitcaseSize) => void;
  setModelLoading: (loading: boolean) => void;
  toggleRotation: () => void;
  setRotationSpeed: (speed: number) => void;
  setZoom: (zoom: number) => void;
}

// Create the context with a default value
const SuitcaseContext = createContext<SuitcaseContextType | undefined>(undefined);

// Provider component
export const SuitcaseProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<SuitcaseColor>('purple');
  const [view, setView] = useState<SuitcaseView>('front');
  const [size, setSize] = useState<SuitcaseSize>('medium');
  const [isModelLoading, setModelLoading] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.5);
  const [zoom, setZoom] = useState<number>(1);
  
  // Use a local model path that will work with GitHub Pages
  const modelUrl = '/models/suitcase.glb';

  const toggleRotation = () => {
    setIsRotating(prev => !prev);
  };

  const value = {
    color,
    view,
    size,
    modelUrl,
    isModelLoading,
    isRotating,
    rotationSpeed,
    zoom,
    setColor,
    setView,
    setSize,
    setModelLoading,
    toggleRotation,
    setRotationSpeed,
    setZoom,
  };

  return (
    <SuitcaseContext.Provider value={value}>
      {children}
    </SuitcaseContext.Provider>
  );
};

// Custom hook to use the suitcase context
export const useSuitcase = () => {
  const context = useContext(SuitcaseContext);
  if (context === undefined) {
    throw new Error('useSuitcase must be used within a SuitcaseProvider');
  }
  return context;
};
