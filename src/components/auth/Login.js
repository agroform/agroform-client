import React, { Component } from 'react';
import { authService } from './auth-service';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    authService.login(email, password)
      .then( user => {
          this.setState({
            email: "",
            password: "",
            isLogged: true,
          });
          this.props.onLogin(user)
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <strong>Email</strong>
          <Form.Control type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          <strong>Password</strong>
          <Form.Control type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <Button type="submit" variant="primary">Login</Button>
        </Form>
        <p>Don't have account?
            <Link to='/register'>Register</Link>
        </p>
      </div>
    )
  }
}

export default Login;