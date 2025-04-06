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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const homeSection = document.getElementById("home");
      const homeHeight = homeSection?.offsetHeight || 0;

      // Sticky behavior only on desktop
      setIsSticky(window.innerWidth >= 768 && scrollPosition > homeHeight);

      // Active section detection
      const sections = ["home", "members", "sponsors", "announcements"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        return (
          element &&
          scrollPosition >= element.offsetTop - 100 &&
          scrollPosition < element.offsetTop + element.offsetHeight - 100
        );
      });

      setActiveSection(currentSection || "home");
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#home" },
    { name: "Équipe", href: "#members" },
    { name: "Sponsors", href: "#sponsors" },
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
        "w-full z-50 py-4 transition-all duration-300",
        theme === "dark" ? "bg-black" : "bg-white",
        isSticky && "md:sticky md:top-0 md:shadow-md md:backdrop-blur-md"
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
  <img
    src="/images/logo.png"
    alt="Logo IT Club"
    className="w-32 h-auto" // width increased, height will scale proportionally
  />
</motion.a>



        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              whileHover={{ y: -2 }}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                activeSection === link.href.slice(1)
                  ? "text-primary"
                  : theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-black"
              )}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <CustomButton
              variant="outline"
              onClick={onJoinClick}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Rejoindre
            </CustomButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <CustomButton
              onClick={handleInstagramClick}
              className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            >
              Contact
            </CustomButton>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className={cn(
            "md:hidden p-2 rounded-full",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className={cn(
                  "fixed inset-0 z-50 flex flex-col",
                  theme === "dark" ? "bg-black" : "bg-white"
                )}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "py-3 px-4 rounded-lg text-center",
                          activeSection === link.href.slice(1)
                            ? "bg-primary/10 text-primary"
                            : theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                        )}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </nav>

                  <div className="flex flex-col gap-4 mt-8">
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
                      Contact
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
