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
        {/* {this.state.responseMessage && <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative',
            minHeight: '100px',
          }}
        >
          <Toast
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Toast.Header>
              <strong className="mr-auto">agroform</strong>
            </Toast.Header>
            <Toast.Body>{this.state.responseMessage}</Toast.Body>
          </Toast>
        </div>}         */}
        {this.state.responseMessage && <p>test for latter toast implementation</p>}
      </div>
    )
  }
}
