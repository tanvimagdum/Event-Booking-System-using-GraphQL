import React from "react";
import './MainNavigation.css';
import '../../index.css';
import AuthContext from '../../context/auth-context';
import { Navbar, Nav, Container } from 'react-bootstrap';

function MainNavigation() {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Navbar collapseOnSelect className="bg-header-purple" expand="lg">
          <Container>  
          <Navbar.Brand className="ms-2">
            <h2 className="heading">
              ticketWise
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!context.token && (
                <Nav.Link className="nav-link text-dark ms-2" to="/auth">
                  User Authentication
                </Nav.Link>
              )}
              <Nav.Link className="nav-link text-dark ms-2" to="/events">
                Events
              </Nav.Link>
              {context.token && (
                <>
                  <Nav.Link className="nav-link text-dark ms-2" to="/bookings">
                    Bookings
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link text-dark ms-2"
                    onClick={context.logout}
                  >
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </AuthContext.Consumer>
  );
}

export default MainNavigation;
