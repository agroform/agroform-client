import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

export default class HomeNavbar extends React.Component {

  service = new AuthService()

  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    })
  }

  render() {
    return (
      <div>
        <Link to='/'>🌱🚜🌾 agroform</Link>

        {this.props.userInSession ? (
          <div>
            <button onClick={() => this.logoutUser()}>Logout</button>
            <Link to='/dashboard'>My dashboard</Link>
          </div>
        )
        :
        (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )}
      </div>
    )
  }
}