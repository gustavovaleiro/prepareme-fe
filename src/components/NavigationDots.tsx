import React from 'react';
import { motion } from 'framer-motion';

interface NavigationDotsProps {
  sections: string[];
  activeSection: number;
  onDotClick: (index: number) => void;
}

export function NavigationDots({ sections, activeSection, onDotClick }: NavigationDotsProps) {
  return (
    <div className="section-indicator">
      {sections.map((section, index) => (
        <motion.div
          key={section}
          className={`section-indicator-dot ${activeSection === index ? 'active' : ''}`}
          onClick={() => onDotClick(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          role="button"
          aria-label={`Scroll to ${section} section`}
          tabIndex={0}
        />
      ))}
    </div>
  );
}