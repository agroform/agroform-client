import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user._id,
      type: this.props.user.__t,
      username: this.props.user.username,
      email: this.props.user.email,
      password: this.props.user.passwordHash,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      country: this.props.user.country,
      city: this.props.user.city,
      street: this.props.user.street,
      userImg: this.props.user.userImg,
      logo: this.props.user.logo,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const email = this.state.email;
    const oldPassword = this.state.oldPassword;
    const newPassword = '';
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const country = this.state.country;
    const city = this.state.city;
    const street = this.state.street;
    const userImg = this.state.userImg;
    const logo = this.state.logo;

    axios
      .post(
        `http://localhost:5000/api/profile`,
        { username, email, oldPassword, newPassword, firstName, lastName, country, city, street, userImg, logo,},
        { withCredentials: true }
      )
      
      .then(
        () => {
            
          this.props.history.push(`/`);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.state.type === "Contractor" ? (
          <div>
            <strong>Company name</strong>
            <p>{this.state.username}</p>
            <label>Change Company Name</label>
            <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChangeUsername(e)}
            />
            <input type="submit" value="Save changes" />
            </form>
            <br />
          </div>
        ) : (
          <div>
            <strong>Farm name</strong>
            <p>{this.state.username}</p>
            <strong>Email</strong>
            <p>{this.state.email}</p>
          </div>
        )}
        <div>
          <strong>Email</strong>
          <p>{this.state.email}</p>
        </div>

        <Link to={"/"}>Back to dashboard</Link>
      </div>
    );
  }
}

export default Profile;
