import React, { useState, useEffect, useCallback } from 'react';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';
import { AnimatePresence, motion } from 'framer-motion';

interface SuitcaseViewProps {
  className?: string;
  interactive?: boolean;
}

const SuitcaseView: React.FC<SuitcaseViewProps> = ({
  className,
  interactive = false
}) => {
  const { color, view } = useSuitcase();
  const [imgError, setImgError] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [currentView, setCurrentView] = useState(view);
  const [currentColor, setCurrentColor] = useState(color);
  const cacheBuster = useCallback(() => `?t=${new Date().getTime()}`, []);
  
  useEffect(() => {
    if (currentView !== view || currentColor !== color) {
      setIsChanging(true);
      const timer = setTimeout(() => {
        setCurrentView(view);
        setCurrentColor(color);
        setIsChanging(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [view, color, currentView, currentColor]);
  
  const getImageUrl = useCallback(() => {
    return `https://github.com/Dr31K0/models/blob/4d0eff3896bc68375cff573024b3ca9656cf990d/suitcase-${currentColor}-${currentView}.png${cacheBuster()}`;
  }, [currentColor, currentView, cacheBuster]);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    logError(`Image for ${currentColor} ${currentView} not found, using fallback`, 'SuitcaseView');
    console.log(`Image not found: ${getImageUrl()}`);
    setImgError(true);
    e.currentTarget.src = `https://github.com/Dr31K0/models/blob/4d0eff3896bc68375cff573024b3ca9656cf990d/suitcase-purple-front.png${cacheBuster()}`;
  };
  
  const containerVariants = {
    hover: { 
      scale: 1.03, 
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    },
    tap: { 
      scale: 0.97, 
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  };
  
  const imageVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.92, 
      y: 15
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -15,
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      } 
    }
  };
  
  return (
    <motion.div 
      className={cn(
        'relative rounded-xl overflow-hidden bg-crystal-light/20 backdrop-blur-sm',
        interactive ? 'cursor-grab active:cursor-grabbing' : '',
        className
      )}
      variants={containerVariants}
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-crystal-purple/5 via-transparent to-crystal-pink/5" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentColor}-${currentView}-${cacheBuster()}`}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          <img
            src={imgError ? `https://github.com/Dr31K0/models/blob/4d0eff3896bc68375cff573024b3ca9656cf990d/suitcase-purple-front.png${cacheBuster()}` : getImageUrl()}
            alt={`${currentColor} suitcase ${currentView} view`}
            className="w-full h-full object-contain"
            style={{ mixBlendMode: 'multiply' }}
            onError={handleImageError}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/10 to-transparent" />
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-shine bg-[length:200%_200%]" 
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut" 
        }}
        style={{ opacity: 0.15 }}
      />
      
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
    </motion.div>
  );
};

export default SuitcaseView;
