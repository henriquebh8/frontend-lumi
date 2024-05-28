import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const CustomNavbar = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm mb-4">
    <Container>
      <Navbar.Brand className="text-success" href="/">
        <strong>Henergy Dashboard</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="text-success">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/library" className="text-success">
            Biblioteca de Faturas
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default CustomNavbar;
