import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar';
import Feed from './components/Feed';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Settings from './components/Settings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setToken } from './actions/login';
import './App.css';

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => (
  <Router>
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <Route exact path="/" component={Feed} />
            <Switch>
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Fragment>
  </Router>
);

export default App;
