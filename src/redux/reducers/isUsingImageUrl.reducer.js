const isUsingImageUrl = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_IS_USING_IMAGE_URL":
      return !state;

    default:
      return state;
  }
};

export default isUsingImageUrl;
