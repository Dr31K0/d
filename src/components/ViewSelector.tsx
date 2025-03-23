
import React from 'react';
import { useSuitcase, SuitcaseView } from '@/context/SuitcaseContext';
import { cn } from '@/lib/utils';

interface ViewSelectorProps {
  className?: string;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ className }) => {
  const { view, setView } = useSuitcase();
  
  const views: { id: SuitcaseView; name: string }[] = [
    { id: 'front', name: 'Front' },
    { id: 'side', name: 'Side' },
    { id: 'top', name: 'Top' },
  ];
  
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-futuristic font-medium text-crystal-dark">Select View</h3>
      
      <div className="flex space-x-2">
        {views.map((viewOption) => (
          <button
            key={viewOption.id}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-purple focus-visible:ring-offset-2',
              view === viewOption.id
                ? 'bg-crystal-purple text-white shadow-sm'
                : 'bg-crystal-light hover:bg-crystal-light/80 text-crystal-dark/70 hover:text-crystal-dark'
            )}
            onClick={() => setView(viewOption.id)}
            aria-label={`View ${viewOption.name}`}
          >
            {viewOption.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewSelector;
