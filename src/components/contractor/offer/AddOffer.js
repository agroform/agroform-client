import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
        console.log(this.props.history);
        this.setState({
          vehicules: response.data
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

export default withRouter(AddOffer)
