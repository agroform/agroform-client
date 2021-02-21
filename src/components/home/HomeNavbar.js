import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AuthService from '../auth/auth-service';

import Register from '../auth/Register';
import Login from '../auth/Login';

export default class HomeNavbar extends React.Component {

  service = new AuthService()

  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    })
  }

  getUser = (userObj) => {
    this.props.liftUserObj(userObj);
  }

  render() {
    return (
      <div>
      <div>🌱🚜🌾 agroform</div>

      {this.props.userInSession && (
        <div>
          <Link to='/dashboard'>My dashboard</Link>
          <button onClick={() => this.logoutUser()}>Logout</button>
        </div>
      )}
      {!this.props.userInSession && (
        <>
          <Switch>
            <Route path='/register' render={ () => {
              return <Register getUser={this.getUser} />
            } } />

            <Route path='/login' render={ () => {
              return <Login getUser={this.getUser} />
            } } />
          </Switch>
          <div>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </div>
        </>
      )}
    </div>
    )
  }
}