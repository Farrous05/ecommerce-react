import { ArrowRightOutlined, ShoppingOutlined, FireOutlined } from '@ant-design/icons';
import { MessageDisplay, AnimatedSection } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop, useFadeInAnimation
} from '@/hooks';
import bannerImg from '@/images/banner-girl.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useDocumentTitle('Salinaka | Home');
  useScrollTop();
  
  // Enable fade-in animations for sections
  useFadeInAnimation();
  
  // Dynamic background gradient animation
  const [gradientPosition, setGradientPosition] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 100);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <AnimatedSection 
          className="banner"
          style={{
            background: `linear-gradient(${135 + gradientPosition}deg, #f5f5f5, #e0f7fa, #f5f5f5)`,
            backgroundSize: '300% 300%',
            transition: 'background-position 0.5s ease'
          }}
        >
          <div className="banner-desc">
            <span className="banner-badge animate-pulse">New Collection 2023</span>
            <h1 className="text-thin">
              <span className="sliding-text-horizontal">
                <strong>See</strong>
                &nbsp;everything with&nbsp;
                <strong>Clarity</strong>
              </span>
            </h1>
            <p className="fade-in-text">
              Buying eyewear should leave you happy and good-looking, with money in your pocket.
              Glasses, sunglasses, and contacts—we've got your eyes covered.
            </p>
            <div className="banner-cta">
              <Link to={SHOP} className="button button-animated">
                Shop Now &nbsp;
                <ShoppingOutlined className="icon-animated" />
              </Link>
              <Link to={FEATURED_PRODUCTS} className="button button-muted button-animated">
                Explore Collection &nbsp;
                <ArrowRightOutlined className="icon-animated" />
              </Link>
            </div>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="Banner" className="animate-float" />
            <div className="banner-img-badge animate-spin">
              <span className="banner-img-badge-text">20% OFF</span>
              <span className="banner-img-badge-title">Summer Sale</span>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="benefits-bar">
          <div className="benefit-item">
            <span className="benefit-icon">🚚</span>
            <div className="benefit-content">
              <h5>Free Shipping</h5>
              <p>On all orders over $50</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔄</span>
            <div className="benefit-content">
              <h5>Easy Returns</h5>
              <p>30-day return policy</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔒</span>
            <div className="benefit-content">
              <h5>Secure Checkout</h5>
              <p>100% protected payments</p>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </AnimatedSection>
        
        <AnimatedSection className="promo-banner">
          <div className="promo-content">
            <h2 className="diagonal-text">Summer Collection</h2>
            <p>Get ready for the sun with our premium sunglasses</p>
            <Link to={SHOP} className="button">
              Shop Collection &nbsp;
              <FireOutlined />
            </Link>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </AnimatedSection>
        
        <AnimatedSection className="newsletter">
          <div className="newsletter-content">
            <h2>Subscribe to our Newsletter</h2>
            <p>Get the latest updates on new products and upcoming sales</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button className="button">Subscribe</button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Home;
