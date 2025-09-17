function createPutRoute({app, path, handler}) {
    if (!app || !path || !handler) {
        throw new Error('Missing required parameters');
    }

    app.put(path, handler);
}

export default createPutRoute;
