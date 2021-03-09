import React, { Component } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default class Vehicules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultVehicules: [],
      selectedVehicules: [],
    };
  }

  fetchVehiculesList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/vehiculeslist`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          defaultVehicules: [...responseFromApi.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchVehiculesSelect = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/vehicules`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          selectedVehicules: [...responseFromApi.data.vehicules],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleVehiculesSelect = (event) => {
    event.preventDefault();
    const id = event.target.value;
    console.log(id);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/vehicules`,
        { id },
        {
          withCredentials: true,
        }
      )
      .then((Selectvehicules) => {
        this.setState({
          selectedVehicules: [...Selectvehicules.data.vehicules],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteVehicules = (event) => {
    event.preventDefault();
    const id = event.target.value;

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/vehicules/${id}`,
        { deletedVehicules: id },
        { withCredentials: true }
      )
      .then(() => {
        const currentVehicules = this.state.selectedVehicules;
        this.setState({
          selectedVehicules: currentVehicules.filter(
            (vehicule) => vehicule._id !== id
          ),
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.fetchVehiculesList();
    this.fetchVehiculesSelect();
  }

  render() {
    return (
      <div>
        {this.state.defaultVehicules.map((allVehicules) => {
          return (
            <Button
              size="lg"
              name="services"
              value={allVehicules._id}
              onClick={this.handleVehiculesSelect}
            >
              {allVehicules.type} {allVehicules.brand}
            </Button>
          );
        })}

        <div>
          <h2>Your Vehicules:</h2>
          {this.state.selectedVehicules.map((selectedVehicules) => {
            return (
              <>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={selectedVehicules.image} />
                    <Card.Body>
                      <Card.Title>{selectedVehicules.vehicules}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Type: {selectedVehicules.type}
                      </ListGroupItem>
                      <ListGroupItem>
                        Brand: {selectedVehicules.brand}
                      </ListGroupItem>
                      <ListGroupItem>
                        Weight: {selectedVehicules.weight} kg
                      </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                      <Button
                        size="lg"
                        name="services"
                        value={selectedVehicules._id}
                        onClick={this.deleteVehicules}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                <br />
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
