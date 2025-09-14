# Auto MPG React App

This project is a **data-driven React single-page application (SPA)** for exploring the Automotive Fuel Economy dataset.  
It includes a simple **Node.js/Express backend** that serves the CSV as JSON, and a **React frontend** with client-side routing, login, favorites, and visualization.

---

## Features

- **Client-side routing** (React Router) with at least five routes:
  - `/` — Home
  - `/dashboard` — Interactive dashboard with filtering, sorting, and charts
  - `/cars/:id` — Detailed view of a selected car
  - `/favorites` — User’s favorite cars (persists in localStorage)
  - `/about` — Project info
  - `/login` — Login/Create User page (for persistence)
- **Simple Login flow** (username-based)
- **Favorites tied to localStorage**
- **Interactive data visualization** (chart)
- **Modern React stack** (React 18+, Zustand for state, Tailwind for styling)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Unzip** the project.
2. Open a terminal in the project root.
3. Install backend dependencies:

   ---bash--
   cd backend
   npm install

   ***

4. Install frontend dependencies:
   ---bash--
   cd ../frontend
   npm install
   ***

---

## Running the Project

1. Start the backend API:

   ---bash--
   cd backend
   npm start

   ***

   The API will run at `http://localhost:5000`.

2. Start the frontend React app:

   ---bash--
   cd ../frontend
   npm start

   ***

   The app will run at `http://localhost:3000`.

---

## Usage

- Visit `http://localhost:3000`.
- Go to `/login` to create or log in with a username.
- Explore `/dashboard` to filter, search, and view data.
- Click on a car for details at `/cars/:id`.
- Add cars to favorites — see them in `/favorites`.
- View project details on `/about`.

---

## Deployment

- Frontend: Can be deployed to Vercel, Netlify, etc.
- Backend: Can be deployed to Render, Fly.io, etc.
- Update API URLs in the frontend `.env` for production.
