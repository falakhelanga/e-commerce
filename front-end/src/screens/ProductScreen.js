import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import singleProductAction from "../store/actions/singleProductAction";
import Spiner from "../components/Spiner";
import Error from "../components/Error";

import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
} from "react-bootstrap";
import Ratings from "../components/Ratings";

const ProductScreen = ({ match, history }) => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productState = useSelector((state) => {
    return state.singleProductReducer;
  });

  const { product, loading, error } = productState;

  useEffect(() => {
    dispatch(singleProductAction(id));
  }, [dispatch, id]);

  const addToCart = (e) => {
    e.preventDefault();
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Spiner />
      ) : error ? (
        <Error>{error}</Error>
      ) : product ? (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md="6">
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md="3">
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md="3">
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      block
                      disabled={product.countInStock === 0}
                      onClick={(e) => {
                        addToCart(e);
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroupItem>

                  {product.countInStock !== 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            value={qty}
                            as="select"
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default ProductScreen;
