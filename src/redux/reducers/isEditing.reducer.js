const isEditingReducer = (state = false, action) => {
    switch (action.type) {
      case "SET_IS_EDITING":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default isEditingReducer