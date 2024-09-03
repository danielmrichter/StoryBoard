const projectItemsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PROJECT_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export default projectItemsReducer