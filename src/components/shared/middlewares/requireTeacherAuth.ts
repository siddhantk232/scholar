import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Role, user } from "@prisma/client";
import jwt from "jsonwebtoken";

import { AuthenticatedRequest } from "../types/auth";

export function requireTeacherAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = (req.headers as any)["authorization"]?.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    } else {
      const user = jwt.verify(token, process.env.SECRET!) as user;

      // ADMIN can also do any action doable by the TEACHER
      if (![Role.ADMIN, Role.TEACHER].includes(user.kind as any)) {
        throw new Error("This action requires the user to be an Admin");
      }

      req.user = user;
    }
    return next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ ok: false, message: error.message || "Unauthorized" });
    return;
  }
}
