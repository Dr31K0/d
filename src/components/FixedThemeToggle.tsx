
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FixedThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={toggleTheme} 
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/70 dark:bg-crystal-dark/70 backdrop-blur-md border border-white/20 dark:border-crystal-dark/50 shadow-floating hover:shadow-neon transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6 text-white animate-pulse-slow" />
              ) : (
                <Moon className="h-6 w-6 text-crystal-dark animate-pulse-slow" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FixedThemeToggle;
