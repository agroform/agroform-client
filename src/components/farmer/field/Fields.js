import React, { Component } from 'react';
import AddField from './AddField';

export default class Fields extends Component {
  state = {
    showAddForm: false,
    responseMessage: null,
  }

  handleAddField = (data) => {
    this.setState({
      showAddForm: false,
      responseMessage: data.message
    });

    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);

    this.props.updateList(data.newField, "fields", true);
  }

  render() {
    return (
      <div>
        <div>Search</div>
        <div>All fields that meet the search requirements</div>
        <div>
          {this.state.showAddForm ?
            <AddField onAddField={this.handleAddField} /> : <button onClick={() => this.setState({showAddForm: true})}>Add a new field</button>}
        </div>
        {this.state.responseMessage && <p>{this.state.responseMessage}</p>}
      </div>
    )
  }
}
