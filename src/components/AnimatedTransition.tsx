
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // On route change, apply animation
    const container = containerRef.current;
    if (container) {
      // Reset animation by triggering reflow
      container.classList.remove('animate-fade-in');
      void container.offsetWidth; // Trigger reflow
      container.classList.add('animate-fade-in');
    }
  }, [location.pathname]);
  
  return (
    <div 
      ref={containerRef} 
      className="min-h-screen flex flex-col pb-4 opacity-0 animate-fade-in"
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
