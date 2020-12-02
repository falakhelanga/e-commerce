import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { saveShipping } from "../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import CheckOutSteps from "../components/CheckOutSteps";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const shippingData = useSelector((state) => state.cartReducer.shippingData);

  const [adress, setAdress] = useState(shippingData.adress);
  const [city, setCity] = useState(shippingData.city);
  const [postalCode, setPostalCode] = useState(shippingData.postalCode);
  const [country, setCountry] = useState(shippingData.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({
        adress,
        city,
        postalCode,
        country,
      })
    );

    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler} noValidate>
        <FormGroup controlId="adress">
          <FormLabel> Adress</FormLabel>
          <FormControl
            type="text"
            placeholder="Please Enter Your Adress"
            value={adress}
            onChange={(e) => {
              setAdress(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Please Enter Your City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder="Please Enter Your Postal Code"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Please Confirm Your Country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
