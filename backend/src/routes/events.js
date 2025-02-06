// backend/src/routes/events.js
import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

// Get all events
// router.get('/', async (req, res) => {
//   try {
//     const { category, sortBy = 'date' } = req.query;
//     let query = {};
    
//     if (category) {
//       query.category = category;
//     }

//     const events = await Event.find(query)
//       .sort({ [sortBy]: 1 })
//       .limit(50);  // Limit to 50 events to prevent overwhelming response

//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching events', error: error.message });
//   }
// });



router.get('/', async (req, res) => {
    try {
      console.log("Fetching events from MongoDB...");
  
      const events = await Event.find().sort({ date: 1 }).limit(50);
  
    // console.log("Events Fetched:", events); // Log the result
  
      if (events.length === 0) {
        //console.log("No events found in database.");
        return res.status(404).json({ message: "No events found" });
      }
  
      res.json(events);
    } catch (error) {
     // console.error("Error fetching events:", error);
      res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  });
  

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

export default router;