function createCRUDRoute({app, basePath, handlers, dataStore = []}) {
    if (!app || !basePath || !handlers) {
        throw new Error('Missing required parameters');
    }

    // GET - /basePath
    if (handlers.get) {
        app.get(basePath, handlers.get);
    }

    // POST - /basePath
    if (handlers.post) {
        app.post(basePath, handlers.post);
    }

    // PUT update item by ID - /basePath/:id
    if (handlers.put) {
        app.put(`${basePath}/:id`, handlers.put);
    }

    // DELETE item by ID - /basePath/:id
    if (handlers.delete) {
        app.delete(`${basePath}/:id`, handlers.delete);
    }

    return app;
}

export default createCRUDRoute;
