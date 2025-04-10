import React, { useRef, useEffect, useState } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Member } from '@/lib/types';
import { motion, useInView, useAnimation, useTransform } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useTheme } from '@/contexts/ThemeContext';
import { FiArrowUpRight, FiUser, FiBook } from 'react-icons/fi';

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

  const x = useTransform(controls, [0, 1], [-30, 0]);
  const rotateY = useTransform(controls, [0, 1], [-20, 0]);
  const shadow = useTransform(controls, [0, 1], [
    '0px 0px 0px rgba(0,0,0,0)',
    '0px 12px 40px rgba(0,0,0,0.15)'
  ]);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        transition: { 
          duration: 0.8,
          delay: index * 0.15,
          type: "spring",
          stiffness: 80,
          damping: 15
        }
      });
    }
  }, [controls, isInView, index]);

  const getMemberDescription = () => {
    const descriptions = {
      "MANAR SROUT": "Présidente charismatique et visionnaire, elle orchestre les activités avec un leadership inspirant et une passion pour l'innovation technologique.",
      "YOUNES LHLIBI": "Vice-président opérationnel, maître dans l'art de transformer les idées en actions concrètes grâce à son sens aigu de l'organisation.",
      "JAD GHALALI": "Trésorier méticuleux, gardien des finances du club et stratège en gestion budgétaire. Son Excel n'a aucun secret !",
      "ILYAS ELBOUCHIKHI": "Trésorier adjoint et expert en économie digitale, alliant rigueur comptable et passion pour les cryptomonnaies.",
      "KARIM AIT CHEIKH": "Créateur de contenu hors pair, il donne vie à notre présence digitale avec des designs percutants et des campagnes virales.",
      "HAMZA OUBAHA": "Génie des réseaux sociaux, maître dans l'art d'engager la communauté avec humour et créativité. #ClubITISFO_Genius",
      "MOHAMED KOUATLY": "Stratège en communication, architecte de notre image publique et bâtisseur de partenariats médiatiques.",
      "ADAM MALAHI": "Artiste du pixel, transformant les concepts en visuels frappants. Son mantra : 'Une image vaut 1000 likes'.",
      "YAZID ATTAF": "Négociateur né, dénicheur de partenariats gagnants et bâtisseur de relations durables avec les sponsors.",
      "AMMAR AMIRI": "Expert en pitchs percutants, transformant les idées en opportunités de sponsoring concrètes.",
      "ABDEL MONIM MAZGOURA": "Développeur full-stack et chef de projet technique, pilier de nos solutions numériques innovantes.",
      "HIBA ELGHAZI": "Organisatrice méthodique, elle donne vie à nos formations avec une précision d'horloger et un souci du détail remarquable.",
      "JIHAD BENMOUSSA": "Maître de la logistique événementielle, transformant les espaces en expériences mémorables. Checklist toujours prête !",
      "IMANE JAADI": "Ambassadrice enthousiaste, son énergie communicative et son sens du contact font de chaque événement un succès."
    };
    
    return descriptions[member.name] || "Membre passionné contribuant activement au développement du club IT et au partage des connaissances.";
  };

  const isDark = theme === 'dark';

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.95, rotateY: -20 }}
      animate={controls}
      style={{ x, rotateY, boxShadow: shadow }}
      className="h-[480px] w-full flex flex-col items-center justify-center p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedCard 
        hoverEffect={true} 
        className={`h-full w-full flex flex-col items-center justify-center transform transition-all duration-500 ${
          isHovered ? 'scale-[1.02]' : 'scale-100'
        } ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/80 border border-primary/20 text-white' 
            : 'bg-gradient-to-br from-white/95 to-gray-50/90 border border-primary/10 text-gray-800'
        } relative overflow-hidden group backdrop-blur-sm`}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
          animate={{
            background: isHovered ? [
              'linear-gradient(30deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
              'linear-gradient(60deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
              'linear-gradient(30deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)'
            ] : []
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div 
          className="relative h-64 w-full overflow-hidden rounded-t-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transform origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </motion.div>

        <div className="p-6 w-full relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                isDark ? 'text-white group-hover:text-primary' : 'text-gray-800 group-hover:text-primary/90'
              }`}>
                {member.name}
              </h3>
              <p className="font-medium text-primary/80">{member.role}</p>
            </div>
            <FiArrowUpRight className={`text-2xl transition-transform duration-300 ${
              isDark ? 'text-white/60' : 'text-gray-400'
            } ${isHovered ? 'rotate-45' : ''}`} />
          </div>

          <div className={`flex gap-4 mb-6 text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <div className="flex items-center gap-2">
              <FiUser className="text-primary" />
              <span>{member.age} ans</span>
            </div>
            <div className="flex items-center gap-2">
              <FiBook className="text-primary" />
              <span>{member.class}</span>
            </div>
          </div>

          <motion.div
            className={`overflow-hidden ${
              isDark ? 'bg-gray-800/60' : 'bg-gray-100/80'
            } rounded-lg backdrop-blur-sm`}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="p-4">
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {getMemberDescription()}
              </p>
            </div>
          </motion.div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/80"
                initial={{
                  scale: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: ["0%", `${Math.random() * 200 - 100}%`, "0%"],
                  y: ["0%", `${Math.random() * 200 - 100}%`, "0%"],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
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
          className={`absolute w-[600px] h-[600px] rounded-full ${
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
          className={`absolute w-[600px] h-[600px] rounded-full ${
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
      delay: 5000,
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
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
          >
            Notre Équipe
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className={`text-4xl md:text-5xl font-display font-bold mb-8 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            <span className={`bg-gradient-to-r ${
              isDark 
                ? 'from-white via-primary to-purple-400' 
                : 'from-gray-800 via-primary to-purple-600'
            } bg-clip-text text-transparent`}>
              L'Équipe derrière la Magie
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className={`text-lg md:text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Une équipe pluridisciplinaire alliant passion technologique et créativité pour repousser les limites de l'innovation.
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
                  className="pl-4 md:basis-1/2 lg:basis-1/3 h-[520px]"
                >
                  <MemberCard member={member} index={index} theme={theme} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-12 gap-4">
              <CarouselPrevious 
                className={`static translate-y-0 h-14 w-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 ${
                  isDark ? 'bg-gray-900/60 backdrop-blur-sm' : 'bg-white/60'
                }`}
              />
              <CarouselNext 
                className={`static translate-y-0 h-14 w-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 ${
                  isDark ? 'bg-gray-900/60 backdrop-blur-sm' : 'bg-white/60'
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
