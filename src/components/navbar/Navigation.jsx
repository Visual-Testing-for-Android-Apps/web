import React from "react";
import "./navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar className="navbar" expand="sm">
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              backgroundColor: "#0476d9",
              width: "4rem",
              color: "white",
            }}
          >
            VISION
          </Navbar.Brand>
          <Navbar.Toggle area-aria-controls="responsive-navbar" />
          <Navbar.Collapse id="responsive-navbar">
            <Nav className="justify-content-end">
              <Nav.Link href="/" style={{ color: "#FFFFFF" }}>
                Home
              </Nav.Link>
              <Nav.Link href="#AboutSection" style={{ color: "#FFFFFF" }}>
                About
              </Nav.Link>
              <Nav.Link href="/livejob"  style={{ color: "#FFFFFF" }} >
                Live job
              </Nav.Link>
              <Nav.Link href="/batchjob"   style={{ color: "#FFFFFF" }}>
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
