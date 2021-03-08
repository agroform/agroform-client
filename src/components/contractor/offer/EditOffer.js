import React, { Component } from 'react';
import axios from 'axios';

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
          vehicules: response.data
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
      <form onSubmit={this.handleFormSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />

        <label>Vehicule:</label>
        <select name="vehicule" value={this.state.vehicule} onChange={this.handleChange}>
          {this.state.vehicules.map(vehicule => <option key={vehicule._id} value={vehicule._id}>{vehicule.vehicule}</option>)}
        </select>

        <label>Measure by Hectare:</label>
        <input type="radio" id="measureHaTrue"
          name="measureHa" value={true}
          checked={this.state.measureHa}
          onChange={this.handleChange} />
        <label htmlFor="measureHaTrue">Yes</label>
        <input type="radio" id="measureHaFalse"
          name="measureHa" value={false}
          checked={!this.state.measureHa}
          onChange={this.handleChange} />
        <label htmlFor="measureHaFalse">No</label>

        <label>Price per Hectare:</label>
        <input type="number" name="pricePerHa" value={this.state.pricePerHa} onChange={this.handleChange}/>

        <label>Measure by Hour:</label>
        <input type="radio" id="measureHourTrue"
          name="measureHour" value={true}
          checked={this.state.measureHour}
          onChange={this.handleChange} />
        <label htmlFor="measureHourTrue">Yes</label>
        <input type="radio" id="measureHourFalse"
          name="measureHour" value={false}
          checked={!this.state.measureHour}
          onChange={this.handleChange} />
        <label htmlFor="measureHourFalse">No</label>

        <label>Time expected (in hour):</label>
        <input type="number" name="expecTime" value={this.state.expecTime} onChange={this.handleChange}/>

        <label>Price per Hour:</label>
        <input type="number" name="pricePerHour" value={this.state.pricePerHour} onChange={this.handleChange}/>

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

