import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await axios(`/api/event/`);
      setEvents(events.data);
      //console.log(events.data);
    };

    fetchEvents();
  }, []);
  return (
    <FullCalendar
      events={events}
      defaultView='dayGridMonth'
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
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
    />
  );
}
export default Calendar;
