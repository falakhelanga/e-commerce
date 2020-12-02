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

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginReducer);

  const { error, loading, userInfo } = userState;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userDispatch.loginActions(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Spiner />}
      {error && <Error variant="danger">{error}</Error>}
      <Form onSubmit={submitHandler} noValidate>
        <FormGroup controlId="email">
          <FormLabel>Email Adress</FormLabel>
          <FormControl
            type="email"
            placeholder="Please Enter Your Name"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?=${redirect} ` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
