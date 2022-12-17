import React, { Component } from "react";
import AddField from "./AddField";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { Card, CardDeck } from "react-bootstrap";

export default class Fields extends Component {
  state = {
    showAddForm: false,
    responseMessage: null,
    fields: [],
    isLoaded: false,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fields`, { withCredentials: true })
      .then((allFields) => {
        this.setState({
          fields: allFields.data,
          isLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  handleAddField = (data) => {
    this.setState({
      showAddForm: false,
      responseMessage: data.message,
    });

    setTimeout(() => {
      this.setState({
        responseMessage: null,
      });
    }, 2000);

    this.props.updateList(data.newField, "fields", true);
  };

  render() {
    return (
      <Container fluid className="m-5">
        <Row>
          {this.state.responseMessage && <p>{this.state.responseMessage}</p>}
        </Row>
        <Row>
          <Col>
            <div>
              {this.state.isLoaded ? (
                <Table responsive="lg" striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Field name</th>
                      <th>Field size</th>
                      <th>Location</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.fields.map((field) => (
                      <tr key={field._id}>
                        <td>
                          <span
                            className="IconSoilTillage"
                            style={{
                              width: "60px",
                              height: "60px",
                              paddingLeft: "50px",
                            }}
                          ></span>
                        </td>

                        <td>{field.fieldName}</td>
                        <td>{field.size}</td>
                        <td>{field.location}</td>
                        <td>
                          <Link to={`/dashboard/fields/${field._id}`}>
                            More details
                          </Link>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Col>
          <Col xs={3}>
            <Row>
              {this.state.showAddForm ? (
                <AddField onAddField={this.handleAddField} />
              ) : (
                <Button
                  onClick={() => this.setState({ showAddForm: true })}
                  size="lg"
                  block
                >
                  Add a new field
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
