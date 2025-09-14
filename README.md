# Library API

A RESTful API for managing a library system with authors and books, built with Node.js, Express, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Middleware](#middleware)
- [Error Handling](#error-handling)

## Features

- CRUD operations for authors
- PostgreSQL database integration
- Request logging middleware
- Comprehensive error handling
- Database migrations and seeding
- Input validation
- RESTful API design

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Query Builder**: Knex.js
- **Security**: Helmet.js
- **Development**: Nodemon

## Project Structure

```
library-api/
├── data/
│   ├── migrations/
│   │   └── 20250909102339_create_library_table.js
│   ├── seeds/
│   │   └── 01_book_add.js
│   ├── db-config.js
│   └── data-model.js
├── middlewares/
│   ├── errorHandling.js
│   └── logger.js
├── routers/
│   └── booksRouters.js
├── index.js
├── knexfile.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library-api
```

2. Install dependencies:
```bash
npm install
```

3. Make sure PostgreSQL is installed and running on your system.

## Database Setup

1. Create a PostgreSQL database named `library`:
```sql
CREATE DATABASE library;
```

2. Create a user with appropriate permissions:
```sql
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE library TO admin;
```

3. Run migrations to create tables:
```bash
npx knex migrate:latest
```

4. Seed the database with initial data:
```bash
npx knex seed:run
```

## Usage

### Development Mode
```bash
npm run server
```
The server will start on `http://localhost:5000` with auto-restart on file changes.

### Production Mode
```bash
npm start
```

## API Endpoints

### Authors

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/books` | Get all authors | - |
| GET | `/books/:id` | Get author by ID | - |
| POST | `/books` | Create new author | `{ "author": "Author Name" }` |
| PATCH | `/books/:id` | Update author | `{ "author": "Updated Name" }` |
| DELETE | `/books/:id` | Delete author | - |

### Example Requests

#### Get All Authors
```bash
GET http://localhost:5000/books
```

#### Get Author by ID
```bash
GET http://localhost:5000/books/1
```

#### Create New Author
```bash
POST http://localhost:5000/books
Content-Type: application/json

{
  "author": "George R.R. Martin"
}
```

#### Update Author
```bash
PATCH http://localhost:5000/books/1
Content-Type: application/json

{
  "author": "J.K. Rowling (Updated)"
}
```

#### Delete Author
```bash
DELETE http://localhost:5000/books/1
```

## Environment Variables

The application uses the following environment variables:

- `DB_ENV`: Database environment (default: "development")
- `PORT`: Server port (default: 5000)

## Scripts

- `npm start`: Start the server in production mode
- `npm run server`: Start the server in development mode with nodemon
- `npm test`: Run tests (currently not implemented)

## Middleware

### Logger Middleware
Located in `middlewares/logger.js`, logs incoming requests with:
- Timestamp (UTC)
- Hostname
- HTTP method

### Error Handling Middleware
Located in `middlewares/errorHandling.js`, provides consistent error responses with:
- HTTP status code
- Error message
- Request path
- Timestamp

## Error Handling

The API returns consistent error responses in the following format:

```json
{
  "error": "Error message",
  "path": "/api/endpoint",
  "time": "2025-09-10T12:00:00.000Z"
}
```

### Common Error Codes

- `400`: Bad Request (invalid input, missing required fields)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error (database or server errors)

## Database Schema

### Authors Table
- `id`: Primary key (auto-increment)
- `author`: Author name (required)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Books Table
- `id`: Primary key (auto-increment)
- `title`: Book title (required)
- `author_id`: Foreign key referencing authors.id
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Security Features

- **Helmet.js**: Sets various HTTP headers for security
- **Input Validation**: Validates required fields and data types
- **SQL Injection Prevention**: Uses parameterized queries through Knex.js

## Development Notes

- The router is named `booksRouters.js` but handles author operations (this appears to be a naming inconsistency)
- Database configuration supports multiple environments (development, production)
- Uses PostgreSQL with connection pooling through Knex.js
- Implements cascade delete for maintaining referential integrity

## Future Enhancements

- Add authentication and authorization
- Implement book-specific endpoints
- Add pagination for large datasets
- Implement caching
- Add comprehensive test suite
- Add API documentation with Swagger/OpenAPI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes and is open source.
