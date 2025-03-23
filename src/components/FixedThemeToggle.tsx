
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FixedThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={toggleTheme} 
              className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-floating ${
                isDark 
                  ? "bg-crystal-dark/70 border-crystal-medium/30 hover:bg-crystal-dark/90" 
                  : "bg-white/70 border-white/20 hover:bg-white/90"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-6 w-6 text-white animate-pulse-slow" />
              ) : (
                <Moon className="h-6 w-6 text-crystal-dark animate-pulse-slow" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle {isDark ? "light" : "dark"} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FixedThemeToggle;
