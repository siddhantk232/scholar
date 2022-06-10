import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { AuthenticationController } from "./controllers/authenticationController";

export class AuthRoutes {
  private router: Router;
  private controller: AuthenticationController;

  constructor({ db }: { db: PrismaClient }) {
    this.router = Router();
    this.controller = new AuthenticationController({ db });
  }

  setup(): Router {
    this.router.post(
      "/auth/signup",
      this.controller.signup.bind(this.controller)
    );
    this.router.post(
      "/auth/login",
      this.controller.login.bind(this.controller)
    );

    return this.router;
  }
}
