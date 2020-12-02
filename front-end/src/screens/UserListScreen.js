import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as userDispatch from "../store/actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Spiner from "../components/Spiner";
import Error from "../components/Error";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.getUserList);
  const loginState = useSelector((state) => state.loginReducer);
  const deleteState = useSelector((state) => state.deleteUser);

  const { loading, error, userList } = usersState;
  const { userInfo } = loginState;
  const { success: successDelete } = deleteState;

  const deleteHandler = (id) => {
    if (window.confirm("are you sure you want to delete this user?")) {
      dispatch(userDispatch.deleteUserActions(id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userDispatch.userListActions());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, successDelete, history]);

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Spiner />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : userList ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
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
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <i
                      className="fas fa-trash"
                      style={{
                        color: "red",
                      }}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

export default UserListScreen;
