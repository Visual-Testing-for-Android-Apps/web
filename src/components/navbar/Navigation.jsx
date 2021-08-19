import React from "react";
import "./navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar bg="light" expand="sm" fixed="top">
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              backgroundColor: "#045198",
              width: "4rem",
              color: "white",
              borderWidth: "thick",
            }}
          >
            VISION
          </Navbar.Brand>
          <Navbar.Toggle area-aria-controls="responsive-navbar" />
          <Navbar.Collapse id="responsive-navbar">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="/" style={{ color: "#045198" }}>
                Home
              </Nav.Link>
              <Nav.Link href="" style={{ color: "#045198" }}>
                About
              </Nav.Link>
              <Nav.Link href="" style={{ color: "#045198" }}>
                Live job
              </Nav.Link>
              <Nav.Link href="" style={{ color: "#045198" }}>
                Batch
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
