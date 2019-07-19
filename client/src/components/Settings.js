import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const Settings = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await axios('http://localhost:5000/api/user');
      setUsers(userList.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="cardContainer">
      <CardDeck>
        {users.map(user => (
          <Card
            className="cardSettings"
            border="light"
            style={{ width: '24rem' }}
          >
            <Card.Header>{user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
};

export default Settings;
