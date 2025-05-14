import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A component that animates its children when they enter the viewport
 */
const AnimatedSection = ({ 
  children, 
  className = '', 
  threshold = 0.1, 
  animation = 'fade-in-section',
  delay = 0,
  style = {} 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const sectionStyle = {
    ...style,
    animationDelay: delay ? `${delay}s` : undefined,
    transitionDelay: delay ? `${delay}s` : undefined
  };

  return (
    <div 
      ref={sectionRef}
      className={`${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={sectionStyle}
    >
      {children}
    </div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  threshold: PropTypes.number,
  animation: PropTypes.string,
  delay: PropTypes.number,
  style: PropTypes.object
};

export default AnimatedSection; 