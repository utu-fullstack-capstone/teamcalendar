import React, { Component, Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="light">
          <Navbar.Brand>Teamcalendar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/calendar">Calendar</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/feed">Feed</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/settings">Settings</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to="/login">
                Login <i class="fas fa-user" />
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}
