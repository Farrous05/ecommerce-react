/* eslint-disable indent */
import { FilterOutlined, ShoppingOutlined, SearchOutlined, UserOutlined, MenuOutlined, CloseOutlined, DashboardOutlined } from '@ant-design/icons';
import * as ROUTE from '@/constants/routes';
import logo from '@/images/logo-full.png';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Link, NavLink, useLocation, useHistory
} from 'react-router-dom';
import UserAvatar from '@/views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
  const navbar = useRef(null);
  const { pathname } = useLocation();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const store = useSelector((state) => ({
    basketLength: state.basket.length,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
    isLoading: state.app.loading
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add('is-nav-scrolled');
      } else {
        navbar.current.classList.remove('is-nav-scrolled');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

  const onSearchClick = () => {
    // Open a modal with the search bar
    document.querySelector('.searchbar-wrapper')?.classList.add('is-open-searchbar');
    document.querySelector('.searchbar-input')?.focus();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    if (!menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  // disable the basket toggle to these pathnames
  const basketDisabledpathnames = [
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD
  ];

  if (window.screen.width <= 800) {
    return (
      <MobileNavigation
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...store}
        disabledPaths={basketDisabledpathnames}
        pathname={pathname}
      />
    );
  }
  return (
    <>
      <nav className="navigation" ref={navbar}>
        <div className="navigation-left">
          <div className="navigation-icon" onClick={toggleMenu} role="button" tabIndex="0">
            <MenuOutlined style={{ fontSize: '2.2rem' }} />
          </div>
          
          {/* Removed FiltersToggle from the header */}
        </div>
        
        <div className="logo">
          <Link onClick={onClickLink} to="/"><img alt="Logo" src={logo} /></Link>
        </div>
        
        <div className="navigation-right">
          <div className="navigation-icon" onClick={onSearchClick} role="button" tabIndex="0">
            <SearchOutlined style={{ fontSize: '2.2rem' }} />
          </div>
          
          <div className="navigation-icon">
            <BasketToggle>
              {({ onClickToggle }) => (
                <div
                  className="basket-toggle"
                  role="button"
                  onClick={onClickToggle}
                  disabled={basketDisabledpathnames.includes(pathname)}
                  tabIndex="0"
                >
                  <Badge count={store.basketLength}>
                    <ShoppingOutlined style={{ fontSize: '2.2rem' }} />
                  </Badge>
                </div>
              )}
            </BasketToggle>
          </div>
          
          {store.user ? (
            <>
              {store.user.role === 'ADMIN' && (
                <div className="navigation-icon">
                  <Link
                    to={ROUTE.ADMIN_DASHBOARD}
                    title="Admin Dashboard"
                  >
                    <DashboardOutlined style={{ fontSize: '2.2rem' }} />
                  </Link>
                </div>
              )}
              <div className="navigation-icon">
                <UserAvatar />
              </div>
            </>
          ) : (
            <div className="navigation-icon">
              <Link
                onClick={onClickLink}
                to={ROUTE.SIGNIN}
              >
                <UserOutlined style={{ fontSize: '2.2rem' }} />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sliding Menu */}
      <div className={`sliding-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="sliding-menu-overlay" onClick={closeMenu} role="button" tabIndex="0"></div>
        <div className="sliding-menu-content">
          <div className="sliding-menu-header">
            <div className="sliding-menu-close" onClick={closeMenu} role="button" tabIndex="0">
              <CloseOutlined style={{ fontSize: '2rem' }} />
            </div>
          </div>
          <div className="sliding-menu-body">
            <ul className="sliding-menu-list">
              <li>
                <NavLink 
                  activeClassName="sliding-menu-active"
                  exact
                  to={ROUTE.HOME}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  activeClassName="sliding-menu-active"
                  to={ROUTE.SHOP}
                  onClick={closeMenu}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink 
                  activeClassName="sliding-menu-active"
                  to={ROUTE.FEATURED_PRODUCTS}
                  onClick={closeMenu}
                >
                  Featured
                </NavLink>
              </li>
              <li>
                <NavLink 
                  activeClassName="sliding-menu-active"
                  to={ROUTE.RECOMMENDED_PRODUCTS}
                  onClick={closeMenu}
                >
                  Recommended
                </NavLink>
              </li>
              {store.user && store.user.role === 'ADMIN' && (
                <li>
                  <NavLink 
                    activeClassName="sliding-menu-active"
                    to={ROUTE.ADMIN_DASHBOARD}
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
