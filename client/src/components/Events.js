import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

function Feed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      let team_id = '5d2ed5e87d75e870f057c2f0';
      const events = await axios(`/api/event/team_id/${team_id}`);
      setEvents(events.data);
    };

    fetchEvents();
    console.log(events);
  }, []);

  return (
    <CardColumns>
      {events.map(event => (
        <Card key={event.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
              <i className='fab fa-twitter' /> {event.id}
            </Card.Title>
            <Card.Text>{event.id}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
}

export default Feed;
