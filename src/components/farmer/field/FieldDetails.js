import React, { Component } from 'react';
import axios from 'axios';
import EditField from './EditField';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class FieldDetails extends Component {
  state = {
    fieldDetails: {},
    isLoaded: false,
    message: null,
    showEditForm: false,
  }

  fetchFieldDetails = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/fields/${this.props.match.params.id}`,
      {withCredentials: true})
      .then(response => {
        this.setState({
          fieldDetails: response.data,
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
    this.fetchFieldDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchFieldDetails();
      this.setState({
        showEditForm: false
      })
    }
  }

  handleFieldEdit = (response) => {
    this.setState({
      showEditForm: false,
      fieldDetails: response.fieldDetails,
      message: response.message
    });
    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);
  }

  deleteField = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/fields/${this.props.match.params.id}`,
      {withCredentials: true})
      .then(() => {
        this.props.updateList(this.props.match.params.id, "fields", false);
        this.props.history.push('/dashboard/fields');
      })
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>Loading...</div>
      )
    }

    const {
      fieldName,
      polygon,
      location,
      size,
      serviceHistory
    } = this.state.fieldDetails;

    return (
      this.state.showEditForm ? (
          <EditField field={this.state.fieldDetails} onEditField={this.handleFieldEdit} />
        ) : (
          <Container fluid>
            <Row>
              <Col>
                <strong>Name of the field:</strong>
                <p>{fieldName}</p>
                <strong>Location:</strong>
                <p>{location}</p>
                <strong>Size:</strong>
                <p>{size}</p>
                <strong>Map:</strong>
                <p>{polygon}</p>
                <strong>Service History:</strong>
                  {serviceHistory.map((record, i) => {
                    return (<div key={`service ${i}`}>
                      <h5>
                        {record.service.icon} {record.service.mainService} {record.service.service}
                      </h5>
                      <p>{record.date}</p>
                    </div>)
                  })}
                {this.props.user._id === this.state.fieldDetails.owner && <div>
                  <Button onClick={() => this.setState({showEditForm: true})}>
                    Edit
                  </Button>
                  <Button onClick={this.deleteField}>Delete</Button>
                </div>}
              </Col>
            </Row>
          </Container>
        )

    )
  }
}

