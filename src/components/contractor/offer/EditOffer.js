import React, { Component } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class EditOffer extends Component {
  state = {
    date: this.props.offer.date.slice(0, 10),
    vehicule: this.props.offer.vehicule._id,
    measureHa: this.props.offer.measureHa,
    pricePerHa: this.props.offer.pricePerHa || 0,
    measureHour: this.props.offer.measureHour,
    expecTime: this.props.offer.expecTime || 0,
    pricePerHour: this.props.offer.pricePerHour || 0,
    offerOwner: this.props.offer.offerOwner,
    status: this.props.offer.status,
    vehicules: [],
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/vehicules`,
      {withCredentials: true})
      .then(response => {
        this.setState({
          vehicules: response.data.vehicules
        })
      })
      .catch(err => console.log(err))
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedOffer = {...this.state};
    delete updatedOffer.vehicules;
    const offerDetails = {
      date: this.state.date,
      vehicule: this.state.vehicules.filter(v => v._id === this.state.vehicule)[0],
      measureHa: this.state.measureHa,
      pricePerHa: this.state.pricePerHa,
      measureHour: this.state.measureHour,
      expecTime: this.state.expecTime,
      pricePerHour: this.state.pricePerHour,
      offerOwner: this.state.offerOwner,
      status: this.state.status,
    };

    axios.put(
      `${process.env.REACT_APP_API_URL}/offers/${this.props.offer._id}`,
      updatedOffer,
      { withCredentials: true })
      .then( () => {
        this.props.onEditOffer({
          offerDetails,
          message: 'Your offer info has been updated'
        });
      })
      .catch(() => {
        this.props.onEditOffer({
          message: 'Error...please try again'
        })
      } )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "measureHa" || name === "measureHour") {
      value === "true" ? this.setState({[name]: true}) : this.setState({[name]: false});
      return;
    }
    this.setState({[name]: value});
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <strong>Date</strong>
        <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleChange} />

        <strong>Vehicule</strong>
        <Form.Control as="select" name="vehicule" value={this.state.vehicule} onChange={this.handleChange}>
          {this.state.vehicules.map(vehicule => <option key={vehicule._id} value={vehicule._id}>{vehicule.vehicule}</option>)}
        </Form.Control>

        <strong>Measure by Hectare</strong>
        <Form.Check type="radio" id="measureHaTrue"
          name="measureHa" value={true} label="Yes"
          checked={this.state.measureHa}
          onChange={this.handleChange} />
        <Form.Check type="radio" id="measureHaFalse"
          name="measureHa" value={false} label="No"
          checked={!this.state.measureHa}
          onChange={this.handleChange} />

        <strong>Price per Hectare</strong>
        <Form.Control type="number" name="pricePerHa" value={this.state.pricePerHa} onChange={this.handleChange}/>

        <strong>Measure by Hour</strong>
        <Form.Check type="radio" id="measureHourTrue"
          name="measureHour" value={true} label="Yes"
          checked={this.state.measureHour}
          onChange={this.handleChange}/>
        <Form.Check type="radio" id="measureHourFalse"
          name="measureHour" value={false} label="No"
          checked={!this.state.measureHour}
          onChange={this.handleChange}/>

        <strong>Time expected (in hour):</strong>
        <Form.Control type="number" name="expecTime" value={this.state.expecTime} onChange={this.handleChange}/>

        <strong>Price per Hour:</strong>
        <Form.Control type="number" name="pricePerHour" value={this.state.pricePerHour} onChange={this.handleChange}/>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

