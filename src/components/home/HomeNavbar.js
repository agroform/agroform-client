import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../auth/auth-service';

export default class HomeNavbar extends React.Component {

  logoutUser = () => {
    authService.logout().then(() => {
      this.props.onLogout();
    });
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