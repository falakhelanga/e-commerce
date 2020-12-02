import * as constants from "../actionsConstant/cartConstants";

const initialState = {
  cartItems: [],
  shippingData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_TO_CART_INIT:
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      console.log(existingItem);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case constants.REMOVE_TO_CART:
      const product = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.filter((curr) => curr.product !== product),
      };

    case constants.SAVE_SHIPPING:
      return {
        ...state,
        shippingData: action.payload,
      };

    case constants.SAVE_PAYMENT:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
