function createPostRoute({ app, path, handler }) {
  if (!app || !path || !handler) {
    throw new Error('Missing required parameters');
  }

  app.post(path, handler);
}

export default createPostRoute;
