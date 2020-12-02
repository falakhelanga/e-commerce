import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as cartDispach from "../store/actions/cartActions";
import Error from "../components/Error";
// import * as constants from "../store/actionsConstant/cartConstants";

import {
  Row,
  Col,
  Button,
  ListGroupItem,
  ListGroup,
  Card,
  Image,
  FormControl,
} from "react-bootstrap";

const CartScreen = ({ history }) => {
  const { id } = useParams();
  const { search } = useLocation();

  const dispatch = useDispatch();
  const qty = search ? Number(search.split("=")[1]) : 1;

  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const removeItemHandler = (id) => {
    dispatch(cartDispach.removeCartItem(id));
  };

  const checkOutHandler = () => {
    history.push("/login/?redirect=/shipping");
  };
  useEffect(() => {
    if (id) {
      dispatch(cartDispach.addCartItem(id, qty));
    }
  }, [dispatch, qty, id]);

  return (
    <>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Error>
          <h1>
            No Items In Your Cart <Link to="/">Go Back</Link>
          </h1>{" "}
        </Error>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Row>
                        <FormControl
                          value={item.qty}
                          as="select"
                          onChange={(e) => {
                            dispatch(
                              cartDispach.addCartItem(
                                item.product,
                                e.target.value
                              )
                            );
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </FormControl>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          removeItemHandler(item.product);
                        }}
                      >
                        <i className="fas fa-trash    "></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>
                    SUBTOTAL{" "}
                    {`(${cartItems.reduce((acc, cur) => {
                      return acc + Number(cur.qty);
                    }, 0)})`}{" "}
                    ITEMS
                  </h2>
                </ListGroupItem>
                <ListGroupItem>
                  $
                  {cartItems
                    .reduce((acc, curr) => {
                      return acc + curr.price * curr.qty;
                    }, 0)
                    .toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    onClick={() => {
                      checkOutHandler();
                    }}
                    type="button"
                    className="btn-block"
                  >
                    Proceed To Check Out
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
