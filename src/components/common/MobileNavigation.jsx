import { BasketToggle } from '@/components/basket';
import { HOME, SIGNIN, ADMIN_DASHBOARD, SHOP, SEARCH } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserNav from '@/views/account/components/UserAvatar';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import SearchBar from './SearchBar';
import { DashboardOutlined, MenuOutlined, SearchOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import logo from '@/images/logo-full.png';

const Navigation = (props) => {
  const {
    isAuthenticating, basketLength, disabledPaths, user
  } = props;
  const { pathname } = useLocation();

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  const onSearchClick = () => {
    document.querySelector('.searchbar-wrapper')?.classList.add('is-open-searchbar');
    document.querySelector('.searchbar-input')?.focus();
  };

  return (
    <nav className="mobile-navigation">
      <div className="mobile-navigation-main">
        <div className="mobile-navigation-item">
          <Link to={HOME} className="mobile-navigation-icon" onClick={onClickLink}>
            <MenuOutlined style={{ fontSize: '2rem' }} />
          </Link>
        </div>
        
        <div className="mobile-navigation-logo">
          <Link onClick={onClickLink} to={HOME}>
            {logo ? (
              <img src={logo} alt="Salinaka Logo" />
            ) : (
              <h2>SALINAKA</h2>
            )}
          </Link>
        </div>

        <div className="mobile-navigation-icons">
          <div className="mobile-navigation-item">
            <div className="mobile-navigation-icon" onClick={onSearchClick} role="button" tabIndex="0">
              <SearchOutlined style={{ fontSize: '2rem' }} />
            </div>
          </div>
          
          <div className="mobile-navigation-item">
            <BasketToggle>
              {({ onClickToggle }) => (
                <button
                  className="mobile-navigation-icon"
                  onClick={onClickToggle}
                  disabled={disabledPaths.includes(pathname)}
                  type="button"
                >
                  <Badge count={basketLength}>
                    <ShoppingOutlined style={{ fontSize: '2rem' }} />
                  </Badge>
                </button>
              )}
            </BasketToggle>
          </div>
          
          {user ? (
            <li className="mobile-navigation-item">
              <UserNav />
            </li>
          ) : (
            <div className="mobile-navigation-item">
              {pathname !== SIGNIN && (
                <Link
                  className="mobile-navigation-icon"
                  onClick={onClickLink}
                  to={SIGNIN}
                >
                  <UserOutlined style={{ fontSize: '2rem' }} />
                </Link>
              )}
            </div>
          )}
          
          {user && user.role === 'ADMIN' && (
            <div className="mobile-navigation-item">
              <Link
                className="mobile-navigation-icon"
                to={ADMIN_DASHBOARD}
                title="Admin Dashboard"
              >
                <DashboardOutlined style={{ fontSize: '2rem' }} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mobile-navigation-sec">
        <SearchBar />
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  isAuthenticating: PropType.bool.isRequired,
  basketLength: PropType.number.isRequired,
  disabledPaths: PropType.arrayOf(PropType.string).isRequired,
  user: PropType.oneOfType([
    PropType.bool,
    PropType.object
  ]).isRequired
};

export default Navigation;
