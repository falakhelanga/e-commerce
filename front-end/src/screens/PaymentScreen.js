import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { savePayment } from "../store/actions/cartActions";

const PaymentScreen = ({ history }) => {
  const shipping = useSelector((state) => state.cartReducer.shippingData);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  if (!shipping) {
    history.push("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />

      <h1 className="text-transform-capitalize">payment method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Pay Pal or Credit Card"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
