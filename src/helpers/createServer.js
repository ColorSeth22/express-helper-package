import express from 'express';

function createServer({ onStart, port = 3000, middleware = []} = {}) {
  const app = express();
  const defaultMiddleware = [express.json(), express.urlencoded({ extended: true })];
  defaultMiddleware.forEach(fn => app.use(fn));

  // Add any custom middleware
  middleware.forEach(fn => app.use(fn));

  if (typeof onStart === 'function') {
    // Start the server if onStart callback is provided
    app.listen(port, () => onStart(port));
  }

  return app;
}

export default createServer;
