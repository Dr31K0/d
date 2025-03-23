
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname === path;
  };
  
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all',
        scrolled 
          ? 'py-2 backdrop-blur-2xl bg-white/5 dark:bg-black/5 border-b border-white/5 dark:border-gray-800/5 shadow-sm' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-futuristic text-xl font-semibold text-crystal-dark dark:text-white group overflow-hidden"
        >
          <span className="relative inline-block">
            Crystal<span className="text-crystal-purple font-medium">Case</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-crystal-purple via-crystal-pink to-crystal-blue group-hover:w-full transition-all duration-300 ease-out"></span>
          </span>
        </Link>
        
        <div className="lg:hidden">
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 dark:border-crystal-medium/10 text-crystal-dark dark:text-white hover:bg-white/10 dark:hover:bg-crystal-medium/10 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        
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
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-2xl z-40"
            style={{ top: '64px' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <motion.div 
              className="container mx-auto px-6 py-8 flex flex-col items-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <MobileNavLink 
                to="/" 
                active={isActiveLink('/')} 
                onClick={() => setMobileMenuOpen(false)}
                delay={0.1}
              >
                Home
              </MobileNavLink>
              <MobileNavLink 
                to="/details" 
                active={isActiveLink('/details')} 
                onClick={() => setMobileMenuOpen(false)}
                delay={0.2}
              >
                Details
              </MobileNavLink>
              <MobileNavLink 
                to="/configure" 
                active={isActiveLink('/configure')} 
                onClick={() => setMobileMenuOpen(false)}
                delay={0.3}
              >
                Customize
              </MobileNavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

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
          ? 'text-crystal-purple dark:text-crystal-purple' 
          : 'text-crystal-dark/80 dark:text-white/80 hover:text-crystal-purple dark:hover:text-crystal-purple'
      )}
    >
      <span className="relative inline-block overflow-hidden">
        {children}
        <motion.span 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-crystal-purple via-crystal-pink to-crystal-blue"
          initial={{ width: active ? "100%" : "0%" }}
          animate={{ width: active ? "100%" : "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </Link>
  );
};

const MobileNavLink = ({ 
  to, 
  active, 
  onClick,
  delay,
  children 
}: { 
  to: string; 
  active: boolean;
  onClick: () => void;
  delay: number;
  children: React.ReactNode 
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="w-full"
    >
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          'relative py-3 px-5 text-lg font-medium transition-all rounded-full w-full flex items-center justify-center',
          active 
            ? 'bg-white/10 text-white' 
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        )}
      >
        <motion.span
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default Navbar;
