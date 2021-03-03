import React, { Component } from 'react';
import axios from 'axios';

export default class AddQuote extends Component {
  state = {
    service: undefined,
    field: undefined,
    date: "",
    transport: false,
    destination: "",
    description: "",
    fields:[],
    services: ["🚜 plugs", "🚜 loosen", "🌱 sow corn", "🌱 sow cereals", "🌿 protect grassland"]
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
    const newQuote = {...this.state};
    delete newQuote.fields;
    delete newQuote.services;
    axios.post(`${process.env.REACT_APP_API_URL}/quotes`, newQuote, { withCredentials: true })
    .then( (response) => {
      this.props.onAddQuote(response.data);
    })
    .catch( error => console.log(error) )
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
      <div>
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
      </div>
    )
  }
}
