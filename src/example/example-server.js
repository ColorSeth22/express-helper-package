import { createServer, createGetRoute, createPostRoute, addMiddleware, createDeleteRoute, asyncHandler, createPutRoute, createCRUDRoute } from '../index.js';

const app = createServer({
  port: 4000,
  onStart: (port) => {
    console.log(`Server running on http://localhost:${port}`);
  },
  // optional initial middleware for when a request comes through
  middleware: [
    (req, res, next) => {
      console.log(`Incoming request: ${req.method} ${req.url}`);
      next();
    }
  ]
});

createGetRoute({
  app,
  path: '/test_path',
  handler: (req, res) => res.send('Test path works!')
})

// adding additional middleware after creating the server
// no path means global middleware
addMiddleware(app, [
  (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  }
]);

// Example of adding single middleware to a specific path
addMiddleware(app, (req, res, next) => {
  console.log(`Items route accessed: ${req.method} ${req.url}`);
  next();
}, '/items');

// Example of adding multiple middleware to a specific path
addMiddleware(app, [
  (req, res, next) => {
    console.log(`Test path middleware 1: ${req.url}`);
    next();
  },
  (req, res, next) => {
    console.log(`Test path middleware 2: ${req.url}`);
    next();
  }
], '/test_path');

// Example of how functions can be complex instead of simple like the examples
function test_post(req, res) {
  const body = req.body;
  res.json({ message: 'Post received', data: body });
}

createPostRoute({
  app,
  path: '/test_path',
  handler: test_post
});

createDeleteRoute({
  app,
  path: '/test_path',
  handler: (req, res) => res.json({ message: 'Delete request received' })
});

createGetRoute({
  app,
  path: '/ping',
  handler: asyncHandler(async (req, res) => {
    // Simulate async logic
    await new Promise(resolve => setTimeout(resolve, 100));
    res.json({ message: 'pong' });
  })
});

createPutRoute({
  app,
  path: '/test_path',
  handler: (req, res) => res.json({ message: 'Put request received' })
})

// Initialize dataStore outside the CRUD route
// In real applications, this would be a database connection or similar
const dataStore = [];

// create complex functions for example
function getCRUD(req, res) {
  res.json(dataStore);
}

// Example using the ansyncHandler for async operations
async function postCRUD(req, res) {
  const newItem = { id: dataStore.length, ...req.body };
  dataStore.push(newItem);
  res.status(201).json(newItem);
}

async function putCRUD(req, res) {
  const { id } = req.params;
  const itemIndex = dataStore.findIndex(item => item.id == id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const updatedItem = { ...dataStore[itemIndex], ...req.body, id: parseInt(id) };
  dataStore[itemIndex] = updatedItem;
  res.json(updatedItem);
}

function deleteCRUD (req, res) {
    const { id } = req.params;
    const itemIndex = dataStore.findIndex(item => item.id == id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const deletedItem = dataStore.splice(itemIndex, 1)[0];
    res.json(deletedItem);
}

// create full CRUD for a single route, uncluttered code

createCRUDRoute({
  app,
  basePath: '/items',
  dataStore: dataStore,
  handlers: {
    get: getCRUD,
    // Use asyncHandler to wrap the async function
    post: asyncHandler(postCRUD),
    put: asyncHandler(putCRUD),
    delete: deleteCRUD
  }
})

// example on how to create extra route on top of CRUD route
createGetRoute({
  app,
  path: '/items/:id',
  handler: (req, res) => {
    const { id } = req.params;
    const item = dataStore.find(item => item.id == id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  }
});

