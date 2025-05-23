import { ADMIN_DASHBOARD, HOME } from '@/constants/routes';
import logo from '@/images/logo-full.png';
import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAvatar from '@/views/account/components/UserAvatar';

const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile
  }));

  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link to={ADMIN_DASHBOARD} style={{ display: 'flex', alignItems: 'center' }}>
          <img alt="Logo" src={logo} />
          <h3 className="admin-header">Admin Dashboard</h3>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <Link 
            to={HOME}
            className="navigation-menu-link"
            title="Back to Main Site"
            style={{ marginRight: '1.5rem', fontSize: '1.5rem' }}
          >
            <HomeOutlined />
          </Link>
        </li>
        <li className="navigation-menu-item">
          <UserAvatar
            isAuthenticating={isAuthenticating}
            profile={profile}
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
