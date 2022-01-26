const initialState = {
  celeb: 3,
  type: 'IF',
  activeCollection: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COLLECTION_CELEB': return { ...state, celeb: action.payload };
    case 'UPDATE_COLLECTION_TYPE': return { ...state, type: action.payload };
    case 'UPDATE_ACTIVE_COLLECTION': return { ...state, activeCollection: action.payload };
    default: return state;
  }
}