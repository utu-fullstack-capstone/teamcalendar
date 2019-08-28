import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import EditEventModal from './EditEventModal';

function Calendar(props) {
  const { teamFilter } = props;
  // for updating calendar events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('teamFilter', teamFilter);
      if (teamFilter === null) {
        const events = await axios(`/api/event/`);
        setEvents(events.data);
      } else {
        const events = await axios(`/api/event/teams/${teamFilter}`);
        setEvents(events.data);
      }
    };

    fetchEvents();
  }, [teamFilter]);
  return (
    <div class='mb-4'>
      <FullCalendar
        //editable={true}
        events={events}
        defaultView='dayGridMonth'
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrapPlugin,
          interactionPlugin
        ]}
        themeSystem='bootstrap'
        contentHeight={500}
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
          right: 'dayGridMonth,timeGridWeek,listWeek'
        }}
        allDaySlot={false}
        allDayDefault={false}
        locale='fi'
        weekNumbers={true}
        eventLimit={true} // allow "more" link when too many events
      />
    </div>
  );
}

export default Calendar;
