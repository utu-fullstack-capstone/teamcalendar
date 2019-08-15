import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import store from '../store';

const UserProfile = () => {
  const user = store.getState().loginReducer.user;

  return (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser' border='light'>
        <Card.Header>Edit your profile {user.email}</Card.Header>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.email}</Card.Text>
          <Button className='buttonMargin' variant='primary'>
            Edit profiles
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
