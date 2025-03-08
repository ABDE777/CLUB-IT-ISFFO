import React, { useState, useEffect } from "react";
import { CustomButton } from "./ui/CustomButton";
import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface NavBarProps {
  onJoinClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onJoinClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ["home", "members", "sponsors", "announcements"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        return element && element.getBoundingClientRect().top <= 100;
      });

      currentSection && setActiveSection(currentSection);
    };

    // Gestion du redimensionnement pour fermer le menu mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#home" },
    { name: "Équipe", href: "#members" },
    { name: "Encadrants", href: "#sponsors" },
    { name: "Événements", href: "#announcements" },
  ];

  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/it_club_isfo?utm_source=qr&igsh=MWVhOG1uYzJ4OWt6Zw==",
      "_blank"
    );
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 py-3 transition-all duration-300",
        theme === "dark" ? "bg-black" : "bg-white", // Fond noir fixe pour le thème sombre
        isScrolled && "shadow-md backdrop-blur-md" // Effets de défilement
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center z-20"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            IT Club
          </motion.span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={(e) => e.preventDefault()}
              className={cn(
                "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeSection === link.href.slice(1)
                  ? "text-primary bg-primary/10"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-white/5"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-px bg-primary transition-transform",
                  activeSection === link.href.slice(1)
                    ? "scale-x-100"
                    : "scale-x-0"
                )}
              />
            </motion.a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center  gap-4">
          <CustomButton
            variant="outline"
            onClick={onJoinClick}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Rejoindre
          </CustomButton>
          <CustomButton
            onClick={handleInstagramClick}
            className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
          >
            Contactez-nous
          </CustomButton>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className={cn(
            "md:hidden p-2 rounded-full z-[60]",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className={cn(
                  "fixed inset-0 z-50 flex flex-col",
                  theme === "dark" ? "bg-black" : "bg-white" // Fond noir pour le menu mobile
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
              >
                <div className="flex flex-col h-full p-4 pt-24">
                  <nav className="flex flex-col gap-4 flex-1">
                    {navLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className={cn(
                          "py-3 px-4 rounded-lg text-center text-lg",
                          activeSection === link.href.slice(1)
                            ? "bg-primary/10 text-primary"
                            : theme === "dark"
                            ? "text-gray-300 hover:bg-white/10"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </nav>

                  <div className="flex flex-col gap-3 mt-8">
                    <CustomButton
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onJoinClick();
                      }}
                      className="w-full py-3 border-primary text-primary"
                    >
                      Rejoindre
                    </CustomButton>
                    <CustomButton
                      onClick={handleInstagramClick}
                      className="w-full py-3 bg-gradient-to-r from-primary to-purple-600"
                    >
                      Contactez-nous
                    </CustomButton>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;
