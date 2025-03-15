import React from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/it_club_isfo?utm_source=qr&igsh=MWVhOG1uYzJ4OWt6Zw==",
      label: "Instagram",
    },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="py-16 px-4 bg-background text-foreground border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-display font-bold text-primary">
                CLUB IT ISFO
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Notre club informatique est dédié à l'apprentissage et au
              développement de compétences techniques. Rejoignez-nous pour
              explorer le monde de la technologie.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary text-foreground/70 hover:text-primary hover:bg-secondary/80 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block" /> {/* Spacer */}
          <div>
            <h3 className="text-base font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#members"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Équipe
                </a>
              </li>
              <li>
                <a
                  href="#sponsors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Encadrants
                </a>
              </li>
              <li>
                <a
                  href="#announcements"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Événements
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a
                  href="mailto:clubitisfo1@gmail.com?subject=Demande%20d%27information&body=Bonjour,%0D%0A%0D%0AJe voudrais en savoir plus sur votre club."
                  className="text-muted-foreground hover:text-primary"
                >
                  clubitisfo1@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a
                  href="https://wa.me/212604221523?text=Bonjour%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20le%20Club%20IT%20ISOF."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  +212 6-04-22-15-23
                </a>
              </li>

            
 <li className="flex items-center gap-2 text-muted-foreground">
  <MapPin size={16} className="text-primary" />
  <a
    href="https://maps.app.goo.gl/fgMZqFPWDsJVGWgs6"
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary"
  >
    Casablanca, Maroc
  </a>
</li>


            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-lg text-primary font-bold mb-4 md:mb-0 transition-colors text-center">
            &copy; {new Date().getFullYear()} CLUB IT ISFO. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
