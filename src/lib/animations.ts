
export const staggeredChildren = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const fadeInUpItem = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const popIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};
