import React, { Component } from 'react';
import AddQuote from './AddQuote';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button, Card, CardDeck } from 'react-bootstrap';

export default class Quotes extends Component {
  state = {
    showAddForm: false,
    responseMessage: null,
    quotes: [],
    isLoaded: false,
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/quotes?farmer=${this.props.user._id}`, {withCredentials: true})
      .then(allQuotes => {
        this.setState({
          quotes: allQuotes.data,
          isLoaded: true,
        })
      })
      .catch(err => console.log(err))
  }

  handleAddQuote = (data) => {
    this.setState({
      showAddForm: false,
      responseMessage: data.message
    });

    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);

    this.props.updateList(data.newQuote, "quotes", true);
  }

  render() {
    return (
      <Container>
        <Row>{this.state.responseMessage && <p>{this.state.responseMessage}</p>}</Row>
        {this.state.isLoaded ?
        <Row>
          <CardDeck className="m-5">
            {this.state.quotes.map(quote => {
              return (
                <Card key={quote._id} border="primary" style={{ width: '18rem', borderRadius: '4px' }}>
                  <Card.Body>
                    <Card.Title>{quote.field.fieldName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Number of offers: {quote.offers.length}</Card.Subtitle>
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
        <Row>Loading...</Row>}
        <Row>
          {this.state.showAddForm ?
            <AddQuote onAddQuote={this.handleAddQuote} /> : <Button onClick={() => this.setState({showAddForm: true})}>Add a new quote</Button>}
        </Row>
      </Container>
    )
  }
}