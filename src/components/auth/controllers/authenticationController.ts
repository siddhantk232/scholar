import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { loginValidator, signupValidator, User } from "../validators";
import { createToken } from "../utils/createToken";
import Joi from "joi";

export class AuthenticationController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  async signup(req: Request, res: Response) {
    const { error, value: validatedUser } = this.validate(
      signupValidator,
      req.body
    );

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: error.message });
    }

    // check if user exists
    const existingUser = await this.db.user.findFirst({
      where: { email: validatedUser.email },
      select: { id: true },
    });

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "User with this email already exists" });
    }

    validatedUser.password = await bcrypt.hash(validatedUser.password, 10);

    const user = await this.db.user.create({
      data: {
        name: validatedUser.name,
        email: validatedUser.email,
        kind: validatedUser.kind,
        hashed_password: validatedUser.password,
      },
    });

    return res.status(StatusCodes.CREATED).json({
      ok: true,
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        kind: user.kind,
      },
      token: createToken(user),
    });
  }

  async login(req: Request, res: Response) {
    const { error, value } = this.validate(loginValidator, req.body);

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: error.message });
    }

    // check if user exists
    const user = await this.db.user.findFirst({
      where: { email: value.email },
      select: {
        id: true,
        name: true,
        email: true,
        kind: true,
        hashed_password: true,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Wrong credentials" });
    }

    // compare password
    if (await bcrypt.compare(value.password, user.hashed_password)) {
      return res.status(StatusCodes.OK).json({
        ok: true,
        message: "User authenticated successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          kind: user.kind,
        },
        token: createToken(user),
      });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "wrong credentials" });
    }
  }

  private validate(validator: Joi.ObjectSchema<User>, obj: any) {
    return validator.validate(obj);
  }
}
