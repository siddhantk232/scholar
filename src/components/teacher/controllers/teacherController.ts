import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import {
  teacherUpdateObject,
  TeacherUpdatePayload,
} from "../validators/teacherValidator";

export class TeacherController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  async getTeachers(_: Request, res: Response) {
    const teachers = await this.db.user.findMany({
      where: { kind: Role.TEACHER },
      select: { id: true, name: true, email: true, kind: true },
    });

    res
      .status(StatusCodes.OK)
      .json({ ok: true, teachers, message: "successfully fetched teachers" });
  }

  async getTeacher(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const teacher = await this.db.user.findFirst({
      where: { id, kind: Role.TEACHER },
      select: { id: true, name: true, email: true, kind: true },
    });

    return res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "successfully fetched teachers", teacher });
  }

  async deleteTeacher(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const teacher = await this.db.user.delete({ where: { id } });

    return res
      .status(StatusCodes.OK)
      .json({
        ok: true,
        message: "Teacher deleted successfully",
        ...teacher,
        hashed_password: "hidden",
      });
  }

  async updateTeacher(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const { error, value: data } = this.validate(teacherUpdateObject, req.body);

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: error.message });
    }

    const teacher = await this.db.user.update({ where: { id }, data });

    return res
      .status(StatusCodes.OK)
      .json({
        ok: true,
        message: "Teacher updated successfully",
        teacher,
        hashed_password: "hidden",
      });
  }

  private validate(
    validator: Joi.ObjectSchema<TeacherUpdatePayload>,
    payload: any
  ) {
    return validator.validate(payload);
  }
}
