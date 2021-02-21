import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AuthService from './components/auth/auth-service';
import Home from './components/home/Home';

export default class App extends Component {
  state = {
    loggedInUser: null
  }

  service = new AuthService()

  componentDidMount() {
    this.service.checkIfLoggedIn()
      .then( response => {
        this.setState({
          loggedInUser: {
            id: response.id,
            username: response.username,
            userType: response.__t
          }
        });
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Home userInSession={this.state.loggedInUser} />
        <footer>agroform &#169; 2021</footer>
      </div>
    )
  }
}

