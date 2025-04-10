<!-- README.md -->
# Student Report Card System

A modern React-based student report card system with PostgreSQL backend, replacing the original Google Apps Script implementation.

![System Screenshot](client/src/assets/screenshot.png)

## Features

- **Student Management**:
  - Add, edit, and delete student records
  - Track admission numbers, grades, and schools

- **Report Generation**:
  - Create detailed academic reports for each student
  - Automatic calculation of total marks and performance levels
  - PDF export functionality

- **Performance Analysis**:
  - Class-wide performance statistics
  - Subject-wise performance breakdowns
  - Visual charts and graphs

- **System Administration**:
  - Manage schools and grades
  - Configure academic terms

## Technologies Used

- **Frontend**:
  - React 18
  - Vite
  - jsPDF + html2canvas for PDF generation
  - Chart.js for data visualization
  - Pure CSS (no utility frameworks)

- **Backend**:
  - Node.js + Express
  - PostgreSQL
  - RESTful API design

- **Styling**:
  - Manchester City FC inspired color scheme (#6CB4EE primary)
  - Responsive design
  - Print-friendly reports

## Installation

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- Git

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/student-report-system.git
   cd student-report-system

   <!-- Set up the database: -->
   psql -f database/init.sql
psql -d student_reports -f database/migrations/001_create_students_table.sql
psql -d student_reports -f database/migrations/002_create_reports_table.sql
# Optional: Seed sample data
psql -d student_reports -f database/seeds/students_seed.sql
psql -d student_reports -f database/seeds/reports_seed.sql

<!-- Configure backend: -->

cd server
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm install

<!-- Configure frontend: -->

cd ../client
npm install

<!-- Running the Application -->

 <!-- Start the backend server: -->

 cd server
npm start

<!-- Start the frontend development server: -->

cd client
npm run dev

<!-- Access the application: -->
Open http://localhost:5173 in your browser


<!-- Project Structure -->

student-report-system/
├── client/                   # React frontend
│   ├── public/               # Static assets
│   ├── src/                  # Application source code
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Frontend dependencies
├── server/                   # Node.js backend
│   ├── config/               # Database configuration
│   ├── controllers/          # API controllers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── server.js             # Server entry point
│   └── package.json          # Backend dependencies
├── database/                 # Database scripts
│   ├── migrations/           # Schema migrations
│   ├── seeds/                # Sample data
│   └── init.sql              # Database initialization
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation


<!-- Configuration
Backend Environment Variables

Create a .env file in the server directory: -->

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=student_reports
PORT=5000


<!-- Frontend Proxy -->

The Vite configuration proxies API requests to the backend server (configured in client/vite.config.js).

<!-- Deployment

For production deployment, you'll need to:

    Build the frontend: -->

    cd client
npm run build


<!-- License -->

This project is licensed under the MIT License.


<!-- Acknowledgements

    Original Google Apps Script implementation by [Your Name]

    Manchester City FC color inspiration
-->


  <!-- package.json Files -->
<!-- client/package.json -->

{
  "name": "student-report-client",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "chart.js": "^4.4.0",
    "html2canvas": "^1.4.1",
    "jspdf": "^2.5.1",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.15",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.29",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}


<!-- server/package.json -->

{
  "name": "student-report-server",
  "version": "1.0.0",
  "description": "Backend for Student Report System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "migrate": "psql -d student_reports -f database/migrations/001_create_students_table.sql && psql -d student_reports -f database/migrations/002_create_reports_table.sql",
    "seed": "psql -d student_reports -f database/seeds/students_seed.sql && psql -d student_reports -f database/seeds/reports_seed.sql"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.2",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3"
  }
}



