
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  asLink?: boolean;
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asLink, to, children, ...props }, ref) => {
    const { isDark } = useTheme();
    
    const baseStyles = cn(
      'relative inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-crystal-purple hover:bg-crystal-purple/90 text-white shadow-sm',
      variant === 'outline' && 
        (isDark 
          ? 'border border-gray-700/40 bg-transparent hover:bg-white/5 text-white' 
          : 'border border-crystal-gray/20 bg-transparent hover:bg-crystal-gray/5 text-foreground'),
      variant === 'ghost' && 
        (isDark 
          ? 'bg-transparent hover:bg-white/5 text-white' 
          : 'bg-transparent hover:bg-crystal-gray/5 text-foreground'),
      size === 'default' && 'h-10 px-6 py-2',
      size === 'sm' && 'h-8 rounded-md px-3 text-xs',
      size === 'lg' && 'h-12 rounded-xl px-8 text-base',
      className
    );

    // Crystal effect - shimmer overlay
    const shimmerOverlay = (
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className={`absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-${isDark ? 'white/5' : 'white/10'} to-transparent`}></span>
      </span>
    );

    if (asLink && to) {
      return (
        <Link to={to} className={baseStyles}>
          {shimmerOverlay}
          {children}
        </Link>
      );
    }

    return (
      <button className={baseStyles} ref={ref} {...props}>
        {shimmerOverlay}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
