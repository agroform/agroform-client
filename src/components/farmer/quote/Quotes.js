import React, { Component } from 'react';
import AddQuote from './AddQuote';

export default class Quotes extends Component {
  state = {
    showAddForm: false,
    responseMessage: null,
  }

  handleAddQuote = (data) => {
    this.setState({
      showAddForm: false,
      responseMessage: data.message
    });

    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);

    this.props.updateList(data.newQuote, "quotes", true);
  }

  render() {
    return (
      <div>
        <div>Search</div>
        <div>All Quotes that meet the search requirements</div>
        <div>
          {this.state.showAddForm ?
            <AddQuote onAddQuote={this.handleAddQuote} /> : <button onClick={() => this.setState({showAddForm: true})}>Add a new quote</button>}
        </div>
        {this.state.responseMessage && <p>{this.state.responseMessage}</p>}
      </div>
    )
  }
}