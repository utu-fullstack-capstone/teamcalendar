import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

const EditUser = () => {
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
      <CardColumns>
        {users.map(user => (
          <Card className='cardSettings' border='light' key={user._id}>
            <Card.Header>{user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button
                className='buttonMargin'
                variant='primary'
                onClick={deleteProfile(user._id)}
              >
                Delete
              </Button>
              <Button className='buttonMargin' variant='primary'>
                Edit
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default EditUser;
