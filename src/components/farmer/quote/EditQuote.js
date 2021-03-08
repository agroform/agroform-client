import React, { Component } from 'react';
import axios from 'axios';

export default class EditField extends Component {
  state = {
    field: this.props.quote.field._id,
    service: this.props.quote.service?._id,
    transport: this.props.quote.transport,
    description: this.props.quote.description,
    destination: this.props.quote.destination,
    date: this.props.quote.date.slice(0, 10),
    quoteOwner: this.props.quote.quoteOwner,
    fields:[],
    services: ["🚜 plugs", "🚜 loosen", "🌱 sow corn", "🌱 sow cereals", "🌿 protect grassland"],
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/fields`,
      {withCredentials: true})
      .then(response => {
        this.setState({
          fields: response.data
        })
      })
      .catch(err => console.log(err))
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedQuote = {...this.state};
    delete updatedQuote.fields;
    delete updatedQuote.services;
    const quoteDetails = {
      field: this.state.fields.filter(f => f._id === this.state.field)[0],
      service: this.state.services.filter(s => s._id === this.state.service)[0],
      transport: this.state.transport,
      description: this.state.description,
      destination: this.state.destination,
      date: this.state.date,
      quoteOwner: this.state.quoteOwner,
    };

    axios.put(
      `${process.env.REACT_APP_API_URL}/quotes/${this.props.quote._id}`,
      updatedQuote,
      { withCredentials: true })
      .then( () => {
        this.props.onEditQuote({
          quoteDetails,
          message: 'Your quote info has been updated'
        });
      })
      .catch(() => {
        this.props.onEditQuote({
          message: 'Error...please try again'
        })
      } )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "transport") {
      value === "true" ? this.setState({transport: true}) : this.setState({transport: false});
      return;
    }
    this.setState({[name]: value});
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Field:</label>
        <select name="field" value={this.state.field} onChange={this.handleChange}>
          {this.state.fields.map(field => <option key={field._id} value={field._id}>{field.fieldName}</option>)}
        </select>

        {/* <label>Service required:</label>
        <select name="service" value={this.state.service} onChange={this.handleChange}>
          {this.state.services.map(service => <option key={service} value={service}>{service}</option>)}
        </select> */}

        <label>Transport required:</label>
        <input type="radio" id="transportTrue"
          name="transport" value={true}
          checked={this.state.transport}
          onChange={this.handleChange} />
        <label htmlFor="transportTrue">Yes</label>
        <input type="radio" id="transportFalse"
          name="transport" value={false}
          checked={!this.state.transport}
          onChange={this.handleChange} />
        <label htmlFor="transportFalse">No</label>

        <label>Description:</label>
        <textarea name="description" value={this.state.description} onChange={this.handleChange}/>

        <label>Destination:</label>
        <input type="text" name="destination" value={this.state.destination} onChange={this.handleChange} />

        <label>Date:</label>
        <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />

        <input type="submit" value="Submit" />
      </form>
    )
  }
}
