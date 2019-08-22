import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import EditEventModal from './EditEventModal';

function AdminCalendar() {
  // for updating calendar events
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({});
  // edit calendar event modal
  const [modalShow, setModalShow] = useState(false);

  const hideModal = event => {
    //event.preventDefault();
    setModalShow(false);
  };
  const handleDateClick = clickedDate => {
    //console.log(clickedDate);
    setNewEvent(clickedDate);
    setModalShow(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await axios(`/api/events/`);
      setEvents(events.data);
      //console.log(events.data);
    };

    fetchEvents();
  }, []);
  return (
    <Fragment>
      <FullCalendar
        events={events}
        defaultView='dayGridMonth'
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrapPlugin,
          interactionPlugin
        ]}
        themeSystem='bootstrap4'
        height='auto'
        buttonText={{
          today: 'Tänään',
          month: 'Kuukausi',
          week: 'Viikko',
          day: 'Päivä',
          list: 'Lista'
        }}
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        allDaySlot={false}
        locale='fi'
        dateClick={handleDateClick}
      />
      <EditEventModal newEvent={newEvent} show={modalShow} onHide={hideModal} />
    </Fragment>
  );
}

export default AdminCalendar;
