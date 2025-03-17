
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Update scrolled state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActiveLink = (path: string) => location.pathname === path;
  
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-display text-xl font-semibold text-crystal-dark"
        >
          Crystal<span className="text-crystal-purple font-medium">Case</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <NavLink to="/" active={isActiveLink('/')}>
            Home
          </NavLink>
          <NavLink to="/details" active={isActiveLink('/details')}>
            Details
          </NavLink>
          <NavLink to="/configure" active={isActiveLink('/configure')}>
            Customize
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

// NavLink component with animation
const NavLink = ({ 
  to, 
  active, 
  children 
}: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'relative py-2 text-sm font-medium transition-colors',
        active 
          ? 'text-crystal-purple' 
          : 'text-crystal-dark/80 hover:text-crystal-purple'
      )}
    >
      {children}
      <span 
        className={cn(
          'absolute bottom-0 left-0 h-0.5 bg-crystal-purple transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  );
};

export default Navbar;
