import fs from "fs-extra";
import path from "path";

export const createServerFile = (name) => {
  const fileContent = `
    import { createServer } from "express-helper";
    import { createCRUDRoutes } from "express-helper";

    const app = createServer();

    // Example route
    app.get("/", (req, res) => res.send("Hello from ${name}!"));

    app.listen(3000, () => console.log("${name} running on http://localhost:3000"));
    `;
  fs.writeFileSync(path.join(process.cwd(), `${name}.server.js`), fileContent);
};

export const createRouteFile = (name, { crud = false }) => {
  let fileContent;
  if (crud) {
    fileContent = `
        import { createCRUDRoutes } from "express-helper";

        export default function (app) {
        createCRUDRoutes({
            resource: "${name}",
            expressClient: app,
            handlers: {
            list: (req, res) => res.json([]),
            create: (req, res) => res.json({ id: 1 }),
            update: (req, res) => res.json({ updated: true }),
            remove: (req, res) => res.json({ deleted: true }),
            }
        });
        };
    `;
  } else {
    fileContent = `
        import { createGetRoute } from "express-helper";

        export default function (app) {
        createGetRoute({
            path: "/${name}",
            expressClient: app,
            handler: (req, res) => res.json({ message: "Hello from ${name}!" })
        });
        };
    `;
  }
  fs.writeFileSync(path.join(process.cwd(), `${name}.route.js`), fileContent);
};
