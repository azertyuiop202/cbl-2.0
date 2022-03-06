const initialState = {
  bets: {},
  pack: {
    id: null,
    name: null,
    gc: null,
    boosters: null,
  },
  slotsDateRun: '',
  slotsRunID: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BETS': return { ...state, bets: action.payload };
    case 'RESET_PACK': return { ...state, pack: initialState.pack };
    case 'UPDATE_PACK': return { ...state, pack: { ...state.pack, ...action.payload } };
    case 'UPDATE_SLOTS_DATE_RUN': return { ...state, slotsDateRun: action.payload };
    case 'UPDATE_SLOTS_RUN_ID': return { ...state, slotsRunID: action.payload };
    default: return state;
  }
}