import React, { Component } from 'react';
import axios from 'axios';
import EditQuote from './EditQuote';

export default class QuoteDetails extends Component {
  state = {
    quoteDetails: {},
    isLoaded: false,
    message: null,
    showEditForm: false,
  }

  fetchQuotedDetails = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/quotes/${this.props.match.params.id}`,
      {withCredentials: true})
      .then(response => {
        this.setState({
          quoteDetails: response.data,
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
    this.fetchQuotedDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchQuotedDetails();
      this.setState({
        showEditForm: false
      })
    }
  }

  handleEdit = (response) => {
    this.setState({
      showEditForm: false,
      quoteDetails: response.quoteDetails,
      message: response.message
    });
    setTimeout(() => {
      this.setState({
        responseMessage: null
      })
    }, 2000);
  }

  deleteQuote = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/quotes/${this.props.match.params.id}`,
      {withCredentials: true})
      .then(() => {
        this.props.updateList(this.props.match.params.id, "quotes", false);
        this.props.history.push('/dashboard/quotes');
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
      field,
      //service,
      transport,
      description,
      destination,
      date,
    } = this.state.quoteDetails;

    return (
      this.state.showEditForm ? (
          <EditQuote quote={this.state.quoteDetails} onEditQuote={this.handleEdit} />
        ) : (
          <div>
            <label>Field:</label>
            <p>{field.fieldName}</p>
            <label>Service required:</label>
            {/* <p>{service.icon} {service.mainService} {service.service}</p> */}
            <label>Transport required:</label>
            <p>{transport ? "Yes" : "No"}</p>
            <label>Description:</label>
            <p>{description}</p>
            <label>Destination:</label>
            <p>{destination}</p>
            <label>Date:</label>
            <p>{date.slice(0, 10)}</p>
            {this.props.user._id === this.state.quoteDetails.quoteOwner && <div>
              <button onClick={() => this.setState({showEditForm: true})}>
                Edit
              </button>
              <button onClick={this.deleteQuote}>Delete</button>
            </div>}
          </div>
        )

    )
  }
}

