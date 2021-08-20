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
              width: "8rem",
              color: "white",
            }}
          >
            <h1>VISION</h1>
          </Navbar.Brand>
          <Navbar.Toggle area-aria-controls="responsive-navbar" />
          <Navbar.Collapse id="responsive-navbar">
            <Nav className="justify-content-end">
              <Nav.Link href="/" style={{ color: "#fff" }}>
                Home
              </Nav.Link>
              <Nav.Link href="#AboutSection" style={{ color: "#fff" }}>
                About
              </Nav.Link>
              <Nav.Link href="/livejob" style={{ color: "#fff" }}>
                Live Job
              </Nav.Link>
              <Nav.Link href="/batchjob" style={{ color: "#fff" }}>
                Batch Job
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
