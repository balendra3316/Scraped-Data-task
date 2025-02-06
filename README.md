# Sydney Events Scraper

## Project Overview
A web application that scrapes and displays events in Sydney, Australia from Eventbrite.

## Prerequisites
- Node.js (v16 or later)
- MongoDB

## Setup Instructions

1. Clone the Repository
```bash
git clone <your-repository-url>
```

2. Setup Backend
```bash
cd backend
npm install
```

3. Setup Frontend
```bash
cd frontend
npm install
```

4. Configure MongoDB
- Ensure MongoDB is running
- Update `.env` file in backend with your MongoDB connection string

5. Run the Application
- Start Backend:
```bash
cd backend
npm run dev
```

- Start Frontend:
```bash
cd frontend
npm run dev
```

6. Access the Application
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Features
- Automated event scraping from Eventbrite
- Event display with details
- Email capture for ticket redirection
- 24-hour automated refresh