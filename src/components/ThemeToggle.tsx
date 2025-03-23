
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className={`w-10 h-10 rounded-full transition-all ${
              isDark 
                ? "bg-crystal-dark/50 hover:bg-crystal-dark/70 border-crystal-medium/30" 
                : "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
            } border`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-crystal-dark" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {isDark ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
