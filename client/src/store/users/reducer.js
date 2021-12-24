import getUser from '../../utils/getUser';

const initialState = {
  'isLoggedIn': !!getUser()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': return { ...state, isLoggedIn: true };
    case 'LOGOUT': return { ...state, isLoggedIn: false };
    default: return state;
  }
}