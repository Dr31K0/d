import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import SuitcaseView from '@/components/SuitcaseView';
import ColorPicker from '@/components/ColorPicker';
import ViewSelector from '@/components/ViewSelector';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useSuitcase } from '@/context/SuitcaseContext';
import { toast } from 'sonner';

const Configure = () => {
  const { color, view } = useSuitcase();
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedView, setSelectedView] = useState(view);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Function to handle completion of configuration
  const handleCompletePurchase = () => {
    toast.success("Configuration saved! Redirecting to checkout...", {
      description: `You selected the ${color} CrystalCase`,
      duration: 5000,
    });
    
    // In a real app, this would redirect to checkout
    setIsConfiguring(false);
  };
  
  return (
    <AnimatedTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-crystal-purple/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-crystal-pink/5 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-futuristic font-semibold text-crystal-dark">
              Customize Your <span className="text-gradient">Crystal</span>Case
            </h1>
            <p className="mt-4 text-lg text-crystal-medium/70">
              Personalize every aspect of your travel companion to match your unique style.
            </p>
          </div>
        </div>
      </section>
      
      {/* Configuration Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Suitcase Preview */}
            <div className="space-y-8">
              <div className="crystal-card p-6">
                <SuitcaseView className="w-full h-[400px]" interactive />
              </div>
              
              <div className="crystal-card p-6">
                <ViewSelector />
              </div>
            </div>
            
            {/* Configuration Options */}
            <div className="space-y-8">
              <div className="crystal-card p-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-futuristic font-semibold text-crystal-dark">
                    Personalize Your CrystalCase
                  </h2>
                  
                  <ColorPicker />
                  
                  <div className="pt-6 border-t border-crystal-gray/10">
                    <h3 className="text-lg font-futuristic font-medium text-crystal-dark">Specifications</h3>
                    <ul className="mt-4 space-y-3">
                      {[
                        { label: 'Material', value: 'Aerospace-grade composite' },
                        { label: 'Dimensions', value: '56 × 45 × 25 cm' },
                        { label: 'Volume', value: '40 liters' },
                        { label: 'Weight', value: '2.7 kg' },
                        { label: 'Warranty', value: 'Lifetime limited warranty' }
                      ].map((spec, index) => (
                        <li key={index} className="flex justify-between">
                          <span className="text-crystal-medium/70">{spec.label}</span>
                          <span className="font-medium text-crystal-dark">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="crystal-card p-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-futuristic font-medium text-crystal-dark">
                    Selected Configuration
                  </h3>
                  
                  <div className="bg-crystal-light/50 dark:bg-crystal-dark/50 rounded-lg p-4">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-crystal-medium/70">Model</span>
                        <span className="font-medium text-crystal-dark">CrystalCase Pro</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-crystal-medium/70">Color</span>
                        <span className="font-medium text-crystal-dark capitalize">{color}</span>
                      </li>
                      <li className="flex justify-between border-t border-crystal-gray/10 pt-2 mt-2">
                        <span className="text-crystal-medium/70">Price</span>
                        <span className="font-semibold text-crystal-dark">$399.00</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleCompletePurchase}
                  >
                    Complete Purchase
                  </Button>
                  
                  <p className="text-xs text-crystal-medium/50 text-center">
                    Free shipping worldwide. 30-day money-back guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Features */}
      <section className="py-20 bg-crystal-light/50 dark:bg-crystal-dark/70">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-futuristic font-semibold text-crystal-dark dark:text-white">
              Included with Every CrystalCase
            </h2>
            <p className="mt-4 text-crystal-medium/70 dark:text-gray-300">
              Standard features that come with your purchase, regardless of configuration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="crystal-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-crystal-purple/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-crystal-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 12L12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-futuristic font-medium text-crystal-dark dark:text-white mb-2">
                Lifetime Warranty
              </h3>
              <p className="text-crystal-medium/70 dark:text-gray-300">
                We stand behind our quality with an industry-leading lifetime limited warranty.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="crystal-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-crystal-blue/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-crystal-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-futuristic font-medium text-crystal-dark dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-crystal-medium/70 dark:text-gray-300">
                Our dedicated team is available around the clock to assist with any questions or concerns.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="crystal-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-crystal-orange/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-crystal-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-futuristic font-medium text-crystal-dark dark:text-white mb-2">
                Free Global Shipping
              </h3>
              <p className="text-crystal-medium/70 dark:text-gray-300">
                Enjoy complimentary express shipping to any destination worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </AnimatedTransition>
  );
};

export default Configure;
