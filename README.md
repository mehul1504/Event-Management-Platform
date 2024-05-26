# Event-Management-Platform
Backend System for a Virtual Event Management Platform

This project is a backend system for a virtual event management platform, focusing on user registration, event scheduling, and participant management. The system is built with Node.js and Express.js and uses in-memory data structures for storage. It includes user authentication using bcrypt for password hashing and JWT for session management. Additionally, it features a caching mechanism to enhance performance by reducing redundant data fetch operations.

## Features

- User registration and authentication
- Secure password hashing with bcrypt
- JWT-based session management
- Event creation, updating, and deletion
- Participant registration for events
- In-memory data storage
- Caching mechanism for improved performance

## Requirements

- Node.js (version 12 or higher)
- npm (Node package manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/event-manager.git
   cd event-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

### User Authentication

- **Register User**
  - **URL:** `/api/register`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "testuser@example.com",
      "password": "SecurePassword123",
      "role": "organizer"
    }
    ```
  - **Description:** Registers a new user and sends a confirmation email.

- **Login User**
  - **URL:** `/api/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "testuser@example.com",
      "password": "SecurePassword123"
    }
    ```
  - **Description:** Logs in a user and returns a JWT token.

### Event Management

- **Get All Events**
  - **URL:** `/api/events`
  - **Method:** `GET`
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Description:** Retrieves all events.

- **Create Event**
  - **URL:** `/api/events`
  - **Method:** `POST`
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Body:**
    ```json
    {
      "date": "2024-05-25",
      "time": "14:00",
      "description": "Virtual Tech Conference"
    }
    ```
  - **Description:** Creates a new event.

- **Update Event**
  - **URL:** `/api/events/:id`
  - **Method:** `PUT`
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Body:**
    ```json
    {
      "date": "2024-05-26",
      "time": "16:00",
      "description": "Updated Tech Conference"
    }
    ```
  - **Description:** Updates an existing event.

- **Delete Event**
  - **URL:** `/api/events/:id`
  - **Method:** `DELETE`
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Description:** Deletes an event.

- **Register for Event**
  - **URL:** `/api/events/:id/register`
  - **Method:** `POST`
  - **Headers:** `Authorization: Bearer <your_jwt_token>`
  - **Description:** Registers the authenticated user for the specified event.

## Caching Mechanism

The platform uses a simple in-memory cache to store events data, reducing the number of direct accesses to the primary in-memory array. The cache is invalidated upon creating, updating, or deleting events to ensure consistency.

## Project Structure

```
event-manager/
│
├── controllers/
│   ├── userController.js
│   ├── eventController.js
│
├── helpers/
│   ├── validation.js
│
├── models/
│   ├── userModel.js
│   ├── eventModel.js
│
├── routes/
│   ├── userRoutes.js
│   ├── eventRoutes.js
│
├── utils/
│   ├── cache.js
│
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [nodemailer](https://www.npmjs.com/package/nodemailer)

---

Feel free to contribute to this project by submitting issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
