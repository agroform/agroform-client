import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import FieldDetails from '../farmer/FieldDetails';
import QuoteDetails from '../farmer/QuoteDetails';
import OfferDetails from '../contractor/OfferDetails';
import VehiculeDetails from '../contractor/VehiculeDetails';
import Services from '../contractor/Services';
import Quotes from '../contractor/Quotes';

export default class Dashboard extends Component {
  state = {
    selectedTab: "profile",
    lists: {},
  }

  componentDidMount = async () => {
    if (this.props.loggedInUser.__t === "Farmer") {
      const [fields, quotes] = await Promise.all([
        axios.get('http://localhost:5000/api/fields', {withCredentials: true}),
        axios.get(`http://localhost:5000/api/quotes?farmer=${this.props.loggedInUser._id}`, {withCredentials: true})
      ]);

      this.setState({
        lists: {
          fields: fields.data,
          quotes: quotes.data.map(quote => quote._id),
        }
      });
    }

    if (this.props.loggedInUser.__t === "Contractor") {
      const [offers, vehicules] = await Promise.all([
        axios.get('http://localhost:5000/api/offers', {withCredentials: true}),
        axios.get('http://localhost:5000/api/vehicules', {withCredentials: true})
      ]);

      this.setState({
        lists: {
          offers: offers.data.map(offer => offer._id),
          vehicules: vehicules.data,
        }
      });
    }
  }

  handleTabSelect = (tab) => {
    this.setState({
      selectedTab: tab,
    });
  }

  render() {
    return (
      <div>
        <Navbar
          user={this.props.loggedInUser}
          tabSelectHandler={this.handleTabSelect}
          subTabs={this.state.lists}
          selectedTab={this.state.selectedTab}
        />
        <Switch>
          <Route exact path='/dashboard'>profile view</Route>
          <Route exact path='/dashboard/fields/:id' component={FieldDetails}/>
          <Route exact path='/dashboard/fields'>All Fields</Route>
          <Route exact path='/dashboard/quotes/:id' component={QuoteDetails}/>
          <Route exact path='/dashboard/quotes' component={Quotes}/>
          <Route exact path='/dashboard/offers'>All the offers I submitted</Route>
          <Route exact path='/dashboard/offers/:id' component={OfferDetails}/>
          <Route exact path='/dashboard/vehicules/:id' component={VehiculeDetails}/>
          <Route exact path='/dashboard/vehicules'>All my vehicules</Route>
          <Route exact path='/dashboard/services' component={Services}/>
        </Switch>
      </div>
    )
  }
}
