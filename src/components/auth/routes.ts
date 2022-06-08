import { Router } from "express";
import { AuthenticationController } from "./controllers/authenticationController";

export class AuthRoutes {
  private router: Router;
  private controller: AuthenticationController;

  constructor() {
    this.router = Router();
    this.controller = new AuthenticationController();
  }

  setup(): Router {
    this.router.post(`/auth/signup`, this.controller.signup);
    return this.router;
  }
}
