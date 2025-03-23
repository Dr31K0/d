
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-crystal-light/50 dark:bg-crystal-dark/70 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-crystal-dark dark:text-white">
              Crystal<span className="text-crystal-purple">Case</span>
            </h3>
            <p className="text-sm text-crystal-medium/70 dark:text-gray-300 max-w-xs">
              Redefining travel with precision-engineered suitcases inspired by nature's most resilient structures.
            </p>
          </div>
          
          {/* Navigation column */}
          <div className="space-y-4">
            <h4 className="font-medium text-crystal-dark dark:text-white">Navigation</h4>
            <div className="flex flex-col space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/details">Details</FooterLink>
              <FooterLink to="/configure">Customize</FooterLink>
            </div>
          </div>
          
          {/* Contact column */}
          <div className="space-y-4">
            <h4 className="font-medium text-crystal-dark dark:text-white">Contact</h4>
            <div className="flex flex-col space-y-2 text-sm text-crystal-medium/70 dark:text-gray-300">
              <p>info@crystalcase.com</p>
              <p>+1 (888) 555-0123</p>
              <p>123 Innovation Drive, Tech City</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-crystal-gray/10 dark:border-gray-700/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-crystal-medium/50 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CrystalCase. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-crystal-medium/50 dark:text-gray-400">Privacy Policy</span>
            <span className="text-xs text-crystal-medium/50 dark:text-gray-400">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="text-sm text-crystal-medium/70 dark:text-gray-300 hover:text-crystal-purple dark:hover:text-crystal-purple transition-colors"
    >
      {children}
    </Link>
  );
};

export default Footer;
