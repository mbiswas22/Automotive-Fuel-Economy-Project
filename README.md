# Automotive Fuel Economy Project

This project is a full-stack web application that visualizes the **Auto MPG dataset** with interactive charts, filters, and a favorites list. This is a  single-page app (SPA) for exploring, filtering, visualizing, and saving favorite cars.

- **Frontend:** React + Vite (deployed on [Vercel] https://automotive-fuel-economy-project.vercel.app/)  
- **Backend:** Express + Node.js (deployed on [Render] https://automotive-fuel-economy-project.onrender.com)  
- **Data:** Auto MPG dataset (`auto-mpg.csv`) is loaded into memory and served via a REST API.  

---

## 🚀 Features
- Browse cars with search, filter, and sort functionality.  
- View cars by **model year, cylinders, and MPG**.  
- Interactive **bar chart** powered by Chart.js.  
- Add/remove cars from a **favorites list** (stored locally in browser).
-  **Client-side routing** (React Router) with at least five routes:
  - `/` — Dashboard
  - `/dashboard` — Interactive dashboard with filtering, sorting, and charts
  - `/cars/:id` — Detailed view of a selected car
  - `/favorites` — User’s favorite cars (persists in localStorage)
  - `/about` — Project info
  - `/login` — Login page (for persistence)
- **Simple Login flow** (username-based)
- Backend REST API with pagination, query filtering, and health check.  

---

## 🗂 Project Structure
Automotive-Fuel-Economy-Project/
│
├── backend/ # Express server (API)
│ ├── data/ # Dataset files (CSV + JSON)
│ ├── index.js # Main backend entrypoint
│ └── package.json
│
├── frontend/ # React + Vite app
│ ├── src/
│ │ ├── pages/ # Pages and components
│ │ ├── store/ # Zustand store for favorites
│ │ └── config.js # API base config
│ ├── vite.config.js
│ └── package.json
│
└── README.md

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Unzip** the project.
2. Open a terminal in the project root.
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Project locally

1. Start the backend API:

   ---bash--
   cd backend
   npm run dev

   ***

   The API will run at `http://localhost:4000/api`.

  #### API Endpoints
  - GET /api/health → Health check
  - GET /api/cars → List cars (with optional filters: q, cyl, min_mpg, page, per)
  - GET /api/cars/:id → Get a single car by ID
     

3. Start the frontend React app:

   ```bash
   cd frontend
   npm run dev
   ```

   The app will run at `http://localhost:5173`.

---

## Usage

- Visit `http://localhost:5173`.
- Go to `/login` to create or log in with a username. (In this simple application we are using **username = 'testuser'** && **password = 'password'**)
- Explore `/dashboard` to filter, search, and view data.
- Click on a car for details at `/cars/:id`.
- Add cars to favorites — see them in `/favorites`.
- View project details on `/about`.

---

## 🌐 Deployment
**Backend Deployment (Render)**
1. Create a new Web Service on Render
2. Connect GitHub repo and select the backend folder.
3. Set Build Command:
 ```bash
   npm install
   ```
4. Set Start Command:
   ```bash
   node index.js
   ```
5. Deploy → Get backend URL (example:  https://automotive-fuel-economy-project.onrender.com).
6. API will be available at:
   https://automotive-fuel-economy-project.onrender.com/api/cars

---
**Frontend Deployment (Vercel)**
1. Go to Vercel and create a new project.
2. Import GitHub repo and select the frontend folder.
3. Add an Environment Variable in Vercel:
    Key: VITE_API_URL
    Value: https://automotive-fuel-economy-project.onrender.com)\/api
4. Deploy → Frontend will be live at a Vercel URL.

---
## ✅ Usage After Deployment
1.	Open the Vercel frontend URL.
2.	Login with a username.
3.	Navigate to Dashboard → explore data.
4.	Click on cars for details & mark favorites.
5.	Favorites persist across reloads.
---
## 📜 License
This project is for educational/demo purposes.

## Project screenshot:
<img width="630" height="613" alt="image" src="https://github.com/user-attachments/assets/4f37ed29-ed22-4504-b77c-159117cc8f38" />




