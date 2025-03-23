
import React from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pb-4">
      {children}
      
      {/* Hero gradient blob */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-crystal-purple/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-radial from-crystal-pink/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-radial from-crystal-blue/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse-slow delay-700" />
      </div>
    </div>
  );
};

export default AnimatedTransition;
