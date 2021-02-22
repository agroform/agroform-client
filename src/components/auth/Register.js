import React, { Component } from 'react';
import { authService } from './auth-service';
import { Link } from 'react-router-dom';

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
        <form onSubmit={this.handleFormSubmit}>
          <div>
            Are you:

            <input type="radio" id="userTypeFarmer"
            name="userType" value="Farmer"
            checked={this.state.userType === 'Farmer'}
            onChange={ e => this.handleChange(e)} />
            <label htmlFor="userTypeFarmer">Farmer</label>

            <input type="radio" id="userTypeContractor"
            name="userType" value="Contractor"
            checked={this.state.userType === 'Contractor'}
            onChange={ e => this.handleChange(e)} />
            <label htmlFor="userTypeContractor">Contractor</label>
          </div>

          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <input type="submit" value="Register" />

        </form>

        <p>Already have account?
          <Link to='/login'> Login</Link>
        </p>
      </div>
    )
  }
}