import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function EditEventModal(props) {
  //const [isLoading, setLoading] = useState(true);
  const { newEvent } = props;
  const { date: initDate } = newEvent;
  // Event object
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [category, setCategory] = useState(); // MongoObjectId
  const [teams, setTeams] = useState([]); // Array of MongoObjectIds

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [date, setDate] = useState(null);

  const handleFromChange = time => {
    setFrom(time);
  };
  const handleToChange = time => {
    setTo(time);
  };
  const handleDateChange = eventDate => {
    setDate(eventDate);
  };
  const handleClose = () => {
    setDate(null);
    resetForm();
    props.onHide();
  };
  const resetForm = () => {
    setTitle();
    setDescription();
    setLocation();
    setFrom();
    setTo();
    setCategory();
    setTeams();
    setDate(null);
  };
  const addEvent = event => {
    const eventObject = {
      title: title,
      description: description,
      location: location,
      from: from,
      to: to,
      category: category,
      teams: teams
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      axios.post('http://localhost:5000/api/event', eventObject, config);
      console.log(eventObject);
    } catch (error) {
      const errorMsg = error.response.data.errors;
      const errorList = errorMsg.map(element => element.msg);
      console.log(errorList);
    }
  };
  const sendForm = event => {
    event.preventDefault();
    addEvent();
    handleClose();
  };

  useEffect(() => {
    // Get dropdown options from database
    const fetchCategories = async () => {
      let categories = await axios.get(`/api/category/`);
      setCategoryOptions(categories.data);
    };
    const fetchTeams = async () => {
      let teams = await axios.get(`/api/team/`);
      setTeamOptions(teams.data);
    };
    const fetchLocations = async () => {
      let locations = await axios.get(`/api/location/`);
      setLocationOptions(locations.data);
    };
    const fetchFormOptions = async () => {
      fetchTeams();
      fetchLocations();
      fetchCategories();
      //setLoading(false);
    };
    // Populate form dropdown options from database
    fetchFormOptions();
  }, [date, initDate]);
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Lisää uusi tapahtuma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={sendForm}>
          <Form.Group>
            <Form.Label>Joukkue</Form.Label>
            <Form.Control as='select'>
              {teamOptions &&
                teamOptions.map(team => <option>{team.name}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tapahtuman nimi</Form.Label>
            <Form.Control type='text' placeholder='Tapahtuman nimi' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kuvaus</Form.Label>
            <Form.Control as='textarea' rows='3' placeholder='Kuvaus' />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mr-3'>Päivämäärä</Form.Label>
            <DatePicker
              selected={date === null ? initDate : date}
              value={date === null ? initDate : date}
              onChange={handleDateChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Aloitus</Form.Label>
                <TimePicker
                  start='06:00'
                  end='22:00'
                  format={24}
                  onChange={handleFromChange}
                  value={from}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Lopetus</Form.Label>
                <TimePicker
                  start='06:00'
                  end='22:00'
                  format={24}
                  onChange={handleToChange}
                  value={to}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Paikka</Form.Label>
            <Form.Control as='select'>
              {locationOptions &&
                locationOptions.map(location => (
                  <option>{location.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Kategoria</Form.Label>
            <Form.Control as='select'>
              {categoryOptions &&
                categoryOptions.map(category => (
                  <option>{category.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className='float-right'>
            <Button variant='secondary' onClick={handleClose} className='mr-2'>
              Sulje
            </Button>
            <Button variant='primary' type='submit'>
              Tallenna
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
