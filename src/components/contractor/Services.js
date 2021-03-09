import React, { Component } from "react";
import axios from "axios";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceList: [], //defaultServices
      serviceSelect: [], // selectedServices
    };
  }

  fetchServiceList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/servicelist`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          serviceList: [...responseFromApi.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchServiceSelect = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/services`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          serviceSelect: [...responseFromApi.data.services],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleServiceSelect = (event) => {
    event.preventDefault();
    const id = event.target.value;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/services`,
        { id },
        {
          withCredentials: true,
        }
      )
      .then((Selectservice) => {
        this.setState({
          serviceSelect: [...Selectservice.data.services],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteService = (event) => {
    event.preventDefault();
    const id = event.target.value;

    axios
      .put(`${process.env.REACT_APP_API_URL}/services/${id}`, {deletedService: id}, { withCredentials: true })
      .then(() => {
        const currentServices = this.state.serviceSelect;
        this.setState({
          serviceSelect: currentServices.filter(service => service._id !== id)
        })
      })
      .catch((err) => console.log(err));
  };


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
 
  componentDidMount() {
    this.fetchServiceList();
    this.fetchServiceSelect();
  }

  render() {
    return (
      <div>
        {this.state.serviceList.map((allService) => {
          if(allService.mainService === "Harvest") 
          return (
            <Button size="lg" name="services" value={allService._id} onClick={this.handleServiceSelect} className="roundBtn" variant="outline-warning">
              {allService.icon} {allService.service}
            </Button>
          ); else if (allService.mainService === "Crop Protection")
          return (
            <Button size="lg" name="services" value={allService._id} onClick={this.handleServiceSelect} className="roundBtn" variant="outline-info">
              {allService.icon} {allService.service}
            </Button>
            ); else if (allService.mainService === "Soil tillage")
          return (
            <Button size="lg" name="services" value={allService._id} onClick={this.handleServiceSelect} className="roundBtn" variant="outline-secondary">
              {allService.icon} {allService.service}
            </Button>
            ); else if (allService.mainService === "Sowing")
          return (
            <Button size="lg" name="services" value={allService._id} onClick={this.handleServiceSelect} className="roundBtn" variant="outline-primary">
              {allService.icon} {allService.service}
            </Button>
          ); else if (allService.mainService === "Fertilisation")
            return (
            <Button size="lg" name="services" value={allService._id} onClick={this.handleServiceSelect} className="roundBtn" variant="outline-dark">
              {allService.icon} {allService.service}
            </Button>)
        })}

        <div>
          <h2>Your service:</h2>
          {this.state.serviceSelect.map((selectService) => {
            return (
              [selectService.mainService === "Harvest" ? ['warning', 'IconHarvest'] :
               selectService.mainService === "Crop Protection" ? ['info', 'IconCropProtection']:
               selectService.mainService === "Soil tillage" ? ['secondary', 'IconSoilTillage']:
               selectService.mainService === "Sowing" ? ['primary', 'IconSowing'] : ['dark', 'IconFertilistion']].map (value => (
              <>
                <Container fluid>
                <Row>
                <Col xs={2} className={value[1]}>
           
                </Col>
                <Col xs={10}>
                  <Card border={value[0]} fluid="true">
                    <Card.Header>
                      <Row>
                        <Col xs={1}>{selectService.icon}</Col>
                        <Col xs={9}>{selectService.mainService}</Col>
                        <Col xs={2}>
                          <Button
                            size="lg"
                            name="services"
                            value={selectService._id}
                            onClick={this.deleteService}
                            variant="danger"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{selectService.service}</Card.Title>
                      <Card.Text>Description of Service</Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  </Row>
                </Container>
                <br />
              </>
            )))
          })}
        </div>
      </div>
    );
  }
}
