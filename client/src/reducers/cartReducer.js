let temp = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    temp = JSON.parse(localStorage.getItem("cart"));
  } else {
    temp = [];
  }
}

export const cartReducer = (state = temp, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
