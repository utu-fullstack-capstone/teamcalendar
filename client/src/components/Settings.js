import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await axios.get('http://localhost:5000/api/user');
      setUsers(userList.data);
      console.log('rendered');
    };
    fetchUsers();
  }, [deleted]);

  const deleteProfile = id => async () => {
    await console.log(`http://localhost:5000/api/user/${id}`);
    console.log('deleted', deleted);
    setDeleted(!deleted);
  };

  return (
    <div className="cardContainer">
      <CardColumns>
        {users.map(user => (
          <Card className="cardSettings" border="light" key={user._id}>
            <Card.Header>{user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" onClick={deleteProfile(user._id)}>
                Delete
              </Button>{' '}
              <Button variant="primary">Edit</Button>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default Settings;
