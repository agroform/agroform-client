import React, { Component } from "react";
import { authService } from "./auth-service";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    authService
      .login(email, password)
      .then((user) => {
        this.setState({
          email: "",
          password: "",
          isLogged: true,
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
                className="bg-dark text-white loginImage"
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
                      <Form
                        style={{ brackgroundColor: "transparent" }}
                        onSubmit={this.handleFormSubmit}
                      >
                        <h2>
                          <strong>Email</strong>
                        </h2>
                        <Form.Control
                          size="lg"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <h2>
                          <strong>Password</strong>
                        </h2>
                        <Form.Control
                          size="lg"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <Button
                          size="lg"
                          type="submit"
                          variant="primary"
                          block
                          className="mt-5"
                        >
                          Login
                        </Button>
                      </Form>
                      <div className="mt-5">
                        <h2>
                          <strong>Don't have account?</strong>
                        </h2>
                        <Button
                          href="/register"
                          size="lg"
                          type="submit"
                          variant="outline-light"
                          block
                          className="mt-5"
                        >
                          Create Account
                        </Button>
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

export default Login;
