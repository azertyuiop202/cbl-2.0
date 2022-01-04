import getUser from '../../utils/getUser';

const initialState = {
  day: new Date().toLocaleDateString('en-US', { weekday: 'long'} )
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TRIVIA_DAY': return { ...state, day: action.payload };
    default: return state;
  }
}