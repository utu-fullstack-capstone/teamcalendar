import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';

const Password = ({ user }) => {
  const [newPassword, setNewPassword] = useState('');

  const handlePassword = event => {
    setNewPassword(event.target.value);
  };

  const updatePassword = event => {
    event.preventDefault();
    const userObject = {
      password: newPassword
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      axios.put(`/api/user/me/${user._id}`, userObject, config);
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };

  return (
    <div className="profile">
      <Form onSubmit={updatePassword}>
        <h3>Vaihda salasanasi</h3>
        <Form.Group>
          <Form.Label>Uusi salasana</Form.Label>
          <Form.Control
            placeholder="new password"
            value={newPassword}
            onChange={handlePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.loginReducer.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Password);
