// src/components/Footer.js
import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => (
  <Navbar bg="white" className="shadow-sm mt-4">
    <Container className="justify-content-center">
      <span className="text-success">
        Direitos reservados a Henrique Novaes
      </span>
    </Container>
  </Navbar>
);

export default Footer;
