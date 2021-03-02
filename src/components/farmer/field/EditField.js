import React, { Component } from 'react';
import axios from 'axios';

export default class EditField extends Component {
  state = {
    fieldName: this.props.field.fieldName,
    polygon: this.props.field.polygon,
    location: this.props.field.location,
    size: this.props.field.size,
    owner: this.props.field.owner,
    serviceHistory: this.props.field.serviceHistory,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(
      `${process.env.REACT_APP_API_URL}/fields/${this.props.field._id}`,
      this.state,
      { withCredentials: true })
      .then( () => {
        this.props.onEditField({
          fieldDetails: this.state,
          message: 'Your field info has been updated'
        });
      })
      .catch(() => {
        this.props.onEditField({
          message: 'Error...please try again'
        })
      } )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <p>{this.props.fieldId}</p>
        <label>Name of the field:</label>
        <input type="text" name="fieldName" value={this.state.fieldName} onChange={this.handleChange} />
        <label>Location:</label>
        <input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
        <label>Size of the field:</label>
        <input type="number" name="size" value={this.state.size} onChange={this.handleChange} />
        <label>Polygon:</label>
        <input type="text" name="polygon" value={this.state.polygon} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
