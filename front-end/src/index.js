import React from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
// import thunk from "redux-thunk";
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import productsReducer from "./store/reducers/productReducers";
// import singleProductReducer from "./store/reducers/singleProductReducer";

// const reducers = combineReducers({
//   productsReducer: productsReducer,
//   singleProductReducer: singleProductReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
