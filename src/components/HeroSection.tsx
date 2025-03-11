import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomButton } from "./ui/CustomButton";
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onJoinClick: () => void;
}

const announcements = [
  {
    id: 1,
    title: "Hackathon Express 2024",
    date: "15-17 Mars | Inscriptions ouvertes!",
    label: "NOUVEAU",
  },
  {
    id: 2,
    title: "Workshop React Avancé",
    date: "22 Mars | Places limitées",
    label: "POPULAIRE",
  },
  {
    id: 3,
    title: "Challenge Sécurité IT",
    date: "5-7 Avril | Pré-inscription disponible",
    label: "PROCHAINEMENT",
  },
];

const HeroSection: React.FC<HeroSectionProps> = ({ onJoinClick }) => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  // Faster auto-rotation (3.5 seconds)
  useEffect(() => {
    const autoRotate = setInterval(() => {
      handlePaginate(1);
    }, 3500);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePaginate(-1);
      if (e.key === "ArrowRight") handlePaginate(1);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      clearInterval(autoRotate);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeIndex]);

  const handlePaginate = (newDirection: number) => {
    setActiveIndex([
      (activeIndex + newDirection + announcements.length) %
        announcements.length,
      newDirection,
    ]);
  };

  const handleDragEnd = (_, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -2500) handlePaginate(1);
    if (swipe > 2500) handlePaginate(-1);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-2 pb-40 relative overflow-hidden"
    >
      {/* Compact Carousel */}
      <div className="w-full px-1 mb-0 mt-0">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={direction === 1 ? { x: "100%" } : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={direction === 1 ? { x: "-100%" } : { x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.6,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="max-w-3xl mx-auto bg-gradient-to-r from-primary/15 to-primary/25 backdrop-blur-lg rounded-xl p-4 border border-primary/30 shadow-lg cursor-grab active:cursor-grabbing"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <motion.div className="relative" whileHover={{ scale: 1.03 }}>
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"
                  />
                  <span className="relative z-10 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {announcements[activeIndex].label}
                  </span>
                </motion.div>
                <div className="text-left">
                  <motion.h3
                    className="text-lg font-semibold text-primary"
                    initial={{ y: 3 }}
                    animate={{ y: 0 }}
                  >
                    {announcements[activeIndex].title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-muted-foreground/90 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {announcements[activeIndex].date}
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <motion.button
                    onClick={() => handlePaginate(-1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-primary/10 rounded-full"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </motion.button>
                  <motion.button
                    onClick={() => handlePaginate(1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-primary/10 rounded-full"
                    aria-label="Suivant"
                  >
                    <ChevronRight className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </motion.button>
                </div>

                <motion.div whileHover={{ scale: 1.03 }}>
                  <CustomButton
                    size="sm"
                    className="group bg-primary/85 hover:bg-primary text-white"
                    onClick={() =>
                      document
                        .getElementById("events")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <span className="flex items-center gap-1.5 text-sm">
                      Voir détails
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CustomButton>
                </motion.div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center mt-4 gap-1.5">
              {announcements.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === activeIndex ? "bg-primary" : "bg-primary/25"
                  }`}
                  onClick={() =>
                    setActiveIndex([index, index > activeIndex ? 1 : -1])
                  }
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary/15 to-primary/25 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-primary/25">
              Institut Supérieur de Formation Offshoring ISFO
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight"
          >
            BIENVENUE AU CLUB IT ISFO
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 mb-8"
          >
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              Accompagner les étudiants à travers la technologie, l'innovation
              et la collaboration.
            </p>

            <motion.p
              className="text-sm md:text-base text-muted-foreground/85 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 8 }}
              animate={{ y: 0 }}
            >
              Nous organisons des hackathons dynamiques, des ateliers pratiques
              et des sessions de mentorat. Développez vos compétences en
              développement web, cybersécurité et innovation technologique.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <CustomButton
              onClick={onJoinClick}
              className="group hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-primary/20 bg-primary/85 hover:bg-primary text-white"
              size="lg"
            >
              <span className="flex items-center justify-center gap-2 text-base">
                Rejoindre Notre Communauté
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </CustomButton>

            <CustomButton
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("members")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group hover:bg-primary/5 border border-primary/25 hover:border-primary/40"
            >
              <span className="flex items-center justify-center gap-2 text-base">
                Explorer les Activités
                <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </span>
            </CustomButton>
          </motion.div>
        </div>
      </div>

      {/* Subtle Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-[3%]" />
      </div>
    </section>
  );
};

export default HeroSection;
