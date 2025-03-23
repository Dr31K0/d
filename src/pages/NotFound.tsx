
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crystal-purple/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crystal-pink/5 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <div className="w-full h-10 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline"></div>
      </div>
      
      <div className="glass-card p-10 max-w-md text-center relative z-10">
        <div className="glitch-container relative mb-6">
          <h1 className="font-futuristic text-6xl font-bold mb-2 text-crystal-purple animate-neon-pulse">404</h1>
          <div className="absolute inset-0 animate-glitch opacity-50">
            <h1 className="font-futuristic text-6xl font-bold mb-2 text-crystal-pink">404</h1>
          </div>
        </div>
        
        <p className="text-xl text-gray-600 mb-8">Signal lost. Destination not found.</p>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 rounded-full glass-button text-crystal-purple hover:text-white group"
        >
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Base
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
