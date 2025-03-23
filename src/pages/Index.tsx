
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import SuitcaseView from '@/components/SuitcaseView';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      
      // Apply a subtle parallax effect
      heroElement.style.transform = `translateY(${scrollY * 0.2}px)`;
      heroElement.style.opacity = `${1 - (scrollY * 0.002)}`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <AnimatedTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-crystal-purple/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-crystal-pink/5 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 bg-crystal-purple/10 rounded-full">
                  <span className="text-xs font-medium text-crystal-purple">Introducing</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-crystal-dark">
                  Revolution in <span className="text-gradient">Crystal</span> Luggage
                </h1>
                <p className="text-lg text-crystal-medium/70 max-w-lg">
                  Inspired by nature's most resilient structures, engineered for the modern traveler.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button size="lg" asLink to="/details">
                  Explore Features
                </Button>
                <Link 
                  to="/configure" 
                  className="text-crystal-dark/70 hover:text-crystal-dark font-medium flex items-center"
                >
                  Customize Now
                  <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Suitcase image */}
            <div ref={heroRef} className="relative">
              <div className="absolute -z-10 inset-0 transform -translate-y-4 translate-x-4">
                <div className="w-full h-full bg-crystal-light rounded-2xl" />
              </div>
              <div className="crystal-card p-6">
                <SuitcaseView className="w-full h-[400px]" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
          <span className="text-xs font-medium text-crystal-dark/50">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-crystal-dark/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-crystal-dark/30 rounded-full mt-2 animate-pulse-slow" />
          </div>
        </div>
      </section>
      
      {/* Features Preview Section */}
      <section className="py-24 bg-crystal-light/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-crystal-dark">
              Crafted with Precision
            </h2>
            <p className="mt-4 text-crystal-medium/70">
              Every detail matters in the pursuit of perfection. Discover what makes our suitcase unique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="crystal-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-crystal-purple/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-crystal-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                Crystal Structure
              </h3>
              <p className="text-crystal-medium/70">
                Our proprietary framework mimics natural crystal formations for unparalleled strength and lightness.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="crystal-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-crystal-blue/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-crystal-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58718 21.9983 7.99501C21.9983 6.40285 21.3658 4.87581 20.24 3.75001C19.1142 2.62421 17.5871 1.99171 15.995 1.99171C14.4028 1.99171 12.8758 2.62421 11.75 3.75001L5 10.5V19H13.5L20.24 12.24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 8L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                Adaptive Design
              </h3>
              <p className="text-crystal-medium/70">
                Customize your experience with modular compartments that adapt to your unique travel needs.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="crystal-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-crystal-orange/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-crystal-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.4 15C19.1277 15.8031 19.0989 16.6712 19.3169 17.4919C19.5349 18.3126 20.0003 19.0489 20.659 19.5922C21.3176 20.1355 22.1375 20.4581 22.9926 20.517C23.8478 20.5759 24.7061 20.3684 25.435 19.922C25.435 19.922 23.954 12.916 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 5.5C16.8094 4.8156 16.891 4.05381 16.7343 3.32224C16.5776 2.59068 16.1913 1.92566 15.636 1.43281C15.0806 0.939954 14.3857 0.642246 13.6541 0.579061C12.9224 0.515875 12.1905 0.690431 11.567 1.078C11.567 1.078 11.567 6.21 16.5 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.6 15C4.87233 15.8031 4.90106 16.6712 4.68307 17.4919C4.46508 18.3126 3.99975 19.0489 3.34107 19.5922C2.6824 20.1355 1.86252 20.4581 1.00735 20.517C0.152172 20.5759 -0.706057 20.3684 -1.435 19.922C-1.435 19.922 0.046 12.916 4.6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 5.5C7.19058 4.8156 7.10904 4.05381 7.26572 3.32224C7.4224 2.59068 7.80866 1.92566 8.36403 1.43281C8.9194 0.939954 9.61428 0.642246 10.3459 0.579061C11.0776 0.515875 11.8095 0.690431 12.433 1.078C12.433 1.078 12.433 6.21 7.5 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                Advanced Materials
              </h3>
              <p className="text-crystal-medium/70">
                We use aerospace-grade composites for a perfect balance of durability and weight reduction.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asLink to="/details">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="crystal-card overflow-hidden">
            <div className="relative p-12 md:p-16 bg-crystal-gradient">
              {/* Background decorative elements */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-crystal-purple/10 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-crystal-pink/10 rounded-full filter blur-3xl" />
              
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-crystal-dark">
                  Ready to Experience the Future of Travel?
                </h2>
                <p className="mt-4 text-lg text-crystal-medium/70">
                  Customize your CrystalCase today and elevate your travel experience.
                </p>
                <div className="mt-8">
                  <Button size="lg" asLink to="/configure">
                    Configure Your CrystalCase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </AnimatedTransition>
  );
};

export default Index;
