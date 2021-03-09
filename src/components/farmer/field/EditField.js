import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class EditField extends Component {
  state = {
    fieldName: this.props.field.fieldName,
    polygon: this.props.field.polygon,
    location: this.props.field.location,
    size: this.props.field.size,
    owner: this.props.field.owner,
    serviceHistory: this.props.field.serviceHistory,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(
      `${process.env.REACT_APP_API_URL}/fields/${this.props.field._id}`,
      this.state,
      { withCredentials: true })
      .then( () => {
        this.props.onEditField({
          fieldDetails: this.state,
          message: 'Your field info has been updated'
        });
      })
      .catch(() => {
        this.props.onEditField({
          message: 'Error...please try again'
        })
      } )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Row>
                <strong>Name of the field:</strong>
                <Form.Control type="text" name="fieldName" value={this.state.fieldName} onChange={this.handleChange} />
              </Form.Row>
              <Form.Row>
                <strong>Location:</strong>
                <Form.Control type="text" name="location" value={this.state.location} onChange={this.handleChange} />
              </Form.Row>
              <Form.Row>
                <strong>Size of the field:</strong>
                <Form.Control type="number" name="size" value={this.state.size} onChange={this.handleChange} />
              </Form.Row>
              <Form.Row>
                <strong>Polygon:</strong>
                <Form.Control type="text" name="polygon" value={this.state.polygon} onChange={this.handleChange} />
              </Form.Row>
              <Form.Row>
                <Button type="submit" variant="link" size="lg"><span>💾</span></Button>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
