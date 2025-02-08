'use client';
import { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EmailModal from '../components/EmailModal';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Sydney Events</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <EventList events={events} />
      )}
    </main>
  );
}