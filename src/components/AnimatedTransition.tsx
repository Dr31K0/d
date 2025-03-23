
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pb-4">
      {children}
      
      {/* Hero gradient blob with improved animations */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-crystal-purple/10 to-transparent rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 5, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-radial from-crystal-pink/10 to-transparent rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -5, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-radial from-crystal-blue/10 to-transparent rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedTransition;
