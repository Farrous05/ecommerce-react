import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER,
  GET_USERS,
  GET_USERS_SUCCESS,
  REGISTER_USER
} from '@/constants/constants';

// insert in profile array
export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user
});

export const getUser = (uid) => ({
  type: GET_USER,
  payload: uid
});

export const getUsers = () => ({
  type: GET_USERS
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

// different from registerUser -- only inserted in admins' users array not in profile array
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const editUser = (id, updates) => ({
  type: EDIT_USER,
  payload: {
    id,
    updates
  }
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id
});
