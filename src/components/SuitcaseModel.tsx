
import React, { useRef, useState } from 'react';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';

interface SuitcaseModelProps {
  className?: string;
}

const SuitcaseModel: React.FC<SuitcaseModelProps> = ({ className }) => {
  const { color } = useSuitcase();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  
  // Simulate 3D interaction with mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPosition.current.x;
    const deltaY = e.clientY - lastPosition.current.y;
    
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Get color-specific styles
  const getColorStyle = () => {
    switch (color) {
      case 'purple':
        return 'bg-crystal-purple';
      case 'blue':
        return 'bg-crystal-blue';
      case 'orange':
        return 'bg-crystal-orange';
      default:
        return 'bg-crystal-purple';
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30',
        'cursor-grab active:cursor-grabbing',
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Simulated 3D object */}
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{
          transform: `translate(-50%, -50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {/* Front face */}
        <div 
          className={cn(
            'absolute inset-0 transform-gpu -translate-z-20 border border-white/20 rounded-lg shadow-lg',
            getColorStyle()
          )}
        />
        
        {/* Simulated handle */}
        <div className="absolute top-6 left-1/2 w-12 h-4 -translate-x-1/2 bg-gray-800 rounded-t-lg" />
        
        {/* Simulated details */}
        <div className="absolute bottom-6 left-10 right-10 h-1 bg-white/20 rounded-full" />
        <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/20 rounded-full" />
      </div>
      
      {/* Shadows and highlights */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/5" />
      <div className="absolute top-0 left-0 w-full h-full bg-shimmer animate-shimmer" />
      
      {/* Instruction */}
      <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Drag to rotate
      </div>
    </div>
  );
};

export default SuitcaseModel;
