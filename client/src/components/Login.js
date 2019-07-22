import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import store from '../store';

const Login = ({ login, loginReducer }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = event => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setNewPassword(event.target.value);
  };

  const submitLogin = event => {
    event.preventDefault();
    login(newEmail, newPassword);
  };

  const loginText = store.getState().loginReducer.isLogin ? (
    'Olet kirjautunut sisään.'
  ) : (
    <form onSubmit={submitLogin}>
      Email:
      <br />
      <input value={newEmail} onChange={handleEmailChange} />
      <br />
      Password:
      <br />
      <input value={newPassword} onChange={handlePasswordChange} />
      <br />
      <button type="submit">Login</button>
    </form>
  );

  return <div>{!loginReducer.isLoading && loginText}</div>;
};

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
