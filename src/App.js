import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { authService } from './components/auth/auth-service';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';
import AuthRoute from './components/auth/auth-route';
import Dashboard from './components/dashboard/Dashboard';

export default class App extends Component {
  state = {
    loggedInUser: undefined,
  };

  componentDidMount() {
    authService.checkIfLoggedIn()
      .then(userObj => {
        this.setState({
          loggedInUser: userObj
        });
      })
      .catch(()=> {
        this.setState({
          loggedInUser: null,
        });
      })
  }

  handleLogout = () => {
    this.setState({
      loggedInUser: null,
    });
  }

  handleLogin = (user) => {
    this.setState({
      loggedInUser: user,
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => {
            return <Home userInSession={this.state.loggedInUser} onLogout={this.handleLogout} />
            }}
          />
          <ProtectedRoute user={this.state.loggedInUser} path="/dashboard" onLogout={this.handleLogout} component={Dashboard} />
          <AuthRoute user={this.state.loggedInUser} path="/register" render={() => <Register onLogin={this.handleLogin} />} />
          <AuthRoute user={this.state.loggedInUser} path="/login" render={() => <Login onLogin={this.handleLogin} />} />
        </Switch>
      </div>
    );
  }
}

