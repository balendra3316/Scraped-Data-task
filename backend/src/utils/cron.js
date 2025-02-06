// backend/src/utils/cron.js
import cron from 'node-cron';
import { scrapeEvents } from '../services/scraper.js';


export function setupCronJobs() {
 
  cron.schedule('0 0 * * *', async () => {
    console.log('Daily event scraping started');
    await scrapeEvents();
  });

  
  cron.schedule('0 1 * * *', async () => {
    console.log('Cleaning up old events');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    try {
      await Event.deleteMany({ 
        date: { $lt: thirtyDaysAgo } 
      });
      console.log('Old events cleaned up');
    } catch (error) {
      console.error('Error cleaning up events:', error);
    }
  });
}