import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default class EditQuote extends Component {
  state = {
    field: this.props.quote.field._id,
    service: this.props.quote.service._id,
    transport: this.props.quote.transport,
    description: this.props.quote.description,
    destination: this.props.quote.destination,
    date: this.props.quote.date.slice(0, 10),
    quoteOwner: this.props.quote.quoteOwner,
    offers: this.props.quote.offers,
    fields:[],
    services: [],
  }

  componentDidMount = async() => {
    try {
      const [fields, services] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/fields`,
          {withCredentials: true}),
        axios.get(`${process.env.REACT_APP_API_URL}/servicelist`,
        {withCredentials: true})
      ]);

      this.setState({
        fields: fields.data,
        services: services.data,
      })
    } catch(error) {
      console.log(error);
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedQuote = {...this.state};
    delete updatedQuote.fields;
    delete updatedQuote.services;
    updatedQuote.offers = this.state.offers.map(offer => offer._id);

    const quoteDetails = {
      field: this.state.fields.filter(f => f._id === this.state.field)[0],
      service: this.state.services.filter(s => s._id === this.state.service)[0],
      transport: this.state.transport,
      description: this.state.description,
      destination: this.state.destination,
      date: this.state.date,
      quoteOwner: this.state.quoteOwner,
      offers: this.state.offers,
    };

    axios.put(
      `${process.env.REACT_APP_API_URL}/quotes/${this.props.quote._id}`,
      updatedQuote,
      { withCredentials: true })
      .then( () => {
        this.props.onEditQuote({
          quoteDetails,
          message: 'Your quote info has been updated'
        });
      })
      .catch(() => {
        this.props.onEditQuote({
          message: 'Error...please try again'
        })
      } )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "transport") {
      value === "true" ? this.setState({transport: true}) : this.setState({transport: false});
      return;
    }
    this.setState({[name]: value});
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.handleFormSubmit}>
              <strong>Field</strong>
              <Form.Control as="select" name="field" value={this.state.field} onChange={this.handleChange}>
                {this.state.fields.map(field => <option key={field._id} value={field._id}>{field.fieldName}</option>)}
              </Form.Control>

              <strong>Service required</strong>
              <Form.Control as="select" name="service" value={this.state.service} onChange={this.handleChange}>
                {this.state.services.map(service => <option key={service._id} value={service}>{service.icon} {service.service}</option>)}
              </Form.Control>

              <strong>Transport required</strong>
              <Form.Check type="radio" id="transportTrue"
                name="transport" value={true} label="Yes"
                checked={this.state.transport}
                onChange={this.handleChange} />
              <Form.Check type="radio" id="transportFalse"
                name="transport" value={false} label="No"
                checked={!this.state.transport}
                onChange={this.handleChange} />

              <strong>Description</strong>
              <Form.Control name="description" value={this.state.description} onChange={this.handleChange}/>

              <strong>Destination</strong>
              <Form.Control type="text" name="destination" value={this.state.destination} onChange={this.handleChange} />

              <strong>Date</strong>
              <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleChange} />

              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
