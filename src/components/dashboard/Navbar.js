import React, { Component } from 'react';
import axios from 'axios';

export default class Navbar extends Component {
  state = {
    selectedTab: "profile",
    selectedItem: null,
    selectedList: [],
  }

  handleTabSelect = async (tab) => {
    this.setState({
      selectedTab: tab,
      selectedItem: null,
      selectedList: [],
    });

    if (!["profile", "services"].includes(tab)) {
      console.log(tab);
      const res = await axios.get(`http://localhost:5000/api/${tab}`, {withCredentials: true});
      this.setState({
        selectedList: res.data
     })
    }
  }

  render() {
    const userType = this.props.user.__t;
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
      <>
       <div>{this.props.user.username}</div>
       {tabs.map(tab => {
         return <div>
          <div key={tab} onClick={() => this.handleTabSelect(tab)}>{tab}</div>
          {this.state.selectedTab === tab && this.state.selectedList.map((item, i) => {
            return <div>{tab} {i}</div>
          })}
         </div>
         })}
      </>
    )
  }
}
