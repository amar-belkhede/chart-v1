import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import BarChart from "./barChart/BarChart";
import CarsScatterPlot from "./carsScatterPlot/CarsScatterPlot";
import LineChart from "./lineChart/LineChart";
import Map from "./map/Map";
import "./Chart.css";

const chart = () => {
    function alertClicked() {
        alert("You clicked the third ListGroupItem");
    }
    return (
        <div
            style={{
                overflow: "auto",
                // height: "inherit",
                display: "block",
                maxWidth: "100%",

                maxHeight: "680px",
                marginLeft: 20,
            }}
        >
            {/* <Container>
                <Row
                    style={{
                        overflow: "auto",
                        // height: "inherit",
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "500px",
                    }}
                >
                    <Col md={9}>
                        <CarsScatterPlot />
                    </Col>
                   
                </Row>
                <Row
                  
                >
                    <LineChart />
                </Row>
            </Container> */}
            <Container>
                <Row>
                    <Col>
                        <CarsScatterPlot />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineChart />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Map />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default chart;
