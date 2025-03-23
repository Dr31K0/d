
import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Call initially and on resize
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.3; // Smaller particles for better performance
        this.speedX = Math.random() * 0.2 - 0.1; // More controlled speed
        this.speedY = Math.random() * 0.2 - 0.1; // More controlled speed
        
        // Softer colors with even lower opacity
        const colors = [
          'rgba(139, 92, 246, 0.15)',  // crystal-purple with lower opacity
          'rgba(217, 70, 239, 0.15)',  // crystal-pink with lower opacity
          'rgba(14, 165, 233, 0.15)',  // crystal-blue with lower opacity
          'rgba(249, 115, 22, 0.15)'   // crystal-orange with lower opacity
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Smoother movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Smooth bounce off edges
        if (this.x > width || this.x < 0) {
          this.speedX *= -1;
          this.x = Math.max(0, Math.min(this.x, width)); // Keep within boundaries
        }
        if (this.y > height || this.y < 0) {
          this.speedY *= -1;
          this.y = Math.max(0, Math.min(this.y, height)); // Keep within boundaries
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Optimize particle count based on screen size for better performance
    const particleCount = Math.min(Math.floor(width * height / 30000), 80); 
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop with optimized rendering
    const animate = () => {
      if (!ctx) return;
      
      // More transparent background for smoother transitions
      ctx.fillStyle = 'rgba(255, 255, 255, 0.002)'; 
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with thinner lines for a more delicate web effect
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) { // Increased connection distance
            if (!ctx) return;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.03 * (1 - distance / 100)})`; // Even lower opacity
            ctx.lineWidth = 0.2; // Thinner lines
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 blur-[6px]" // Increased blur and reduced opacity
    />
  );
};

export default AnimatedBackground;
