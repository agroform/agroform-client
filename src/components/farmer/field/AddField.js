import React, { Component } from 'react';
import axios from 'axios';

export default class AddField extends Component {
  state = {
    fieldName: "",
    polygon: "",
    location: "",
    size: 0,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/fields`, this.state, { withCredentials: true })
    .then( (response) => {
      this.props.onAddField(response.data);
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name of the field:</label>
          <input type="text" name="fieldName" value={this.state.fieldName} onChange={this.handleChange} />
          <label>Location:</label>
          <input type="text" name="location" value={this.state.description} onChange={this.handleChange} />
          <label>Size of the field:</label>
          <input type="number" name="size" onChange={this.handleChange} />
          <label>Polygon:</label>
          <input type="text" name="polygon" onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
