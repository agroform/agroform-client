import React, { Component } from "react";
import { authService } from "./auth-service";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default class Register extends Component {
  state = {
    userType: "Farmer",
    username: "",
    email: "",
    password: "",
    isLoggedIn: false,
    error: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { userType, username, email, password } = this.state;

    authService
      .register(username, email, password, userType)
      .then((user) => {
        this.setState({
          username: "",
          email: "",
          userType: "Farmer",
          password: "",
          isLoggedIn: true,
        });
        this.props.onLogin(user);
      })
      .catch((error) => this.setState({ error: error.response.data }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <Navbar bg="dark">
          <Navbar.Brand href="/" className="navbar-brand">
            <div
              className="logoAgroform d-inline-block align-top"
              alt="agroform"
            ></div>
          </Navbar.Brand>
          {this.props.userInSession ? (
            <Nav.Link href="/dashboard">My dashboard</Nav.Link>
          ) : null}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <Nav className="mr-auto">
            {this.props.userInSession ? (
              <Button
                className="m-1"
                onClick={this.logoutUser}
                variant="outline-warning"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button className="m-1" variant="outline-primary" href="/login">
                  Login
                </Button>
                <Button className="m-1" href="/register">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar>

        {this.state.error ? (
          <Alert variant="danger" onUpdate={window.scrollTo(0, 0)}>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{this.state.error.message}</p>
          </Alert>
        ) : null}

        <Container
          style={{ marginTop: "10%" }}
          className="container h-100 d-flex justify-content-center"
        >
          <Row>
            <Col md={{ span: 6 }}>
              <Card
                style={{ width: "24rem" }}
                className="bg-dark text-white registerImage"
              >
                <Card.Header
                  style={{ backgroundColor: "#fff", height: "9rem" }}
                >
                  <div className="logoAgroformMedium"></div>
                </Card.Header>
                <Container className="m-2">
                  <Card.Title className="mt-5">
                    {" "}
                    <h2>Welcome to Agroform</h2>
                  </Card.Title>
                  <Card.Text>
                    <div className="m-2">
                      <div>
                        {this.state.isLoggedIn && (
                          <p>
                            YAY! You have been registered as a member of
                            agroform!
                          </p>
                        )}
                        <Form onSubmit={this.handleFormSubmit}>
                          <p>Register as</p>
                          <Row>
                            <Col>
                              <div className="radio-toolbar radio-toolbar1">
                                <Form.Control
                                  className="logoFarmer"
                                  type="radio"
                                  id="userTypeFarmer"
                                  name="userType"
                                  value="Farmer"
                                  checked={this.state.userType === "Farmer"}
                                  onChange={(e) => this.handleChange(e)}
                                  defaultChecked
                                />
                                <label
                                  style={{
                                    color: "#0C0704",
                                    textAlign: "center",
                                  }}
                                  htmlFor="userTypeFarmer"
                                >
                                  Farmer
                                </label>
                              </div>
                            </Col>
                            <Col>
                              <div className="radio-toolbar radio-toolbar2">
                                <Form.Control
                                  className="logoContractor"
                                  type="radio"
                                  id="userTypeContractor"
                                  name="userType"
                                  value="Contractor"
                                  checked={this.state.userType === "Contractor"}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                <label
                                  style={{
                                    color: "#0C0704",
                                    textAlign: "center",
                                  }}
                                  htmlFor="userTypeContractor"
                                >
                                  Contractor
                                </label>
                              </div>
                            </Col>
                          </Row>

                          <p>Username</p>
                          <Form.Control
                            size="lg"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={(e) => this.handleChange(e)}
                            className=" mb-2"
                          />

                          <p>Email</p>
                          <Form.Control
                            size="lg"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.handleChange(e)}
                            className="mb-2"
                          />

                          <p>Password</p>
                          <Form.Control
                            size="lg"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={(e) => this.handleChange(e)}
                            className=" mb-2"
                          />

                          <Button
                            type="submit"
                            size="lg"
                            variant="primary"
                            block
                            className="mt-5 mb-2"
                          >
                            Register
                          </Button>
                        </Form>

                        <div className="mt-5 mb-2">
                          <p>Already have account?</p>
                          <Button
                            href="/login"
                            size="lg"
                            type="submit"
                            variant="outline-light"
                            block
                          >
                            Go to Login
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card.Text>
                </Container>
              </Card>
            </Col>
          </Row>
        </Container>
        <Link className="container h-100 d-flex justify-content-center" to="/">
          Back to Homepage
        </Link>
      </>
    );
  }
}
