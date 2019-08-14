import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fi';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      let team_id = '5d2ed5e87d75e870f057c2f0';
      const events = await axios(`/api/event/team_id/${team_id}`);
      setEvents(events.data);
      setLoading(false);
    };

    fetchEvents();
    console.log(events);
  }, []);

  return (
    <Fragment>
      {isLoading && <Spinner animation='border' variant='primary' />}
      <CardColumns>
        {events.map(event => (
          <Card key={event.id} className='text-dark mb-4'>
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <div className='circle'>B</div>
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
                      Tänään
                      {/* {moment(event.created_at).fromNow()} */}
                      <i className='far fa-clock inforowicon' />
                      9:30 - 11:30
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
