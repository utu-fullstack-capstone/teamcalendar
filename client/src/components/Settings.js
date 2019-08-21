import React, { useState, Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Hashtag from './Hashtag.js';
import UserControl from './UserControl';
import store from '../store';

const Settings = () => {
  const [navigation, setNavigation] = useState({
    users: true,
    teams: false,
    hashtags: false
  });

  const users = (
    <div>
      <UserControl />
    </div>
  );
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
    <Fragment>
      <h1 style={{ color: 'white' }} className="mt-5">
        TPS-Salibandy
      </h1>
      <Row>
        <Col xs={6}>
          <Dropdown className="float-right mb-4">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Asetukset
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleUsers}>Käyttäjät</Dropdown.Item>
              <Dropdown.Item onClick={toggleTeams}>Joukkueet</Dropdown.Item>
              <Dropdown.Item onClick={toggleHashtags}>Hashtagit</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <div>
        {navigation.users ? users : ''}
        {navigation.teams ? teams : ''}
        {navigation.hashtags ? hashtags : ''}
      </div>
    </Fragment>
  );
};

export default Settings;
