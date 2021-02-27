import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    const userType = this.props.user.__t;
    let tabs = [];

    switch (userType) {
      case "Farmer":
        tabs = ["fields", "quotes"];
        break;
      case "Contractor":
        tabs = ["quotes", "offers", "vehicules", "services"];
        break;
    }

  return (
    <>
      <Link to='/dashboard/profile' onClick={() => this.props.tabSelectHandler('profile')}>
        Profile: {this.props.user.username}
      </Link>
      {tabs.map(tab => {
        return (
          <div key={tab}>
            <Link to={`/dashboard/${tab}`} onClick={() => this.props.tabSelectHandler(tab)}>{tab}</Link>
            <ul>
              {this.props.selectedTab === tab && this.props.subTabs[tab]?.map((ele, i) => {
                return (
                  <Link key={tab + i} to={`/dashboard/${tab}/${ele}`}>
                    {tab} {i + 1}
                  </Link>
                );
              })}
            </ul>
          </div>
        )
      })}
    </>
  )
  }
}