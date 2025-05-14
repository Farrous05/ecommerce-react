import { ADD_USER, DELETE_USER, EDIT_USER, GET_USERS_SUCCESS } from '@/constants/constants';

// const initState = [
//   {
//     firstname: 'Gago',
//     lastname: 'Ka',
//     email: 'gagoka@mail.com',
//     password: 'gagooo',
//     avatar: '',
//     banner: '',
//     dateJoined: 0
//   }
// ];

const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    case GET_USERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: action.payload.users
      };
    default:
      return state;
  }
};
