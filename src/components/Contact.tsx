
import React, { useState, useRef, useEffect } from 'react';
import { CustomButton } from './ui/CustomButton';
import { AnimatedCard } from './ui/AnimatedCard';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message envoyé avec succès!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
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

  const contactItems = [
    {
      icon: <Mail size={20} />,
      title: "Email",
      value: "contact@itclub.com",
      link: "mailto:contact@itclub.com"
    },
    {
      icon: <Phone size={20} />,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      link: "tel:+33123456789"
    },
    {
      icon: <MapPin size={20} />,
      title: "Adresse",
      value: "123 Rue de l'Informatique, 75000 Paris",
      link: "https://maps.google.com/?q=123+Rue+de+l'Informatique+75000+Paris"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 animate-on-scroll">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 animate-on-scroll">
            Prenez contact avec nous
          </h2>
          <p className="text-lg text-muted-foreground animate-on-scroll">
            Vous avez des questions ou souhaitez rejoindre notre club ? 
            N'hésitez pas à nous contacter et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <AnimatedCard className="h-full">
              <h3 className="text-xl font-semibold mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Votre message"
                  />
                </div>
                
                <div>
                  <CustomButton type="submit" className="flex items-center" disabled={isSubmitting}>
                    {isSubmitting ? 'Envoi en cours...' : (
                      <>
                        Envoyer <Send size={16} className="ml-2" />
                      </>
                    )}
                  </CustomButton>
                </div>
              </form>
            </AnimatedCard>
          </div>
          
          <div>
            <AnimatedCard className="h-full">
              <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start group"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg text-primary mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-medium">{item.title}</h4>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-10">
                <h4 className="text-base font-medium mb-4">Horaires d'ouverture</h4>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Lundi - Vendredi:</span> 9:00 - 18:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Samedi:</span> 10:00 - 15:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Dimanche:</span> Fermé
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
