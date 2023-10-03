# Booky App Individual Proyect - Make it Real TOP Program v30 💻

Codebase for the node.js projects.

- Built with Node.js and Express.
- REST API.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/es)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/es)
- [Morgan](https://www.npmjs.com/package/morgan)
- [CORS](https://www.npmjs.com/package/cors)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Stripe](https://sendgrid.com/)
- [JSON-webtoken](https://jwt.io/)

## Express Router and Routes

| Route            | HTTP Verb | Route middleware | Description                              |
| ---------------- | --------- | ---------------- | ---------------------------------------- |
| /api/healthcheck | GET       |                  | Shows a message ('OK') and server uptime |
| /api/users       | GET       | isAuthenticated  | Get list of users                        |
| /api/users       | POST      |                  | Creates a new user                       |
| /api/users/:id   | GET       | isAuthenticated  | Gets a single user                       |
| /api/users/:id   | PUT       | isAuthenticated  | Updates a user                           |
| /api/users/:id   | DELETE    | isAuthenticated  | Deletes a user (inactivates)             |

## Usage

The project includes 6 functional endpoints. The previous table shows an example with the `/api/users` route. If you need to create, buy, or sell NFTs, explore the app! Here is an creating a user.

### Example: **user creation**:

Request Body:

```json
{
  "firstName": "Pedro",
  "lastName": "Perez",
  "email": "pedroperez@example.com",
  "password": "examplepassword123"
}
```

Response:

```json
{
  "message": "User created successfully!",
  "token": "EXAMPLE_TOKEN.DDWBOVIQBVIJDBNKJ247521BKVSDJ",
  "profile": {
    "id": "nvkj23dvb564qjkvo68qvqofbnq",
    "firstName": "Pedro",
    "lastName": "Perez",
    "email": "pedroperez@example.com"
  }
}
```

### Developing

1. Run `npm install` to install server dependencies.
2. Configure the .env file.
3. Run npm run dev to start the development server.
