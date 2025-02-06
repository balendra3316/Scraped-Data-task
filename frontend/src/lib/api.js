// frontend/src/lib/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const subscribeToEvent = async (email, eventId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subscribers`, {
      email,
      eventId
    });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to event:', error);
    throw error;
  }
};