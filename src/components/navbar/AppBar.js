import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./AppBar.css";

const AppBar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
                <Navbar.Brand href="#home">ChartV1</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="./chart">Chart</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default AppBar;
