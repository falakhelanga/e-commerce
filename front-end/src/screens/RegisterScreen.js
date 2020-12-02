import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import {
  Form,
  Button,
  Col,
  Row,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import Spiner from "../components/Spiner";
import Error from "../components/Error";
// import * as userActions from "../store/actions/userActions";
import * as userDispatch from "../store/actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.registerReducer);

  const { error, loading, userInfo } = registerState;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("this passwords does not match");
      return;
    }
    dispatch(userDispatch.registerActions(name, email, password));
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Spiner />}
      {message && <Error variant="danger">{message}</Error>}
      {error && <Error variant="danger">{error}</Error>}
      <Form onSubmit={submitHandler} noValidate>
        <FormGroup controlId="email">
          <FormLabel>Email Adress</FormLabel>
          <FormControl
            type="email"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Please Enter Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Please Enter Your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="confirm-password">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Please Confirm Your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account ?{" "}
          <Link to={redirect ? `/login?=${redirect} ` : "/login"}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
