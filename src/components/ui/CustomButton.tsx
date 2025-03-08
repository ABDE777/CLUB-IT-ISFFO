
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = 'default', size = 'md', children, href, className, ...props }, ref) => {
    const baseClasses = "relative inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary/10 active:scale-[0.98]",
      ghost: "bg-transparent text-foreground hover:bg-secondary active:scale-[0.98]"
    };
    
    const sizes = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3"
    };
    
    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );
    
    if (href) {
      return (
        <a 
          href={href}
          className={buttonClasses}
        >
          {children}
        </a>
      );
    }
    
    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
