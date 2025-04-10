import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Member } from '@/lib/types';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

// Animation constants
const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface MemberCardProps {
  member: Member;
  index: number;
  theme: 'dark' | 'light';
}

const MemberCard = React.memo(({ member, index, theme }: MemberCardProps) => {
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
          ...springTransition,
          duration: 0.5,
          delay: index * 0.1
        }
      });
    }
  }, [controls, isInView, index]);

  const descriptionMap = useCallback(() => ({
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
  }[member.name]), [member.name]);

  const isDark = theme === 'dark';
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      className="h-[450px] w-full flex flex-col items-center justify-center p-6"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(prev => !prev)}
    >
      <AnimatedCard 
        hoverEffect 
        className={cn(
          "h-full w-full flex flex-col items-center justify-center transform",
          "relative overflow-hidden group transition-transform duration-300",
          isDark 
            ? 'bg-gray-900/80 border border-primary/30 text-white' 
            : 'bg-white/90 border border-primary/10 text-gray-800',
          isHovered && 'scale-105'
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
          <motion.img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        </div>
        
        <div className="p-4 w-full relative z-10 mt-1">
          <h3 className={cn(
            "text-xl font-semibold mb-1 transition-colors duration-300",
            isDark ? 'text-white' : 'text-gray-800',
            "group-hover:text-primary"
          )}>
            {member.name}
          </h3>
          <p className="text-primary font-medium mb-2">{member.role}</p>
          <div className={cn(
            "flex space-x-4 text-sm",
            isDark ? 'text-gray-300' : 'text-gray-500'
          )}>
            <span>Âge: {member.age}</span>
            <span>Classe: {member.class}</span>
          </div>
          
          <motion.div 
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-gradient-to-t",
              "from-primary/80 to-primary/40 backdrop-blur-sm p-4 rounded-b-xl"
            )}
            initial={{ translateY: '100%', opacity: 0 }}
            animate={{ 
              translateY: isHovered ? 0 : '100%',
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white font-medium text-sm">
              {descriptionMap()}
            </p>
          </motion.div>
        </div>

        {/* Animated particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-primary/80"
                animate={{
                  x: [0, 100, 200, 0],
                  y: [0, 50, 100, 0],
                  opacity: [1, 0.8, 0.6, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + i,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        )}
      </AnimatedCard>
    </motion.div>
  );
});

const FuturisticBackground = React.memo(({ theme }: { theme: 'dark' | 'light' }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-96 h-96 rounded-full blur-3xl",
              i % 2 ? 'bg-purple-500/5' : 'bg-primary/5',
              isDark ? 'opacity-20' : 'opacity-30'
            )}
            animate={{
              x: i % 2 ? ['100%', '20%', '100%'] : ['0%', '80%', '0%'],
              y: i % 2 ? ['50%', '0%', '50%'] : ['0%', '40%', '0%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 20 + (i * 5),
              ease: "easeInOut"
            }}
            style={{
              top: i % 2 ? '-20%' : 'auto',
              bottom: i % 2 ? '-20%' : 'auto',
              left: i % 2 ? '-10%' : 'auto',
              right: i % 2 ? '-10%' : 'auto'
            }}
          />
        ))}
        
        <div className={cn(
          "absolute inset-0 bg-grid",
          isDark ? 'opacity-20' : 'opacity-10'
        )} />
      </div>
    </div>
  );
});

const MembersSection: React.FC<{ members: Member[] }> = ({ members }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { theme = 'dark' } = useTheme() || {};
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  
  const inView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -200px 0px",
    amount: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section 
      id="members" 
      className={cn(
        "py-24 relative overflow-hidden",
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      )}
      aria-label="Membres du club"
    >
      <FuturisticBackground theme={theme} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <motion.span 
            variants={fadeInVariants}
            transition={{ ...springTransition, delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Notre Équipe
          </motion.span>
          
          <motion.h2 
            variants={fadeInVariants}
            transition={{ ...springTransition, delay: 0.4 }}
            className={cn(
              "text-3xl md:text-4xl font-display font-semibold mb-6",
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            )}
          >
            <span className={cn(
              "bg-gradient-to-r bg-clip-text text-transparent",
              theme === 'dark' 
                ? 'from-white to-primary/70' 
                : 'from-gray-800 to-primary/90'
            )}>
              Rencontrez les Membres de Notre Club
            </span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInVariants}
            transition={{ ...springTransition, delay: 0.6 }}
            className={cn(
              "text-lg max-w-2xl mx-auto",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}
          >
            Un groupe passionné de jeunes talents dédiés à l'innovation technologique...
          </motion.p>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true, duration: 800 }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {members.map((member, index) => (
              <CarouselItem 
                key={`member-${member.id}-${index}`}
                className="pl-4 md:basis-1/2 lg:basis-1/3 h-[480px]"
              >
                <MemberCard member={member} index={index} theme={theme} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center mt-12 gap-4">
            <CarouselPrevious 
              className={cn(
                "static translate-y-0 h-12 w-12 rounded-full border-primary",
                "text-primary hover:bg-primary hover:text-white transition-all",
                "focus:ring-2 focus:ring-primary/30",
                theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/60'
              )}
              aria-label="Précédent"
            />
            <CarouselNext 
              className={cn(
                "static translate-y-0 h-12 w-12 rounded-full border-primary",
                "text-primary hover:bg-primary hover:text-white transition-all",
                "focus:ring-2 focus:ring-primary/30",
                theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/60'
              )}
              aria-label="Suivant"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default React.memo(MembersSection);
