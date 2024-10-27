"use client";
import { FC, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 1.6,
}) => {
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false); // State to track if animation has occurred
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration, delay },
          });
          setHasAnimated(true); // Set the flag to true after animation
        }
      },
      { threshold: 0.05 } // Trigger when 10% of the element is in view
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, delay, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
