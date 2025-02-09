import puppeteer from "puppeteer";
import mongoose from "mongoose";
import Event from "../models/event.js";  // Import Event model

export async function scrapeEvents() {
  console.log("Starting Puppeteer Scraping...");

  // 🛑 Connect to MongoDB (if not already connected)
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  try {
    await page.goto("https://www.eventbrite.com/d/australia--sydney/all-events/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector(".event-card-details", { timeout: 60000 });

    const events = await page.evaluate(() => {
      const eventCards = document.querySelectorAll(".event-card-details");
      return Array.from(eventCards).map((card) => {
        const titleEl = card.querySelector("h3");
        const dateEl = card.querySelector("p:nth-of-type(1)");
        const locationEl = card.querySelector("p:nth-of-type(2)");
        const priceEl = card.querySelector(".DiscoverVerticalEventCard-module__priceWrapper___usWo6 p");
        const ticketLinkEl = card.querySelector("a.event-card-link");
        const imageEl = card.closest(".discover-search-desktop-card")?.querySelector("img");

        return {
          title: titleEl ? titleEl.innerText.trim() : "",
          description: "Event details on Eventbrite",
          date: dateEl ? dateEl.innerText.trim() : "",
          location: locationEl ? locationEl.innerText.trim() : "Sydney, Australia",
          imageUrl: imageEl ? imageEl.src : "",
          ticketUrl: ticketLinkEl ? ticketLinkEl.href : "",
          price: priceEl ? priceEl.innerText.trim() : "Varies",
          category: ticketLinkEl ? ticketLinkEl.getAttribute("data-event-category") : "General",
        };
      });
    });

    console.log(`Scraped ${events.length} events`);

    // ✅ Save events to MongoDB
    if (events.length > 0) {
      await mongoose.connection.collection("events").insertMany(events);
      console.log(`Successfully saved ${events.length} events to MongoDB`);
    } else {
      console.log("No new events found.");
    }
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
}
