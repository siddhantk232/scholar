import { app } from "./app";

const port = process.env.PORT! || 3000;

const server = app().listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

process.once("SIGTERM", handleClose);
process.once("SIGINT", handleClose);

function handleClose() {
  server.close();
}
