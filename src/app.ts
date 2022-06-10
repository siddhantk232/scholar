import express from "express";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

import { registerRoutes } from "./utils/registerRoutes";
import { version } from "./utils/registerRoutes";

(function () {
  const app = express();

  const server = app.listen(3000, () => console.log("listening"));

  app.use(morgan("tiny"));

  const prisma = new PrismaClient();

  registerRoutes(app, prisma);

  process.once("SIGTERM", handleClose);
  process.once("SIGINT", handleClose);

  async function handleClose() {
    console.log("closing");
    await prisma.$disconnect();
    server.close();
  }

  if (process.env.NODE_ENV === "development") printRoutes(app);
})();

function printRoutes(app: express.Express) {
  const routes: Array<{ path: string; version: number; requestPath: string }> =
    [];

  const versionNumber: number = parseInt(version.split("/")[2][1]);

  app._router.stack.forEach(function (middleware: any) {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        version: versionNumber,
        requestPath: middleware.route.path,
      });
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach(function (handler: any) {
        routes.push({
          path: handler.route.path,
          version: versionNumber,
          requestPath: version + handler.route.path,
        });
      });
    }
  });

  // should be pretty printed
  console.log(routes);
}
