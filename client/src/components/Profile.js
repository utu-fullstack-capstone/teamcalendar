import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { preventDefault } from '@fullcalendar/core';

const Profile = ({ user }) => {
  console.log('user', user);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [clicked, setClicked] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userProfile = await axios.get(`/api/user/me/${user._id}`);
      console.log('data', userProfile.data);
      setUserInfo(userProfile.data);
      setNewName(userInfo.name);
      setNewEmail(userInfo.email);
    };
    fetchUserInfo();
  }, [clicked, user._id, userInfo.email, userInfo.name]);

  const [newPassword, setNewPassword] = useState('');

  const handleName = event => {
    setNewName(event.target.value);
  };

  const handleEmail = event => {
    setNewEmail(event.target.value);
  };

  const updateProfile = () => {
    const userObject = {
      name: newName,
      email: newEmail
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      axios.put(`/api/user/me/${user._id}`, userObject, config);
      setNewName('');
      setNewEmail('');
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };

  const sendUpdate = async event => {
    event.preventDefault();
    updateProfile();
    setClicked(!clicked);
  };

  return (
    <>
      <div className='profile'>
        <h3 style={{ color: 'white' }}>Muokkaa omia tietojasi</h3>
        <Form onSubmit={sendUpdate}>
          <Form.Group>
            <Form.Label>Nimi</Form.Label>
            <Form.Control
              placeholder='name'
              value={newName}
              onChange={handleName}
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Sähköposti</Form.Label>
            <Form.Control
              type='email'
              placeholder='Sähköposti'
              value={newEmail}
              onChange={handleEmail}
            />
          </Form.Group>
          <Col className='btn-col'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Form>
      </div>
    </>
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
)(Profile);
