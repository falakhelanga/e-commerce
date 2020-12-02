import * as constants from "../actionsConstant/singleProductConstant";
import axios from "axios";

const productAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: constants.PRODUCT_INIT,
      });
      const { data } = await axios.get(
        `http://localhost:8080/api/product/${id}`
      );

      dispatch({
        type: constants.PRODUCT_SUCCESS,
        product: data,
      });
    } catch (error) {
      dispatch({
        type: constants.PRODUCT_FAIL,
        error: error.response.data.message,
      });
    }
  };
};

export default productAction;
