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
        <Link to='/dashboard' onClick={() => this.props.tabSelectHandler('profile')}>
          Profile: {this.props.user.username}
        </Link>

        {tabs.map(tab => {
          const hasSubTabs = !!this.props.subTabs[tab];

          if (hasSubTabs) {
            return (
              <div key={tab} onClick={() => this.props.tabSelectHandler(tab)} style={{cursor: 'pointer'}}>
                {tab}
                {this.props.selectedTab === tab && hasSubTabs && this.props.subTabs[tab].map((item, i) => {
                  return (
                    <Link key={item + i} to={`/dashboard/${tab}/${item}`}>
                      {tab} {i}
                    </Link>
                  );
                })}
              </div>
            );
          }

          return (
            <Link to={`/dashboard/${tab}`} key={tab} onClick={() => this.props.tabSelectHandler(tab)}>
              {tab}
            </Link>
          );
        })}
      </>
    )
  }
}
