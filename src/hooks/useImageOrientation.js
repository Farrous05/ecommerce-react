import { useState, useEffect } from 'react';

/**
 * A custom hook that detects image orientation and returns the appropriate class
 * @param {string} src - The image source URL
 * @returns {object} - Object containing orientation type and loading state
 */
const useImageOrientation = (src) => {
  const [orientation, setOrientation] = useState('square');
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const img = new Image();
    
    img.onload = () => {
      const { width, height } = img;
      setDimensions({ width, height });
      
      // Determine orientation based on aspect ratio
      if (width > height * 1.2) {
        setOrientation('landscape');
      } else if (height > width * 1.2) {
        setOrientation('portrait');
      } else {
        setOrientation('square');
      }
      
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setOrientation('square');
      setIsLoading(false);
    };
    
    img.src = src;
  }, [src]);

  const getOrientationClass = () => {
    switch (orientation) {
      case 'landscape':
        return 'product-card--landscape';
      case 'portrait':
        return 'product-card--portrait';
      default:
        return 'product-card--square';
    }
  };

  return {
    orientation,
    isLoading,
    dimensions,
    orientationClass: getOrientationClass()
  };
};

export default useImageOrientation; 