
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ModelViewer from '@/components/ModelViewer';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight, Star, RotateCw, Palette, MoveRight } from 'lucide-react';
import { SuitcaseProvider } from '@/context/SuitcaseContext';

const Index = () => {
  useEffect(() => {
    // Add a class to the body for the background effect
    document.body.classList.add('animated-gradient-bg');
    
    return () => {
      document.body.classList.remove('animated-gradient-bg');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-crystal-light via-white to-crystal-light/50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-crystal-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-crystal-blue/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-crystal-pink/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-crystal-light border border-crystal-purple/20 text-crystal-purple text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Luxury Suitcase Experience</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-crystal-charcoal leading-tight">
                Discover Perfect <span className="text-crystal-purple">Luxury</span> Travel Companion
              </h1>
              
              <p className="text-lg text-crystal-medium leading-relaxed">
                Unleash your travel potential with our premium suitcases, designed for the modern explorer. Customize your experience and travel in style.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/configure">
                  <Button size="lg" className="bg-crystal-purple hover:bg-crystal-purple/90 text-white group transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-crystal-purple/20">
                    Customize Now
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link to="/details">
                  <Button variant="outline" size="lg" className="border-crystal-purple/30 text-crystal-purple hover:bg-crystal-purple/10 transition-all duration-300 transform hover:-translate-y-1">
                    View Details
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-crystal-light/80 ${i === 1 ? 'bg-crystal-purple text-white' : ''}`}>
                      {i === 1 ? <Star className="h-5 w-5" /> : i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-crystal-medium">
                  <strong>500+</strong> happy customers
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="crystal-card w-full overflow-hidden rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-crystal-purple/20 hover:-translate-y-1">
                <SuitcaseProvider>
                  <ModelViewer className="h-[500px]" />
                </SuitcaseProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-crystal-charcoal mb-4">Premium Features</h2>
          <p className="text-crystal-medium max-w-2xl mx-auto">Designed with the modern traveler in mind, our suitcases combine elegance, durability, and innovative features.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <RotateCw className="h-6 w-6" />, 
              title: "360° Rotation", 
              description: "View your suitcase from every angle before making your decision." 
            },
            { 
              icon: <Palette className="h-6 w-6" />, 
              title: "Color Options", 
              description: "Choose from a variety of premium colors to match your style." 
            },
            { 
              icon: <Star className="h-6 w-6" />, 
              title: "Premium Quality", 
              description: "Crafted from high-quality materials for durability and elegance." 
            }
          ].map((feature, index) => (
            <div key={index} className="crystal-card p-6 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-12 h-12 rounded-full bg-crystal-purple/10 flex items-center justify-center text-crystal-purple mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-crystal-charcoal mb-2">{feature.title}</h3>
              <p className="text-crystal-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-crystal-purple/90 to-crystal-pink/90 p-10 lg:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-center bg-cover"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Ready to Elevate Your Travel Experience?</h2>
            <p className="text-white/80 mb-8 text-lg">Customize your perfect suitcase and travel with confidence and style.</p>
            
            <Link to="/configure">
              <Button size="lg" className="bg-white text-crystal-purple hover:bg-white/90 group shadow-lg">
                Start Customizing
                <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
