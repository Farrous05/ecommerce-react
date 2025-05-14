import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartFilled, 
  GithubOutlined, 
  InstagramOutlined, 
  LinkedinOutlined, 
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import logo from '../../../static/logo-full.png';

const Footer = ({ path }) => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      // Here you would typically send this to your backend
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f8f8f8" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,170.7C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-col-1">
          <div className="footer-logo">
            <Link to="/">
              <img alt="Logo" src={logo} className="footer-logo-img" />
            </Link>
          </div>
          <p className="footer-description">
            Premium eyewear for everyone. Our mission is to provide high-quality, 
            stylish eyewear at affordable prices with exceptional customer service.
          </p>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon github-icon">
              <GithubOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon">
              <InstagramOutlined />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin-icon">
              <LinkedinOutlined />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter-icon">
              <TwitterOutlined />
            </a>
          </div>
        </div>
        
        <div className="footer-col-2">
          <h5 className="footer-title">Quick Links</h5>
          <ul className="footer-links">
            <li className="footer-link-item"><Link to="/" className="footer-link">Home</Link></li>
            <li className="footer-link-item"><Link to="/shop" className="footer-link">Shop</Link></li>
            <li className="footer-link-item"><Link to="/featured" className="footer-link">Featured</Link></li>
            <li className="footer-link-item"><Link to="/recommended" className="footer-link">Recommended</Link></li>
          </ul>
        </div>
        
        <div className="footer-col-3">
          <h5 className="footer-title">Legal</h5>
          <ul className="footer-links">
            <li className="footer-link-item"><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            <li className="footer-link-item"><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            <li className="footer-link-item"><Link to="/shipping" className="footer-link">Shipping Policy</Link></li>
            <li className="footer-link-item"><Link to="/refund" className="footer-link">Refund Policy</Link></li>
          </ul>
        </div>
        
        <div className="footer-col-4">
          <h5 className="footer-title">Contact Us</h5>
          <ul className="footer-contact">
            <li className="footer-contact-item">
              <EnvironmentOutlined className="footer-contact-icon" />
              <span>123 Commerce St, New York, NY 10001</span>
            </li>
            <li className="footer-contact-item">
              <PhoneOutlined className="footer-contact-icon" />
              <span>(123) 456-7890</span>
            </li>
            <li className="footer-contact-item">
              <MailOutlined className="footer-contact-icon" />
              <span>support@velora.com</span>
            </li>
          </ul>
          
          <form className="footer-subscribe" onSubmit={handleSubscribe}>
            <h5 className="footer-title">Newsletter</h5>
            <div className="footer-subscribe-wrapper">
              <input 
                type="email" 
                placeholder="Email address" 
                className="footer-subscribe-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-subscribe-button">
                {subscribed ? 'Thanks!' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="made-by-wrapper">
            <span className="made-by-text">Made with</span>
            <HeartFilled className="made-by-heart" />
            <span className="made-by-text">by</span>
            <span className="made-by-brand">Velora</span>
          </div>
          <span className="copyright">© {year} Velora. All rights reserved.</span>
          <button onClick={scrollToTop} className="back-to-top">
            <ArrowUpOutlined />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
