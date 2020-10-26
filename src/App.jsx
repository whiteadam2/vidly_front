import { ToastContainer } from "react-toastify";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Navbar from "./components/navbar";
import NotFound from "./components/common/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovieForm from "./components/newMovieForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/common/logout";
import auth from "./services/authService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = { user: auth.getCurrentUser() };

  topNavbar = {
    title: "Vidly",
    items: [
      { path: "/movies", text: "Movies" },
      { path: "/customers", text: "Customers" },
      { path: "/rentals", text: "Rentals" },
      { path: "/login", text: "Login" },
      { path: "/register", text: "Register" },
    ],
  };

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <ToastContainer />
        <Navbar data={this.topNavbar} user={user} />
        <Switch>
          <ProtectedRoute path="/movies/:id" component={NewMovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />

          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />

          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />

          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
