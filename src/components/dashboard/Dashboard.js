import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import FieldDetails from '../farmer/field/FieldDetails';
import FarmersQuotes from '../farmer/quote/Quotes';
import AllQuotes from '../contractor/quote/Quotes';
import QuoteDetails from '../farmer/quote/QuoteDetails';
import Offers from '../contractor/offer/Offers';
import OfferDetails from '../contractor/offer/OfferDetails';
import Vehicules from '../contractor/Vehicules';
import Services from '../contractor/Services';
import Fields from '../farmer/field/Fields';
import Profile from './Profile'
import DashboardIndex from './DashboardIndex';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
          fields: fields.data.map(field => field._id),
          quotes: quotes.data.map(quote => quote._id),
        }
      });
    }

    if (this.props.loggedInUser.__t === "Contractor") {
      const [offers] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/offers`, {withCredentials: true}),
      ]);

      this.setState({
        lists: {
          offers: offers.data.map(offer => offer._id),
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
        <Container fluid>
        <Row>
        <Col sm={3}>
        <Navbar
          user={this.props.loggedInUser}
          tabSelectHandler={this.handleTabSelect}
          subTabs={this.state.lists}
          selectedTab={this.state.selectedTab}
          onLogout={this.props.onLogout}
        />
        </Col>
        <Col sm={9}>
          <Switch>
            <Route exact path='/dashboard' render={() => <DashboardIndex user={this.props.loggedInUser} />}/>
            <Route exact path='/dashboard/profile' component={Profile} />
            <Route exact path='/dashboard/fields/:id'
              render={(props) => {
                return <FieldDetails {...props}
                user={this.props.loggedInUser}
                updateList={this.updateList}/>
              }}
            />
            <Route exact path='/dashboard/fields' render={() => <Fields updateList={this.updateList} />}/>
            <Route exact path='/dashboard/quotes/:id'
              render={(props) => {
                return <QuoteDetails {...props}
                user={this.props.loggedInUser}
                updateList={this.updateList}/>
              }}
            />
            <Route exact path='/dashboard/quotes'
              render={ () => {
                return this.props.loggedInUser.__t === "Farmer" ?
                <FarmersQuotes updateList={this.updateList} user={this.props.loggedInUser}/> :
                <AllQuotes />
                }}
            />
            <Route exact path='/dashboard/offers' component={Offers} />
            <Route exact path='/dashboard/offers/:id'
              render={(props) => {
                return <OfferDetails {...props}
                  user={this.props.loggedInUser}
                  updateList={this.updateList}
                />
              }}
            />
            <Route exact path='/dashboard/vehicules'
              render = {(props) => {
                return <Vehicules {...props}
                user={this.props.loggedInUser}/>
              }}
                />
            <Route exact path='/dashboard/services'
              render = {(props) => {
                return <Services {...props}
                user={this.props.loggedInUser}/>
              }}
                />
          </Switch>
        </Col>
        </Row>
        </Container>
      </div>
    )
  }
}
