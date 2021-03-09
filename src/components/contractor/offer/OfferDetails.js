import React, { Component } from 'react';
import axios from 'axios';
import EditOffer from './EditOffer';

export default class OfferDetails extends Component {
  state = {
    offerDetails: {},
    quoteDetails: {},
    isLoaded: false,
    showEditForm: false,
  }

  fetchOfferAndQuoteDetails = async() => {
    try {
      const [offerDetails, quoteDetails] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/offers/${this.props.match.params.id}`, {withCredentials: true}),
        axios.get(`${process.env.REACT_APP_API_URL}/quotes?offer=${this.props.match.params.id}`, {withCredentials: true})
      ]);
      this.setState({
        offerDetails: offerDetails.data,
        quoteDetails: quoteDetails.data,
        isLoaded: true,
      })
    } catch(error) {
      console.error(error)
    }
  }

  componentDidMount() {
    this.fetchOfferAndQuoteDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchOfferAndQuoteDetails();
      this.setState({
        showEditForm: false
      })
    }
  }

  handleEdit = (response) => {
    this.setState({
      showEditForm: false,
      offerDetails: response.offerDetails,
      responseMessage: response.message
    });
    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);
  }

  deleteOffer = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/offers/${this.props.match.params.id}`,
      {quoteId: this.state.quoteDetails._id},
      {withCredentials: true})
      .then(() => {
        this.props.updateList(this.props.match.params.id, "offers", false);
        this.props.history.push('/dashboard/offers');
      })
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>Loading...</div>
      )
    }

    const {
      date: offerDate,
      vehicule,
      measureHa,
      pricePerHa,
      measureHour,
      expecTime,
      pricePerHour,
      timer,
      status
    } = this.state.offerDetails;

    const {
      field,
      //service,
      transport,
      description,
      destination,
      date: quoteDate,
    } = this.state.quoteDetails;

    return (
      <div>
        {this.state.showEditForm ? (
          <EditOffer offer={this.state.offerDetails} onEditOffer={this.handleEdit} />
          ) : (
            <div>
              <label>Date:</label>
              <p>{offerDate.slice(0, 10)}</p>
              <label>Vehicule:</label>
              <p>{vehicule.vehicule}</p>
              <label>Measure by Hectare:</label>
              <p>{measureHa ? "Yes" : "No"}</p>
              <label>Price per Hectare:</label>
              <p>{pricePerHa}</p>
              <label>Measure by Hour:</label>
              <p>{measureHour ? "Yes" : "No"}</p>
              <label>Time expected (in hour):</label>
              <p>{expecTime}</p>
              <label>Price per Hour:</label>
              <p>{pricePerHour}</p>
              <label>Status:</label>
              <p>{status}</p>

              {this.props.user._id === this.state.offerDetails.offerOwner && <div>
              <button onClick={() => this.setState({showEditForm: true})}>
                Edit
              </button>
              <button onClick={this.deleteOffer}>Delete</button>
              </div>}
            </div>
          )}
        <div>
          <label>Field:</label>
          <p>{field.fieldName}</p>
          <label>Service required:</label>
          {/* <p>{service.icon} {service.mainService} {service.service}</p> */}
          <label>Transport required:</label>
          <p>{transport ? "Yes" : "No"}</p>
          <label>Description:</label>
          <p>{description}</p>
          <label>Destination:</label>
          <p>{destination}</p>
          <label>Date:</label>
          <p>{quoteDate.slice(0, 10)}</p>
        </div>
      </div>
    )
  }
}


