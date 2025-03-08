import React from "react";
import { useState, useRef } from "react";
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
   const joinFormUrl = "https://forms.gle/1Hnh6A7vH9LQGxf79"; // Public Google Form URL
   setIframeUrl(joinFormUrl);
   setIframeTitle("Rejoindre le Club IT");
   setShowIframe(true);
 };



  const handleRegisterClick = (eventTitle: string = "") => {
    // You can map event titles to specific Google Form URLs
    const eventFormUrls: Record<string, string> = {
      "Hackathon Annuel": "https://forms.gle/xQySfsLdZiujk3q77",
      "Atelier Réseaux": "https://forms.gle/xQySfsLdZiujk3q77",
      "Conférence IA": "https://forms.gle/xQySfsLdZiujk3q77",
      // Add more event URLs as needed
    };

    // Default form URL if event title is not found
    const defaultFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScbCQP_XQxK-0RvpQXy8ZQU4T7WHDgnAOc1R-VGCaPhRMTm-g/viewform?embedded=true";

    setIframeUrl(eventFormUrls[eventTitle] || defaultFormUrl);
    setIframeTitle(eventTitle || "Inscription à l'événement");
    setShowIframe(true);
    toast.info(`Inscription pour ${eventTitle || "l'événement"}`, {
      description: "Veuillez remplir le formulaire pour vous inscrire",
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
    class: "ID102",
    image: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
  },
  {
    name: "YOUNES LHLIBI",
    role: "Vice-Président",
    age: 18,
    class: "DD101",
    image: "https://cdn-icons-png.flaticon.com/512/194/194935.png",
  },
  {
    name: "JAD GHALALI",
    role: "Trésorier Principal",
    age: 19,
    class: "DD103",
    image: "https://cdn-icons-png.flaticon.com/512/194/194931.png",
  },
  {
    name: "ILYAS ELBOUCHIKHI",
    role: "Trésorier Secondaire",
    age: 22,
    class: "TSDI 2",
    image: "https://cdn-icons-png.flaticon.com/512/194/194937.png",
  },
  {
    name: "KARIM AIT CHEIKH",
    role: "Responsable Social Media Principal",
    age: 21,
    class: "TSDI 2",
    image: "https://cdn-icons-png.flaticon.com/512/194/194936.png",
  },
  {
    name: "HAMZA OUBAHA",
    role: "Responsable Social Media Secondaire",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194934.png",
  },
  {
    name: "MOHAMED KOUATLY",
    role: "Responsable Communication Principal",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194933.png",
  },
  {
    name: "ADAM MALAHI",
    role: "Responsable Communication Secondaire",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194932.png",
  },
  {
    name: "YAZID ATTAF",
    role: "Responsable Sponsoring Principal",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194930.png",
  },
  {
    name: "AMMAR AMIRI",
    role: "Responsable Sponsoring Secondaire",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194929.png",
  },
  {
    name: "ABDEL MONIM MAZGOURA",
    role: "Responsable Formation et Projets Principal et Développeur du Club",
    age: 19,
    class: "DD104",
    image: "https://cdn-icons-png.flaticon.com/512/194/194928.png",
  },
  {
    name: "HIBA ELGHAZI",
    role: "Responsable Formation et Projets Secondaire",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194927.png",
  },
  {
    name: "JIHAD BENMOUSSA",
    role: "Responsable Événements Principal",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194926.png",
  },
  {
    name: "IMANE JAADI",
    role: "Responsable Événements Secondaire",
    age: 20,
    class: "TSDI 1",
    image: "https://cdn-icons-png.flaticon.com/512/194/194925.png",
  },
];

  const sponsors: Sponsor[] = [
    {
      name: "OFPPT",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Institution icon
      field: "Formation Professionnelle",
      description:
        "Partenaire institutionnel fournissant infrastructures et ressources pédagogiques.",
    },
    {
      name: "Mr. KAMAL DAOUDI",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Professor icon
      field: "Développement Web",
      description: "Expert en technologies web full-stack (React/Node.js).",
    },
    {
      name: "Mme. BELAOUD HANANE",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Professor icon
      field: "Développement Réseaux",
      description: "Spécialiste en architecture réseau et configuration Cisco.",
    },
    {
      name: "Mr. BOUSETTA IBRAHIM",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Professor icon
      field: "Direction Institutionnelle",
      description: "Directeur de l'institut, superviseur stratégique du club.",
    },
    {
      name: "Mme. SEMMAR",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Professor icon
      field: "Développement Réseaux",
      description:
        "Experte en sécurité réseau et déploiement d'infrastructures cloud.",
    },
  ];

  // spell-checker: disable
  const announcements: Announcement[] = [
    {
      title: "Hackathon Annuel",
      dateDebut: "15 Mai 2023",
      dateFin: "17 Mai 2023",
      description:
        "Un hackathon de 48 heures où les participants développent des projets innovants.",
      image:
        "https://img.freepik.com/free-vector/hackathon-concept-illustration_114360-7880.jpg",
    },
    {
      title: "Atelier Réseaux",
      dateDebut: "22 Juin 2023",
      dateFin: "23 Juin 2023",
      description:
        "Atelier dédié aux fondamentaux des réseaux informatiques et à la cybersécurité.",
      image:
        "https://img.freepik.com/free-vector/networking-concept-illustration_114360-729.jpg",
    },
    {
      title: "Conférence IA",
      dateDebut: "10 Septembre 2023",
      dateFin: "12 Septembre 2023",
      description:
        "Conférence sur l'intelligence artificielle et son impact dans le monde professionnel.",
      image:
        "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-2297.jpg",
    },
  ];
  // spell-checker: enable

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <ThemeToggle />
      <Navbar onJoinClick={handleJoinClick} />
      <main>
        <HeroSection onJoinClick={handleJoinClick} />
        <MembersSection members={members} />
        <SponsorsSection sponsors={sponsors} />
        <AnnouncementsSection
          announcements={announcements}
          onRegisterClick={handleRegisterClick}
        />
      </main>
      <Footer />

      {/* Google Form iframe modal */}
      <AnimatePresence>
        {showIframe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden shadow-xl bg-white"
            >
              <div className="absolute top-0 right-0 z-10 p-4">
                <button
                  onClick={closeIframe}
                  className="rounded-full p-2 bg-gray-800/80 text-white hover:bg-primary transition-colors"
                  aria-label="Fermer"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="w-full h-full">
                <iframe
                  src={iframeUrl}
                  title={iframeTitle}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full h-full"
                >
                  Chargement du formulaire...
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
