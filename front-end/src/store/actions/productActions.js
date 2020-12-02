import * as constants from "../actionsConstant/productConstants";
import axios from "axios";

const productsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.PRODUCT_INIT,
    });
    const { data } = await axios.get("http://localhost:8080/api/products");

    dispatch({
      type: constants.PRODUCT_SUCCESS,
      products: data,
    });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};

export default productsAction;
