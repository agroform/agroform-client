import React, { Component } from 'react';
import axios from 'axios';
import EditOffer from './EditOffer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
      status
    } = this.state.offerDetails;

    const {
      field,
      service,
      transport,
      description,
      destination,
      date: quoteDate,
    } = this.state.quoteDetails;

    return (
      <Container>
        <Row>
          <Col>
          {this.state.showEditForm ? (
            <EditOffer offer={this.state.offerDetails} onEditOffer={this.handleEdit} />
            ) : (
            <>
              <strong>Date</strong>
              <p>{offerDate.slice(0, 10)}</p>
              <strong>Vehicule</strong>
              <p>{vehicule.vehicule}</p>
              <strong>Service</strong>
              <p>{service?.icon} {service?.mainService} {service?.service}</p>
              <strong>Measure by Hectare</strong>
              <p>{measureHa ? "Yes" : "No"}</p>
              <strong>Price per Hectare</strong>
              <p>{pricePerHa}</p>
              <strong>Measure by Hour</strong>
              <p>{measureHour ? "Yes" : "No"}</p>
              <strong>Time expected (in hour)</strong>
              <p>{expecTime}</p>
              <strong>Price per Hour</strong>
              <p>{pricePerHour}</p>
              <strong>Status</strong>
              <p>{status}</p>

              {this.props.user._id === this.state.offerDetails.offerOwner && <div>
              <Button onClick={() => this.setState({showEditForm: true})}>
                Edit
              </Button>
              <Button onClick={this.deleteOffer}>Delete</Button>
              </div>}
            </>
            )}
          </Col>
          <Col>
            <strong>Field</strong>
            <p>{field.fieldName}</p>
            <strong>Service required</strong>
            <p>{service?.icon} {service?.mainService} {service?.service}</p>
            <strong>Transport required</strong>
            <p>{transport ? "Yes" : "No"}</p>
            <strong>Description</strong>
            <p>{description}</p>
            <strong>Destination</strong>
            <p>{destination}</p>
            <strong>Date</strong>
            <p>{quoteDate.slice(0, 10)}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}


