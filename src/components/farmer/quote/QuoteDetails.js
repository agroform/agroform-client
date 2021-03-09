import React, { Component } from 'react';
import axios from 'axios';
import EditQuote from './EditQuote';
import AddOffer from '../../contractor/offer/AddOffer';

export default class QuoteDetails extends Component {
  state = {
    quoteDetails: {},
    isLoaded: false,
    message: null,
    showEditForm: false,
    showAddForm: false,
  }

  fetchQuotedDetails = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/quotes/${this.props.match.params.id}`,
      {withCredentials: true})
      .then(response => {
        this.setState({
          quoteDetails: response.data,
          isLoaded: true
        })
      })
      .catch(err => {
        this.setState({
          fieldDetails: {},
          message: `Error: ${err.message}`
        });
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000);
      })
  }

  componentDidMount() {
    this.fetchQuotedDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchQuotedDetails();
      this.setState({
        showEditForm: false,
        showAddForm: false,
      })
    }
  }

  handleEdit = (response) => {
    this.setState({
      showEditForm: false,
      quoteDetails: response.quoteDetails,
      message: response.message
    });
    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);
  }

  deleteQuote = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/quotes/${this.props.match.params.id}`,
      {withCredentials: true})
      .then(() => {
        this.props.updateList(this.props.match.params.id, "quotes", false);
        this.props.history.push('/dashboard/quotes');
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
      field,
      //service,
      transport,
      description,
      destination,
      date,
    } = this.state.quoteDetails;

    return (
      this.state.showEditForm ? (
          <EditQuote quote={this.state.quoteDetails} onEditQuote={this.handleEdit} />
        ) : (
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
            <p>{date.slice(0, 10)}</p>
            {this.props.user._id === this.state.quoteDetails.quoteOwner && <div>
              <button onClick={() => this.setState({showEditForm: true})}>
                Edit
              </button>
              <button onClick={this.deleteQuote}>Delete</button>
            </div>}

            {this.props.user.__t === "Farmer" && <div>
              {this.state.quoteDetails.offers.map(offer => {
                return <div key={offer._id}>
                  <p>{offer.date.slice(0, 10)}</p>
                  {offer.measureHa && (
                    <p>Price per hectare: {offer.pricePerHa}</p>
                  )}
                  {offer.measureHour && (
                    <>
                      <label>Total price calculated by time:</label>
                      <p>{offer.expecTime * offer.pricePerHour}</p>
                    </>
                  )}
                  <p>{offer.vehicule.vehicule}</p>
                  <p>Proposed by: {offer.offerOwner.username}</p>
                  <p>{offer.status}</p>
                </div>
              })}
            </div>}
            {this.props.user.__t === "Contractor" && !this.state.showAddForm && (
              <div>
                {
                  this.state.quoteDetails.offers?.filter(offer => offer.offerOwner === this.props.user._id)
                  .map(offer => {
                    return <div key={offer._id}>
                      <label>Date:</label>
                      <p>{offer.date.slice(0, 10)}</p>
                      <label>Measure by Hectare:</label>
                      <p>{offer.measureHa ? "Yes" : "No"}</p>
                      <label>Price per Hectare:</label>
                      <p>{offer.pricePerHa}</p>
                      <label>Measure by Hour:</label>
                      <p>{offer.measureHour ? "Yes" : "No"}</p>
                      <label>Time expected (in hour):</label>
                      <p>{offer.expecTime}</p>
                      <label>Price per Hour:</label>
                      <p>{offer.pricePerHour}</p>
                      <label>Status:</label>
                      <p>{offer.status}</p>
                    </div>
                  })
                }
                <button onClick={() => this.setState({showAddForm: true})}>
                  Send an offer
                </button>
              </div>
            )}
            {this.props.user.__t === "Contractor" && this.state.showAddForm && (
              <AddOffer updateList={this.props.updateList} />
            )}
          </div>
        )

    )
  }
}

