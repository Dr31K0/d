import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available colors for the suitcase
export type SuitcaseColor = 'purple' | 'blue' | 'orange';

// Define available views for the suitcase
export type SuitcaseView = 'front' | 'side' | 'top';

// Define the context shape
interface SuitcaseContextType {
  color: SuitcaseColor;
  view: SuitcaseView;
  setColor: (color: SuitcaseColor) => void;
  setView: (view: SuitcaseView) => void;
}

// Create the context with a default value
const SuitcaseContext = createContext<SuitcaseContextType | null>(null);

// Provider component
export const SuitcaseProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<SuitcaseColor>('purple');
  const [view, setView] = useState<SuitcaseView>('front');

  const value = {
    color,
    view,
    setColor,
    setView,
  };

  return (
    <SuitcaseContext.Provider value={value}>
      {children}
    </SuitcaseContext.Provider>
  );
};

// Custom hook to use the suitcase context
export const useSuitcase = (): SuitcaseContextType => {
  const context = useContext(SuitcaseContext);
  
  if (context === null) {
    throw new Error('useSuitcase must be used within a SuitcaseProvider');
  }
  
  return context;
};
