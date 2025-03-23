
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Update scrolled state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active - with HashRouter, the pathname includes the hash
  const isActiveLink = (path: string) => {
    // For HashRouter we need to check against the path after the hash
    // For the root path, match either '/' or '#/' or just empty hash
    if (path === '/') {
      return location.pathname === '/' || location.hash === '#/' || location.hash === '';
    }
    // For other paths, check if the hash includes the path
    return location.hash.includes(path);
  };
  
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'py-3 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-display text-xl font-semibold text-crystal-dark group"
        >
          <span className="relative">
            Crystal<span className="text-crystal-purple font-medium">Case</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-crystal-purple via-crystal-pink to-crystal-blue group-hover:w-full transition-all duration-300"></span>
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-crystal-dark hover:bg-white/20 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
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
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 bg-black/80 backdrop-blur-xl z-40 transition-all duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ top: '64px' }}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col items-center space-y-6">
          <MobileNavLink 
            to="/" 
            active={isActiveLink('/')} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </MobileNavLink>
          <MobileNavLink 
            to="/details" 
            active={isActiveLink('/details')} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Details
          </MobileNavLink>
          <MobileNavLink 
            to="/configure" 
            active={isActiveLink('/configure')} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Customize
          </MobileNavLink>
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
          'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-crystal-purple via-crystal-pink to-crystal-blue transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ 
  to, 
  active, 
  onClick,
  children 
}: { 
  to: string; 
  active: boolean;
  onClick: () => void;
  children: React.ReactNode 
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'relative py-3 px-5 text-lg font-medium transition-all rounded-full w-full text-center',
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;

