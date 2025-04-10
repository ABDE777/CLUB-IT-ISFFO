import React, { useRef, useEffect, useState } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Member } from '@/lib/types';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useTheme } from '@/contexts/ThemeContext';

interface MemberCardProps {
  member: Member;
  index: number;
  theme: 'dark' | 'light';
}

const MemberCard: React.FC<MemberCardProps> = ({ member, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });
  
  useEffect(() => {
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
  }, [controls, isInView, index]);

  const getMemberDescription = () => {
    // ... (le même contenu que précédemment)
  };
  
  const isDark = theme === 'dark';
  
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
        className={`h-full w-full flex flex-col items-center justify-center transform transition-all duration-700 ${
          isHovered ? 'scale-105' : 'scale-100'
        } ${
          isDark 
            ? 'bg-gray-900/80 border border-primary/30 text-white' 
            : 'bg-white/90 border border-primary/10 text-gray-800'
        } relative overflow-hidden group`}
      >
        {/* ... (le même contenu que précédemment) */}
      </AnimatedCard>
    </motion.div>
  );
};

const FuturisticBackground: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  // ... (le même contenu que précédemment)
};

interface MembersSectionProps {
  members: Member[];
}

const MembersSection: React.FC<MembersSectionProps> = ({ members }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -200px 0px" });
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const { theme = 'dark' } = useTheme() || { theme: 'dark' as const };
  
  // Modification 1 : Augmentation du délai d'autoplay
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ 
      delay: 5000, // Augmenté à 5 secondes
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
  
  const isDark = theme === 'dark';
  
  return (
    <section 
      id="members" 
      className={`py-24 relative ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
      aria-label="Membres du club"
    >
      <FuturisticBackground theme={theme} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* ... (le même contenu que précédemment) */}
        
        <div 
          ref={sectionRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 1000, // Modification 2 : Durée de transition augmentée
            }}
            plugins={[autoplayPlugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {members.map((member, index) => (
                <CarouselItem 
                  key={`member-${member.name}-${index}`}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 h-[480px]"
                >
                  <MemberCard member={member} index={index} theme={theme} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* ... (le même contenu que précédemment) */}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
