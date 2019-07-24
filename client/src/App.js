import React, { useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import NavBar from './components/Navbar';
import Feed from './components/Feed';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Settings from './components/Settings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setToken } from './actions/login';
import { loadUser } from './actions/login.js';
import store from './store';
import './App.css';

if (localStorage.token) {
  setToken(localStorage.token);
}

function PrivateRoute({ component: Settings, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        store.getState().loginReducer.isLogin ? (
          <Settings {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
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
                <PrivateRoute exact path="/settings" component={Settings} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </Router>
  );
};

export default App;
