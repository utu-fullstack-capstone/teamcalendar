import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fi';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function Events(props) {
  const { teamFilter } = props;
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('teamFilter', teamFilter);
      if (teamFilter === null) {
        const events = await axios(`/api/event/`);
        setEvents(events.data);
        setLoading(false);
      } else {
        const events = await axios(`/api/event/teams/${teamFilter}`);
        setEvents(events.data);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [teamFilter]);

  return (
    <Fragment>
      {isLoading && <Spinner animation='border' variant='primary' />}
      <CardColumns>
        {events.map(event => (
          <Card key={event.id} className='text-dark mb-4'>
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <div
                    className='circle'
                    style={{ background: event.backgroundColor }}
                  >
                    {}
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <h5 className='eventtitle'>{event.title}</h5>
                      <p className='eventtext'>{event.description}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='inforow'>
                      <i
                        className='far fa-calendar inforowicon'
                        style={{ paddingLeft: 0 }}
                      />
                      {moment(event.start).format('LL')}
                      <i className='far fa-clock inforowicon' />
                      {moment(event.start).format('HH:mm')} -{' '}
                      {moment(event.end).format('HH:mm')}
                      <i class='fas fa-map-marker-alt inforowicon' />
                      {event.location}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </Fragment>
  );
}

export default Events;
