import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Profile = ({ user }) => {
  console.log('user', user);
  const [userInfo, setUserInfo] = useState({ name: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userProfile = await axios.get(`/api/user/me/${user._id}`);
      console.log('data', userProfile.data);
      setUserInfo(userProfile.data);
    };
    fetchUserInfo();
  }, [user._id]);

  return (
    <>
      <div>Nimi: {userInfo.name}</div>
    </>
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
)(Profile);
