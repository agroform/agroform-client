import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

export default class Dashboard extends Component {
  state = {
    selectedTab: "profile",
    selectedList: [],
    selectedItem: null,
  }

  handleTabSelect = async (tab) => {
    this.setState({
      selectedTab: tab,
      selectedItem: null,
      selectedList: [],
    });

    if (!["profile", "services"].includes(tab)) {
      const response = await axios.get(`http://localhost:5000/api/${tab}`, {withCredentials: true});
      this.setState({
        selectedList: response.data
     })
    }
  }

  render() {
    const userType = this.props.loggedInUser.__t;
    let tabs = [];
    switch (userType) {
      case "Farmer":
        tabs = ["fields", "quotes"];
        break;
      case "Contractor":
        tabs = ["offers", "vehicles", "services"];
        break;
    }

    return (
      <div>
        <Navbar
          user={this.props.loggedInUser}
          tabs={tabs}
          tabSelectHandler={this.handleTabSelect}
          selectedList={this.state.selectedList}
          selectedTab={this.state.selectedTab}
        />
      </div>
    )
  }
}
