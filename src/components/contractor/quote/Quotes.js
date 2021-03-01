import React, { Component } from 'react';

export default class Quotes extends Component {
  state = {
    responseMessage: null,
  }

  render() {
    return (
      <div>
        <div>Search</div>
        <div>All Quotes that meet the search requirements</div>
        {this.state.responseMessage && <p>{this.state.responseMessage}</p>}
      </div>
    )
  }
}
