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
    const descriptions = {
      "MANAR SROUT":
        "Présidente charismatique et visionnaire, elle orchestre les activités du club avec un leadership inspirant et une passion pour l'innovation technologique.",
      "YOUNES LHLIBI":
        "Vice-président opérationnel, maître dans l'art de transformer les idées en actions concrètes grâce à son sens aigu de l'organisation.",
      "JAD GHALALI":
        "Trésorier méticuleux, gardien des finances du club et stratège en gestion budgétaire. Son Excel n'a aucun secret !",
      "ILYAS ELBOUCHIKHI":
        "Trésorier adjoint et expert en économie digitale, alliant rigueur comptable et passion pour les cryptomonnaies.",
      "KARIM AIT CHEIKH":
        "Créateur de contenu hors pair, il donne vie à notre présence digitale avec des designs percutants et des campagnes virales.",
      "HAMZA OUBAHA":
        "Génie des réseaux sociaux, maître dans l'art d'engager la communauté avec humour et créativité. #ClubITISFO_Genius",
      "MOHAMED KOUATLY":
        "Stratège en communication, architecte de notre image publique et bâtisseur de partenariats médiatiques.",
      "ADAM MALAHI":
        "Artiste du pixel, transformant les concepts en visuels frappants. Son mantra : 'Une image vaut 1000 likes'.",
      "YAZID ATTAF":
        "Négociateur né, dénicheur de partenariats gagnants et bâtisseur de relations durables avec les sponsors.",
      "AMMAR AMIRI":
        "Expert en pitchs percutants, transformant les idées en opportunités de sponsoring concrètes.",
      "ABDEL MONIM MAZGOURA":
        "Développeur full-stack et chef de projet technique, pilier de nos solutions numériques innovantes. Code, tests, déploiement !",
      "HIBA ELGHAZI":
        "Organisatrice méthodique, elle donne vie à nos formations avec une précision d'horloger et un souci du détail remarquable.",
      "JIHAD BENMOUSSA":
        "Maître de la logistique événementielle, transformant les espaces en expériences mémorables. Checklist toujours prête !",
      "IMANE JAADI":
        "Ambassadrice enthousiaste, son énergie communicative et son sens du contact font de chaque événement un succès.",
    };
    
    return descriptions[member.name] || "Membre passionné contribuant activement au développement du club IT et au partage des connaissances.";
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
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        
        <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        </div>
        
        <div className="p-4 w-full relative z-10 mt-1">
          <h3 className={`text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {member.name}
          </h3>
          <p className="text-primary font-medium mb-2">{member.role}</p>
          <div className={`flex space-x-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
            <span>Âge: {member.age}</span>
            <span>Classe: {member.class}</span>
          </div>
          
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-primary/40 backdrop-blur-sm p-4 transform transition-all duration-500 rounded-b-xl ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
            <p className="text-white font-medium text-sm">
              {getMemberDescription()}
            </p>
          </div>
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

const FuturisticBackground: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <motion.div 
          className={`absolute w-96 h-96 rounded-full ${
            isDark ? 'bg-primary/5' : 'bg-primary/10'
          } blur-3xl`}
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
          className={`absolute w-96 h-96 rounded-full ${
            isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
          } blur-3xl`}
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
        
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0tNCAyaDJ2LTJoLTJ2MnptLTQtMmgydjJoLTJ2LTJ6bS00IDJoMnYtMmgtMnYyem0tNCAwaDJ2MmgtMnYtMnptLTQgMGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] ${
          isDark ? 'opacity-20' : 'opacity-10'
        }`} />
      </div>
    </div>
  );
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
  
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ 
      delay: 3000,
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-1"
        >
          <motion.span 
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Notre Équipe
          </motion.span>
          
          <motion.h2 
            className={`text-3xl md:text-4xl font-display font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            <span className={`bg-gradient-to-r ${
              isDark 
                ? 'from-white to-primary/70' 
                : 'from-gray-800 to-primary/90'
            } bg-clip-text text-transparent`}>
              Rencontrez les Membres de Notre Club
            </span>
          </motion.h2>
          
          <motion.p 
            className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Un groupe passionné de jeunes talents dédiés à l'innovation technologique...
          </motion.p>
        </motion.div>
        
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
              duration: 1000
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
            
            <div className="flex justify-center mt-12 gap-4">
              <CarouselPrevious 
                className={`static translate-y-0 h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:ring-2 focus:ring-primary/30 ${
                  isDark ? 'bg-gray-900/60' : 'bg-white/60'
                }`}
              />
              <CarouselNext 
                className={`static translate-y-0 h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:ring-2 focus:ring-primary/30 ${
                  isDark ? 'bg-gray-900/60' : 'bg-white/60'
                }`}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
