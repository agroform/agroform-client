import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      type: "",
      username: "",
      email: "",
      password: "",
      firstName:"",
      lastName: "",
      country: "",
      city: "",
      street: "",
      userImg: "",
      logo: "",
    };
  }

  componentDidMount() {
      console.log(this.state.userImg)
    axios
      .get(`http://localhost:5000/api/loggedin`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        console.log("API resposne", responseFromApi)
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
            logo: logo
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
        `http://localhost:5000/api/profile`,
        { username, email, password, firstName, lastName, country, city, street, userImg, logo,},
        { withCredentials: true },
      )
      
      .then( (user) => {
        this.setState({
            username: username,
            email: "",
            userType: 'Farmer',
            password: password,
            isLoggedIn: true,})
      }, error => {
          console.log(error)
      })
  };
  
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
          <div>
            {this.state.type === "Contractor" ? (
              <div>
                    <strong>Company name</strong>
                    <p>{this.state.username}</p>
                    <label>Change Company Name</label>
                    <form onSubmit={this.handleFormSubmit}>
                    <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={(e) => this.handleChange(e)}
                    />
                    </form>
              </div>
            ) : (
              <div>
                <strong>Farm name</strong>
                <p>{this.state.username}</p>
                <form onSubmit={this.handleFormSubmit}>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleChange(e)}
                />    <Button variant="info">
          Show Custom Styled Alert
        </Button>
                <input type="submit" value="Save changes" />
                </form>
              </div>
            )}
            <div>
                <strong>Password</strong>
                <form onSubmit={this.handleFormSubmit}>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />
                <input type="submit" value="Save changes" />
                </form>
              </div>

           
          </div>
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
