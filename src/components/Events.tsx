
import React, { useRef, useEffect } from 'react';
import { AnimatedCard } from './ui/AnimatedCard';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { CustomButton } from './ui/CustomButton';

interface EventProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

const EventCard: React.FC<EventProps> = ({ title, description, date, time, location, image }) => {
  return (
    <AnimatedCard className="flex flex-col h-full overflow-hidden">
      <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-foreground/70">
            <Calendar size={16} className="mr-2 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Clock size={16} className="mr-2 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <MapPin size={16} className="mr-2 text-primary" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      
      <CustomButton>S'inscrire</CustomButton>
    </AnimatedCard>
  );
};

const Events: React.FC = () => {
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

  const events = [
    {
      title: "Atelier Développement Web",
      description: "Apprenez à créer votre premier site web avec HTML, CSS et JavaScript.",
      date: "12 Novembre 2023",
      time: "14:00 - 17:00",
      location: "Salle B12, Campus Principal",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
      title: "Hackathon IA",
      description: "Compétition de 24h pour développer une solution basée sur l'intelligence artificielle.",
      date: "25-26 Novembre 2023",
      time: "Commence à 10:00",
      location: "Centre d'Innovation, Campus Est",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
      title: "Conférence Cybersécurité",
      description: "Rencontrez des experts en sécurité informatique et découvrez les dernières tendances.",
      date: "8 Décembre 2023",
      time: "18:30 - 20:30",
      location: "Auditorium Principal",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    }
  ];

  return (
    <section id="events" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-foreground font-medium text-sm mb-4 animate-on-scroll">
            Événements
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 animate-on-scroll">
            Nos prochains événements
          </h2>
          <p className="text-lg text-muted-foreground animate-on-scroll">
            Participez à nos événements pour développer vos compétences, 
            rencontrer d'autres passionnés et découvrir de nouvelles opportunités.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-list">
          {events.map((event, index) => (
            <EventCard 
              key={index}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              location={event.location}
              image={event.image}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <CustomButton variant="outline">
            Voir tous les événements
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Events;
