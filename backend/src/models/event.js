import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  imageUrl: String,
  ticketUrl: { type: String, required: true },
  price: String,
  category: String,
  scrapedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema, 'events');