
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SuitcaseProvider } from "@/context/SuitcaseContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import Details from "./pages/Details";
import Configure from "./pages/Configure";
import NotFound from "./pages/NotFound";
import AnimatedBackground from "./components/AnimatedBackground";
import AnimatedTransition from "./components/AnimatedTransition";

// Loading spinner for lazy-loaded components
const LazyLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      className="w-16 h-16 border-4 border-crystal-purple/30 border-t-crystal-purple rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="crystal-card p-6 max-w-md">
        <h2 className="text-xl font-semibold text-crystal-dark dark:text-white mb-4">Something went wrong</h2>
        <p className="text-crystal-medium dark:text-gray-300 mb-4">We're sorry, but an error occurred while loading the page.</p>
        <pre className="bg-crystal-light/50 dark:bg-crystal-dark/50 p-3 rounded-md text-sm overflow-auto mb-4">
          {error.message}
        </pre>
        <motion.button 
          className="bg-crystal-purple text-white px-4 py-2 rounded-md hover:bg-crystal-purple/90"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reload page
        </motion.button>
      </div>
    </div>
  );
};

const SafeComponent = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      setError(event.error);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for easier debugging
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  console.log("App component rendering");
  
  return (
    <SafeComponent>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <SuitcaseProvider>
              <AnimatedBackground />
              <Toaster />
              <Sonner position="top-center" closeButton theme="light" />
              <HashRouter>
                <AnimatedTransition>
                  <Routes>
                    <Route path="/" element={<SafeComponent><Index /></SafeComponent>} />
                    <Route path="/details" element={<SafeComponent><Details /></SafeComponent>} />
                    <Route path="/configure" element={<SafeComponent><Configure /></SafeComponent>} />
                    <Route path="*" element={<SafeComponent><NotFound /></SafeComponent>} />
                  </Routes>
                </AnimatedTransition>
              </HashRouter>
            </SuitcaseProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </SafeComponent>
  );
};

export default App;
