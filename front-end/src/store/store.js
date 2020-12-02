import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./reducers/cartReducers";
import productsReducer from "./reducers/productReducers";
import singleProductReducer from "./reducers/singleProductReducer";
import {
  createOrderReducer,
  getOrderReducer,
  payOrderReducer,
  getMyOrderReducer,
} from "./reducers/createOrderReducers";

import {
  deleteUser,
  loginReducer,
  registerReducer,
  profileReducer,
  getUserList,
} from "./reducers/usersReducer";

const reducers = combineReducers({
  productsReducer,
  singleProductReducer,
  cartReducer,
  loginReducer,
  registerReducer,
  profileReducer,
  createOrderReducer,
  getOrderReducer,
  payOrderReducer,
  getMyOrderReducer,
  getUserList,
  deleteUser,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const shippingDataFromLocalStorage = localStorage.getItem("shippingData")
  ? JSON.parse(localStorage.getItem("shippingData"))
  : {};

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromLocalStorage,
    shippingData: shippingDataFromLocalStorage,
  },

  loginReducer: {
    userInfo: userFromLocalStorage,
  },
};

const middleWares = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
