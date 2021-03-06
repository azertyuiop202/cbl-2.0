const initialState = {
  collectionFilters: { show: true, types: [] },
  collectionSort: { field: 'number', order: 'asc' },
  heatmapSort: { field: 'number', order: 'asc' },
  search: { celeb: 1, type: 'Base', make: 1 }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER': return { ...state, collectionFilters: action.payload };
    case 'UPDATE_SORT': return { ...state, collectionSort: action.payload };
    case 'UPDATE_SORT_HEATMAP': return { ...state, heatmapSort: action.payload };
    case 'UPDATE_SEARCH': return { ...state, search: { ...state.search, ...action.payload } };
    default: return state;
  }
}