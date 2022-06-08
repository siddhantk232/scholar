import express from "express";

(function () {
  const app = express();

  app.get("/", (_, res) => res.send("ping"));

  const server = app.listen(3000, () => console.log("listening"));

  process.once("SIGTERM", handleClose);
  process.once("SIGINT", handleClose);

  function handleClose() {
    console.log("closing");
    server.close();
  }
})()

