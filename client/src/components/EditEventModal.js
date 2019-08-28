import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
registerLocale('fi', fi);
export default function EditEventModal(props) {
  //const [isLoading, setLoading] = useState(true);
  const { newEvent } = props;
  let { date: initDate } = newEvent;
  // Event object
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [category, setCategory] = useState(); // MongoObjectId
  const [backgroundColor, setBackgroundColor] = useState();
  const [teams, setTeams] = useState([]); // Array of MongoObjectIds

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [date, setDate] = useState(null);

  const handleTitleChange = event => {
    const { value } = event.target;
    setTitle(value);
    console.log('title', value);
  };
  const handleDescriptionChange = event => {
    const { value } = event.target;
    setDescription(value);
    console.log('description', value);
  };
  const handleTeamsChange = event => {
    let value = event.target.value;
    let valueArr = value.split(',');
    const teamid = valueArr[0];
    const teamcolor = valueArr[1];
    setTeams(teamid);
    setBackgroundColor(teamcolor);
    console.log('teamid', teamid);
    console.log('teamcolor', teamcolor);
  };
  const handleLocationChange = event => {
    const { value } = event.target;
    setLocation(value);
    console.log('location', value);
  };
  const handleCategoryChange = event => {
    const { value } = event.target;
    setCategory(value);
    console.log('category', value);
  };
  const handleStartChange = time => {
    setStart(time);
    console.log('start', time);
  };
  const handleEndChange = time => {
    setEnd(time);
    console.log('to', time);
  };
  const handleClose = () => {
    setStart(null);
    setEnd(null);
    resetForm();
    props.onHide();
  };
  const resetForm = () => {
    setTitle();
    setDescription();
    setLocation();
    setStart();
    setEnd();
    setCategory();
    setTeams();
    setDate(null);
    initDate = null;
  };
  const addEvent = event => {
    // Build a valid date object for the calendar event
    const eventObject = {
      title: title,
      description: description,
      location: location,
      start: start,
      end: end,
      category: category,
      teams: [teams],
      backgroundColor: backgroundColor
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
            <Form.Control as='select' onChange={handleTeamsChange}>
              {teamOptions &&
                teamOptions.map(team => (
                  <option key={team._id} value={[team._id, team.color]}>
                    {team.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tapahtuman nimi</Form.Label>
            <Form.Control
              type='text'
              name='title'
              placeholder='Tapahtuman nimi'
              onChange={handleTitleChange}
              value={title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kuvaus</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              name='description'
              placeholder='Kuvaus'
              onChange={handleDescriptionChange}
              value={description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mr-3'>Aloitus</Form.Label>
            <DatePicker
              selected={start === null ? initDate : start}
              value={start === null ? initDate : start}
              onChange={handleStartChange}
              locale={fi}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='aika'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mr-3'>Lopetus</Form.Label>
            <DatePicker
              selected={end === null ? initDate : end}
              value={end === null ? initDate : end}
              onChange={handleEndChange}
              locale={fi}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='aika'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Paikka</Form.Label>
            <Form.Control as='select' onChange={handleLocationChange}>
              {locationOptions &&
                locationOptions.map(location => (
                  <option key={location._id} value={location.name}>
                    {location.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Kategoria</Form.Label>
            <Form.Control as='select' onChange={handleCategoryChange}>
              {categoryOptions &&
                categoryOptions.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
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
