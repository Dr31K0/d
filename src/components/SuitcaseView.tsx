
import React, { useState } from 'react';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';

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
  
  // Get the image URL based on color and view - using the same location as the GLB file
  const getImageUrl = () => {
    // Updated URL format to match location alongside GLB file
    return `https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/suitcase-${color}-${view}.png`;
  };
  
  // Fallback image if the specific combination doesn't exist
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    logError(`Image for ${color} ${view} not found, using fallback`, 'SuitcaseView');
    console.log(`Image not found: ${getImageUrl()}`);
    setImgError(true);
    // Fallback to a common CDN URL
    e.currentTarget.src = `https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/suitcase-purple-front.png`;
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
        src={imgError ? `https://cdn.jsdelivr.net/gh/Dr31K0/3DSuitcase@main/suitcase-purple-front.png` : getImageUrl()}
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
