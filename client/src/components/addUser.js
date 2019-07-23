import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import EditUsers from './editUsers';
import { Link } from 'react-router-dom';

// const createUser = async () =>{

// }

const UserProfile = () => {
  // Prefent Default
  const addUser = async event => {
    event.preventDefault();
    const userObject = {
      name: newName,
      email: newEmail,
      password: newPassword,
      admin: newStatus,
      date: new Date().toISOString()
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user',
        userObject,
        config
      );
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setStatus(false);
      setMessage(
        <Alert className='maTo' variant='primary'>
          User added to the DB
        </Alert>
      );

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.log('error Message', error.response.data.errors[0].msg);
      const errorMsg = error.response.data.errors;
      const msgList = errorMsg.map(element => <p>{element.msg}</p>);
      setMessage(
        <Alert className='maTo' variant='primary'>
          {msgList}
        </Alert>
      );

      setTimeout(() => {
        setStatus(false);
      }, 3000);
    }
  };

  // Input Control Elements
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newStatus, setStatus] = useState(false);
  const [newMessage, setMessage] = useState('');

  // Input Handler
  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleEmailChange = event => {
    console.log(event.target.value);
    setNewEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    console.log(event.target.value);
    setNewPassword(event.target.value);
  };

  return (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser highlight' border='light'>
        <Card.Header>Add New User</Card.Header>
        <Card.Body>
          <Card.Title />
          <Card.Text>
            <form onSubmit={addUser}>
              <label>Name</label>
              <br />
              <input value={newName} onChange={handleNameChange} />
              <label>email</label>
              <br />
              <input value={newEmail} onChange={handleEmailChange} />
              <br />
              <label>password</label>
              <br />
              <input value={newPassword} onChange={handlePasswordChange} />
              <br />
              <label>Click Admin if the user need Admin status</label>
              <br />
              <input
                type='checkbox'
                name='auth'
                onChange={() => {
                  setStatus(true);
                  console.log(newStatus);
                }}
              />{' '}
              <label>Admin</label>
              <br />
              <br />
              <Button className='buttonMargin' variant='primary' type='submit'>
                Save New User
              </Button>
              <Link to='/settings'>
                <Button className='buttonMargin' variant='primary'>
                  back to settings
                </Button>
              </Link>
            </form>

            {newMessage}
          </Card.Text>
        </Card.Body>
      </Card>

      <EditUsers />
    </div>
  );
};

export default UserProfile;
