# ⚡ Express Spark

> **Spark your Express development** - Zero boilerplate, maximum productivity

**Express Spark** is a powerful toolkit + CLI that supercharges Express.js development. Generate complete CRUD APIs in seconds, use intuitive helper functions, and build faster than ever.

## 🚀 Quick Start

```bash
# Install globally
npm install -g express-spark

# Generate a full CRUD API in seconds
express-spark create:server my-api --CRUD

# Run your new API
cd my-api && node my-api.server.js
```

**That's it!** You now have a running Express server with full CRUD endpoints.

## ✨ Features

- 🔥 **Zero Configuration** - Working API in 30 seconds
- ⚡ **CRUD Generation** - Complete REST APIs with one command
- 🛠 **Helper Functions** - Clean, reusable Express utilities
- 🎯 **CLI Scaffolding** - Smart project generation
- 🛡 **Error Handling** - Built-in async error management
- 📦 **Middleware Support** - Easy global and path-specific middleware

## 🎯 CLI Commands

### Generate Basic Server

```bash
npx express-spark create:server my-app
```

Creates a simple Express server with example routes.

### Generate CRUD API# Full CRUD server with all endpoints---

```bash

npx express-spark create:server my-api --CRUD

```

Creates a complete CRUD API with:

- `GET /my-api` - List all items

- `POST /my-api` - Create new item

- `PUT /my-api/:id` - Update item by ID

- `DELETE /my-api/:id` - Delete item by ID### Run Your Server### Installation


## 🛠 Helper Functions

Import and use powerful helper functions in your Express apps

### Core Server Creation

```javascript
import { createServer } from 'express-spark';

const app = createServer({
  port: 3000,
  middleware: [/* custom middleware */],
  onStart: (port) => console.log(`Server running on port ${port}`)
});
```

### Route Helpers

```javascript
import {
  createGetRoute,
  createPostRoute,
  createPutRoute,
  createDeleteRoute
} from 'express-spark';

// Simple route creation
createGetRoute({
  app,
  path: '/health',
  handler: (req, res) => res.json({ status: 'ok' })
});
```

### Async Error Handling

```javascript
import { asyncHandler } from 'express-spark';

createGetRoute({
  app,
  path: '/users',
  handler: asyncHandler(async (req, res) => {
    const users = await fetchUsers(); // Errors automatically caught
    res.json(users);
  })
});
```

## CRUD Routes Made Simple

```javascript
import { createServer, createCRUDRoute } from 'express-spark';

const app = createServer({ port: 3000 });
const products = [];

createCRUDRoute({
  app,
  basePath: '/products',
  handlers: {
    get: (req, res) => res.json(products),
    post: (req, res) => {
      const product = { id: Date.now(), ...req.body };
      products.push(product);
      res.status(201).json(product);
    },
    put: (req, res) => {
      // Update logic
    },
    delete: (req, res) => {
      // Delete logic
    }
  }
});
```


**✅ Creates:** GET `/products`, POST `/products`, PUT `/products/:id`, DELETE `/products/:id`

---

## 📋 Complete API Reference

| Function | Purpose |
|----------|---------|
| `createServer()` | Initialize Express app with middleware |
| `createGetRoute()` | Create GET endpoint |
| `createPostRoute()` | Create POST endpoint |
| `createPutRoute()` | Create PUT endpoint |
| `createDeleteRoute()` | Create DELETE endpoint |
| `createCRUDRoute()` | Create full CRUD endpoints |
| `addMiddleware()` | Add middleware globally or to paths |
| `asyncHandler()` | Wrap async functions for error handling |

## 💡 Examples

**Generate a blog API:**
```bash
npx express-spark create:server blog --CRUD
# Creates: GET/POST/PUT/DELETE /blog endpoints
```

**Generate a user service:**
```bash
npx express-spark create:server users --CRUD
# Creates: Full user management API
```

**Use helpers in existing project:**
```javascript
import { createGetRoute, asyncHandler } from 'express-spark';

createGetRoute({
  app,
  path: '/api/data',
  handler: asyncHandler(async (req, res) => {
    const data = await database.query('SELECT * FROM users');
    res.json(data);
  })
});
```

## ⚡ Why Express Spark?

- **🚀 10x Faster Development** - Skip boilerplate, build features
- **📖 Consistent Patterns** - Write cleaner, maintainable code
- **🛡 Production Ready** - Built-in error handling and middleware
- **🎯 Zero Learning Curve** - Familiar Express patterns
- **📦 Lightweight** - No heavy dependencies
- **🔧 Flexible** - Use CLI or helpers independently
