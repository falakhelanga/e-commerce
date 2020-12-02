import React, { useState, useEffect } from "react";
import * as ordersDespatch from "../store/actions/createOrderActions";
import { useSelector, useDispatch } from "react-redux";
import * as profileDespatch from "../store/actions/profileActions";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
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

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profileReducer);
  const userOrders = useSelector((state) => state.getMyOrderReducer);
  const userLoged = useSelector((state) => state.loginReducer);

  const { error, loading, userInfo, updateMessage } = user;
  const { error: userError, loading: userLoading, orders } = userOrders;

  useEffect(() => {
    if (userLoged.userInfo == null) {
      history.push("/login");
      return;
    }

    if (!userInfo.name) {
      dispatch(profileDespatch.getProfileActions("profile"));
      dispatch(ordersDespatch.getMyOrderAction());
    } else {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo, history, dispatch, userLoged.userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("this passwords does not match");
      return;
    }
    dispatch(
      profileDespatch.updateProfileActions(
        {
          name,
          email,
          password,
        },
        "profile"
      )
    );
  };
  return (
    <Row>
      <Col md={3}>
        <h1>Profile</h1>
        {loading && <Spiner />}
        {message && <Error variant="danger">{message}</Error>}
        {error && <Error variant="danger">{error}</Error>}
        {updateMessage && <Error>Profile Updated Succefully</Error>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>Orders</h1>
        {userLoading ? (
          <Spiner />
        ) : userError ? (
          <Error variant="danger">{userError}</Error>
        ) : orders ? (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 11)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 11)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{
                          color: "red",
                        }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDeliverd ? (
                      order.delieveredAt.substring(0, 11)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{
                          color: "red",
                        }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
