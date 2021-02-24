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
    };

    return (

      <>
        <Link to='/dashboard'>
          Profile: {this.props.user.username}
        </Link>
        {tabs.map(tab => {
         return (
           <Link to={`/dashboard/${tab}`} key={tab}>
            <div onClick={() => this.props.tabSelectHandler(tab)}>{tab}</div>
            {this.props.selectedTab === tab && this.props.subTabs[tab]?.map((item, i) => {
              return <Link key={item + i} to={`/dashboard/${tab}/${item}`}>{tab} {i}</Link>
            })}
          </Link>
          )})}
      </>
    )
  }
}
