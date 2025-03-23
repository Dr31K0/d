
import React, { useEffect } from 'react';
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
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  }
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const location = useLocation();
  
  // Add scroll to top effect on route change
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      logError(error, 'AnimatedTransition');
    }
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeVariants}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="min-h-screen flex flex-col pb-4 bg-black text-white"
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
