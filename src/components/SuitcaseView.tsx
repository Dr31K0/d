
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
  
  // Update current view/color with animation when props change
  useEffect(() => {
    if (currentView !== view || currentColor !== color) {
      setIsChanging(true);
      // Wait for exit animation before updating the view/color
      const timer = setTimeout(() => {
        setCurrentView(view);
        setCurrentColor(color);
        setIsChanging(false);
      }, 200); // Match duration with animation
      
      return () => clearTimeout(timer);
    }
  }, [view, color, currentView, currentColor]);
  
  // Get the image URL based on color and view - using the correct repository
  const getImageUrl = useCallback(() => {
    // Updated URL format to point to the 'models' repository
    return `https://raw.githubusercontent.com/Dr31K0/models/b284a7ad9445681838f7d343907e78e0a3b40ce5/suitcase-${currentColor}-${currentView}.png`;
  }, [currentColor, currentView]);
  
  // Fallback image if the specific combination doesn't exist
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    logError(`Image for ${currentColor} ${currentView} not found, using fallback`, 'SuitcaseView');
    console.log(`Image not found: ${getImageUrl()}`);
    setImgError(true);
    // Fallback to a known image in the repository
    e.currentTarget.src = `https://raw.githubusercontent.com/Dr31K0/models/b284a7ad9445681838f7d343907e78e0a3b40ce5/suitcase-purple-front.png`;
  };
  
  // Animation variants
  const containerVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.98, transition: { duration: 0.2 } }
  };
  
  const imageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.2, 0.65, 0.3, 0.9] 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { 
        duration: 0.25, 
        ease: [0.6, 0.15, 0.4, 0.9] 
      } 
    }
  };
  
  return (
    <motion.div 
      className={cn(
        'relative rounded-xl overflow-hidden bg-crystal-light/30',
        interactive ? 'cursor-grab active:cursor-grabbing' : '',
        className
      )}
      variants={containerVariants}
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-crystal-purple/5 to-crystal-pink/5" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Suitcase image with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentColor}-${currentView}`}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          <img
            src={imgError ? `https://raw.githubusercontent.com/Dr31K0/models/b284a7ad9445681838f7d343907e78e0a3b40ce5/suitcase-purple-front.png` : getImageUrl()}
            alt={`${currentColor} suitcase ${currentView} view`}
            className="w-full h-full object-contain"
            style={{ mixBlendMode: 'multiply' }}
            onError={handleImageError}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-shine bg-[length:200%_200%] animate-shimmer opacity-20" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {interactive && (
        <motion.div 
          className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Drag to rotate
        </motion.div>
      )}
    </motion.div>
  );
};

export default SuitcaseView;
