import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Offers extends Component {
  state = {
    offers: [],
    isLoaded: false,
    responseMessage: null,
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/offers`, {withCredentials: true})
      .then(response => {
        this.setState({
          offers: response.data,
          isLoaded: true,
        })
      })
      .catch(err => this.setState({
        responseMessage: err.message
      }))
  }

  render() {
    return (
      <div>
        {this.state.responseMessage && <p>{this.state.responseMessage}</p>}
        <div>Search</div>
        {this.state.isLoaded ? <div>
          {this.state.offers.map(offer => {
            return (
            <Link key={offer._id} to={`/dashboard/offers/${offer._id}`}>
              <h5>{offer.date}</h5>
              <p>{offer.vehicule.vehicule}</p>
            </Link>
          )})}
        </div>
        :
        <div>Loading...</div>}
      </div>
    )
  }
}