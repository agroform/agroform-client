import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AuthService from './components/auth/auth-service';
import HomeNavbar from './components/home/HomeNavbar';
import Dashboard from './components/Dashboard';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';

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
            userType: response.__t,
            username: response.username,
          }
        });
      })
      .catch(()=> console.log(`No user is loggedin`))
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <HomeNavbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute user={this.state.loggedInUser} path='/dashboard' component={Dashboard} />
          </Switch>
          <footer>agroform &#169; 2021</footer>
        </div>
      );
    } else {
      return (
        <div className="App">
          <HomeNavbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/register' render={() => <Register getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/dashboard' component={Dashboard} />
            </Switch>
          <footer>agroform &#169; 2021</footer>
        </div>
      )
    }
  }
}

