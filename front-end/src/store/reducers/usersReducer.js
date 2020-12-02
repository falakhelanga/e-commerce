import * as constants from "../actionsConstant/userContants";

// const inititialState = {
//   userInfo: null,
//   loading: false,
//   error: null,
//   updateMessage: false,
// };

export const loginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case constants.LOGIN_INIT:
      return {
        ...state,

        loading: true,
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        loading: false,
        error: null,
      };

    case constants.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case constants.LOGOUT:
      return {
        ...state,
        userInfo: null,
      };

    default:
      return state;
  }
};

export const registerReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case constants.REGISTER_INIT:
      return {
        ...state,

        loading: true,
      };
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        loading: false,
        error: null,
      };

    case constants.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case constants.PROFILE_INIT:
      return {
        ...state,

        loading: true,
      };
    case constants.PROFILE_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        loading: false,
        error: null,
      };

    case constants.PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case constants.PROFILE_UPDATE_INIT:
      return {
        ...state,

        loading: true,
      };
    case constants.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        loading: false,
        error: null,
        updateMessage: true,
      };

    case constants.PROFILE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case constants.PROFILE_RESET:
      return { userInfo: {} };
    default:
      return state;
  }
};

export const getUserList = (state = { useList: [] }, action) => {
  switch (action.type) {
    case constants.USER_LIST_INIT:
      return {
        loading: true,
      };

    case constants.USER_LIST_SUCCESS:
      return {
        loading: false,
        userList: action.payload,
      };

    case constants.USER_LIST_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const deleteUser = (state = { success: false }, action) => {
  switch (action.type) {
    case constants.USER_DELETE_INIT:
      return {
        loading: true,
      };

    case constants.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case constants.USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
