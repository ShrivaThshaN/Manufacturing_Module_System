# Manufacturing Module System

This repository contains a full-stack **Manufacturing Module System** comprised of:

- A **PostgreSQL backend** managing Master Production Schedule (MPS) data.
- A **Node.js + Express API server** to read and serve data.
- A **React frontend** (TypeScript) displaying schedule data with pagination.

---

##  Features

- PostgreSQL-powered backend with table `MPS`, supporting CRUD and JSON export.
- Automatic generation of `mpsdata.json` from database queries.
- React GUI for viewing and paginating MPS data via REST API.
- Nicely styled tables with status indicators.

---

##  Folder Structure

manufacturing-module-structured/
├── backend/
│ ├── config/
│ │ └── db.js – PostgreSQL connection
│ ├── controllers/
│ │ └── mpsController.js – API logic + JSON file export
│ ├── routes/
│ │ └── mps.js – Routes setup
│ ├── data/
│ │ └── mpsdata.json – Auto-updated JSON data
│ ├── server.js – Entry point (Express)
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ └── pages/
│ │ └── MasterProductionSchedule.tsx – React table component
│ ├── package.json
│ └── vite.config.ts (or similar)
└── README.md

yaml
Copy code

---

##  Setup Instructions

### Backend

1. **Install dependencies**
   ```bash
   cd backend
   npm install
Configure database connection
Update config/db.js with your PostgreSQL credentials:

js
Copy code
module.exports = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MANM',
  password: 'yourPassword',
  port: 5432,
});
Start the server

bash
Copy code
npm run start
This will:

Serve API at http://localhost:5000/api/mps

Update data/mpsdata.json on every fetch request

Frontend
Install dependencies

bash
Copy code
cd frontend
npm install
Run in development mode

bash
Copy code
npm run dev
Ensure environment includes VITE_API_URL pointing to your backend, e.g.:

ini
Copy code
VITE_API_URL=http://localhost:5000
Access UI
Open http://localhost:3000 (or the port your framework uses) to view the MPS table.

How It Works
React fetches data from GET /api/mps.

The Express backend runs SQL query: SELECT * FROM MPS ORDER BY id ASC.

The results are converted to camelCase, saved into mpsdata.json, and sent as JSON response.

Frontend renders entries in paginated, styled table via React components.

Sample Commit Workflow
bash
Copy code
git status
git add controllers/mpsController.js
git add routes/mps.js
git add frontend/src/pages/MasterProductionSchedule.tsx
git commit -m "Map snake_case → camelCase + JSON export in controller"
git push origin main
Contribution & License
⭐ Contributions are welcome — whether it's bug fixes, tests, or features.

📝 Include .gitignore with node_modules/, .env, and other local files.
