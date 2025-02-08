// frontend/src/lib/api.js
import axios from 'axios';

//const API_BASE_URL = 'scraped-data-task-git-main-balendra3316s-projects.vercel.app/api';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const subscribeToEvent = async (email, eventId) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribers`, {
      email,
      eventId
    });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to event:', error);
    throw error;
  }
};