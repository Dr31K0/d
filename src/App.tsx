
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SuitcaseProvider } from "@/context/SuitcaseContext";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Details from "./pages/Details";
import Configure from "./pages/Configure";
import NotFound from "./pages/NotFound";

// Create error boundary component
const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="crystal-card p-6 max-w-md">
        <h2 className="text-xl font-semibold text-crystal-dark mb-4">Something went wrong</h2>
        <p className="text-crystal-medium mb-4">We're sorry, but an error occurred while loading the page.</p>
        <pre className="bg-crystal-light/50 p-3 rounded-md text-sm overflow-auto mb-4">
          {error.message}
        </pre>
        <button 
          className="bg-crystal-purple text-white px-4 py-2 rounded-md hover:bg-crystal-purple/90"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    </div>
  );
};

// Create a wrapper component with error handling
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
    },
  },
});

const App = () => {
  // Add logging to track component lifecycle
  console.log("App component rendering");
  
  return (
    <SafeComponent>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SuitcaseProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SafeComponent><Index /></SafeComponent>} />
                <Route path="/details" element={<SafeComponent><Details /></SafeComponent>} />
                <Route path="/configure" element={<SafeComponent><Configure /></SafeComponent>} />
                <Route path="*" element={<SafeComponent><NotFound /></SafeComponent>} />
              </Routes>
            </BrowserRouter>
          </SuitcaseProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </SafeComponent>
  );
};

export default App;
