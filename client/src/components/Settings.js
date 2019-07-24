import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

const Settings = ({ user }) => {
  const [users, setUsers] = useState([]);
  // Variable "deleted" changes its value every time when Delete-button is clicked
  // and useEffect -hook is listening that change and renders the userlist again when a user is deleted.
  const [deleted, setDeleted] = useState(false);
  const [userAdded, setUserAdded] = useState(false);

  const [showAddUser, setShowAddUser] = useState(true);
  const [showUserList, setShowUserList] = useState(true);
  const [showOwnProfile, setShowOwnProfile] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await axios.get('http://localhost:5000/api/user');
      setUsers(userList.data);
    };
    fetchUsers();
  }, [deleted, userAdded]);

  const deleteProfile = id => async () => {
    let deleteClick = await confirm('Are you sure?'); //eslint-disable-line
    if (deleteClick) {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setDeleted(!deleted);
    }
  };

  // Input Control Elements
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newStatus, setStatus] = useState(false);
  // Prefent Default
  const addUser = event => {
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
      axios.post('http://localhost:5000/api/user', userObject, config);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setStatus(false);
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };

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

  const sendForm = event => {
    event.preventDefault();
    setUserAdded(!userAdded);
    console.log(userAdded);
    addUser();
  };

  const addUserView = (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser highlight' border='light'>
        <Card.Header>Add New User</Card.Header>
        <Card.Body>
          <Card.Title />
          <Card.Text>
            <form onSubmit={sendForm}>
              <label>Name</label>
              <br />
              <input value={newName} onChange={handleNameChange} />
              <br />
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
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  const userList = (
    <div>
      <div className='cardContainer'>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {' '}
                <Button
                  className='buttonMargin'
                  variant='primary'
                  onClick={deleteProfile(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );

  const ownProfile = (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser' border='light'>
        <Card.Header>{user.name}</Card.Header>
        <Card.Body>
          <Card.Title>{user.email}</Card.Title>
          <Card.Text>some personal information</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className='container'>
      <div>
        <Button
          className='buttonMargin'
          onClick={() => setShowAddUser(!showAddUser)}
        >
          {showAddUser ? 'Add User' : 'Hide Add User'}
        </Button>{' '}
        <Button
          className='buttonMargin'
          onClick={() => setShowUserList(!showUserList)}
        >
          {showUserList ? 'Show User' : 'Hide User'}
        </Button>{' '}
        <Button
          className='buttonMargin'
          onClick={() => setShowOwnProfile(!showOwnProfile)}
        >
          {showOwnProfile ? 'Own Profile' : 'Hide Profile'}
        </Button>{' '}
      </div>
      {showAddUser ? '' : addUserView}
      {showUserList ? '' : userList}
      {showOwnProfile ? '' : ownProfile}
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
)(Settings);
