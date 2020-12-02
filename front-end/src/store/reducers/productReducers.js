import * as constants from "../actionsConstant/productConstants";

const inititialState = {
  products: [],
  loading: false,
  error: "",
};

const reducer = (state = inititialState, action) => {
  switch (action.type) {
    case constants.PRODUCT_INIT:
      return {
        ...state,

        loading: true,
      };
    case constants.PRODUCT_SUCCESS:
      return { ...state, products: action.products, loading: false };

    case constants.PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
