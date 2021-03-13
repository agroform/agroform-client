import React, { Component } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class AddField extends Component {
  state = {
    fieldName: "",
    polygon: "",
    location: "",
    size: 0,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/fields`, this.state, {
        withCredentials: true,
      })
      .then((response) => {
        this.props.onAddField(response.data);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header>
            <span
              to="/"
              className="IconSoilTillage d-inline-block align-top"
              alt="agroform"
              style={{ width: "40px", height: "40px", paddingLeft: "50px" }}
            ></span>
            <>&nbsp;</>Add Field
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleFormSubmit}>
              <Card.Title>
                <strong>Name of the field:</strong>
                <Form.Control
                  type="text"
                  name="fieldName"
                  value={this.state.fieldName}
                  onChange={this.handleChange}
                />
              </Card.Title>
              <Card.Text>
                <strong>Location:</strong>
                <Form.Control
                  type="text"
                  name="location"
                  className="m-3"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
                <strong>Size of the field:</strong>
                <Form.Control
                  type="number"
                  name="size"
                  className="m-3"
                  value={this.state.size}
                  onChange={this.handleChange}
                />
                ha <>&nbsp;</>
                <>&nbsp;</>
                <strong>Polygon:</strong>
                <Form.Control
                  type="text"
                  name="polygon"
                  className="m-3"
                  value={this.state.polygon}
                  onChange={this.handleChange}
                />
              </Card.Text>
              <Button type="submit" size="lg" value="Submit" variant="primary">
                Create Field
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}
