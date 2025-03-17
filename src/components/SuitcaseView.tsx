
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
  
  // Determine which image to show based on color and view
  const getImageUrl = () => {
    // This is a placeholder - in a real app, you'd have actual images
    return `https://placehold.co/600x400/e2e8f0/1e293b?text=${color.toUpperCase()}+${view.toUpperCase()}+View`;
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
