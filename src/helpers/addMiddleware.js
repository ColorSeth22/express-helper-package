function addMiddleware(app, middleware, path = null) {
    if (!app || !middleware) {
        throw new Error('Missing required parameters');
    }

    // Path specific middleware
    if (path) {
        if (Array.isArray(middleware)) {
            middleware.forEach(fn => app.use(path, fn));
        } else {
            app.use(path, middleware);
        }
    } else {
        // Global middleware
        if (Array.isArray(middleware)) {
            middleware.forEach(fn => app.use(fn));
        } else {
            app.use(middleware);
        }
    }

    return app;
}

export default addMiddleware;
