export const searchReducer = (state = { text: "" }, action) => {
    switch (action.type) {
      case "SEARCH_QUERY":
        return { ...state, ...action.payload }; // spread cause may have more than one item in state
      default:
        return state;
    }
};

