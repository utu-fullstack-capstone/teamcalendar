import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';

const Login = ({ login, isLogin, isAdmin }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = event => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setNewPassword(event.target.value);
  };

  const submitLogin = async event => {
    event.preventDefault();
    login(newEmail, newPassword);
  };

  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = state => ({
  isLogin: state.isLogin,
  isAdmin: state.isAdmin
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
