import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../store/actions/productActions";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Spiner from "../components/Spiner";
import Error from "../components/Error";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => {
    return state.productsReducer;
  });

  const { products, loading, error } = productsState;

  useEffect(() => {
    dispatch(productAction());
  }, [dispatch]);

  // let content = null;
  // if (loading) {
  //   content = <Spiner />;
  // }

  // if (Error) {
  //   content = <Error />;
  // }

  // if (product) {
  // }
  return (
    <>
      <h1 className="text-capitalize">latest product</h1>

      {loading ? (
        <Spiner />
      ) : error ? (
        <Error>{error}</Error>
      ) : products ? (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      ) : null}
    </>
  );
};

export default HomeScreen;
