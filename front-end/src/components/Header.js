import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as userActions from "../store/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginReducer);

  const logOut = () => {
    dispatch(userActions.logOutAction());
  };

  const { userInfo } = loginInfo;
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <i className="fa fa-user" aria-hidden="true"></i> Sign In
                </Nav.Link>
              )}
            </LinkContainer>
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userList">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productList">
                  <NavDropdown.Item>Product</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/ordersList">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
