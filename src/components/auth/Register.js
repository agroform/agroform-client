import React, { Component } from 'react';
import { authService } from './auth-service';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default class Register extends Component {
  state = {
    userType: 'Farmer',
    username: '',
    email: '',
    password: '',
    isLoggedIn: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      userType,
      username,
      email,
      password
    } = this.state;

    authService.register(
      username,
      email,
      password,
      userType
    )
    .then( user => {
        this.setState({
            username: "",
            email: "",
            userType: 'Farmer',
            password: "",
            isLoggedIn: true,
        });
        this.props.onLogin(user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn && <p>YAY! You have been registered as a member of agroform!</p>}
        <Form onSubmit={this.handleFormSubmit}>
          <strong>Register as</strong>
          <Form.Check type="radio" id="userTypeFarmer"
          name="userType" value="Farmer" label="🧑‍🌾 Farmer"
          checked={this.state.userType === 'Farmer'}
          onChange={ e => this.handleChange(e)} />
          <Form.Check type="radio" id="userTypeContractor"
          name="userType" value="Contractor" label="🧑‍🔧 Contractor"
          checked={this.state.userType === 'Contractor'}
          onChange={ e => this.handleChange(e)} />

          <strong>Username</strong>
          <Form.Control type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <strong>Email</strong>
          <Form.Control type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>

          <strong>Password</strong>
          <Form.Control type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <Button type="submit" variant="primary">Register</Button>

        </Form>

        <p>Already have account?
          <Link to='/login'> Login</Link>
        </p>
      </div>
    )
  }
}
