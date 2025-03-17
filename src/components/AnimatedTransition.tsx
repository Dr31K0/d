
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { logError } from '@/utils/errorLogger';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    try {
      // On route change, apply animation
      const container = containerRef.current;
      if (container) {
        // Reset animation by triggering reflow
        container.classList.remove('animate-fade-in');
        void container.offsetWidth; // Trigger reflow
        container.classList.add('animate-fade-in');
      }
    } catch (error) {
      logError(error, 'AnimatedTransition');
      setHasError(true);
    }
  }, [location.pathname]);
  
  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col pb-4">
        <div className="flex-1 flex items-center justify-center">
          <p>Something went wrong with the page transition. Try refreshing the page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className="min-h-screen flex flex-col pb-4"
      style={{ opacity: 1 }} // Ensure initial visibility
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
