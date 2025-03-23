
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
        this.size = Math.random() * 2 + 0.5; // Reduced particle size
        this.speedX = Math.random() * 0.3 - 0.15; // Reduced speed
        this.speedY = Math.random() * 0.3 - 0.15; // Reduced speed
        
        // Gradient colors with reduced opacity
        const colors = [
          'rgba(139, 92, 246, 0.2)',  // crystal-purple with lower opacity
          'rgba(217, 70, 239, 0.2)',  // crystal-pink with lower opacity
          'rgba(14, 165, 233, 0.2)',  // crystal-blue with lower opacity
          'rgba(249, 115, 22, 0.2)'   // crystal-orange with lower opacity
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles with reduced count
    const particleCount = Math.min(Math.floor(width * height / 25000), 100); // Reduced particle count
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas with a more transparent background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.005)'; // More transparent background
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with lines if they're close enough (with lower opacity)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Reduced connection distance
            if (!ctx) return;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 * (1 - distance / 80)})`; // Lower opacity
            ctx.lineWidth = 0.3; // Thinner lines
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
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 blur-[4px]" // Increased blur from 2px to 4px
    />
  );
};

export default AnimatedBackground;
