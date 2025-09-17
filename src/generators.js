import fs from "fs-extra";
import path from "path";

export const createServerFile = (name) => {
  const fileContent = `import { createServer, createGetRoute } from "express-helper-package";

const app = createServer({
  port: 3000,
  onStart: (port) => {
    console.log(\`${name} running on http://localhost:\${port}\`);
  }
});

// Example route
createGetRoute({
  app,
  path: "/",
  handler: (req, res) => res.send("Hello from ${name}!")
});
`;
  fs.writeFileSync(path.join(process.cwd(), `${name}.server.js`), fileContent);
};export const createCRUDServerFile = (name) => {
  const fileContent = `import { createServer, createCRUDRoute, asyncHandler } from "express-helper-package";

const app = createServer({
  port: 3000,
  onStart: (port) => {
    console.log(\`${name} server running on http://localhost:\${port}\`);
  }
});

// Initialize dataStore
const dataStore = [];

// CRUD handler functions
function getCRUD(req, res) {
  res.json(dataStore);
}

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

function deleteCRUD(req, res) {
  const { id } = req.params;
  const itemIndex = dataStore.findIndex(item => item.id == id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const deletedItem = dataStore.splice(itemIndex, 1)[0];
  res.json(deletedItem);
}

// Create CRUD routes
createCRUDRoute({
  app,
  basePath: '/${name}',
  dataStore: dataStore,
  handlers: {
    get: getCRUD,
    post: asyncHandler(postCRUD),
    put: asyncHandler(putCRUD),
    delete: deleteCRUD
  }
});
`;
  fs.writeFileSync(path.join(process.cwd(), `${name}.server.js`), fileContent);
};

export const createRouteFile = (name, { crud = false }) => {
  let fileContent;
  if (crud) {
    fileContent = `import { createServer, createCRUDRoute, asyncHandler } from "express-helper-package";

const app = createServer({
  port: 3000,
  onStart: (port) => {
    console.log(\`${name} server running on http://localhost:\${port}\`);
  }
});

// Initialize dataStore
const dataStore = [];

// CRUD handler functions
function getCRUD(req, res) {
  res.json(dataStore);
}

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

function deleteCRUD(req, res) {
  const { id } = req.params;
  const itemIndex = dataStore.findIndex(item => item.id == id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const deletedItem = dataStore.splice(itemIndex, 1)[0];
  res.json(deletedItem);
}

// Create CRUD routes
createCRUDRoute({
  app,
  basePath: '/${name}',
  dataStore: dataStore,
  handlers: {
    get: getCRUD,
    post: asyncHandler(postCRUD),
    put: asyncHandler(putCRUD),
    delete: deleteCRUD
  }
});
`;
  } else {
    fileContent = `import { createServer, createGetRoute } from "./src/index.js";

const app = createServer({
  port: 3000,
  onStart: (port) => {
    console.log(\`${name} server running on http://localhost:\${port}\`);
  }
});

createGetRoute({
  app,
  path: "/${name}",
  handler: (req, res) => res.json({ message: "Hello from ${name}!" })
});
`;
  }
  fs.writeFileSync(path.join(process.cwd(), `${name}.route.js`), fileContent);
};
