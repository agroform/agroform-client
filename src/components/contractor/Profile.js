import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ' ',
      type: ' ',
      username: ' ',
      email: '',
      password: ' ',
      firstName:' ',
      lastName: ' ',
      country: ' ',
      city: ' ',
      street: ' ',
      userImg: ' ',
      logo: ' ',
      display1: 'none',
      display2: '',
    };
  }




  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/loggedin`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        const { username, email, password, firstName, lastName, country, city, street, userImg, logo,} = responseFromApi.data;
        this.setState({
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            country: country,
            city: city,
            street: street,
            userImg: userImg,
            logo: logo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFormSubmit = (event) => {

    event.preventDefault();

    const { username, email, password, firstName, lastName, country, city, street, userImg, logo,} = this.state;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/profile`,
        { username, email, password, firstName, lastName, country, city, street, userImg, logo,},
        { withCredentials: true },
      )

      .then( (user) => {
        this.setState({
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            country: country,
            city: city,
            street: street,
            userImg: userImg,
            logo: logo,
            userType: 'Farmer',
            isLoggedIn: true,})
      }, error => {
          console.log(error)
      })
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleDisplay = () => {
    this.setState({
      display1: "",
      display2: "none"
    })
  }
  handleClose = () => {
    this.setState({
      display1: "none",
      display2: ""
    })
  }


  render() {

    return (
      <Container fluid>
        <Row>
          <Col>
            <Button style={{display: `${this.state.display2}`}} onClick={this.handleDisplay}>Edit</Button>
            <Button style={{display: `${this.state.display1}`}} onClick={this.handleClose} type="submit" variant="secondary"> Close </Button>
              {this.state.type === "Contractor" ? (
                <div>
                  <strong>Company Name</strong>
                  <p style={{display: `${this.state.display2}`}}>{this.state.username}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="username" placeholder={this.state.username} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                  <br />
                  </div>
              ) : (
                <div>
                  <strong>Farm Name</strong>
                  <p style={{display: `${this.state.display2}`}}>{this.state.username}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="username" placeholder={this.state.username} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                  <br />
                </div>
                )}
                <div>
                  <strong>Email</strong>
                  <p style={{display: `${this.state.display2}`}}>{this.state.email}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="email" placeholder={this.state.email} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                  <br />
                </div>
                <div>
                  <strong>Password</strong>
                  <p style={{display: `${this.state.display2}`}}>**********</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="password" placeholder="*************" onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                    <br />
                    <hr />
                </div>
              <Row>
                <Col>
                <div>
                  <strong>First Name</strong>
                  <p style={{display: `${this.state.display2}`}}>{this.state.firstName}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="firstName" placeholder={this.state.firstName} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                    <br />
                </div>
                <div>
                    <strong>Street</strong>
                    <p style={{display: `${this.state.display2}`}}>{this.state.street}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="street" placeholder={this.state.street} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                    <br />
                </div>
                <div>
                    <strong>City</strong>
                    <p style={{display: `${this.state.display2}`}}>{this.state.city}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="city" placeholder={this.state.city} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                    <br />
                </div>
                </Col>
                <Col>
                <div>
                    <strong>Last Name</strong>
                    <p style={{display: `${this.state.display2}`}}>{this.state.lastName}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="lastName" placeholder={this.state.lastName} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                    <br />
                </div>
                <div>
                    <strong>Country</strong>
                    <p style={{display: `${this.state.display2}`}}>{this.state.country}</p>
                  <Form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display1}`}}>
                    <Form.Row>
                    <Col>
                      <Form.Control type="text" name="country" placeholder={this.state.country} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col>
                      <Button onClick={this.handleClose} type="submit" variant="link" size="lg"> <span>💾</span> </Button>
                    </Col>
                    </Form.Row>
                  </Form>
                    <br />
                </div>
                </Col>
              </Row>
          </Col>
          <Col>
            <Image width="150px" src={this.state.userImg} roundedCircle />
            <Link to={"/"}>Back to dashboard</Link>
          </Col>

        </Row>
      </Container>
    );
  }
}

export default Profile;
