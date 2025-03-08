
import React, { useRef, useEffect } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Code, Terminal, Database, Shield, Server, Cpu } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <AnimatedCard className="h-full">
      <div className="flex flex-col items-start">
        <div className="bg-primary/10 p-3 rounded-lg text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </AnimatedCard>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Code size={24} />,
      title: "Développement Web",
      description: "Apprenez à créer des sites web modernes avec les technologies les plus demandées sur le marché."
    },
    {
      icon: <Terminal size={24} />,
      title: "Programmation",
      description: "Maîtrisez les langages de programmation et développez vos propres applications."
    },
    {
      icon: <Database size={24} />,
      title: "Base de données",
      description: "Concevez et manipulez des bases de données pour stocker et gérer efficacement l'information."
    },
    {
      icon: <Shield size={24} />,
      title: "Cybersécurité",
      description: "Découvrez les techniques pour protéger les systèmes informatiques contre les menaces."
    },
    {
      icon: <Server size={24} />,
      title: "Réseaux",
      description: "Comprenez comment fonctionnent les réseaux informatiques et apprenez à les configurer."
    },
    {
      icon: <Cpu size={24} />,
      title: "Intelligence Artificielle",
      description: "Explorez les fondements de l'IA et ses applications dans différents domaines."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-foreground font-medium text-sm mb-4 animate-on-scroll">
            À propos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 animate-on-scroll">
            Ce que nous vous proposons
          </h2>
          <p className="text-lg text-muted-foreground animate-on-scroll">
            Notre club informatique est dédié à l'apprentissage et au développement 
            de compétences techniques. Nous vous offrons un environnement collaboratif 
            pour explorer différents aspects de l'informatique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-list">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
