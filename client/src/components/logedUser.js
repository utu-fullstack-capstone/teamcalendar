import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

const LogedUser = () => {
  const [users, setUsers] = useState([]);
  // Variable "deleted" changes its value every time when Delete-button is clicked
  // and useEffect -hook is listening that change and renders the userlist again when a user is deleted.
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await axios.get('http://localhost:5000/api/user');
      setUsers(userList.data);
    };
    fetchUsers();
  }, [deleted]);

  const deleteProfile = id => async () => {
    let deleteClick = await confirm('Are you sure?'); //eslint-disable-line
    if (deleteClick) {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setDeleted(!deleted);
    }
  };

  return (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser' border='light'>
        <Card.Header>{user.name}</Card.Header>
        <Card.Body>
          <Card.Title>Signed in as {user.email}</Card.Title>
          <Card.Text>
            Some information for the addmin. 25 users last week. 12 new feeds.
          </Card.Text>
          <Button className='buttonMargin' variant='primary'>
            Add new user
          </Button>
          <Button className='buttonMargin' variant='primary'>
            Edit profiles
          </Button>
          <Button className='buttonMargin' variant='primary'>
            Own profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogedUser;
