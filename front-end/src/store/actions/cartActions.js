import * as constants from "../actionsConstant/cartConstants";
import axios from "axios";

export const addCartItem = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);

  dispatch({
    type: constants.ADD_TO_CART_INIT,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch({
    type: constants.REMOVE_TO_CART,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const saveShipping = (data) => (dispatch) => {
  dispatch({
    type: constants.SAVE_SHIPPING,
    payload: data,
  });

  localStorage.setItem("shippingData", JSON.stringify(data));
};

export const savePayment = (data) => (dispatch) => {
  dispatch({
    type: constants.SAVE_PAYMENT,
    payload: data,
  });

  localStorage.setItem("payment", JSON.stringify(data));
};
