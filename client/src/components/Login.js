import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import store from '../store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
    <Row className='justify-content-center'>
      <Col xs md={8} lg={6}>
        <br />
        <br />
        <h3 style={{ color: 'white' }}>Kirjaudu</h3>
        <h5>Kirjautumalla pääset päivittämään kalenteritapahtumia</h5>
        <Form onSubmit={submitLogin}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='email'
              value={newEmail}
              onChange={handleEmailChange}
              placeholder='Sähköposti'
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Control
              type='password'
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder='Salasana'
            />
          </Form.Group>
          <Col className='btn-col'>
            <Button type='submit'>
              <strong>Kirjaudu</strong>
            </Button>
          </Col>
        </Form>
      </Col>
    </Row>
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
