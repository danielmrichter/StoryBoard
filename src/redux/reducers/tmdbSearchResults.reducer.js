const tmdbSearchResultsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TMDB_SEARCH_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export default tmdbSearchResultsReducer;
