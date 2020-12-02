import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
} from "react-bootstrap";
import Spiner from "../components/Spiner";
import Error from "../components/Error";
// import * as userActions from "../store/actions/userActions";
import * as userDispatch from "../store/actions/profileActions";
import * as constants from "../store/actionsConstant/userContants";

const UserEditScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.profileReducer);

  const { error, loading, userInfo, updateMessage } = userState;

  useEffect(() => {
    if (updateMessage) {
      setTimeout(() => {
        dispatch({
          type: constants.PROFILE_RESET,
        });
      }, 5000);
    }
    console.log(id);
    if (!userInfo.name || userInfo._id !== id) {
      dispatch(userDispatch.getProfileActions(id));
    } else {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setIsAdmin(userInfo.isAdmin);
    }

    // const reseting = () => {
    //   setEmail("");
    //   setName("");
    //   setIsAdmin(false);
    // };

    // return reseting();
  }, [dispatch, userInfo, id, updateMessage]);

  const data = {
    email,
    name,
    isAdmin,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userDispatch.updateProfileActions(data, id));
  };

  const goBackHandler = () => {
    history.goBack();
  };
  return (
    <FormContainer>
      <h1>Edit user</h1>
      <Button
        className="my-3"
        type="button"
        variant="dark"
        onClick={() => {
          goBackHandler();
        }}
      >
        Go back
      </Button>
      {updateMessage && <Error>the user is successfully updated</Error>}
      {loading && <Spiner />}

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

        <FormGroup controlId="admin">
          <FormCheck
            label=" is admin"
            checked={isAdmin}
            onChange={(e) => {
              setIsAdmin(e.target.checked);
            }}
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserEditScreen;
