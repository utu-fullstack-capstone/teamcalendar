import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditUsers from './editUsers';
import Profile from './UserProfile';
import AddUser from './addUser';

import SignedInUser from './signedInUser';

const Settings = () => {
  return (
    <Router>
      <SignedInUser />
      <Route exact path='/settings' component={EditUsers} />
      <Switch>
        <Route exact path='/settings/users' component={EditUsers} />
        <Route exact path='/settings/profile' component={Profile} />
        <Route exact path='/settings/adduser' component={AddUser} />
      </Switch>
    </Router>
  );
};

export default Settings;
