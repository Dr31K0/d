
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logError } from '@/utils/errorLogger';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const fadeVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  }
};

const fadeTransition = {
  duration: 0.3,
  ease: "easeInOut",
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [hasError, setHasError] = useState(false);
  
  // Add scroll to top effect on route change
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="exit"
        variants={fadeVariants}
        transition={fadeTransition}
        className="min-h-screen flex flex-col pb-4"
      >
        {children}
        
        {/* Hero gradient blob */}
        <div className="fixed -z-10 top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-crystal-purple/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-radial from-crystal-pink/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-radial from-crystal-blue/10 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse-slow delay-700" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
