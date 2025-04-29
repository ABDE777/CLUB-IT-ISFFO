import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CustomButton } from "./ui/CustomButton";
import { useTheme } from "@/contexts/ThemeContext";

const HoverCard = ({ announcement, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <motion.div
        className="relative h-[500px] w-[350px] mx-auto overflow-hidden rounded-xl transition-all"
        onMouseEnter={() => {
          setIsHovered(true);
          onHover(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(false);
        }}
      >
        {/* Card Image */}
        <div className="relative h-full w-full">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />

          {/* Title Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                {announcement.title}
              </h3>
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="h-5 w-5" />
                <span className="font-medium text-white/90">
                  {announcement.dateDebut}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Content */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/95 p-6 flex flex-col justify-between backdrop-blur-sm"
            >
              <motion.h3
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-2xl font-bold text-white mb-4"
              >
                {announcement.title}
              </motion.h3>

              <div className="space-y-4">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="flex items-center gap-2 text-primary"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">
                    {announcement.dateDebut} - {announcement.dateFin}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {announcement.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <span className="font-medium w-20">{item.time}</span>
                      <span className="flex-1">{item.activity}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CustomButton
                  onClick={() => setShowForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
                >
                  <span>S'inscrire</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </CustomButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl w-full max-w-3xl h-[80vh]"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-primary z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </button>
              <iframe
                src={announcement.formUrl}
                className="w-full h-full rounded-xl"
                frameBorder="0"
                title={`Formulaire - ${announcement.title}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AnnouncementsSection = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
const demoAnnouncements = [
  {
    title: "🚀Workshop CV & LinkedIn",
    dateDebut: "13 Mai 2025",
    dateFin: "13 Mai 2025",
    image: "/images/events/workshop.jpg",
    formUrl: "https://workshop-club-it.vercel.app/",
    schedule: [
      { time: "09h45 – 10h00", activity: "Accueil des stagiaires • Vérification des présences • Distribution de badges/stickers" },
      { time: "10h00 – 10h20", activity: "Brainstorming collectif : “Mur Boost ton Profil” • Fiches à remplir (🔍 💪 🚀) • Lecture volontaire + collage au mur" },
      { time: "10h20 – 10h30", activity: "Astuce : Analyse de profil LinkedIn avec ResumeWorded.com • Démo rapide" },
      { time: "10h30 – 12h30", activity: "Intervention de Mme Sara Naitslimane • Thème : Optimisation du CV & Profil LinkedIn • Conseils pratiques, échanges avec les stagiaires" },
      { time: "12h30 – 12h40", activity: "Photo de groupe & remerciements à l’intervenante" },
      { time: "12h40 – 13h00", activity: "Coin Photo Professionnel (individuel) • Photos LinkedIn pour les stagiaires" },
      { time: "13h00 – 13h15", activity: "Clôture & distribution des certificats • Remerciements finaux + mot du Club IT" },
    ],
  },
];


  const handleNavigation = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex(prev => {
      const newIndex = prev + newDirection;
      if (newIndex < 0) return demoAnnouncements.length - 1;
      if (newIndex >= demoAnnouncements.length) return 0;
      return newIndex;
    });
  };

  return (
    <section className={`relative py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-primary font-semibold text-sm uppercase tracking-wider">
            Événements à venir
          </span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Nos prochains rendez-vous
            </span>
          </h2>
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Découvrez nos événements exclusifs et boostez votre parcours
          </p>
        </div>

        <div className="relative h-[600px]">
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <HoverCard
                announcement={demoAnnouncements[activeIndex]}
                onHover={setPaused}
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => handleNavigation(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
          <button
            onClick={() => handleNavigation(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
