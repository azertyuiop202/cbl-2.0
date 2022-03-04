const initialState = {
  bets: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BETS': return { ...state, bets: action.payload };
    default: return state;
  }
}