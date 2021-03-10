import React, { Component } from 'react';
import axios from 'axios';
import EditQuote from './EditQuote';
import AddOffer from '../../contractor/offer/AddOffer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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

    if (this.state.showEditForm) {
      return <EditQuote quote={this.state.quoteDetails}
        onEditQuote={this.handleEdit} />
    }

    const {
      field,
      service,
      transport,
      description,
      destination,
      date,
    } = this.state.quoteDetails;

    return (
      <Container>
        <Row>
          <Col>
            <strong>Field</strong>
            <p>{field.fieldName}</p>
            <strong>Service required</strong>
            <p>{service.icon} {service.mainService} {service.service}</p>
            <strong>Transport required</strong>
            <p>{transport ? "Yes" : "No"}</p>
            <strong>Description</strong>
            <p>{description}</p>
            <strong>Destination</strong>
            <p>{destination}</p>
            <strong>Date</strong>
            <p>{date.slice(0, 10)}</p>
            {this.props.user._id === this.state.quoteDetails.quoteOwner && <div>
              <Button onClick={() => this.setState({showEditForm: true})}>
                Edit
              </Button>
              <Button onClick={this.deleteQuote}>Delete</Button>
            </div>}
          </Col>

          {this.props.user.__t === "Farmer" &&
          <Col>
            {this.state.quoteDetails.offers.map(offer => {
              return <div key={offer._id}>
                <p>{offer.date.slice(0, 10)}</p>
                {offer.measureHa && (
                  <p>Price per hectare: {offer.pricePerHa}</p>
                )}
                {offer.measureHour && (
                  <>
                    <strong>Total price calculated by time:</strong>
                    <p>{offer.expecTime * offer.pricePerHour}</p>
                  </>
                )}
                <p>{offer.vehicule.vehicule}</p>
                <p>Proposed by: {offer.offerOwner.username}</p>
                <p>{offer.status}</p>
              </div>
            })}
          </Col>}

          {this.props.user.__t === "Contractor" && !this.state.showAddForm && (
          <Col>
            {
              this.state.quoteDetails.offers.filter(offer => (offer.offerOwner._id === this.props.user._id))
              .map(offer => {
                return <div key={offer._id}>
                  <p>{offer.date.slice(0, 10)}</p>
                  {offer.measureHa && (
                    <p>Price per hectare: {offer.pricePerHa}</p>
                  )}
                  {offer.measureHour && (
                    <>
                      <strong>Total price calculated by time:</strong>
                      <p>{offer.expecTime * offer.pricePerHour}</p>
                    </>
                  )}
                  <p>{offer.vehicule.vehicule}</p>
                  <p>Proposed by: {offer.offerOwner.username}</p>
                  <p>{offer.status}</p>
                </div>
              })
            }
              <Button onClick={() => this.setState({showAddForm: true})}>
                Propose an offer
              </Button>
          </Col>
          )}

          {this.props.user.__t === "Contractor" && this.state.showAddForm && (
          <Col>
            <AddOffer updateList={this.props.updateList}/>
          </Col>
          )}
        </Row>
      </Container>
    )
  }
}

