import React from 'react';
import {Link} from 'react-router-dom';
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
                <Link className="nav-link text-dark ms-2" to="/auth">
                  User Authentication
                </Link>
              )}
              <Link className="nav-link text-dark ms-2" to="/events">
                Events
              </Link>
              {context.token && (
                <>
                  <Link className="nav-link text-dark ms-2" to="/bookings">
                    Bookings
                  </Link>
                  <Link
                    className="nav-link text-dark ms-2"
                    onClick={context.logout}
                  >
                    Logout
                  </Link>
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
