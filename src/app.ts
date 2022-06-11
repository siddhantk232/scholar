import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import process from "process";

import { registerRoutes } from "./utils/registerRoutes";

export function app() {
  const app = express();

  app.use(morgan("tiny"));
  app.use(express.json());

  const prisma = new PrismaClient({ log: ["info"] });

  registerRoutes(app, prisma);

  process.once("SIGTERM", handleClose);
  process.once("SIGINT", handleClose);

  async function handleClose() {
    console.log("closing");
    await prisma.$disconnect();
  }

  return app;
}
