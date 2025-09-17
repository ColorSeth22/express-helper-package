# ⚡ Express Spark

<div align="center">

![Express Spark Logo](https://via.placeholder.com/200x100/1e40af/ffffff?text=⚡+Express+Spark)

**Spark your Express development with zero boilerplate**

[![npm version](https://img.shields.io/npm/v/express-spark.svg)](https://www.npmjs.com/package/express-spark)
[![npm downloads](https://img.shields.io/npm/dt/express-spark.svg)](https://www.npmjs.com/package/express-spark)
[![GitHub stars](https://img.shields.io/github/stars/ColorSeth22/express-helper-package.svg)](https://github.com/ColorSeth22/express-helper-package/stargazers)
[![license](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/ColorSeth22/express-helper-package)

[**🚀 Quick Start**](#quick-start) • [**📖 Documentation**](#documentation) • [**💡 Examples**](#examples) • [**🤝 Contributing**](#contributing)

</div>

---

## 🌟 What is Express Spark?

Express Spark is a revolutionary toolkit that eliminates Express.js boilerplate and accelerates API development. With intelligent CLI scaffolding and powerful helper functions, you can build production-ready APIs in minutes, not hours.

### 🎯 Perfect For

- 🚀 **Rapid Prototyping** - MVP APIs in minutes
- 🏢 **Enterprise Development** - Consistent patterns across teams
- 📚 **Learning Express** - Best practices built-in
- 🔄 **API Development** - CRUD operations made simple
- ⚡ **Hackathons** - Get to market features faster

---

## 🚀 Quick Start

### Installation

```bash
# Global CLI installation
npm install -g express-spark

# Or use npx (no global install needed)
npx express-spark create:server my-api --CRUD
```

### Generate Your First API

```bash
# Create a full CRUD API
express-spark create:server blog --CRUD

# Navigate and run
cd blog
node blog.server.js

# 🎉 Your API is running at http://localhost:3000
```

### Test Your Endpoints

```bash
# List all posts
curl http://localhost:3000/blog

# Create a new post
curl -X POST http://localhost:3000/blog \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello World", "content": "My first post!"}'

# Update a post
curl -X PUT http://localhost:3000/blog/0 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:3000/blog/0
```

---

## 🛠 Features & Capabilities

<table>
<tr>
<td>

### 🔥 CLI Scaffolding
- Complete CRUD APIs in seconds
- Smart route generation
- Built-in error handling
- Production-ready structure

</td>
<td>

### ⚡ Helper Functions
- Clean route creation
- Async error management
- Flexible middleware system
- Intuitive API design

</td>
</tr>
<tr>
<td>

### 🎯 Zero Configuration
- No complex setup required
- Sensible defaults
- Instant development server
- JSON parsing included

</td>
<td>

### 📦 Production Ready
- Error boundaries
- Middleware management
- Consistent patterns
- Lightweight dependencies

</td>
</tr>
</table>

---

## 📖 Documentation

### CLI Commands

#### `create:server <name>`
Generates a basic Express server with example routes.

```bash
express-spark create:server my-app
```

**Generated Structure:**
```
my-app.server.js    # Complete Express server
├── Server setup with middleware
├── Example GET route
└── Ready to run and extend
```

#### `create:server <name> --CRUD`
Generates a complete CRUD API with all HTTP methods.

```bash
express-spark create:server products --CRUD
```

**Generated Endpoints:**
- `GET /products` - Retrieve all items
- `POST /products` - Create new item
- `PUT /products/:id` - Update existing item
- `DELETE /products/:id` - Remove item

### Helper Functions

#### Core Server Creation

```javascript
import { createServer } from 'express-spark';

const app = createServer({
  port: 3000,
  middleware: [
    // Custom middleware array
  ],
  onStart: (port) => {
    console.log(`🚀 Server running on port ${port}`);
  }
});
```

#### Route Helpers

```javascript
import {
  createGetRoute,
  createPostRoute,
  createPutRoute,
  createDeleteRoute
} from 'express-spark';

// GET route
createGetRoute({
  app,
  path: '/users',
  handler: (req, res) => res.json({ users: [] })
});

// POST route with validation
createPostRoute({
  app,
  path: '/users',
  handler: (req, res) => {
    const user = req.body;
    // Validation logic here
    res.status(201).json(user);
  }
});
```

#### CRUD Route Builder

```javascript
import { createCRUDRoute, asyncHandler } from 'express-spark';

const dataStore = [];

createCRUDRoute({
  app,
  basePath: '/api/items',
  handlers: {
    get: (req, res) => res.json(dataStore),

    post: asyncHandler(async (req, res) => {
      const item = {
        id: Date.now(),
        createdAt: new Date(),
        ...req.body
      };
      dataStore.push(item);
      res.status(201).json(item);
    }),

    put: (req, res) => {
      const { id } = req.params;
      const index = dataStore.findIndex(item => item.id == id);

      if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }

      dataStore[index] = {
        ...dataStore[index],
        ...req.body,
        updatedAt: new Date()
      };
      res.json(dataStore[index]);
    },

    delete: (req, res) => {
      const { id } = req.params;
      const index = dataStore.findIndex(item => item.id == id);

      if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }

      const deleted = dataStore.splice(index, 1)[0];
      res.json({ message: 'Item deleted', item: deleted });
    }
  }
});
```

#### Async Error Handling

```javascript
import { asyncHandler } from 'express-spark';

createGetRoute({
  app,
  path: '/async-data',
  handler: asyncHandler(async (req, res) => {
    // Any async errors are automatically caught and handled
    const data = await fetchFromDatabase();
    const processed = await processData(data);
    res.json(processed);
  })
});
```

#### Middleware Management

```javascript
import { addMiddleware } from 'express-spark';

// Global middleware
addMiddleware(app, [
  (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  },
  (req, res, next) => {
    req.requestTime = Date.now();
    next();
  }
]);

// Path-specific middleware
addMiddleware(app, [
  authenticateUser,
  validatePermissions
], '/api/admin');

// Single middleware for specific path
addMiddleware(app, rateLimiter, '/api/public');
```

---

## 💡 Examples

### 📝 Blog API

```bash
express-spark create:server blog --CRUD
```

**Generated endpoints:**
- `GET /blog` - List all posts
- `POST /blog` - Create new post
- `PUT /blog/:id` - Update post
- `DELETE /blog/:id` - Delete post

### 🛒 E-commerce Product API

```bash
express-spark create:server products --CRUD
```

**Generated endpoints:**
- `GET /products` - Product catalog
- `POST /products` - Add new product
- `PUT /products/:id` - Update product details
- `DELETE /products/:id` - Remove product

### 👥 User Management Service

```javascript
import { createServer, createCRUDRoute, addMiddleware } from 'express-spark';

const app = createServer({ port: 4000 });
const users = [];

// Add authentication middleware
addMiddleware(app, authenticateToken, '/api');

createCRUDRoute({
  app,
  basePath: '/api/users',
  handlers: {
    get: (req, res) => {
      // Return users without sensitive data
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    },

    post: asyncHandler(async (req, res) => {
      const { email, password, name } = req.body;

      // Validate input
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        name,
        createdAt: new Date()
      };

      users.push(user);

      // Return user without password
      const { password: _, ...safeUser } = user;
      res.status(201).json(safeUser);
    }),

    put: (req, res) => {
      // Update user logic with validation
    },

    delete: (req, res) => {
      // Soft delete or permanent delete logic
    }
  }
});
```

### 🔄 Real-time Chat API

```javascript
import { createServer, createGetRoute, createPostRoute } from 'express-spark';

const app = createServer({ port: 3000 });
const messages = [];

// Get all messages
createGetRoute({
  app,
  path: '/messages',
  handler: (req, res) => {
    const { limit = 50, offset = 0 } = req.query;
    const paginatedMessages = messages
      .slice(offset, offset + limit)
      .reverse(); // Most recent first

    res.json({
      messages: paginatedMessages,
      total: messages.length,
      hasMore: messages.length > offset + limit
    });
  }
});

// Send new message
createPostRoute({
  app,
  path: '/messages',
  handler: (req, res) => {
    const { content, userId, username } = req.body;

    if (!content || !userId || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = {
      id: messages.length + 1,
      content,
      userId,
      username,
      timestamp: new Date(),
      edited: false
    };

    messages.push(message);

    // In a real app, emit to WebSocket clients here
    // io.emit('new-message', message);

    res.status(201).json(message);
  }
});
```

---

## 🔧 Advanced Usage

### Custom Middleware Integration

```javascript
import { createServer, addMiddleware } from 'express-spark';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = createServer({ port: 3000 });

// Security middleware
addMiddleware(app, [
  helmet(),
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
]);

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

addMiddleware(app, apiLimiter, '/api');
```

### Database Integration

```javascript
import { createCRUDRoute, asyncHandler } from 'express-spark';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

createCRUDRoute({
  app,
  basePath: '/api/posts',
  handlers: {
    get: asyncHandler(async (req, res) => {
      const posts = await prisma.post.findMany({
        include: { author: true },
        orderBy: { createdAt: 'desc' }
      });
      res.json(posts);
    }),

    post: asyncHandler(async (req, res) => {
      const { title, content, authorId } = req.body;

      const post = await prisma.post.create({
        data: { title, content, authorId },
        include: { author: true }
      });

      res.status(201).json(post);
    }),

    put: asyncHandler(async (req, res) => {
      const { id } = req.params;
      const { title, content } = req.body;

      const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, content },
        include: { author: true }
      });

      res.json(post);
    }),

    delete: asyncHandler(async (req, res) => {
      const { id } = req.params;

      await prisma.post.delete({
        where: { id: parseInt(id) }
      });

      res.json({ message: 'Post deleted successfully' });
    })
  }
});
```

---

## 📊 Performance & Best Practices

### Built-in Optimizations

- **Automatic JSON Parsing** - No need to manually add `express.json()`
- **Error Boundary** - `asyncHandler` catches all async errors
- **Middleware Optimization** - Path-specific middleware reduces overhead
- **Memory Efficient** - Minimal dependencies and smart bundling

### Recommended Patterns

1. **Use asyncHandler for all async routes**
   ```javascript
   // ✅ Good
   createGetRoute({
     app,
     path: '/users',
     handler: asyncHandler(async (req, res) => {
       const users = await db.getUsers();
       res.json(users);
     })
   });

   // ❌ Avoid
   app.get('/users', async (req, res) => {
     try {
       const users = await db.getUsers();
       res.json(users);
     } catch (error) {
       res.status(500).json({ error: 'Internal server error' });
     }
   });
   ```

2. **Leverage CRUD route builder for consistency**
   ```javascript
   // ✅ Good - Consistent structure
   createCRUDRoute({
     app,
     basePath: '/api/resources',
     handlers: { /* ... */ }
   });

   // ❌ Avoid - Manual route definition
   app.get('/api/resources', handler);
   app.post('/api/resources', handler);
   app.put('/api/resources/:id', handler);
   app.delete('/api/resources/:id', handler);
   ```

3. **Use middleware strategically**
   ```javascript
   // ✅ Good - Path-specific
   addMiddleware(app, authMiddleware, '/api/admin');
   addMiddleware(app, rateLimiter, '/api/public');

   // ❌ Avoid - Global middleware for specific needs
   app.use(authMiddleware); // Applied to ALL routes
   ```

---

## 🧪 Testing

Express Spark is built with testing in mind. All generated servers are easily testable:

```javascript
import request from 'supertest';
import { createServer, createGetRoute } from 'express-spark';

describe('Express Spark Server', () => {
  let app;

  beforeEach(() => {
    app = createServer({ port: 0 }); // Use dynamic port for testing

    createGetRoute({
      app,
      path: '/health',
      handler: (req, res) => res.json({ status: 'ok' })
    });
  });

  test('health check endpoint', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
Found a bug? [Open an issue](https://github.com/ColorSeth22/express-helper-package/issues/new?template=bug_report.md) with:
- Steps to reproduce
- Expected vs actual behavior
- Environment details

### 💡 Feature Requests
Have an idea? [Request a feature](https://github.com/ColorSeth22/express-helper-package/issues/new?template=feature_request.md) with:
- Use case description
- Proposed solution
- Alternative approaches considered

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run tests: `npm test`
5. Submit a pull request

### 📝 Documentation
Help improve our docs:
- Fix typos or unclear explanations
- Add more examples
- Translate to other languages

---

## 📈 Roadmap

### 🎯 Upcoming Features

- **v1.1** - TypeScript support and type definitions
- **v1.2** - Database integration templates (Prisma, Mongoose)
- **v1.3** - Authentication middleware helpers
- **v1.4** - WebSocket support for real-time APIs
- **v1.5** - Docker containerization options
- **v2.0** - GraphQL endpoint generation

### 🔮 Long-term Vision

- Plugin ecosystem for framework integrations
- Visual API designer and documentation generator
- Performance monitoring and analytics
- Automatic OpenAPI/Swagger documentation
- Cloud deployment integrations

---

## 🙏 Acknowledgments

Express Spark is built on the shoulders of giants:

- **Express.js** - The fast, unopinionated web framework
- **Commander.js** - Command-line interface solution
- **Chalk** - Terminal styling for beautiful CLI output
- **fs-extra** - Enhanced file system operations

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⚡ Built to spark your Express.js development**

[🌟 Star on GitHub](https://github.com/ColorSeth22/express-helper-package) • [📦 NPM Package](https://www.npmjs.com/package/express-spark) • [🐛 Report Bug](https://github.com/ColorSeth22/express-helper-package/issues) • [💡 Request Feature](https://github.com/ColorSeth22/express-helper-package/issues)

Made with ❤️ by developers, for developers

</div>
