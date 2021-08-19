import React from "react";
import "./navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar className="test" expand="sm">
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              backgroundColor: "#045198",
              width: "4rem",
              color: "white",
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
              <Nav.Link href="#AboutSection" style={{ color: "#045198" }}>
                About
              </Nav.Link>
              <Nav.Link href="/reportpage" style={{ color: "#045198" }}>
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
