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
      <label>Email</label>

      <input value={newEmail} onChange={handleEmailChange} />

      <label>Password</label>

      <input value={newPassword} onChange={handlePasswordChange} />

      <button type='submit'>Login</button>
    </form>
  );

  return (
    <div className='loginContainer'>
      <div className='innerLogin'>{!loginReducer.isLoading && loginText}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
