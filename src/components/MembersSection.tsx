import React, { useRef, useEffect, useCallback } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Member } from '@/lib/types';
import { motion, useInView, useAnimation, useDragControls, Variants } from 'framer-motion';
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
import Image from 'next/image';
import { useGesture } from '@use-gesture/react';

// Animation constants
const SPRING_CONFIG = {
  type: "spring",
  stiffness: 120,
  damping: 25,
  mass: 0.5
};

const ENTRANCE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

// Content constants
const DESCRIPTIONS = {
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
} as const;

const DEFAULT_IMAGE_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

interface MemberCardProps {
  member: Member;
  index: number;
  theme: 'dark' | 'light';
}

const MemberCard = React.memo(({ member, index, theme }: MemberCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { 
    once: true, 
    margin: "-50px 0px",
    amount: 0.05
  });

  const dragControls = useDragControls();

  useEffect(() => {
    if (inView) {
      controls.start({
        ...ENTRANCE_VARIANTS.visible,
        transition: { 
          ...SPRING_CONFIG,
          delay: index * 0.07
        }
      });
    }
  }, [controls, inView, index]);

  const bind = useGesture({
    onHover: ({ active }) => setIsHovered(active),
    onDrag: ({ movement: [mx] }) => {
      controls.start({ x: mx * 0.4, rotate: mx * 0.1 });
    },
    onDragEnd: () => {
      controls.start({ x: 0, rotate: 0 });
    }
  });

  return (
    <motion.div 
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={ENTRANCE_VARIANTS}
      className="h-[450px] w-full flex flex-col items-center justify-center p-6"
      {...bind()}
      drag="x"
      dragControls={dragControls}
      dragConstraints={{ left: 0, right: 0 }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <AnimatedCard
        className={cn(
          "h-full w-full flex flex-col items-center justify-center",
          "relative overflow-hidden group transform-style-preserve-3d",
          "bg-opacity-90 backdrop-blur-sm border",
          theme === 'dark' 
            ? 'bg-gray-900 border-primary/30 text-white' 
            : 'bg-white border-primary/10 text-gray-800',
          isHovered && 'scale-[1.02] shadow-2xl'
        )}
        whileHover={{ rotateY: 2, rotateX: 1 }}
        transition={SPRING_CONFIG}
      >
        {/* Optimized image container */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
          <Image
            src={member.image}
            alt={member.name}
            fill
            loading="lazy"
            className="object-cover will-change-transform"
            placeholder="blur"
            blurDataURL={DEFAULT_IMAGE_BLUR}
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-avatar.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>

        {/* Content with parallax effect */}
        <motion.div 
          className="p-4 w-full relative z-10"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -10 : 0 }}
          transition={SPRING_CONFIG}
        >
          <h3 className={cn(
            "text-xl font-semibold mb-1 transition-colors",
            theme === 'dark' ? 'text-white' : 'text-gray-800',
            "group-hover:text-primary"
          )}>
            {member.name}
          </h3>
          <p className="text-primary font-medium mb-2">{member.role}</p>
          <div className={cn(
            "flex space-x-4 text-sm",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
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
            transition={SPRING_CONFIG}
          >
            <p className="text-white font-medium text-sm">
              {DESCRIPTIONS[member.name as keyof typeof DESCRIPTIONS] || 
               "Membre passionné contribuant activement au développement du club."}
            </p>
          </motion.div>
        </motion.div>

        <ParticleSystem theme={theme} active={isHovered} />
      </AnimatedCard>
    </motion.div>
  );
});

const ParticleSystem = React.memo(({ theme, active }: { theme: 'dark' | 'light', active: boolean }) => {
  const particles = useRef(new Array(15).fill(null));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute w-2 h-2 rounded-full",
            theme === 'dark' ? 'bg-primary/80' : 'bg-primary/60'
          )}
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0 
          }}
          animate={{
            x: active ? Math.random() * 100 + '%' : '50%',
            y: active ? Math.random() * 100 + '%' : '50%',
            scale: active ? 1 : 0,
            opacity: active ? [1, 0.8, 0.6, 1] : 0
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "circOut"
          }}
        />
      ))}
    </div>
  );
});

const MembersSection = React.memo(({ members }: { members: Member[] }) => {
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-[40vw] h-[40vw] rounded-full blur-[100px]",
                i % 2 ? 'bg-purple-500/5' : 'bg-primary/5',
                theme === 'dark' ? 'opacity-20' : 'opacity-30'
              )}
              animate={{
                x: i % 2 ? ['120%', '-20%', '120%'] : ['-20%', '120%', '-20%'],
                y: i % 2 ? ['120%', '-20%', '120%'] : ['-20%', '120%', '-20%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 30 + (i * 10),
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <motion.span 
            variants={ENTRANCE_VARIANTS}
            transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Notre Équipe
          </motion.span>
          
          <motion.h2 
            variants={ENTRANCE_VARIANTS}
            transition={{ ...SPRING_CONFIG, delay: 0.4 }}
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
            variants={ENTRANCE_VARIANTS}
            transition={{ ...SPRING_CONFIG, delay: 0.6 }}
            className={cn(
              "text-lg max-w-2xl mx-auto",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}
          >
            Un groupe passionné de jeunes talents dédiés à l'innovation technologique...
          </motion.p>
        </motion.div>

        <Carousel
          opts={{ 
            align: "start", 
            loop: true, 
            duration: 800,
            dragFree: true
          }}
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
});

export default MembersSection;
