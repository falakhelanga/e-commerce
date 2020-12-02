import axios from "axios";

import * as constants from "../actionsConstant/userContants";

export const getProfileActions = (id) => async (dispach, getState) => {
  dispach({
    type: constants.PROFILE_INIT,
  });

  const token = getState().loginReducer.userInfo.token;
  try {
    const config = {
      headers: {
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.get(
      ` http://localhost:8080/api/users/${id}`,

      config
    );

    console.log(data);
    dispach({
      type: constants.PROFILE_SUCCESS,
      userInfo: data,
    });
  } catch (error) {
    dispach({
      type: constants.PROFILE_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfileActions = (user, profile) => async (
  dispach,
  getState
) => {
  dispach({
    type: constants.PROFILE_UPDATE_INIT,
  });

  const token = getState().loginReducer.userInfo.token;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.put(
      ` http://localhost:8080/api/users/${profile}`,
      user,
      config
    );

    console.log(data);
    dispach({
      type: constants.PROFILE_UPDATE_SUCCESS,
      userInfo: data,
    });
  } catch (error) {
    dispach({
      type: constants.PROFILE_UPDATE_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
