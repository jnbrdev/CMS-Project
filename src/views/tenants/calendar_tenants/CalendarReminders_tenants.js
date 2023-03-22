import React, { useState } from 'react';
import moment from 'moment';
import "../../../all-views-scss/_eventcalendar.scss";

function CalendarReminders_tenants() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', date: '2023-03-07' },
    { id: 2, title: 'Event 2', date: '2023-03-14' },
    { id: 3, title: 'Event 3', date: '2023-03-22' },
  ]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const editEvent = (id, newTitle) => {
    setEvents(
      events.map((event) => (event.id === id ? { ...event, title: newTitle } : event))
    );
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (value) => {
    setSelectedDate(selectedDate.clone().add(value, 'month'));
  };

  const filteredEvents = events.filter((event) =>
    moment(event.date).isSame(selectedDate, 'month')
  );

  const daysInMonth = selectedDate.daysInMonth();
  const monthStart = selectedDate.clone().startOf('month').day();
  const monthEnd = selectedDate.clone().endOf('month').day();

  const days = [];

  for (let i = 1; i <= daysInMonth + monthStart - 1; i++) {
    const day = moment(selectedDate).date(i - monthStart + 1);
    const isToday = day.isSame(moment(), 'day');
    const isCurrentMonth = day.isSame(selectedDate, 'month');
    const eventsForDay = filteredEvents.filter((event) => moment(event.date).isSame(day, 'day'));

    days.push(
      <div
        key={i}
        className={`day ${isToday ? 'today' : ''} ${isCurrentMonth ? 'current-month' : ''}`}
        onClick={() => handleDateClick(day)}
      >
        {i <= monthStart - 1 || i > daysInMonth + monthStart - 1 ? '' : day.date()}
        <div className='events'>
          {eventsForDay.map((event) => (
            <div key={event.id} className='event'>
              <div className='title'>{event.title}</div>
              <div className='actions'>
                <button onClick={() => editEvent(event.id, prompt('Enter new event title'))}>
                  Edit
                </button>
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='event-calendar'>
      <div className='month-label'>
        <button onClick={() => handleMonthChange(-1)}>Prev</button>
        <div>{selectedDate.format('MMMM YYYY')}</div>
        <button onClick={() => handleMonthChange(1)}>Next</button>
      </div>
      <div className='weekdays'>
        <div className='weekday'>Sun</div>
        <div className='weekday'>Mon</div>
        <div className='weekday'>Tue</div>
        <div className='weekday'>Wed</div>
        <div className='weekday'>Thu</div>
    <div className='weekday'>Fri</div>
    <div className='weekday'>Sat</div>
  </div>
  <div className='days'>{days}</div>
</div>
);
}

export default CalendarReminders_tenants;
