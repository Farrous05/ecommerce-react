import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useEffect } from 'react';
import { Boundary, ImageLoader } from '@/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/redux/actions/userActions';
import { displayDate } from '@/helpers/utils';

const UserItem = ({ user }) => (
  <div className="item item-products">
    <div className="grid grid-count-6">
      <div className="grid-col item-img-wrapper">
        {user.avatar ? (
          <ImageLoader
            alt={user.fullname}
            className="item-img"
            src={user.avatar}
          />
        ) : <div className="item-img">No image</div>}
      </div>
      <div className="grid-col">
        <span className="text-overflow-ellipsis">{user.fullname || 'No name'}</span>
      </div>
      <div className="grid-col">
        <span>{user.email || 'No email'}</span>
      </div>
      <div className="grid-col">
        <span>{user.role || 'USER'}</span>
      </div>
      <div className="grid-col">
        <span>
          {user.dateJoined ? displayDate(user.dateJoined) : 'Unknown'}
        </span>
      </div>
      <div className="grid-col">
        <span>{user.address || 'No address'}</span>
      </div>
    </div>
  </div>
);

const UsersTable = ({ users }) => (
  <div>
    {users.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col" />
        <div className="grid-col">
          <h5>Name</h5>
        </div>
        <div className="grid-col">
          <h5>Email</h5>
        </div>
        <div className="grid-col">
          <h5>Role</h5>
        </div>
        <div className="grid-col">
          <h5>Date Joined</h5>
        </div>
        <div className="grid-col">
          <h5>Address</h5>
        </div>
      </div>
    )}
    {users.length === 0 ? (
      <div className="loader">
        <h3>No users found</h3>
      </div>
    ) : users.map((user) => (
      <UserItem
        key={user.id}
        user={user}
      />
    ))}
  </div>
);

const UsersNavbar = ({ usersCount, totalUsersCount }) => (
  <div className="product-admin-header">
    <h3 className="product-admin-header-title">
      Users &nbsp;
      (
      {`${usersCount} / ${totalUsersCount}`}
      )
    </h3>
  </div>
);

const Users = () => {
  useDocumentTitle('Users | Admin Dashboard');
  useScrollTop();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.app.loading);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Boundary>
      <UsersNavbar
        usersCount={users.items.length}
        totalUsersCount={users.total}
      />
      <div className="product-admin-items">
        {isLoading ? (
          <div className="loader">
            <h3>Loading Users...</h3>
          </div>
        ) : (
          <UsersTable users={users.items} />
        )}
      </div>
    </Boundary>
  );
};

export default Users; 