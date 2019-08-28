import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Profile from './Profile';
import Password from './Password';

const Account = () => {
  const [navigation, setNavigation] = useState({
    info: true,
    password: false
  });

  const info = (
    <div>
      <Profile />
    </div>
  );
  const password = (
    <div>
      <Password />
    </div>
  );

  const toggleInfo = () =>
    setNavigation({
      info: true,
      password: false
    });
  const togglePassword = () =>
    setNavigation({
      info: false,
      password: true
    });

  return (
    <>
      <div className="profile">
        <Button onClick={toggleInfo}>Muokkaa tietoja</Button>{' '}
        <Button onClick={togglePassword}>Vaihda salasana</Button>
        <br />
        <div className="profileContent">
          {navigation.info ? info : ''}
          {navigation.password ? password : ''}
        </div>
      </div>{' '}
    </>
  );
};

export default Account;
