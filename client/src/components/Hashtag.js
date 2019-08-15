import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const Hashtag = () => {
  const [hashtags, setHashtags] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchHashtags = async () => {
      const hashtagList = await axios.get('/api/hashtag');
      setHashtags(hashtagList.data);
    };
    fetchHashtags();
  }, [clicked]);

  const sendDelete = id => async () => {
    try {
      await axios.delete(`/api/hashtag/${id}`);
      setClicked(!clicked);
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };

  const hashtagDisplay = hashtags.map(hashtag => (
    <tbody key={hashtag._id}>
      <tr>
        <td>{hashtag.name} </td>
        <td>
          <div className="btn-col">
            <a href={sendDelete(hashtag._id)}>
              <i class="far fa-trash-alt" style={{ cursor: 'pointer' }} />
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  ));

  const hashtagTable = (
    <>
      <Col xs md={6} lg={6}>
        <Table striped hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>
                <h4>Hashtagit</h4>
              </th>
            </tr>
          </thead>
          {hashtagDisplay}
        </Table>
      </Col>
    </>
  );

  // Form input handler
  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const addHashtag = () => {
    const userObject = {
      name: newName
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      axios.post('/api/hashtag', userObject, config);
      setNewName('');
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };

  const sendForm = event => {
    event.preventDefault();
    setClicked(!clicked);
    console.log(clicked);
    addHashtag();
  };

  return (
    <>
      <Col xs md={6} lg={6} className="hashtag-form">
        <h1>Hashtagit</h1>
        <br />
        <Form onSubmit={sendForm}>
          <Form.Group controlId="formHashtag">
            <Form.Label>
              <strong>Luo uusi hashtag</strong>
            </Form.Label>
            <Form.Control
              type="word"
              placeholder="hashtag"
              value={newName}
              onChange={handleNameChange}
            />
            <Form.Text className="text-muted" />
            <div className="btn-col">
              <Button size="sm" variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Col>
      <br />

      <div>
        {hashtagTable}
        <br />
      </div>
    </>
  );
};

export default Hashtag;
