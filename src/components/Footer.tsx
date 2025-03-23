
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pb-12 pt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <Link to="/" className="font-futuristic text-xl font-semibold text-crystal-dark dark:text-white mb-6">
            Crystal<span className="text-crystal-purple">Case</span>
          </Link>
          
          <div className="text-sm text-crystal-medium/70 dark:text-white/70 mb-8 max-w-md text-center">
            Premium luggage designed for the modern traveler. Durable, stylish, and functional.
          </div>
          
          <div className="flex space-x-6 mb-8">
            <a href="#" className="text-crystal-medium/80 dark:text-white/80 hover:text-crystal-purple dark:hover:text-crystal-purple transition-colors">
              Instagram
            </a>
            <a href="#" className="text-crystal-medium/80 dark:text-white/80 hover:text-crystal-purple dark:hover:text-crystal-purple transition-colors">
              Twitter
            </a>
            <a href="#" className="text-crystal-medium/80 dark:text-white/80 hover:text-crystal-purple dark:hover:text-crystal-purple transition-colors">
              Facebook
            </a>
          </div>
          
          <div className="text-xs text-crystal-medium/60 dark:text-white/60">
            &copy; {new Date().getFullYear()} CrystalCase. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
