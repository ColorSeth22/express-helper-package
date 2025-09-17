function createGetRoute({ app, path, handler } = {}) {
  if (!app || !path || !handler) {
    throw new Error('Missing required parameters');
  }

  app.get(path, handler);
}

export default createGetRoute;
