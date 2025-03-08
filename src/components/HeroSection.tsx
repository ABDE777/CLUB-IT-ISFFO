
import React from 'react';
import { CustomButton } from './ui/CustomButton';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onJoinClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onJoinClick }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 bg-secondary rounded-full text-sm font-medium text-primary">
            Institut Supérieur de Formation Offshoring ISFO
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
            BIENVENUE AU CLUB IT ISFO
          </h1>
          
          <p className="text-lg md:text-xl mb-6 text-muted-foreground font-medium max-w-3xl mx-auto">
            Accompagner les étudiants à travers la technologie, l'innovation et la collaboration.
          </p>
          
          <p className="text-base md:text-lg mb-10 text-muted-foreground/80 max-w-3xl mx-auto">
            Nous nous concentrons principalement sur le développement web et le
            développement réseau, tout en organisant des compétitions, comme des
            hackathons, ainsi que diverses activités parascolaires et
            formations. Notre mission est de créer une communauté dynamique
            rassemblant des passionnés de technologie et des futurs innovateurs,
            tout en accompagnant les étudiants rencontrant des difficultés dans
            ces domaines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton onClick={onJoinClick} className="group">
              <span className="flex items-center justify-center gap-2">
                Rejoindre Notre Communauté
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </CustomButton>
            
            <CustomButton 
              variant="outline" 
              onClick={() => document.getElementById("members")?.scrollIntoView({ behavior: "smooth" })}
              className="group"
            >
              <span className="flex items-center justify-center gap-2">
                Découvrir Plus
                <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
            </CustomButton>
          </div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>
    </section>
  );
};

export default HeroSection;
