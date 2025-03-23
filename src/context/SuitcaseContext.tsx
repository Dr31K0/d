
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available colors for the suitcase
export type SuitcaseColor = 'purple' | 'blue' | 'orange';

// Define available views for the suitcase
export type SuitcaseView = 'front' | 'side' | 'top' | 'inside';

// Define the context shape
interface SuitcaseContextType {
  color: SuitcaseColor;
  setColor: (color: SuitcaseColor) => void;
  view: SuitcaseView;
  setView: (view: SuitcaseView) => void;
}

// Create the context with a default value
const SuitcaseContext = createContext<SuitcaseContextType | undefined>(undefined);

// Provider component
export const SuitcaseProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<SuitcaseColor>('purple');
  const [view, setView] = useState<SuitcaseView>('front');

  const value = {
    color,
    setColor,
    view,
    setView,
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
