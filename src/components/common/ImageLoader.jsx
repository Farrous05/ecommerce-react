import { LoadingOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

// Store loaded images in a shared object outside component to persist across renders
const loadedImages = {};

const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Check image load state when component mounts
  useEffect(() => {
    // If we've seen this image before and it's loaded
    if (src && loadedImages[src]) {
      setLoaded(true);
      return;
    }

    // For images that might be cached by the browser already
    if (imgRef.current && imgRef.current.complete) {
      loadedImages[src] = true;
      setLoaded(true);
    }

    // Ensure we attempt to load the image regardless
    const img = new Image();
    img.onload = () => {
      loadedImages[src] = true;
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  const handleImageLoaded = () => {
    loadedImages[src] = true;
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <LoadingOutlined style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto', zIndex: 2
        }}
        />
      )}
      <img
        ref={imgRef}
        alt={alt || ''}
        className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        onLoad={handleImageLoaded}
        src={src}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  className: 'image-loader'
};

ImageLoader.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string,
  className: PropType.string
};

export default ImageLoader;
