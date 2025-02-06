import puppeteer from "puppeteer";
import mongoose from "mongoose";
import Event from "../models/event.js";

export async function scrapeEvents() {
  console.log("Starting Puppeteer Scraping...");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(
      "https://www.eventbrite.com/d/australia--sydney/all-events/",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      }
    );

    // Ensure event cards are loaded
    await page.waitForSelector(".event-card-details", { timeout: 60000 });

    // Extract event details
    const events = await page.evaluate(() => {
      const eventCards = document.querySelectorAll(".event-card-details");
      return Array.from(eventCards).map((card) => {
        const titleEl = card.querySelector("h3");
        const dateEl = card.querySelector("p:nth-of-type(1)");
        const locationEl = card.querySelector("p:nth-of-type(2)");
        const priceEl = card.querySelector(
          ".DiscoverVerticalEventCard-module__priceWrapper___usWo6 p"
        );
        const ticketLinkEl = card.querySelector("a.event-card-link");
        const imageEl = card
          .closest(".discover-search-desktop-card")
          ?.querySelector("img");

        return {
          title: titleEl ? titleEl.innerText.trim() : "",
          description: "Event details on Eventbrite",
          date: dateEl ? dateEl.innerText.trim() : "",
          location: locationEl
            ? locationEl.innerText.trim()
            : "Sydney, Australia",
          imageUrl: imageEl ? imageEl.src : "",
          ticketUrl: ticketLinkEl ? ticketLinkEl.href : "",
          price: priceEl ? priceEl.innerText.trim() : "Varies",
          category: ticketLinkEl
            ? ticketLinkEl.getAttribute("data-event-category")
            : "General",
        };
      });
    });

    console.log(`Scraped ${events.length} events`);

    for (const event of events) {
      console.log("Saving Event:", event);

      await mongoose.connection.collection("events").insertOne(event);
    }

    console.log(`Successfully saved ${events.length} events to MongoDB`);
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
}
