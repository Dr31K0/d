
import React from 'react';
import { useSuitcase, SuitcaseColor } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ className }) => {
  const { color, setColor } = useSuitcase();
  
  const colors: { id: SuitcaseColor; name: string; className: string }[] = [
    { id: 'purple', name: 'Amethyst', className: 'bg-crystal-purple' },
    { id: 'blue', name: 'Sapphire', className: 'bg-crystal-blue' },
    { id: 'orange', name: 'Amber', className: 'bg-crystal-orange' },
  ];
  
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-futuristic font-medium text-crystal-dark dark:text-white">Select Color</h3>
      
      <div className="flex space-x-4">
        {colors.map((colorOption) => (
          <button
            key={colorOption.id}
            className={cn(
              'group flex flex-col items-center space-y-2',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-purple focus-visible:ring-offset-2'
            )}
            onClick={() => setColor(colorOption.id)}
            aria-label={`Select ${colorOption.name} color`}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-full transition-all duration-200',
                colorOption.className,
                color === colorOption.id 
                  ? 'ring-2 ring-offset-2 ring-crystal-purple/80 scale-110' 
                  : 'ring-1 ring-white/30 hover:scale-105'
              )}
            />
            <span 
              className={cn(
                'text-xs font-medium transition-colors',
                color === colorOption.id 
                  ? 'text-crystal-dark' 
                  : 'text-crystal-dark/60 group-hover:text-crystal-dark'
              )}
            >
              {colorOption.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
