// backend/src/routes/subscribers.js
import express from 'express';
import Subscriber from '../models/subscriber.js';
import Event from '../models/event.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { email, eventId } = req.body;

    
    let subscriber = await Subscriber.findOne({ email });
    
    if (!subscriber) {
      subscriber = new Subscriber({ 
        email,
        events: [eventId]
      });
    } else {
      
      if (!subscriber.events.includes(eventId)) {
        subscriber.events.push(eventId);
      }
    }

    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await subscriber.save();

    res.status(201).json({
      message: 'Successfully subscribed',
      subscriber: {
        email: subscriber.email,
        eventCount: subscriber.events.length
      }
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      message: 'Error processing subscription', 
      error: error.message 
    });
  }
});


router.get('/:email', async (req, res) => {
  try {
    const subscriber = await Subscriber.findOne({ email: req.params.email })
      .populate('events');
    
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching subscriber', 
      error: error.message 
    });
  }
});

export default router;