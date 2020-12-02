import * as constants from "../actionsConstant/createOrderContants";

export const createOrderReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case constants.CREATE_ORDER_INIT:
      return {
        loading: true,
      };

    case constants.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        success: true,
      };

    case constants.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOrderReducer = (
  state = { loading: true, ordersItems: [], order: null, shippingAdress: {} },
  action
) => {
  switch (action.type) {
    case constants.GET_ORDER_INIT:
      return {
        ...state,
        loading: true,
      };

    case constants.GET_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.order,
        items: action.items,
        adress: action.adress,
      };

    case constants.GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.PAY_ORDER_INIT:
      return {
        loading: true,
      };

    case constants.PAY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case constants.PAY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case constants.PAY_ORDER_RESET:
      return {
        state: {},
      };

    default:
      return state;
  }
};

export const getMyOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case constants.GET_MY_ORDER_INIT:
      return {
        ...state,
        loading: true,
      };

    case constants.GET_MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case constants.GET_MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case constants.GET_MY_ORDER_RESET: {
      return { orders: [] };
    }

    default:
      return state;
  }
};
