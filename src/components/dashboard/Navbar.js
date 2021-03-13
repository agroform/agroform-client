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
            <a
              href="/dashboard"
              className="logoAgroform d-inline-block align-top"
              alt="agroform"
              style={{ paddingLeft: "50px" }}
            >
              <h2 style={{color: "white"}}>AGROFORM</h2>
            </a>
          </Nav.Item>
          <Nav.Item className="sidebarLinks">
          
         
            <Link
              className="IconContractor"
              style={{ paddingLeft: "50px",width:"100px", height:"100px", color: "white"}}
              to="/dashboard/profile"
              onClick={() => this.props.tabSelectHandler("profile")}
            > {this.props.user.username}
            </Link>

          </Nav.Item>
          {tabs.map((tab) => {
            return (
              <Link key={tab}>
                <Link
                  className="sidebarLinks"
                  style={{ paddingLeft: "50px",width:"100px", height:"100px"}}
                  to={`/dashboard/${tab}`}
                  onClick={() => this.props.tabSelectHandler(tab)}
                >
                  {tab}
                </Link>
                <ul>
                  {this.props.selectedTab === tab &&
                    this.props.subTabs[tab]?.map((ele, i) => {
                      return (
                        <p>
                        {(tab) === "fields" ? 
                        <Link className="IconSoilTillage" style={{paddingLeft: "50px", color: "#fff"}} key={tab + i} to={`/dashboard/${tab}/${ele}`}>
                          {tab} {i + 1}
                        </Link> :
                        (tab) === "quotes" ? 
                        <Link className="IconQuotes" style={{paddingLeft: "50px", color: "#fff"}} key={tab + i} to={`/dashboard/${tab}/${ele}`}>
                          {tab} {i + 1} 
                        </Link> :
                           <Link className="IconOffers" style={{paddingLeft: "50px", color: "#fff"}} key={tab + i} to={`/dashboard/${tab}/${ele}`}>
                          {tab} {i + 1} 
                        </Link>  }
                        </p>
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
