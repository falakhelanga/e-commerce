import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import Cart from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Profile from "./screens/ProfileScreen";
import Shipping from "./screens/Shipping";
import Payment from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import SingleOrderScreen from "./screens/SingleOrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container className="my-3">
        <main>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/admin/userList" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/login/:id?" component={LoginScreen} />
            <Route path="/order/:id" component={SingleOrderScreen} />
            <Route path="/profile" component={Profile} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/placeorder" component={OrderScreen} />
            <Route path="/payment" component={Payment} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={Cart} />
          </Switch>
        </main>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
