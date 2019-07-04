import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar';
import Feed from './components/Feed';
import Calendar from './components/Calendar';
import PIP from './components/PIP';
import Login from './components/Login';

const App = () => (
  <Router>
    <Fragment>
      <NavBar />
      <div>
        <Route exact path='/' component={Feed} />
        <Switch>
          <Route exact path='/feed' component={Feed} />
          <Route exact path='/calendar' component={Calendar} />
          <Route exact path='/pip' component={PIP} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Fragment>
  </Router>
);

export default App;
