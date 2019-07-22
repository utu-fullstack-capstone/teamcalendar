import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LogedUser = () => {
  const [signedUser, setSignedUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await axios.get('http://localhost:5000/api/auth');
      setSignedUser(user);
    };
    fetchUserData();
  }, []);

  return (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser' border='light'>
        <Card.Header>{signedUser.name}</Card.Header>
        <Card.Body>
          <Card.Title>{signedUser.email}</Card.Title>
          <Card.Text>some personal information</Card.Text>
          <Link to='/settings/users'>
            <Button className='buttonMargin' variant='primary'>
              Users Overview
            </Button>
          </Link>

          <Link to='/settings/adduser'>
            <Button className='buttonMargin' variant='primary'>
              Add New User
            </Button>
          </Link>
          <Link to='/settings/profile'>
            <Button className='buttonMargin' variant='primary'>
              Edit profiles
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogedUser;
