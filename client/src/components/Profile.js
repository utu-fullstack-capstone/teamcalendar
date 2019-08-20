import React, { useState } from 'react';
import { connect } from 'react-redux';
import store from '../store';

const Profile = () => {
  const user = store.getState().loginReducer.user;
  console.log(JSON.stringify(user));
  const { name } = user;
  console.log('name', name);
  return <h3>Profiili</h3>;
};

const mapStateToProps = state => ({
  user: state.loginReducer.user
});

export default Profile;
