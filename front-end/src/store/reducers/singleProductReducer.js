import * as constants from "../actionsConstant/singleProductConstant";

const inititialState = {
  product: {},
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
      return { ...state, product: action.product, loading: false };

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
