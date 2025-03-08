
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  className, 
  children, 
  hoverEffect = true,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 ease-out",
        theme === 'dark' 
          ? "bg-gray-900/90 border border-primary/20" 
          : "bg-white/90 border border-gray-200",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1",
        isHovered && "transform-none shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
      {hoverEffect && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-tr opacity-0 transition-opacity duration-300",
            theme === 'dark' 
              ? "from-primary/10 to-transparent" 
              : "from-primary/10 to-transparent",
            isHovered && "opacity-100"
          )}
        />
      )}
    </motion.div>
  );
};

export { AnimatedCard };
