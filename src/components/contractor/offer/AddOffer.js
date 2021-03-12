import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddOffer extends Component {
  state = {
    date: "",
    vehicule: "",
    measureHa: true,
    pricePerHa: 0,
    measureHour: false,
    expecTime: 0,
    pricePerHour: 0,
    vehicules: [],
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/vehicules`,
      {withCredentials: true})
      .then(response => {
        this.setState({
          vehicules: response.data.vehicules,
          isLoaded: true,
        })
      })
      .catch(err => console.log(err))
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const newOffer = {...this.state};
    delete newOffer.vehicules;
    newOffer.quoteId = this.props.match.params.id;

    axios.post(
      `${process.env.REACT_APP_API_URL}/offers`,
      newOffer,
      { withCredentials: true })
      .then( newOffer => {
        this.props.updateList(newOffer.data._id, "offers", true);
        this.props.history.push(`/dashboard/offers/${newOffer.data._id}`);
      })
      .catch(err => console.log(err))
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
        <Form.Check type="radio" type="radio" id="measureHaTrue"
          name="measureHa" value={true} label="Yes"
          checked={this.state.measureHa}
          onChange={this.handleChange} />
        <Form.Check type="radio" type="radio" id="measureHaFalse"
          name="measureHa" value={false} label="No"
          checked={!this.state.measureHa}
          onChange={this.handleChange} />


        <strong>Price per Hectare</strong>
        <Form.Control type="number" name="pricePerHa" value={this.state.pricePerHa} onChange={this.handleChange}/>

        <strong>Measure by Hour</strong>
        <Form.Check type="radio" id="measureHourTrue"
          name="measureHour" value={true} label="Yes"
          checked={this.state.measureHour}
          onChange={this.handleChange} />
        <Form.Check type="radio" id="measureHourFalse"
          name="measureHour" value={false} label="No"
          checked={!this.state.measureHour}
          onChange={this.handleChange} />

        <strong>Time expected (in hour)</strong>
        <Form.Control type="number" name="expecTime" value={this.state.expecTime} onChange={this.handleChange}/>

        <strong>Price per Hour</strong>
        <Form.Control type="number" name="pricePerHour" value={this.state.pricePerHour} onChange={this.handleChange}/>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default withRouter(AddOffer)
