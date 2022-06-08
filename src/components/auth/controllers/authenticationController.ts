import { Request, Response } from "express";

export class AuthenticationController {
  signup(_: Request, res: Response) {
    res.json({ message: "ok" });
  }
}
