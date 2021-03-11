import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card, CardDeck } from 'react-bootstrap';

export default class Quotes extends Component {
  state = {
    quotes: [],
    isLoaded: false,
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/quotes/all`, {withCredentials: true})
      .then(allQuotes => {
        this.setState({
          quotes: allQuotes.data,
          isLoaded: true,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <Row>Search</Row>
        {this.state.isLoaded ?
        <Row>
        <CardDeck>
          {this.state.quotes.map(quote => {
            return (
              <Card key={quote._id} border="primary" style={{ width: '18rem', borderRadius: '4px' }}>
                <Card.Body>
                  <Card.Title>{quote.field.fieldName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Requested by: {quote.quoteOwner.username}</Card.Subtitle>
                  <Card.Text>
                    {quote.service?.icon} {quote.service?.service}
                    <br></br>
                    {quote.date.slice(0, 10)}
                  </Card.Text>
                  <Link to={`/dashboard/quotes/${quote._id}`}>More details</Link>
                </Card.Body>
              </Card>
            )
          })}
        </CardDeck>
        </Row>
        :
        <Row>Loading...</Row>
        }
      </Container>
    )
  }
}
