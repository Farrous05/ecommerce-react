import { useEffect } from 'react';

/**
 * Custom hook that adds fade-in animation to elements with the class 'fade-in-section'
 * when they enter the viewport
 * 
 * @param {Object} options - Intersection Observer options
 * @param {string} targetSelector - CSS selector for the elements to observe (default: '.fade-in-section')
 * @param {number} threshold - How much of the element should be visible before triggering (default: 0.1)
 * @param {number} rootMargin - Margin around the root (default: '0px')
 */
const useFadeInAnimation = ({
  targetSelector = '.fade-in-section',
  threshold = 0.1,
  rootMargin = '0px'
} = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once the animation has played, we can stop observing the element
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    
    const elements = document.querySelectorAll(targetSelector);
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [targetSelector, threshold, rootMargin]);
};

export default useFadeInAnimation; 