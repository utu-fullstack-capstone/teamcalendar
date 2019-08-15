import React, { useState, useEffect } from 'react';
import Hashtag from './Hashtag.js';
import store from '../store';

const Settings = () => {
  const [navigation, setNavigation] = useState({
    users: true,
    teams: false,
    hashtags: false
  });

  const users = <div>Käyttäjät</div>;
  const teams = <div>Joukkueet</div>;
  const hashtags = (
    <div>
      <Hashtag />
    </div>
  );

  const toggleUsers = () =>
    setNavigation({
      users: true,
      teams: false,
      hashtags: false
    });
  const toggleTeams = () =>
    setNavigation({
      users: false,
      teams: true,
      hashtags: false
    });
  const toggleHashtags = () =>
    setNavigation({
      users: false,
      teams: false,
      hashtags: true
    });

  return (
    <div>
      <button onClick={toggleUsers}>Käyttäjät</button>
      {'    '}
      <button onClick={toggleTeams}>Joukkueet</button>
      {'    '}
      <button onClick={toggleHashtags}>Hashtagit</button>
      <div>
        {navigation.users ? users : ''}
        {navigation.teams ? teams : ''}
        {navigation.hashtags ? hashtags : ''}
      </div>
    </div>
  );
};

export default Settings;
