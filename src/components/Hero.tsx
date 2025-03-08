
import React, { useEffect, useRef } from 'react';
import { CustomButton } from './ui/CustomButton';
import { Code, TerminalSquare, Cpu, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const icons = heroRef.current.querySelectorAll('.floating-icon');
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / 40;
      const moveY = (e.clientY - centerY) / 40;
      
      icons.forEach((icon, index) => {
        const depth = 0.5 + (index * 0.5);
        (icon as HTMLElement).style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" />
      
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <Code className="floating-icon absolute text-primary/10 top-[15%] left-[20%] w-16 h-16 animate-float" style={{animationDelay: '0s'}} />
        <TerminalSquare className="floating-icon absolute text-primary/10 top-[60%] left-[15%] w-20 h-20 animate-float" style={{animationDelay: '1.5s'}} />
        <Cpu className="floating-icon absolute text-primary/10 top-[30%] right-[15%] w-24 h-24 animate-float" style={{animationDelay: '1s'}} />
        <Globe className="floating-icon absolute text-primary/10 bottom-[20%] right-[25%] w-16 h-16 animate-float" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 animate-fade-in">
            Club informatique
          </span>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Découvrez le monde de la 
            <span className="text-gradient"> technologie</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Rejoignez notre club IT et développez vos compétences en programmation, 
            cybersécurité, design et bien plus encore. Ensemble, construisons l'avenir.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CustomButton href="#about" size="lg">
              Découvrir
            </CustomButton>
            <CustomButton href="#contact" variant="outline" size="lg">
              Rejoindre le club
            </CustomButton>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200L60 190C120 180 240 160 360 146.7C480 133 600 127 720 133.3C840 140 960 160 1080 166.7C1200 173 1320 167 1380 163.3L1440 160V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
