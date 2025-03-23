
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import AnimatedTransition from '@/components/AnimatedTransition';
import ModelViewer from '@/components/ModelViewer';
import { Link } from 'react-router-dom';

const Details = () => {
  return (
    <AnimatedTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-crystal-light/80 to-white backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-crystal-dark mb-6">
              Crafted with <span className="text-gradient">Innovation</span>
            </h1>
            <p className="text-lg text-crystal-medium/70 mb-8">
              Discover the features that make CrystalCase the most advanced luggage available today. 
              From breakthrough materials to smart design, we've rethought every aspect of the travel experience.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asLink to="/configure" size="lg" className="bg-crystal-purple hover:bg-crystal-purple/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Configure Yours
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Crystal Structure Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-crystal-purple/10 rounded-full mb-4">
                <span className="text-xs font-medium text-crystal-purple">Proprietary Technology</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-crystal-dark mb-6">
                Crystal Structure
              </h2>
              <p className="text-crystal-medium/70 mb-6">
                Our revolutionary Crystal Structure framework mimics the molecular arrangement found in natural 
                crystals. This geometric pattern distributes force throughout the entire shell, providing exceptional 
                strength while minimizing weight.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-crystal-purple mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-crystal-medium">50% stronger than traditional luggage materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-crystal-purple mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-crystal-medium">30% lighter than competitor's 'lightweight' options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-crystal-purple mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-crystal-medium">Impact-resistant to protect your belongings</span>
                </li>
              </ul>
              <div>
                <a href="#" className="text-crystal-purple hover:text-crystal-purple/80 font-medium inline-flex items-center group">
                  Learn more about our materials
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Interactive 3D Model */}
            <div className="crystal-card p-6 shadow-xl backdrop-blur-lg border border-white/20 hover:shadow-2xl transition-all duration-500">
              <ModelViewer className="w-full h-[500px]" modelUrl="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf" />
              <div className="mt-4 text-sm text-crystal-medium/60 text-center">
                Interactive 3D model - Drag to rotate, scroll to zoom
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Smart Storage Section */}
      <section className="py-20 bg-gradient-to-r from-crystal-light/50 to-white/70">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="crystal-card overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://placehold.co/800x600/e2e8f0/1e293b?text=Smart+Storage+System" 
                  alt="Smart Storage System" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 bg-crystal-blue/10 rounded-full mb-4">
                <span className="text-xs font-medium text-crystal-blue">Modular Design</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-crystal-dark mb-6">
                Smart Storage System
              </h2>
              <p className="text-crystal-medium/70 mb-6">
                Say goodbye to packing stress with our innovative compartment system. Inspired by 
                professional packing experts, each space is designed to keep your belongings 
                organized and wrinkle-free throughout your journey.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-crystal-blue mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-crystal-medium">Removable dividers for custom configurations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-crystal-blue mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-crystal-medium">Compression system maximizes space by 35%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-crystal-blue mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-crystal-medium">Quick-access pocket for travel documents</span>
                </li>
              </ul>
              <div>
                <a href="#" className="text-crystal-blue hover:text-crystal-blue/80 font-medium inline-flex items-center group">
                  See storage options
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="crystal-card overflow-hidden">
            <div className="relative p-12 md:p-16 bg-gradient-to-r from-crystal-purple/10 to-crystal-pink/10">
              {/* Background decorative elements */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-crystal-purple/10 rounded-full filter blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-crystal-pink/10 rounded-full filter blur-3xl animate-pulse-slow" />
              
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-crystal-dark">
                  Ready to Transform Your Travel Experience?
                </h2>
                <p className="mt-4 text-lg text-crystal-medium/70">
                  Customize your CrystalCase with the features that matter most to you.
                </p>
                <div className="mt-8">
                  <Button size="lg" asLink to="/configure" className="bg-gradient-to-r from-crystal-purple to-crystal-pink text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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

export default Details;
