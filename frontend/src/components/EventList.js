'use client';
import EventCard from './EventCard';

export default function EventList({ events }) {
  if (events.length === 0) {
    return <p className="text-center text-gray-500">No events found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}