const initialState = {
  'collectionFilters': { show: true, types: [] },
  'collectionSort': { field: 'number', order: 'asc' }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER': return { ...state, collectionFilters: action.payload };
    case 'UPDATE_SORT': return { ...state, collectionSort: action.payload };
    default: return state;
  }
}