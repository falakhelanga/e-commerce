import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Button, Image, Card } from "react-bootstrap";
import CheckOutSteps from "../components/CheckOutSteps";
import * as ordersDispatch from "../store/actions/createOrderActions";
import Error from "../components/Error";
const OrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const createOrder = useSelector((state) => state.createOrderReducer);
  const { error, success, orders } = createOrder;
  const { cartItems, shippingData } = cart;

  cart.Items = cartItems
    .reduce((acc, cur) => acc + Number(cur.price * cur.qty), 0)
    .toFixed(2);

  cart.Shipping = cart.Items >= 400 ? Number(0) : Number(100);

  cart.tax = Number(0.15 * cart.Items).toFixed(2);
  cart.Total = (
    Number(cart.tax) +
    Number(cart.Shipping) +
    Number(cart.Items)
  ).toFixed(2);

  const data = {
    orderItems: cartItems,
    shippingAdress: shippingData,
    //  shippingAdress: {
    //    adress: shippingData.adress,
    //    city: shippingData.city,
    //    postalCode: shippingData.postalCode,
    //    country: shippingData.country,
    //  } ,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.Items,
    taxPrice: cart.tax,
    shippingPrice: cart.Shipping,
    totalPrice: cart.Total,
  };
  const createOrderHandler = () => {
    dispatch(ordersDispatch.createOrderAction(data));
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${orders._id}`);
    }

    // eslint-disable-next-line
  }, [success, history]);
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>{`Adress ${shippingData.adress} ${shippingData.city} ${shippingData.postalCode} ${shippingData.country}`}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              method: {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col>
                          {`${item.qty} x ${item.price} = $${(
                            Number(item.price) * Number(item.qty)
                          ).toFixed(2)} `}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>ORDER SUMMERY</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.Items}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.Shipping}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.tax}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.Total}</Col>
                </Row>
              </ListGroup.Item>
              {error && <Error variant="danger">{error}</Error>}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  variant="primary"
                  onClick={() => {
                    createOrderHandler();
                  }}
                >
                  Place The Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
