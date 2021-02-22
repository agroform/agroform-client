import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.loggedInUser.__t}
      </div>
    )
  }
}
