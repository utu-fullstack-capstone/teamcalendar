import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });
  useEffect(() => {
    const user = store.getState().loginReducer.user;
    const fetchProfile = async () => {
      if (user._id) {
        const account = await axios.get(`/api/user/me/${user._id}`);
        setProfile(account.data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <h3>Profiili</h3>
      Nimi:
    </>
  );
};

export default Profile;
