import express from "express";
import { registerRoutes } from "./utils/registerRoutes";

(function () {
  const app = express();

  const server = app.listen(3000, () => console.log("listening"));

  registerRoutes(app);

  process.once("SIGTERM", handleClose);
  process.once("SIGINT", handleClose);

  function handleClose() {
    console.log("closing");
    server.close();
  }
})();
