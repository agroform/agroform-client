import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import FieldDetails from '../farmer/field/FieldDetails';
import QuoteDetails from '../farmer/QuoteDetails';
import OfferDetails from '../contractor/OfferDetails';
import VehiculeDetails from '../contractor/VehiculeDetails';
import Services from '../contractor/Services';
import Quotes from '../contractor/Quotes';
import Fields from '../farmer/field/Fields';
import Profile from './Profile'

export default class Dashboard extends Component {
  state = {
    selectedTab: "profile",
    lists: {},
  }

  componentDidMount = async () => {
    if (this.props.loggedInUser.__t === "Farmer") {
      const [fields, quotes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/fields`, {withCredentials: true}),
        axios.get(`${process.env.REACT_APP_API_URL}/quotes?farmer=${this.props.loggedInUser._id}`, {withCredentials: true})
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
        axios.get(`${process.env.REACT_APP_API_URL}/offers`, {withCredentials: true}),
        axios.get(`${process.env.REACT_APP_API_URL}/vehicules`, {withCredentials: true})
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

  updateList = (id, list, add) => {
    const updatedLists = {...this.state.lists};
    add ? updatedLists[list].push(id) : updatedLists[list].splice(updatedLists[list].indexOf(id), 1);
    this.setState({
      lists: updatedLists
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
          <Route exact path='/dashboard'>dashboard index view</Route>
          <Route exact path='/dashboard/profile' component={Profile} />
          <Route exact path='/dashboard/fields/:id' render={(props) => <FieldDetails {...props} user={this.props.loggedInUser} updateList={this.updateList}/>}/>
          <Route exact path='/dashboard/fields' render={() => <Fields updateList={this.updateList} />}/>
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
