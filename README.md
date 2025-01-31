# Event Management Application

## Overview

The **Event Management Application** is a platform developed to manage, organize, and display events. Built with ReactJS and tailwind CSS, this application allows users to create, update, delete, and view events with ease. It supports multi-language functionality (english and french), advanced filtering, sorting, pagination and also enables caching behaviour ensuring optimization.

---

## Features

### 1. **Event Listing**
   - Displays events in a card format with following detals:
     - Event Name
     - Location
     - Time
     - Organizer
     - Description
     - Image
     - Number of Guests
   - Supports **pagination** for seamless navigation.

### 2. **Event CRUD Operations**
   - **Create**: Add new events with formik enabling validations .
   - **Read**: View detailed information about each event.
   - **Update**: Edit existing events to keep information up-to-date.
   - **Delete**: Remove event.

### 3. **Multi-Language Support**
   - Supports **English** and **French** languages.
   - Dynamic language switching using `i18next` and `react-i18next`.
   - Data from api could not worked on due to time constraints.

### 4. **Advanced Filtering and Sorting**
   - **Filter** events by:
     - Search query (event name).
   - **Sort** events by:
     - Date (ascending).
     - Number of guests (ascending).

### 5. **Favorites Management**
   - Add events to a **favorites list**.
   - Remove events from the favorites list.
   - Storage using `localStorage`.

### 6. **Responsive Design**
   - Fully responsive layout for optimal viewing on desktops, tablets, and mobile devices.
   - Built with **Tailwind CSS** for a clean and modern UI.

### 7. **State Management**
   - Uses **Redux Toolkit** for efficient state management.
   - Implements **RTK Query** for API integration and **caching**.

### 8. **Form Validation**
   - All forms (create/update events) are validated using **Formik** and **Yup**.
   - Ensures data integrity and provides user-friendly error messages.
### 8. **Toast  Message on api request**
    - Toast Message on api hit handled with **react-toastify**
    
     

---

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: State management library for managing global state.
- **RTK Query**: Data fetching and caching library.
- **Formik**: Form handling library.
- **Yup**: Schema validation for forms.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **i18next**: Internationalization framework for multi-language support.
- **Material-UI (MUI)**: Component library for icons .

### Backend (Mock Data)
- **Mock Data**: Simulates API responses using a JSON file.
- **LocalStorage**: Persists favorites and other user preferences.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone (https://github.com/Kalyanbikramadhikari/asterdioassessment)

### Contact
Portfolio:(https://kalyanbikramadhikari.netlify.app/)
GitHub: https://github.com/Kalyanbikramadhikari/
