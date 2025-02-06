// frontend/src/components/EventCard.js
'use client';
import { useState } from 'react';
import EmailModal from './EmailModal';

export default function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);

  const handleGetTickets = () => {
    setShowModal(true);
  };

  const handleEmailSubmit = async (email) => {
    try {
      await fetch('http://localhost:5000/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, eventId: event._id }),
      });
      
      // Redirect to original ticket URL
      window.location.href = event.ticketUrl;
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-gray-600">{event.description}</p>
        <p className="mt-2">
          <span className="font-bold">Date:</span> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <span className="font-bold">Location:</span> {event.location}
        </p>
        {event.price && (
          <p>
            <span className="font-bold">Price:</span> {event.price}
          </p>
        )}
        <button
          onClick={handleGetTickets}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          GET TICKETS
        </button>
      </div>
      <EmailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
}
