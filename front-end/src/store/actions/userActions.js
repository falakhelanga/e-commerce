import axios from "axios";

import * as constants from "../actionsConstant/userContants";
import * as constantsOrder from "../actionsConstant/createOrderContants";

export const loginActions = (email, password) => async (dispach) => {
  dispach({
    type: constants.LOGIN_INIT,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/users/login",
      { email, password },
      config
    );

    dispach({
      type: constants.LOGIN_SUCCESS,
      userInfo: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispach({
      type: constants.LOGIN_FAIL,
      // error: error.response.data.message,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOutAction = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: constants.LOGOUT,
  });
  dispatch({
    type: constants.PROFILE_RESET,
  });
  dispatch({
    type: constantsOrder.GET_MY_ORDER_RESET,
  });
};

export const registerActions = (name, email, password) => async (dispach) => {
  dispach({
    type: constants.REGISTER_INIT,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/users/",
      { email, password, name },
      config
    );

    dispach({
      type: constants.REGISTER_SUCCESS,
      userInfo: data,
    });

    dispach({
      type: constants.LOGIN_SUCCESS,
      userInfo: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispach({
      type: constants.REGISTER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userListActions = () => async (dispatch, getState) => {
  dispatch({ type: constants.USER_LIST_INIT });

  try {
    const token = getState().loginReducer.userInfo.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:8080/api/users/",

      config
    );

    dispatch({
      type: constants.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUserActions = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.USER_DELETE_INIT });

  try {
    const token = getState().loginReducer.userInfo.token;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    await axios.delete(
      `http://localhost:8080/api/users/${id}`,

      config
    );

    dispatch({
      type: constants.USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.USER_DELETE_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
