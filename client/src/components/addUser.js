import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import EditUsers from './editUsers';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <div className='cardContainer'>
      <Card className='cardSettings signedUser highlight' border='light'>
        <Card.Header>Add New User</Card.Header>
        <Card.Body>
          <Card.Title>
            <form>
              <lable>Name</lable>
              <br />
              <input />
            </form>
          </Card.Title>
          <Card.Text>
            <form>
              <lable>email</lable>
              <br />
              <input />
              <br />
              <lable>password</lable>
              <br />
              <input />
            </form>
            Information about the user! <br />
            Users Address <br />
            Phone xxxxxxxxxx
          </Card.Text>
          <Link to='/settings'>
            <Button className='buttonMargin' variant='primary'>
              Save New User
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <EditUsers />
    </div>
  );
};

export default UserProfile;
