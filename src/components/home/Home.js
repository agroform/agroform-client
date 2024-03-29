import React, { Component } from "react";
import { authService } from "../auth/auth-service";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import CardColumns from "react-bootstrap/CardColumns";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listContractors: [],
    };
  }

  fetchcontractorList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/contractorlist`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          listContractors: [...responseFromApi.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  logoutUser = () => {
    authService.logout().then(() => {
      this.props.onLogout();
    });
  };

  componentDidMount() {
    this.fetchcontractorList();
  }

  render() {
    const currentYear = (new Date()).getFullYear();

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

        <Container fluid className="pictureMain">
          <Carousel>
            <Carousel.Item interval={10000} className="containerCarousel">
              <Carousel.Caption>
                <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <div className="firstItemImg" alt="compareContractor"></div>
                    <br />
                  </Col>
                </Row>
                <Row className="overlay">
                  <div className="borderFill"></div>

                  <Col className="text" md={{ span: 6, offset: 3 }}>
                    <h2 style={{ color: "#0C0704", paddingTop: "15px" }}>
                      WELCOME TO AGROFORM
                    </h2>
                    <p style={{ color: "#0C0704" }}>
                      The innovative platform for Farmers and contractors
                    </p>
                  </Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={10000} className="containerCarousel">
              <Carousel.Caption>
                <Row>
                  <Col md={{ span: 8, offset: 2 }}>
                    <div className="threeItemImg" alt="fields"></div>
                  </Col>
                </Row>
                <Row className="overlay">
                  <div className="borderFill"></div>
                    <Col className="text" md={{ span: 6, offset: 3 }}>
                      <h2 style={{ color: "#0C0704", paddingTop: "15px" }}>
                        You want to have an overview of all your fields?
                      </h2>
                      <p style={{ color: "#0C0704" }}>
                        Create an overview of all your fields and always see the
                        complete working history.
                      </p>
                    </Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={10000} className="containerCarousel">
              <Carousel.Caption>
                <Row>
                  <Col md={{ span: 3, offset: 4 }}>
                    <div
                      className="secondItemImg"
                      alt="compareContractor"
                    ></div>
                    <br />
                  </Col>
                </Row>
                <Row className="overlay">
                  <div className="borderFill"></div>
                    <Col className="text" md={{ span: 6, offset: 3 }}>
                      <h2 style={{ color: "#0C0704", paddingTop: "15px" }}>
                        Are you looking for the right contracting company?
                      </h2>
                      <p style={{ color: "#0C0704" }}>
                        Find the right partner for your agricultural service
                        quickly and easily with AGROFORM.
                      </p>
                    </Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>

        <Container>
          <h2 className="m-5">Contractors nearby:</h2>
          <CardColumns>
            {this.state.listContractors.map((contractor) => {
              return (
                <Card key={contractor.id} style={{ width: "18rem" }}>
                  <React.Fragment>
                     <img alt="contractorImg" src={contractor.userImg} />
                  </React.Fragment>
                  <Card.Body style={{backgroundColor: "#663925", color: "#fff"}}>
                    <Card.Title style={{textAlign:"center" }}><h3>{contractor.username}</h3></Card.Title>
                  </Card.Body>
                  <ListGroupItem>
                    <p>Location:</p>
                    <ul>
                      <li>{contractor.street}</li>
                      <li>{contractor.city}</li>
                      <li>{contractor.country}</li>
                    </ul>
                  </ListGroupItem>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <p>Services:</p>
                      {contractor.services.map((service) => {
                        return (
                          <p key={service.service}>
                            {service.icon} {service.service}
                          </p>
                        );
                      })}
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>Vehicles:</p>
                      {contractor.vehicules.map((vehicule) => {
                        return <p key={vehicule.vehicule}>{vehicule.vehicule}</p>;
                      })}
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
        <footer style={{paddingBottom: "0px", backgroundColor: "black", textAlign: "center", margin: "auto", color: '#489B34'}}>agroform &#169; {currentYear}</footer>
      </>
    );
  }
}
