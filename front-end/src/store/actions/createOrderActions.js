import * as constants from "../actionsConstant/createOrderContants";
import axios from "axios";

export const createOrderAction = (data) => async (dispatch, getState) => {
  dispatch({ type: constants.CREATE_ORDER_INIT });

  try {
    const token = getState().loginReducer.userInfo.token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    const orders = await axios.post(
      "http://localhost:8080/api/orders/",
      data,
      config
    );

    dispatch({
      type: constants.CREATE_ORDER_SUCCESS,
      payload: orders.data,
    });
  } catch (error) {
    dispatch({
      type: constants.CREATE_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderAction = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.GET_ORDER_INIT });

  try {
    const token = getState().loginReducer.userInfo.token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/orders/${id}`,
      config
    );

    dispatch({
      type: constants.GET_ORDER_SUCCESS,
      order: data,
      items: data.orderItems,
      adress: data.shippingAdress,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrderAction = (id, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: constants.PAY_ORDER_INIT });

  try {
    const token = getState().loginReducer.userInfo.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: constants.PAY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.PAY_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrderAction = () => async (dispatch, getState) => {
  dispatch({ type: constants.GET_MY_ORDER_INIT });

  try {
    const token = getState().loginReducer.userInfo.token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/orders/myorders`,
      config
    );

    dispatch({
      type: constants.GET_MY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_MY_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
