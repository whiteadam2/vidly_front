import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  getAuthItems() {
    if (!this.props.user) return this.props.data.items;

    const authItems = this.props.data.items.filter(
      (item) => item.path !== "/login" && item.path !== "/register"
    );

    authItems.push(
      { path: "/me", text: this.props.user.name },
      { path: "/logout", text: "Logout" }
    );

    return authItems;
  }

  render() {
    const items = this.getAuthItems();

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {this.props.data.title}
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {items.map((item) => (
              <li key={item.text} className="nav-item">
                <Link className="nav-link" to={item.path}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
