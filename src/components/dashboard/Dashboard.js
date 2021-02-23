import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar user={this.props.loggedInUser} />
      </div>
    )
  }
}
