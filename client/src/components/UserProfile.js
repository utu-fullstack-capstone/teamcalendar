import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

const UserProfile = () => {
  return (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser' border='light'>
        <Card.Header>Edit own Profile</Card.Header>
        <Card.Body>
          <Card.Title>Administrator</Card.Title>
          <Card.Text>
            Some Informaton, more informtions and some messages?
          </Card.Text>
          <Button className='buttonMargin' variant='primary'>
            Edit profiles
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
