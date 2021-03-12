import React, { Component } from 'react';
import AddField from './AddField';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card, CardDeck } from 'react-bootstrap';

export default class Fields extends Component {
  state = {
    showAddForm: false,
    responseMessage: null,
    fields: [],
    isLoaded: false,
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/fields`, {withCredentials: true})
      .then(allFields => {
        this.setState({
          fields: allFields.data,
          isLoaded: true,
        })
      })
      .catch(err => console.log(err))
  }

  handleAddField = (data) => {
    this.setState({
      showAddForm: false,
      responseMessage: data.message
    });

    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);

    this.props.updateList(data.newField, "fields", true);
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.responseMessage && <p>{this.state.responseMessage}</p>}
        </Row>
        <Row>
          {this.state.isLoaded ?
          <CardDeck>
          {this.state.fields.map(field =>
            (
              <Card key={field._id} border="primary" style={{ width: '18rem', borderRadius: '4px' }}>
                <Card.Body>
                  <Card.Title>{field.fieldName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Size: {field.size}</Card.Subtitle>
                  <Card.Text>
                    {field.location}
                  </Card.Text>
                  <Link to={`/dashboard/fields/${field._id}`}>More details</Link>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
          :
          <p>Loading...</p>}
        </Row>
        <Row>
          {this.state.showAddForm ?
          <AddField onAddField={this.handleAddField} />
          :
          <Button onClick={() => this.setState({showAddForm: true})}>Add a new field</Button>}
        </Row>
      </Container>
    )
  }
}
