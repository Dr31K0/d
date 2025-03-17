
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import SuitcaseModel from '@/components/SuitcaseModel';
import AnimatedTransition from '@/components/AnimatedTransition';

const Details = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-20 w-64 h-64 bg-crystal-purple/5 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-32 right-20 w-96 h-96 bg-crystal-pink/5 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-crystal-dark">
              The <span className="text-gradient">Crystal</span> Experience
            </h1>
            <p className="mt-4 text-lg text-crystal-medium/70">
              Discover the meticulous engineering and thoughtful design behind our revolutionary suitcase.
            </p>
          </div>
        </div>
      </section>
      
      {/* 3D Model Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Interactive Model */}
            <div className="crystal-card p-6">
              <SuitcaseModel />
            </div>
            
            {/* Description */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-crystal-purple/10 rounded-full">
                  <span className="text-xs font-medium text-crystal-purple">Interactive Experience</span>
                </div>
                <h2 className="text-3xl font-display font-semibold text-crystal-dark">
                  Explore Every Angle
                </h2>
                <p className="text-crystal-medium/70">
                  Interact with our 3D model to examine the meticulous details of the CrystalCase. Rotate, zoom, and appreciate the harmonious blend of form and function that defines our revolutionary design.
                </p>
              </div>
              
              <ul className="space-y-3">
                {[
                  'Aerospace-grade composite materials',
                  'Crystal-inspired structural reinforcement',
                  'Smart organization system',
                  'Premium silent wheels with 360° movement',
                  'Integrated smart technology'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-crystal-purple mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-crystal-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button asLink to="/configure">
                Customize Your CrystalCase
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-crystal-light/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-display font-semibold text-crystal-dark">
              Unmatched Features
            </h2>
            <p className="mt-4 text-crystal-medium/70">
              Every aspect of the CrystalCase has been thoughtfully designed to enhance your travel experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="crystal-card p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-crystal-purple/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-crystal-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.27 7L12 12L20.73 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                    Crystal Structure Technology
                  </h3>
                  <p className="text-crystal-medium/70">
                    Our proprietary framework draws inspiration from natural crystal formations, creating a structure that's both lightweight and incredibly resilient.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="crystal-card p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-crystal-blue/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-crystal-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                    Premium Materials
                  </h3>
                  <p className="text-crystal-medium/70">
                    We use only the highest quality materials, from aerospace-grade composites to premium fabric linings, ensuring durability without compromising on style.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="crystal-card p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-crystal-orange/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-crystal-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                    Smart Organization
                  </h3>
                  <p className="text-crystal-medium/70">
                    Our intuitive compartment system adapts to your packing needs, with modular dividers and compression technology to maximize space.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="crystal-card p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-crystal-purple/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-crystal-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-crystal-dark mb-2">
                    Integrated Technology
                  </h3>
                  <p className="text-crystal-medium/70">
                    From location tracking to built-in power banks, our smart features ensure you stay connected and in control throughout your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-display font-semibold text-crystal-dark">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-crystal-medium/70">
              Join thousands of satisfied travelers who have elevated their journeys with CrystalCase.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="crystal-card p-8">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex text-crystal-purple">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-crystal-medium/80 italic flex-grow">
                  "The CrystalCase has transformed my travel experience. The thoughtful design and premium quality are unmatched in the market."
                </p>
                <div className="mt-6 pt-6 border-t border-crystal-gray/10">
                  <p className="font-medium text-crystal-dark">Alex Johnson</p>
                  <p className="text-sm text-crystal-medium/60">Frequent Traveler</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="crystal-card p-8">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex text-crystal-purple">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-crystal-medium/80 italic flex-grow">
                  "As a design professional, I appreciate the attention to detail. The CrystalCase is both functional and aesthetically stunning."
                </p>
                <div className="mt-6 pt-6 border-t border-crystal-gray/10">
                  <p className="font-medium text-crystal-dark">Sophia Chen</p>
                  <p className="text-sm text-crystal-medium/60">Design Director</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="crystal-card p-8">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex text-crystal-purple">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-crystal-medium/80 italic flex-grow">
                  "The durability is impressive. I've taken my CrystalCase across five continents, and it still looks and functions like new."
                </p>
                <div className="mt-6 pt-6 border-t border-crystal-gray/10">
                  <p className="font-medium text-crystal-dark">Marcus Williams</p>
                  <p className="text-sm text-crystal-medium/60">Travel Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-crystal-gradient">
        <div className="container mx-auto px-6">
          <div className="crystal-card p-12 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-semibold text-crystal-dark">
              Ready to Experience the Difference?
            </h2>
            <p className="mt-4 text-crystal-medium/70">
              Configure your CrystalCase to match your unique travel style.
            </p>
            <div className="mt-8">
              <Button size="lg" asLink to="/configure">
                Configure Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </AnimatedTransition>
  );
};

export default Details;
