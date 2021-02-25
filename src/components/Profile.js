import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      type: this.props.user.__t,
      username: "",
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
    console.log("Submit running", this.state.username)
    event.preventDefault();

    const { username, email, password, firstName, lastName, country, city, street, userImg, logo,} = this.state;

    axios
      .post(
        `http://localhost:5000/api/profile`,
        { username, email, password, firstName, lastName, country, city, street, userImg, logo,},
        { withCredentials: true },
      )
      
      .then( (user) => {
        this.setState({
            username: username,
            email: "",
            userType: 'Farmer',
            password: "",
            isLoggedIn: true,})
      }, error => {
          console.log(error)
      })
  };
  
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        {this.state.type === "Contractor" ? (
          <div>
            <strong>Company name</strong>
            <p>{this.state.username === "" ? this.props.user.username : this.state.username }</p>
            <label>Change Company Name</label>
            <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
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
