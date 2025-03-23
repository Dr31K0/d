
import React from 'react';
import { useSuitcase } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';

interface SuitcaseModelProps {
  className?: string;
}

const SuitcaseModel: React.FC<SuitcaseModelProps> = ({ className }) => {
  const { color } = useSuitcase();
  
  const getColorValue = () => {
    switch (color) {
      case 'purple':
        return '#9333ea'; // crystal-purple
      case 'blue':
        return '#2563eb'; // crystal-blue
      case 'orange':
        return '#f97316'; // crystal-orange
      default:
        return '#9333ea'; // default to crystal-purple
    }
  };

  return (
    <div 
      className={cn(
        'relative w-full h-[500px] rounded-xl overflow-hidden bg-crystal-light/30',
        className
      )}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className="w-64 h-48 rounded-xl" 
          style={{ 
            backgroundColor: getColorValue(),
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          <div className="w-full h-full relative flex items-center justify-center">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-white/30 rounded-full"></div>
            <div className="w-3/4 h-3/4 border-4 border-white/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuitcaseModel;
