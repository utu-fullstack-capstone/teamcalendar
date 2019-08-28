import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import '../settings.css';

const UserControl = ({ user }) => {
  const [navigation, setNavigation] = useState({
    showUsers: true,
    addUser: false
  });

  const toggleShowUsers = () =>
    setNavigation({
      showUsers: true,
      addUser: false
    });
  const toggleAddUser = () =>
    setNavigation({
      showUsers: false,
      addUser: true
    });

  const [users, setUsers] = useState([]);
  // Variable "clicked" changes its value every time when Delete-button is clicked
  // and useEffect -hook is listening that change and renders the userlist again when a user is deleted.
  const [clicked, setClicked] = useState(false);

  // Search Input
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await axios.get('/api/user');
      setUsers(userList.data);
    };
    fetchUsers();
  }, [clicked]);

  const deleteProfile = id => async () => {
    let deleteClick = await confirm('Are you sure?'); //eslint-disable-line
    if (deleteClick) {
      await axios.delete(`/api/user/${id}`);
      setClicked(!clicked);
    }
  };

  // Input Control Elements
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newStatus, setStatus] = useState(false);
  // Prefent Default
  const addUser = event => {
    const userObject = {
      name: newName,
      email: newEmail,
      password: newPassword,
      admin: newStatus
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      axios.post('/api/user', userObject, config);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setStatus(false);
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };
  // Search ChangeHandler
  const filterName = event => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  // Input Handler
  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleEmailChange = event => {
    console.log(event.target.value);
    setNewEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    console.log(event.target.value);
    setNewPassword(event.target.value);
  };

  const sendForm = event => {
    event.preventDefault();
    setClicked(!clicked);
    addUser();
  };

  // Search Filter Function
  const displayedUsers = users.filter(element => {
    return element.name.toLowerCase().indexOf(input.toLowerCase()) !== -1;
  });

  const addUserView = (
    <div>
      <br />
      <Card className="containerOne bg-light">
        <Card.Header>
          <h4>Lisää uusi käyttäjä</h4>
        </Card.Header>
        <Card.Body className="containerTwo">
          <Card.Title />
          <Card.Text>
            <form onSubmit={sendForm} className="">
              <div className="innerContainerOne">
                <div className="contentOne">
                  <label>Nimi:</label>

                  <input value={newName} onChange={handleNameChange} />
                </div>
                <div className="contentOne">
                  <label>Sähköposti:</label>

                  <input value={newEmail} onChange={handleEmailChange} />
                </div>

                <div className="contentOne">
                  <label>Salasana:</label>

                  <input value={newPassword} onChange={handlePasswordChange} />
                </div>
              </div>
              <div className="innerContainerTwo">
                <div className="contentTwo">
                  <input
                    type="checkbox"
                    name="auth"
                    onChange={() => {
                      setStatus(true);
                      console.log(newStatus);
                    }}
                  />

                  <label>Admin</label>
                </div>
                <div className="contentOne">
                  <Button size="sm" variant="primary" type="submit">
                    Tallenna
                  </Button>
                </div>
              </div>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  // User List

  const userList = (
    <div>
      <div className="outerSearchField">
        <h4 className="containerTitle">Search for Users</h4>
        <div className="searchField">
          <form className="innerSearch">
            <label>Lastname</label>
            <input value={input} onChange={filterName} />
          </form>
        </div>
      </div>
      <div>
        <h4>User</h4>
        <Accordion defaultActiveKey="0">
          <Card className="bg-light">
            {displayedUsers.map(user => (
              <div key={user.id} className="userContainer">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={user._id}
                  className="userContainerHead"
                >
                  <div>
                    <strong>{user.name}</strong>
                  </div>
                  <div>{user.email}</div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={user._id} className="">
                  <Card.Body className="userContainerCollaps">
                    <div>{user.name}</div> More informaiton about the user!
                    Telefon, Adress, Liga, Groupe, Status
                    <div />
                    <button
                      className="buttonUser"
                      variant="primary"
                      onClick={deleteProfile(user._id)}
                    >
                      Delete
                    </button>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            ))}
          </Card>
        </Accordion>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div>
        <Button size="sm" variant="primary" onClick={toggleAddUser}>
          Lisää käyttäjä
        </Button>{' '}
        <Button size="sm" variant="primary" onClick={toggleShowUsers}>
          Muokkaa käyttäjiä
        </Button>{' '}
      </div>
      <div>
        {navigation.addUser && addUserView}
        {navigation.showUsers && userList}
      </div>
    </div>
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
)(UserControl);
