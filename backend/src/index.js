// backend/src/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron';
import * as dotenv from 'dotenv';
import { scrapeEvents } from './services/scraper.js';
import eventRoutes from './routes/events.js';
import subscriberRoutes from './routes/subscribers.js';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Schedule scraping every 24 hours
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily event scraping');
  await scrapeEvents();
});



scrapeEvents();


app.get('/', (req, res) => {
  res.send('Backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});