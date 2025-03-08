import React, { useRef, useEffect, useState } from "react";
import { AnimatedCard } from "./ui/AnimatedCard";
import { Announcement } from "@/lib/types";
import { Calendar, ExternalLink } from "lucide-react";
import { CustomButton } from "./ui/CustomButton";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTheme } from "@/contexts/ThemeContext";

interface AnnouncementCardProps {
  announcement: Announcement;
  onRegisterClick: (eventTitle: string) => void;
  index: number;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onRegisterClick,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });
  const { theme } = useTheme();

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
          stiffness: 100,
        },
      });
    }
  }, [controls, isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      className="h-[600px] w-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedCard
        className={`h-full flex flex-col justify-between overflow-hidden group 
          ${
            theme === "dark"
              ? "bg-gray-900/80 border border-primary/30"
              : "bg-white/90 border border-primary/10"
          }`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="relative h-80 mb-4 overflow-hidden">
            <img
              src={announcement.image}
              alt={announcement.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end">
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {announcement.title}
                </h3>
                <div className="flex items-center text-white/90 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>
                    {announcement.dateDebut} - {announcement.dateFin}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 flex-grow">
            <div className="h-28 relative overflow-hidden">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                {announcement.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 relative z-10">
          <CustomButton
            onClick={(e) => {
              e.stopPropagation();
              onRegisterClick(announcement.title);
            }}
            className="w-full bg-primary hover:bg-primary/80 text-white group flex items-center justify-center"
          >
            <span>S&apos;inscrire à l&apos;événement</span>
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </CustomButton>
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
                ease: "linear",
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
                ease: "linear",
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
            x: ["0%", "80%", "0%"],
            y: ["0%", "40%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
          style={{ top: "-20%", left: "-10%" }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            x: ["100%", "20%", "100%"],
            y: ["50%", "0%", "50%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut",
          }}
          style={{ bottom: "-20%", right: "-10%" }}
        />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0tNCAyaDJ2LTJoLTJ2MnptLTQtMmgydjJoLTJ2LTJ6bS00IDJoMnYtMmgtMnYyem0tNCAwaDJ2MmgtMnYtMnptLTQgMGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>
    </div>
  );
};

interface AnnouncementsSectionProps {
  announcements: Announcement[];
  onRegisterClick: (eventTitle: string) => void;
}

const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
  onRegisterClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -200px 0px",
  });
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();

  const autoplayPlugin = React.useMemo(
    () =>
      Autoplay({
        delay: 1500,
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
          ease: "easeOut",
        },
      });
    }
  }, [isInView, controls]);

  return (
    <section
      id="announcements"
      className={`py-24 relative ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
      ref={sectionRef}
    >
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
            className={`inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4`}
          >
            Événements
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className={`text-3xl md:text-4xl font-display font-semibold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Nos prochains événements
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Participez à nos événements pour développer vos compétences,
            rencontrer d'autres passionnés et découvrir de nouvelles
            opportunités.
          </motion.p>
        </motion.div>

        <div
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
              {announcements.map((announcement, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 h-auto"
                >
                  <AnnouncementCard
                    announcement={announcement}
                    onRegisterClick={onRegisterClick}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-12 gap-4">
              <CarouselPrevious
                className={`static translate-y-0 h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:ring-2 focus:ring-primary/30`}
              />
              <CarouselNext
                className={`static translate-y-0 h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:ring-2 focus:ring-primary/30`}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;