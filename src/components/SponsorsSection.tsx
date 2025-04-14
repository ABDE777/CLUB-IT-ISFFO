import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sponsor } from "@/lib/types";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";

interface SponsorCardProps {
  sponsor: Sponsor;
  index: number;
  stopAutoplay: () => void;
  startAutoplay: () => void;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  sponsor,
  index,
  stopAutoplay,
  startAutoplay,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const isDark = theme === "dark";



  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-1 h-1 rounded-full ${
          i % 2 === 0 ? "bg-primary" : "bg-purple-500"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1, 0],
          x: [0, (Math.random() - 0.5) * 100],
          y: [0, (Math.random() - 0.5) * 100],
        }}
        transition={{
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
        style={{
          left: `${50 + (Math.random() - 0.5) * 20}%`,
          top: `${50 + (Math.random() - 0.5) * 20}%`,
        }}
      />
    ));
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateY: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              },
            }
          : {}
      }
      className="h-full w-full p-4 perspective"
      onMouseEnter={() => {
        setIsHovered(true);
        stopAutoplay();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startAutoplay();
      }}
    >
      <motion.div
        className={`group h-full w-full rounded-xl overflow-hidden relative transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl shadow-primary/10"
            : "bg-gradient-to-br from-white to-gray-100 shadow-2xl shadow-gray-300/30"
        } border ${
          isHovered
            ? isDark
              ? "border-primary"
              : "border-primary/70"
            : isDark
            ? "border-gray-700"
            : "border-gray-200"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className={`absolute -inset-[100%] bg-grid-${
              isDark ? "white/[0.2]" : "black/[0.1]"
            }`}
            animate={{
              rotate: isHovered ? 5 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 1.5 }}
            style={{ backgroundSize: "30px 30px" }}
          />
        </div>
        {/* Glowing accent */}
        <motion.div
          className={`absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 blur-xl transition-opacity duration-700 ${
            isHovered ? "opacity-20" : ""
          }`}
        />
        {/* Image container with full-width rectangular image */}
        <motion.div
          className="relative w-full h-48 overflow-hidden mt-4"
          animate={{
            y: isHovered ? -8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 0.5,
          }}
        >
          <img
            src={sponsor.image}
            alt={sponsor.name}
            className="w-full h-full object-contain object-center relative z-10"
          />
          {/* Particles on hover */}
          {isHovered && generateParticles(8)}
        </motion.div>
        {/* Text content with animated reveal */}
        <div className="px-6 py-4 text-center relative z-10">
          <motion.h3
            className={`text-xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            animate={{
              color: isHovered
                ? isDark
                  ? "#ffffff"
                  : "#000000"
                : isDark
                ? "#f0f0f0"
                : "#333333",
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {sponsor.name}
          </motion.h3>
          <AnimatePresence>
            {(sponsor.field || sponsor.role) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    isDark
                      ? "bg-primary/20 text-primary"
                      : "bg-primary/10 text-primary"
                  } mb-3`}
                >
                  {sponsor.field || sponsor.role}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p
                  className={`text-sm px-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
                >
                  {getDescription(sponsor.name)}
                </p>
                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                      isDark ? "text-primary" : "text-primary"
                    } hover:underline`}
                  >
                    Visiter <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Decorative corner accents */}
        <div
          className={`absolute w-8 h-8 border-t-2 border-l-2 top-3 left-3 rounded-tl-lg ${
            isHovered
              ? "border-primary"
              : isDark
              ? "border-gray-700"
              : "border-gray-300"
          } transition-colors duration-300`}
        />
        <div
          className={`absolute w-8 h-8 border-t-2 border-r-2 top-3 right-3 rounded-tr-lg ${
            isHovered
              ? "border-primary"
              : isDark
              ? "border-gray-700"
              : "border-gray-300"
          } transition-colors duration-300`}
        />
        <div
          className={`absolute w-8 h-8 border-b-2 border-l-2 bottom-3 left-3 rounded-bl-lg ${
            isHovered
              ? "border-primary"
              : isDark
              ? "border-gray-700"
              : "border-gray-300"
          } transition-colors duration-300`}
        />
        <div
          className={`absolute w-8 h-8 border-b-2 border-r-2 bottom-3 right-3 rounded-br-lg ${
            isHovered
              ? "border-primary"
              : isDark
              ? "border-gray-700"
              : "border-gray-300"
          } transition-colors duration-300`}
        />
      </motion.div>
    </motion.div>
  );
};

// Futuristic animated background
const FuturisticBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-10">
        <div
          className={`w-full h-full ${
            isDark ? "bg-grid-white/[0.2]" : "bg-grid-black/[0.1]"
          }`}
          style={{ backgroundSize: "40px 40px" }}
        />
      </div>
      {/* Animated gradient orbs */}
      <motion.div
        className={`absolute w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-primary/10" : "bg-primary/20"
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
        style={{ top: "-10%", left: "10%" }}
      />
      <motion.div
        className={`absolute w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-purple-500/10" : "bg-purple-500/20"
        }`}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
        style={{ bottom: "-10%", right: "10%" }}
      />
      {/* Decorative particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            i % 3 === 0
              ? "bg-primary/40"
              : i % 3 === 1
              ? "bg-purple-500/40"
              : "bg-white/30"
          }`}
          animate={{
            y: [0, 500],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 15,
            delay: Math.random() * 20,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: -5,
          }}
        />
      ))}
    </div>
  );
};

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors }) => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -200px 0px",
  });
  const isDark = theme === "dark";

  // Autoplay plugin setup
  const autoplayPlugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false, // Allow manual control
      }),
    []
  );

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-gray-900 to-black"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      }`}
    >
      <FuturisticBackground />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with animated text reveal */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span
              className={`inline-block py-2 px-4 rounded-full text-sm font-bold tracking-wider ${
                isDark
                  ? "bg-primary/20 text-primary"
                  : "bg-primary/10 text-primary"
              } mb-4 backdrop-blur-sm border ${
                isDark ? "border-primary/30" : "border-primary/20"
              }`}
            >
              NOS ENCADRANTS
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-5xl font-display font-bold mb-8"
          >
            <span
              className={`relative inline-block bg-clip-text text-transparent bg-gradient-to-r ${
                isDark
                  ? "from-white via-white to-primary"
                  : "from-gray-900 via-gray-800 to-primary"
              }`}
            >
              Ceux qui nous soutiennent
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
           Nos encadrants, qui nous guident avec expertise et soutien, jouent un rôle clé dans le développement de nos compétences et la réalisation de nos projets avec excellence et innovation.
          </motion.p>
        </div>
        {/* Carousel with custom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[autoplayPlugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {sponsors.map((sponsor, index) => (
                <CarouselItem
                  key={sponsor.name}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 h-[420px]"
                >
                  <SponsorCard
                    sponsor={sponsor}
                    index={index}
                    stopAutoplay={autoplayPlugin.stop}
                    startAutoplay={autoplayPlugin.play}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-16 gap-6">
              <CarouselPrevious
                className={`h-12 w-12 static transform-none rounded-full transition-all duration-300 border-2 ${
                  isDark
                    ? "bg-gray-800/80 border-gray-700 text-white hover:bg-primary hover:text-white hover:border-primary backdrop-blur-sm"
                    : "bg-white/80 border-gray-200 text-gray-800 hover:bg-primary hover:text-white hover:border-primary backdrop-blur-sm"
                } shadow-lg`}
              >
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>
              <CarouselNext
                className={`h-12 w-12 static transform-none rounded-full transition-all duration-300 border-2 ${
                  isDark
                    ? "bg-gray-800/80 border-gray-700 text-white hover:bg-primary hover:text-white hover:border-primary backdrop-blur-sm"
                    : "bg-white/80 border-gray-200 text-gray-800 hover:bg-primary hover:text-white hover:border-primary backdrop-blur-sm"
                } shadow-lg`}
              >
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
