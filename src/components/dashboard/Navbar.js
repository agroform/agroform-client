import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../auth/auth-service";

import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
// import Row from 'react-bootstrap/Row';

export default class Navbar extends Component {
  logoutUser = () => {
    authService.logout().then(() => {
      this.props.onLogout();
    });
  };

  render() {
    const userType = this.props.user.__t;
    let tabs = [];

    switch (userType) {
      case "Farmer":
        tabs = ["fields", "quotes"];
        break;
      case "Contractor":
        tabs = ["quotes", "offers", "vehicules", "services"];
        break;
    }

    return (
      <>
        <Nav
          className="col-md-12 d-none d-md-block bg-dark sidebar h-100"
          style={{ padding: "20px",}}
        >
          <div className="sidebar-sticky" style={{ position: "fixed", top: "20px" }}>
          <Nav.Item>
            <span
              to="/"
              className="logoAgroform d-inline-block align-top"
              alt="agroform"
              style={{ paddingLeft: "50px" }}
            >
              <h2>AGROFORM</h2>
            </span>
          </Nav.Item>
          <Nav.Item className="sidebarLinks">
            <Link
              to="/dashboard/profile"
              onClick={() => this.props.tabSelectHandler("profile")}
            >
              {this.props.user.username}
            </Link>
          </Nav.Item>
          {tabs.map((tab) => {
            return (
              <Link key={tab}>
                <Link
                  className="sidebarLinks"
                  to={`/dashboard/${tab}`}
                  onClick={() => this.props.tabSelectHandler(tab)}
                >
                  {tab}
                </Link>
                <ul>
                  {this.props.selectedTab === tab &&
                    this.props.subTabs[tab]?.map((ele, i) => {
                      return (
                        <Link key={tab + i} to={`/dashboard/${tab}/${ele}`}>
                          {tab} {i + 1}
                        </Link>
                      );
                    })}
                </ul>
              </Link>
            );
          })}
          <Nav.Item>
            <Button onClick={this.logoutUser} variant="light">
              Logout
            </Button>
          </Nav.Item>
          <Nav.Item fixed="bottom"> </Nav.Item>
          <footer style={{ position: "fixed", bottom: "10px" }}>
            <a href="/">agroform</a> &#169; 2021
          </footer>
        </div>
        </Nav>
      </>
    );
  }
}
