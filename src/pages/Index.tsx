
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import SuitcaseView from '@/components/SuitcaseView';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { AlertCircle, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

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
      <section className="relative min-h-screen flex items-center justify-center pt-20 animated-bg overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-crystal-purple/10 rounded-full filter blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-crystal-pink/10 rounded-full filter blur-[100px] animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 bg-hero-pattern"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 bg-crystal-purple/10 rounded-full border border-crystal-purple/20 animate-pulse-slow">
                  <span className="text-sm font-medium text-crystal-purple flex items-center gap-2">
                    <span className="w-2 h-2 bg-crystal-purple rounded-full animate-pulse"></span>
                    Introducing Revolutionary Luggage
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-futuristic font-semibold leading-tight">
                  The Future of <span className="animated-gradient-text font-bold">Crystal</span> Travel
                </h1>
                <p className="text-lg text-crystal-medium/80 max-w-lg">
                  Inspired by nature's most resilient structures, our premium luggage combines cutting-edge materials with elegant design for the modern traveler.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Button 
                  size="lg" 
                  asLink 
                  to="/details"
                  className="w-full sm:w-auto button-glow group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Features
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Link 
                  to="/configure" 
                  className="text-crystal-dark/80 hover:text-crystal-purple font-medium flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-crystal-light/50 transition-all duration-300"
                >
                  Customize Now
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-crystal-medium/60 text-sm">
                  <ShieldCheck className="w-4 h-4 text-crystal-purple/70" />
                  Lifetime Warranty
                </div>
                <div className="flex items-center gap-2 text-crystal-medium/60 text-sm">
                  <Zap className="w-4 h-4 text-crystal-purple/70" />
                  Free Express Shipping
                </div>
                <div className="flex items-center gap-2 text-crystal-medium/60 text-sm">
                  <AlertCircle className="w-4 h-4 text-crystal-purple/70" />
                  24/7 Customer Support
                </div>
              </div>
            </div>
            
            {/* Suitcase image */}
            <div ref={heroRef} className="relative">
              <div className="absolute -z-10 inset-0 transform -translate-y-6 translate-x-6 rotate-1">
                <div className="w-full h-full bg-crystal-light/50 rounded-2xl shadow-inner-glow animate-pulse-slow" />
              </div>
              <div className="crystal-card p-6 card-3d backdrop-blur-xl bg-white/70 border border-white/30 shadow-floating">
                <SuitcaseView className="w-full h-[400px]" />
                <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full text-xs">
                  Interactive 3D View
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce-subtle">
          <span className="text-xs font-medium text-crystal-medium/60">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-crystal-medium/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-crystal-medium/40 rounded-full mt-2 animate-pulse-slow" />
          </div>
        </div>
      </section>
      
      {/* Features Preview Section */}
      <section className="py-24 bg-gradient-radial from-crystal-light/80 to-crystal-light/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 bg-crystal-blue/10 rounded-full border border-crystal-blue/20 mb-4">
              <span className="text-sm font-medium text-crystal-blue">Premium Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-futuristic font-semibold text-crystal-dark">
              Crafted with Precision
            </h2>
            <p className="mt-4 text-crystal-medium/70">
              Every detail matters in the pursuit of perfection. Discover what makes our suitcase truly exceptional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature cards */}
            {/* Feature 1 */}
            <div className="feature-card flex flex-col items-center text-center group">
              <div className="feature-icon w-16 h-16 bg-crystal-purple/10 text-crystal-purple group-hover:bg-crystal-purple/20">
                <svg className="w-8 h-8 m-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-futuristic font-medium text-crystal-dark mt-6 mb-3 group-hover:text-crystal-purple transition-colors">
                Crystal Structure
              </h3>
              <p className="text-crystal-medium/70">
                Our proprietary framework mimics natural crystal formations for unparalleled strength and lightness.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card flex flex-col items-center text-center group">
              <div className="feature-icon w-16 h-16 bg-crystal-blue/10 text-crystal-blue group-hover:bg-crystal-blue/20">
                <svg className="w-8 h-8 m-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58718 21.9983 7.99501C21.9983 6.40285 21.3658 4.87581 20.24 3.75001C19.1142 2.62421 17.5871 1.99171 15.995 1.99171C14.4028 1.99171 12.8758 2.62421 11.75 3.75001L5 10.5V19H13.5L20.24 12.24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 8L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-futuristic font-medium text-crystal-dark mt-6 mb-3 group-hover:text-crystal-blue transition-colors">
                Adaptive Design
              </h3>
              <p className="text-crystal-medium/70">
                Customize your experience with modular compartments that adapt to your unique travel needs.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card flex flex-col items-center text-center group">
              <div className="feature-icon w-16 h-16 bg-crystal-orange/10 text-crystal-orange group-hover:bg-crystal-orange/20">
                <svg className="w-8 h-8 m-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.4 15C19.1277 15.8031 19.0989 16.6712 19.3169 17.4919C19.5349 18.3126 20.0003 19.0489 20.659 19.5922C21.3176 20.1355 22.1375 20.4581 22.9926 20.517C23.8478 20.5759 24.7061 20.3684 25.435 19.922C25.435 19.922 23.954 12.916 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 5.5C16.8094 4.8156 16.891 4.05381 16.7343 3.32224C16.5776 2.59068 16.1913 1.92566 15.636 1.43281C15.0806 0.939954 14.3857 0.642246 13.6541 0.579061C12.9224 0.515875 12.1905 0.690431 11.567 1.078C11.567 1.078 11.567 6.21 16.5 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.6 15C4.87233 15.8031 4.90106 16.6712 4.68307 17.4919C4.46508 18.3126 3.99975 19.0489 3.34107 19.5922C2.6824 20.1355 1.86252 20.4581 1.00735 20.517C0.152172 20.5759 -0.706057 20.3684 -1.435 19.922C-1.435 19.922 0.046 12.916 4.6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 5.5C7.19058 4.8156 7.10904 4.05381 7.26572 3.32224C7.4224 2.59068 7.80866 1.92566 8.36403 1.43281C8.9194 0.939954 9.61428 0.642246 10.3459 0.579061C11.0776 0.515875 11.8095 0.690431 12.433 1.078C12.433 1.078 12.433 6.21 7.5 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-futuristic font-medium text-crystal-dark mt-6 mb-3 group-hover:text-crystal-orange transition-colors">
                Advanced Materials
              </h3>
              <p className="text-crystal-medium/70">
                We use aerospace-grade composites for a perfect balance of durability and weight reduction.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              asLink 
              to="/details"
              className="border-crystal-purple/30 hover:bg-crystal-purple/5 hover:border-crystal-purple"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="crystal-card overflow-hidden animate-float">
            <div className="relative p-12 md:p-16 bg-gradient-to-br from-crystal-purple/10 via-crystal-pink/10 to-crystal-blue/5">
              {/* Background decorative elements */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-crystal-purple/10 rounded-full filter blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-crystal-pink/10 rounded-full filter blur-3xl animate-pulse-slow" />
              
              <div className="relative max-w-3xl mx-auto text-center">
                <div className="inline-block px-4 py-1.5 bg-crystal-pink/10 rounded-full border border-crystal-pink/20 mb-6">
                  <span className="text-sm font-medium text-crystal-pink">Limited Time Offer</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-futuristic font-semibold text-crystal-dark">
                  Ready to Experience the Future of Travel?
                </h2>
                <p className="mt-4 text-lg text-crystal-medium/70">
                  Customize your CrystalCase today and elevate your travel experience with our revolutionary luggage solution.
                </p>
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    asLink 
                    to="/configure"
                    className="group relative overflow-hidden btn-pulse"
                  >
                    <span className="relative z-10 flex items-center">
                      Configure Your CrystalCase
                      <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <div className="mt-4 text-sm text-crystal-medium/60">
                    Free shipping • 30-day returns • Lifetime warranty
                  </div>
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
