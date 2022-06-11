const { app } = require("../dist/src/app");
const { version } = require("../dist/src/utils/registerRoutes");

function printRoutes(app) {
  const routes = [];

  const versionNumber = parseInt(version.split("/")[2][1]);

  app._router.stack.forEach(function (middleware) {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        version: versionNumber,
        requestPath: middleware.route.path,
      });
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach(function (handler) {
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

printRoutes(app());
