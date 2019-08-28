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
import Landing from './components/Landing';
import Settings from './components/Settings';
import Account from './components/Account';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setToken } from './actions/login';
import { loadUser } from './actions/login.js';
import store from './store';
import './styles.scss';

if (localStorage.token) {
  setToken(localStorage.token);
}

function PrivateRouteSettings({ component: Settings, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.token ? (
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

function PrivateRouteProfile({ component: Account, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.token ? (
          <Account {...props} />
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
        <Container className="bgimage">
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/calendar" component={Calendar} />
                <PrivateRouteSettings
                  exact
                  path="/settings"
                  component={Settings}
                />
                <PrivateRouteProfile
                  exact
                  path="/account"
                  component={Account}
                />
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
