import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import * as constants from "../store/actionsConstant/createOrderContants";
import axios from "axios";

import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import * as ordersDispatch from "../store/actions/createOrderActions";
import Error from "../components/Error";
import Spiner from "../components/Spiner";
const SingleOrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderr = useSelector((state) => state.getOrderReducer);
  const orderPay = useSelector((state) => state.payOrderReducer);
  const [sdkReady, setSdkReady] = useState(false);
  const { loading, error, order, adress, items } = orderr;

  const { loading: loadingPay, success: successPay } = orderPay;

  const { id } = useParams();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:8080/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch(ordersDispatch.getOrderAction(id));
      dispatch({ type: constants.PAY_ORDER_RESET });
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, dispatch, successPay, order]);

  const succepaymentHandler = (paymentResults) => {
    dispatch(ordersDispatch.payOrderAction(id, paymentResults));

    console.log(paymentResults);
  };

  return loading ? (
    <Spiner />
  ) : error ? (
    <Error>{error}</Error>
  ) : order ? (
    <Row>
      <Col md={8}>
        {/* <h1>order {order.id}</h1> */}
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>name:</strong> {order.user.name}
            </p>
            <p>
              <strong>email:</strong>{" "}
              <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
            </p>
            <p>{`Adress ${adress.adress} ${adress.city} ${adress.postalCode} ${adress.country}`}</p>

            {order.isDeliverd ? (
              <Error variant="success"> Delivered at {adress.adress}</Error>
            ) : (
              <Error variant="danger"> Not Delivered </Error>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>PAYMENT METHOD</h2>
            <p> method: {order.paymentMethod}</p>

            {order.isPaid ? (
              <Error variant="success">
                {" "}
                Paid At {new Date(order.paidAt).toDateString()}
              </Error>
            ) : (
              <Error variant="danger"> not paid</Error>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>ORDER ITEMS</h2>
            <ListGroup variant="flush">
              {items.map((item, index) => {
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
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Spiner />}
                {!sdkReady ? (
                  <Spiner />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={succepaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  ) : null;
};

export default SingleOrderScreen;
