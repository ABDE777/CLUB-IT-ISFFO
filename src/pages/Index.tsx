import React from "react";
import { useState } from "react";
import { Member, Sponsor, Announcement } from "@/lib/types";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MembersSection from "@/components/MembersSection";
import SponsorsSection from "@/components/SponsorsSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react";

const Index = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [iframeTitle, setIframeTitle] = useState("");
  const { theme } = useTheme();

  const handleJoinClick = () => {
    setIframeUrl("https://forms.gle/1Hnh6A7vH9LQGxf79");
    setIframeTitle("Adhésion au Club IT");
    setShowIframe(true);
  };

  const handleRegisterClick = (eventTitle: string = "") => {
    const eventFormUrls: Record<string, string> = {
      "Hackathon Annuel": "https://forms.gle/xQySfsLdZiujk3q77",
      "Atelier Réseaux": "https://forms.gle/xQySfsLdZiujk3q77",
      "Conférence IA": "https://forms.gle/xQySfsLdZiujk3q77",
    };

    setIframeUrl(
      eventFormUrls[eventTitle] || "https://forms.gle/xQySfsLdZiujk3q77"
    );
    setIframeTitle(eventTitle || "Inscription Événement");
    setShowIframe(true);

    toast.info(`Formulaire : ${eventTitle || "Événement"}`, {
      description: "Merci de remplir le formulaire d'inscription",
    });
  };

  const closeIframe = () => {
    setShowIframe(false);
    setIframeUrl("");
  };

  const members: Member[] = [
  {
    name: "MANAR SROUT",
    role: "Présidente",
    age: 19,
    class: "ID101",
    image: "/images/members/2.png",
  },
  {
    name: "YOUNES LHLIBI",
    role: "Vice-Président",
    age: 20,
    class: "DD101",
    image: "/images/members/5.png",
  },
  {
    name: "ABDEL MONIM MAZGOURA",
    role: "Responsable Formation et Projets et Développeur du Club",
    age: 19,
    class: "DD104",
    image: "/images/members/1.png",
  },
  {
    name: "JAD GHALALI",
    role: "Trésorier",
    age: 18,
    class: "DD103",
    image: "/images/members/14.png", // Image externe correcte
  },
  {
    name: "ILYAS ELBOUCHIKHI",
    role: "Co-Trésorier",
    age: 21,
    class: "ID101",
    image: "/images/members/12.png",
  },
  {
    name: "KARIM AIT CHEIKH",
    role: "Responsable Social Media ",
    age: 18,
    class: "ID103",
    image: "/images/members/7.png",
  },
  {
    name: "HAMZA OUBAHA",
    role: "CO-Responsable Social Media",
    age: 20,
    class: "DD104",
    image: "/images/members/6.png",
  },
  {
    name: "MOHAMED KOUATLY",
    role: "Responsable Communication ",
    age: 22,
    class: "ID203",
    image: "/images/members/4.png",
  },
  {
    name: "ADAM MALAHI",
    role: "CO-Responsable Communication ",
    age: 18,
    class: "DD104",
    image: "/images/members/10.png",
  },
  {
    name: "YAZID ATTAF",
    role: "Responsable Sponsoring ",
    age: 21,
    class: "ID101",
    image: "/images/members/11.png",
  },
  {
    name: "AMMAR AMIRI",
    role: "CO-Responsable Sponsoring ",
    age: 18,
    class: "DD102",
    image: "/images/members/9.png",
  },
  {
    name: "HIBA ELGHAZI",
    role: "CO-Responsable Formation et Projets ",
    age: 20,
    class: "ID101",
    image: "/images/members/13.png",
  },
  {
    name: "JIHAD BENMOUSSA",
    role: "Responsable Événements ",
    age: 20,
    class: "ID201",
    image: "/images/members/3.png",
  },
  {
    name: "IMANE JAADI",
    role: "CO-Responsable Événements ",
    age: 18,
    class: "DD101",
    image: "/images/members/8.png",
  },
];

  const sponsors: Sponsor[] = [
    {
      name: "Mme. BELAOUD HANANE",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Professor icon
      field: "Développement Réseaux",
      description: "Notre professeure en réseau nous guide dans la gestion et la sécurité des réseaux, en nous préparant à concevoir des infrastructures efficaces.",
    },
    {
      name: "Mr. BOUSETTA IBRAHIM",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Professor icon
      field: "Direction Institutionnelle",
      description: "Le directeur de l'ISFO supervise la gestion de l’établissement, assurant son bon fonctionnement et la réussite des étudiants.",
    },
  ];

  // spell-checker: disable
  const announcements: Announcement[] = [
    {
      title: "HACKATHON EXPRESS",
      dateDebut: "6 MARS 2025",
      dateFin: "13 MARS 2025",
      description:
        "Le Hackathon du 8 mars invite des équipes de 3 participants à créer des solutions innovantes sur le thème des Droits des Femmes. En une semaine, les équipes devront brainstormer et développer leurs projets sous pression. Les meilleurs auront l’opportunité de présenter devant un panel de juges et de remporter des prix. Rejoignez-nous pour une expérience enrichissante et dynamique !",
      image:
        "/images/events/hackathon_express.jpg",
    },
   
  ];
  // spell-checker: enable

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <ThemeToggle />
      <Navbar onJoinClick={handleJoinClick} />

      <main className="relative z-10">
        <HeroSection onJoinClick={handleJoinClick} />
        <MembersSection members={members} />
        <SponsorsSection sponsors={sponsors} />
        <AnnouncementsSection
          announcements={announcements}
          onRegisterClick={handleRegisterClick}
        />
      </main>

      <Footer />

      {/* Modal Formulaire */}
      <AnimatePresence>
        {showIframe && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <button
                onClick={closeIframe}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/80 hover:bg-primary transition-colors"
              >
                <X className="text-white" size={24} />
              </button>

              <iframe
                src={iframeUrl}
                title={iframeTitle}
                className="w-full h-full"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                Chargement...
              </iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
