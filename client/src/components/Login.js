import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import store from '../store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

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
    <Col xs md={6} lg={4}>
      <h3>Kirjaudu</h3>
      <p>Kirjautumalla pääset päivittämään kalenteritapahtumia</p>
      <Form onSubmit={submitLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control
            type="email"
            value={newEmail}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </Form.Group>
        <Col className="btn-col">
          <Button type="submit">
            <strong>Kirjaudu</strong>
          </Button>
        </Col>
      </Form>
    </Col>
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
