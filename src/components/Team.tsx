
import React, { useRef, useEffect } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, socials }) => {
  return (
    <AnimatedCard className="text-center overflow-hidden group">
      <div className="relative mx-auto w-32 h-32 mb-6 rounded-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-primary mb-4">{role}</p>
      
      {socials && (
        <div className="flex justify-center space-x-3">
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
              <Github size={18} />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
              <Twitter size={18} />
            </a>
          )}
        </div>
      )}
    </AnimatedCard>
  );
};

const Team: React.FC = () => {
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

  const teamMembers = [
    {
      name: "Alexandre Dupont",
      role: "Président",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      socials: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Sophie Martin",
      role: "Vice-Présidente",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      socials: {
        github: "#",
        linkedin: "#"
      }
    },
    {
      name: "Thomas Bernard",
      role: "Responsable Technique",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      socials: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Emma Petit",
      role: "Responsable Communication",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80",
      socials: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <section id="team" className="py-24 bg-secondary/50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 animate-on-scroll">
            Notre équipe
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 animate-on-scroll">
            Rencontrez nos experts
          </h2>
          <p className="text-lg text-muted-foreground animate-on-scroll">
            Notre équipe est composée de passionnés d'informatique, déterminés à 
            partager leurs connaissances et à vous accompagner dans votre parcours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 staggered-list">
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              socials={member.socials}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
