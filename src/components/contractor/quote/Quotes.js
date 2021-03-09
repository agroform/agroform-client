import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div>
        <div>Search</div>
        {this.state.isLoaded ?
          <div>
            {this.state.quotes.map(quote => {
              return <Link key={quote._id} to={`/dashboard/quotes/${quote._id}`}>
                <h5>{quote.field.fieldName}</h5>
                <p>{quote.service?.icon} {quote.service?.service}</p>
                <p>{quote.date}</p>
                <p>{quote.quoteOwner.username}</p>
              </Link>
            })}
          </div>
          :
          <div>Loading...</div>
        }
      </div>
    )
  }
}
