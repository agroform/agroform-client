import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card, CardDeck } from 'react-bootstrap';

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
      <Container>
        {this.state.responseMessage &&
        <Row>
          <p>{this.state.responseMessage}</p>
        </Row>
        }
        <Row>
        {this.state.isLoaded ?
          <CardDeck>
            {this.state.offers.map(offer => {
            return (
              <Card key={offer._id} border="primary" style={{ width: '18rem', borderRadius: '4px' }}>
                <Card.Body>
                  <Card.Title>{offer.vehicule.vehicule}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Status: {offer.status}</Card.Subtitle>
                  <Card.Text>
                    {offer.date.slice(0, 10)}
                  </Card.Text>
                  <Link to={`/dashboard/offers/${offer._id}`}>More details</Link>
                </Card.Body>
              </Card>
            )})}
          </CardDeck>
          :
          <p>Loading...</p>}
        </Row>
      </Container>
    )
  }
}