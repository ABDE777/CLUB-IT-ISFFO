import React, { useRef, useState, useEffect } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Sponsor } from '@/lib/types';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useTheme } from '@/contexts/ThemeContext';

interface SponsorCardProps {
  sponsor: Sponsor;
  index: number;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });
  const { theme } = useTheme();
  
  useEffect(() => {
    const img = new Image();
    img.src = sponsor.image;
    img.onload = () => setIsLoaded(true);
    
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.5, 
          delay: index * 0.1,
          type: "spring", 
          stiffness: 100 
        }
      });
    }
  }, [controls, isInView, index, sponsor.image]);

  const getDescription = () => {
    const descriptions = {
      "OFPPT": "L'Office de la Formation Professionnelle et de la Promotion du Travail, partenaire clé dans le développement des compétences et l'insertion professionnelle des jeunes marocains.",
      "Mr. KAMAL DAOUDI": "Expert chevronné en développement web avec plus de 15 ans d'expérience, mentor passionné guidant les étudiants vers l'excellence technique et l'innovation.",
      "Google": "Leader mondial des technologies offrant des ressources éducatives, des API avancées et un support pour nos projets de développement et de recherche.",
      "GitHub": "Plateforme essentielle pour la collaboration et le partage de code, facilitant le travail d'équipe et la gestion de versions pour tous nos projets.",
      "Vercel": "Infrastructure d'hébergement de pointe pour nos applications web, permettant des déploiements continus, une performance optimale et une expérience développeur exceptionnelle."
    };
    
    return descriptions[sponsor.name] || sponsor.description || "Partenaire précieux qui soutient notre club et contribue à notre succès collectif.";
  };
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      className="h-[450px] w-full flex flex-col items-center justify-center p-6 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedCard 
        hoverEffect={true} 
        className={`h-full w-full flex flex-col items-center justify-center transform transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100'} ${
          theme === 'dark' ? 'bg-gray-900/80 border border-primary/30' : 'bg-white/90 border border-primary/10'
        } relative overflow-hidden group`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        
        <div className="w-full flex-1 flex items-center justify-center mb-4 relative z-10 p-6">
          <img
            src={sponsor.image}
            alt={sponsor.name}
            className={`max-h-32 w-auto object-contain transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'} rounded-lg`}
          />
        </div>
        
        <div className="p-4 w-full relative z-10">
          <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-primary transition-colors duration-300">{sponsor.name}</h3>
          {sponsor.field && (
            <p className="text-primary font-medium mb-2 text-center">{sponsor.field}</p>
          )}
          {sponsor.role && !sponsor.field && (
            <p className="text-primary font-medium mb-2 text-center">{sponsor.role}</p>
          )}
          
          <p className={`text-sm text-center mt-2 transition-all duration-500 px-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          } ${isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
            {getDescription()}
          </p>
        </div>

        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-primary/80"
              animate={{
                x: [0, 100, 200, 0],
                y: [0, 50, 100, 0],
                opacity: [1, 0.8, 0.6, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-white/60"
              animate={{
                x: [200, 100, 0, 200],
                y: [100, 50, 0, 100],
                opacity: [0.6, 0.8, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear"
              }}
            />
          </div>
        )}
      </AnimatedCard>
    </motion.div>
  );
};

const FuturisticBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: ['0%', '80%', '0%'],
            y: ['0%', '40%', '0%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
          style={{ top: '-20%', left: '-10%' }}
        />
        
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            x: ['100%', '20%', '100%'],
            y: ['50%', '0%', '50%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
          style={{ bottom: '-20%', right: '-10%' }}
        />
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0tNCAyaDJ2LTJoLTJ2MnptLTQtMmgydjJoLTJ2LTJ6bS00IDJoMnYtMmgtMnYyem0tNCAwaDJ2MmgtMnYtMnptLTQgMGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>
    </div>
  );
};

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -200px 0px" });
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();
  
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ 
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }), 
    []
  );
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.8, 
          ease: "easeOut" 
        }
      });
    }
  }, [isInView, controls]);
  
  return (
    <section id="sponsors" className={`py-24 relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <FuturisticBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Nos encadrants
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-display font-semibold mb-6 text-white"
          >
            <span className="bg-gradient-to-r from-white to-primary/70 bg-clip-text text-transparent">
              Ceux qui nous soutiennent
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-300"
          >
            Nos partenaires et encadrants qui nous aident à développer nos compétences et à réaliser nos projets.
          </motion.p>
        </motion.div>
        
        <div 
          ref={sectionRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayPlugin]}
            className="w-full"
            onMouseEnter={() => {
              if (autoplayPlugin.stop) autoplayPlugin.stop();
            }}
            onMouseLeave={() => {
              if (!isPaused && autoplayPlugin.play) autoplayPlugin.play();
            }}
          >
            <CarouselContent className="-ml-4">
              {sponsors.map((sponsor, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 md:basis-1/2 lg:basis-1/3 h-[450px]"
                >
                  <SponsorCard sponsor={sponsor} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-12 gap-4">
              <CarouselPrevious 
                className="static translate-y-0 h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:ring-2 focus:ring-primary/30" 
              />
              <CarouselNext 
                className="static translate-y-0 h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:ring-2 focus:ring-primary/30" 
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
