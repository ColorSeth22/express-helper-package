function createDeleteRoute({app, path, handler}) {
    if (!app || !path || !handler) {
        throw new Error('Missing required parameters');
    }

    app.delete(path, handler);
    return app;
}

export default createDeleteRoute;
