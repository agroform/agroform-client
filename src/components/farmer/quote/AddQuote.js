import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default class AddQuote extends Component {
  state = {
    service: undefined,
    field: undefined,
    date: "",
    transport: false,
    destination: "",
    description: "",
    fields:[],
    services: []
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
    const newQuote = {...this.state};
    delete newQuote.fields;
    delete newQuote.services;
    axios.post(`${process.env.REACT_APP_API_URL}/quotes`, newQuote, { withCredentials: true })
    .then( (response) => {
      this.props.onAddQuote(response.data);
    })
    .catch( error => console.log(error) )
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
      <Card>
          <Card.Header>
            <span
              to="/"
              className="IconQuotes d-inline-block align-top"
              alt="agroform"
              style={{ width: "40px", height: "40px", paddingLeft: "50px" }}
            ></span>
            <>&nbsp;</>Add new Quote
          </Card.Header>
          <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={this.handleFormSubmit}>
              <strong>Field</strong>
              <Form.Control as="select" name="field" value={this.state.field} onChange={this.handleChange}>
                <option value="">Required</option>
                {this.state.fields.map(field => <option key={field._id} value={field._id}>{field.fieldName}</option>)}
              </Form.Control>

              <strong>Service required</strong>
              <Form.Control as="select" name="service" value={this.state.service} onChange={this.handleChange}>
                <option value="">Required</option>
                {this.state.services.map(service => <option key={service._id} value={service._id}>{service.icon} {service.service}</option>)}
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
        </Card.Body>
        </Card>
      </Container>
    )
  }
}
