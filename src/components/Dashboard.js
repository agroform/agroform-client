import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.loggedInUser.__t}
      </div>
    )
  }
}
