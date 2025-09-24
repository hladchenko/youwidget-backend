# YouWidget Backend

A RESTful API backend for managing widgets built with Fastify and TypeScript.

## Features

- **Widget Management**: Full CRUD operations for widgets
- **Type Safety**: Built with TypeScript and TypeBox for schema validation
- **Fast Performance**: Powered by Fastify web framework
- **SQLite Database**: Lightweight, file-based database storage
- **CORS Support**: Cross-origin resource sharing enabled
- **Repository Pattern**: Clean architecture with repository layer

## Widget Types

The API supports three types of widgets:
- `line-chart`: Line chart visualizations
- `bar-chart`: Bar chart visualizations
- `text`: Text-based widgets

## API Endpoints

### GET /widgets
Retrieve all widgets

### POST /widgets
Create a new widget

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "type": "line-chart|bar-chart|text (optional, defaults to 'text')"
}
```

### PUT /widgets/:id
Update an existing widget

**Request Body:**
```json
{
  "title": "string (optional)",
  "description": "string (optional)"
}
```

### DELETE /widgets/:id
Delete a widget by ID

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

The server will start on http://localhost:8080

### Development

For development with auto-compilation:
```bash
npm run check  # Type checking
npm run format # Code formatting
```

## Project Structure

```
src/
├── controllers/     # Request handlers
├── routes/         # API route definitions
├── services/       # Business logic layer
├── repositories/   # Data access layer
├── types/          # TypeScript type definitions
├── plugins/        # Fastify plugins
└── index.ts        # Application entry point
```

## Database Schema

The application uses SQLite with the following widget schema:

```sql
CREATE TABLE widgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'text',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: SQLite
- **Validation**: TypeBox
- **CORS**: @fastify/cors