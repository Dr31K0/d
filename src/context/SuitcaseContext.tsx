
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available colors for the suitcase
export type SuitcaseColor = 'purple' | 'blue' | 'orange';

// Define the context shape
interface SuitcaseContextType {
  color: SuitcaseColor;
  setColor: (color: SuitcaseColor) => void;
}

// Create the context with a default value
const SuitcaseContext = createContext<SuitcaseContextType | undefined>(undefined);

// Provider component
export const SuitcaseProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<SuitcaseColor>('purple');

  const value = {
    color,
    setColor,
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
