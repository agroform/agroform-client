import React, { Component } from 'react';


export default class Navbar extends Component {
  render() {
    return (
      <>
       <div>{this.props.user.username}</div>
       {this.props.tabs.map(tab => {
         return (
           <div key={tab}>
            <div onClick={() => this.props.tabSelectHandler(tab)}>{tab}</div>
            {this.props.selectedTab === tab && this.props.selectedList.map((item, i) => {
              return <div key={i}>{tab} {i}</div>
            })}
          </div>
       )})}
      </>
    )
  }
}
