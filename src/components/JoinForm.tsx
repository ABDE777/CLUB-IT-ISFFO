
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FormData } from '@/lib/types';
import { CustomButton } from './ui/CustomButton';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface JoinFormProps {
  isOpen: boolean;
  formType: "Join" | "Register";
  onClose: () => void;
  initialData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  eventTitle?: string;
}

const JoinForm: React.FC<JoinFormProps> = ({
  isOpen,
  formType,
  onClose,
  initialData,
  onInputChange,
  onSubmit,
  eventTitle = ""
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(e);
      toast.success(formType === "Join" 
        ? "Votre demande d'adhésion a été soumise avec succès!" 
        : `Votre inscription à l'événement "${eventTitle}" a été soumise avec succès!`
      );
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formFields = [
    { name: 'fullName', label: 'Nom Complet', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Téléphone', type: 'tel' },
    { name: 'className', label: 'Classe', type: 'text' },
    { name: 'institution', label: 'Institution', type: 'text' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          
          <motion.div 
            className="bg-gray-900 dark:bg-gray-900 rounded-xl shadow-2xl p-5 w-full max-w-[320px] relative z-10 border border-primary/20 backdrop-blur-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Close"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} />
            </motion.button>
            
            <h2 className="text-lg font-semibold mb-3 text-center text-white">
              {formType === "Join" ? "Rejoindre le Club" : "S'inscrire à l'événement"}
            </h2>
            
            {eventTitle && formType === "Register" && (
              <div className="mb-3 p-2 bg-primary/10 rounded-lg text-center">
                <p className="text-primary font-medium text-sm">{eventTitle}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              {formFields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label 
                    htmlFor={field.name} 
                    className="block text-sm font-medium text-gray-300"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={(initialData as any)[field.name]}
                    onChange={onInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border bg-gray-800/50 border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              ))}
              
              <div className="pt-2">
                <CustomButton 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-all"
                >
                  {isSubmitting ? "Traitement..." : formType === "Join" ? "Rejoindre" : "S'inscrire"}
                </CustomButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinForm;
