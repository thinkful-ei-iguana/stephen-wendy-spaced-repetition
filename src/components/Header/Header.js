import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <span className="user-name">{this.context.user.name}</span>
        <nav className="navigation">
          <Link
            onClick={this.handleLogoutClick}
            to="/login"
            className="logout"
          ></Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <nav className="navigation">
          <Link to="/login" className="user-links">
            Login
          </Link>
          {"             "}
          <Link to="/register" className="user-links">
            Sign up
          </Link>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}

        <h1 className="Header__App-title">
          <Link to="/" className="links">
            <span className="spaced">Spaced</span> repetition
          </Link>
        </h1>
      </>
    );
  }
}

export default Header;
