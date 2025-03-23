
import React from 'react';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';

interface SuitcaseViewProps {
  className?: string;
  interactive?: boolean;
}

const SuitcaseView: React.FC<SuitcaseViewProps> = ({
  className,
  interactive = false
}) => {
  const { color, view } = useSuitcase();
  
  // Get the image URL based on color and view
  const getImageUrl = () => {
    // Use the real image paths instead of placeholders
    return `/images/suitcase-${color}-${view}.jpg`;
  };
  
  // Fallback image if the specific combination doesn't exist
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log(`Image for ${color} ${view} not found, using fallback`);
    e.currentTarget.src = `/images/suitcase-purple-front.jpg`;
  };
  
  return (
    <div 
      className={cn(
        'relative rounded-xl overflow-hidden bg-crystal-light/30',
        interactive ? 'cursor-grab active:cursor-grabbing' : '',
        className
      )}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-crystal-purple/5 to-crystal-pink/5" />
      
      {/* Suitcase image */}
      <img
        src={getImageUrl()}
        alt={`${color} suitcase ${view} view`}
        className="w-full h-full object-contain"
        style={{ mixBlendMode: 'multiply' }}
        onError={handleImageError}
      />
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-shimmer animate-shimmer" />
      
      {interactive && (
        <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
          Drag to rotate
        </div>
      )}
    </div>
  );
};

export default SuitcaseView;
