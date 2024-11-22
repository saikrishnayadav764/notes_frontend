# Notes Application Frontend

This is the frontend application for the **Notes Management System**, built with React.js. The application allows users to manage their notes, providing features like authentication, a user-friendly dashboard, and interactive UI components. The backend for this application is built using Node.js and is available [here](https://github.com/saikrishnayadav764/notes_backend).

## Features

- **Authentication**: Secure login and registration.
- **Dashboard**: Manage notes and tasks in an organized way.
- **Data Visualization**: Includes pie charts and other visual elements.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Backend Integration**: Seamless integration with the backend REST APIs.

## Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: CSS Modules and component-specific styles
- **State Management**: React Hooks
- **Data Visualization**: Custom components (like Pie Charts)

### Backend
The backend is built with Node.js, Express.js, and MongoDB, providing robust APIs for the frontend to interact with.

Find the backend repository here: [Notes Backend](https://github.com/saikrishnayadav764/notes_backend)

---

## File Structure

### Frontend
```
src/
├── assets/                     # Static assets like images and SVGs
│   ├── images/                 # Image assets
│   └── svg/                    # SVG assets
├── components/                 # Reusable React components
│   ├── About/                  # About page components
│   ├── DashboardPage/          # Dashboard components
│   │   ├── DashboardContainer/ # Main container for the dashboard
│   │   │   ├── Pie/            # Pie chart component
│   │   │   ├── dashboardContainer.styles.css
│   │   │   └── index.jsx
│   │   ├── DashNav/            # Navigation for the dashboard
│   │   ├── TasksContainer/     # Container for tasks management
│   │   ├── UserAccount/        # User account-related components
│   │   ├── DashboardPage.styles.css
│   │   └── index.jsx
│   ├── Home/                   # Home page components
│   │   ├── Navbar/             # Navigation bar
│   │   ├── authTabs.css        # Styling for authentication tabs
│   │   ├── AuthTabs.jsx        # Authentication tabs component
│   │   ├── login.css           # Login page styling
│   │   ├── Login.jsx           # Login page
│   │   ├── register.css        # Register page styling
│   │   ├── Register.jsx        # Register page
│   │   ├── Home.styles.css     # Home page styling
│   │   └── index.jsx
├── App.js                      # Main application component
├── index.css                   # Global styles
└── index.js                    # Application entry point
```

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB (for backend)

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/saikrishnayadav764/notes_frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd notes_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the application at `http://localhost:3000`.

### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/saikrishnayadav764/notes_backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd notes_backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the environment variables (add `.env` file as needed).
5. Start the backend server:
   ```bash
   npm start
   ```
6. The backend server will be available at `http://localhost:5000` (default port).

---

## Scripts

### Frontend
- `npm start`: Start the development server.
- `npm build`: Build the application for production.
- `npm test`: Run tests (if available).

### Backend
Refer to the [backend repository](https://github.com/saikrishnayadav764/notes_backend) for backend-specific scripts.
