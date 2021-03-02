import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ' ',
      type: ' ',
      username: ' ',
      email: ' ',
      password: ' ',
      firstName:' ',
      lastName: ' ',
      country: ' ',
      city: ' ',
      street: ' ',
      userImg: ' ',
      logo: ' ',
      display: 'none'
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
      display: ""
    })
  }
  handleClose = () => {
    this.setState({
      display: "none"
    })
  }
  
  
  render() {
    
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button onClick={this.handleDisplay}>Edit</Button>
            <Button style={{display: `${this.state.display}`}} onClick={this.handleClose} type="submit" variant="secondary"> Close </Button>
              {this.state.type === "Contractor" ? (
                <div>
                  <strong>Company Name</strong>
                  <p>{this.state.username}</p>
                  <button onClick={this.handleShow} class="link">
                    Change Company Name
                  </button>
                  <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                          <input type="text" name="username" defaultValue={this.state.email} onChange={(e) => this.handleChange(e)} />
                        </form>
              
                  <br />
                  </div>
              ) : (
                <div>
                  <strong>Farm Name</strong>
                  <p>{this.state.username}</p>
                  <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                    <input type="text" name="username" defaultValue={this.state.username} onChange={(e) => this.handleChange(e)} />
                    <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                  </form>
                  <br />
                </div>
                )}
                <div>     
                    <strong>Email</strong>
                    <p>{this.state.email}</p>

                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="text" name="email" defaultValue={this.state.email} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
                    <br />
                </div>
                <div>
                    <strong>Password</strong>
                      <p>**********</p>
                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="password" name="password" defaultValue={this.state.password} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
                    <br />
                    <hr />
                </div>
              <Row>
                <Col>
                <div>     
                    <strong>First Name</strong>
                    <p>{this.state.firstName}</p>
                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="text" name="firstName" defaultValue={this.state.firstName} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
                    <br />
                </div>
                <div>     
                    <strong>Street</strong>
                    <p>{this.state.street}</p>
                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="text" name="street" defaultValue={this.state.street} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
                    <br />
                </div>
                <div>     
                    <strong>City</strong>
                    <p>{this.state.city}</p>
                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="text" name="city" defaultValue={this.state.city} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
                    <br />
                </div>
                </Col>
                <Col>
                <div>     
                    <strong>Last Name</strong>
                    <p>{this.state.lastName}</p>
                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="text" name="lastName" defaultValue={this.state.lastName} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
                    <br />
                </div>
                <div>     
                    <strong>Country</strong>
                    <p>{this.state.country}</p>
                    <form onSubmit={this.handleFormSubmit} style={{display: `${this.state.display}`}}>
                      <input type="text" name="country" defaultValue={this.state.country} onChange={(e) => this.handleChange(e)} />
                      <Button onClick={this.handleClose} type="submit" variant="link"> <span>💾</span> </Button>
                    </form>
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
