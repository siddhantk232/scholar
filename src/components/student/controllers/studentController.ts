import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import {
  StudentUpdatePayload,
  studentUpdateObject,
} from "../validators/studentValidator";

export class StudentController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  async getStudents(_: Request, res: Response) {
    const students = await this.db.user.findMany({
      where: { kind: Role.STUDENT },
      select: { id: true, name: true, email: true, kind: true },
    });

    res.status(StatusCodes.OK).json({ ok: true, students });
  }

  async getStudent(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const student = await this.db.user.findFirst({
      where: { id, kind: Role.STUDENT },
      select: { id: true, name: true, email: true, kind: true },
    });

    return res.status(StatusCodes.OK).json({ ok: true, student });
  }

  async deleteStudent(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const student = await this.db.user.delete({ where: { id } });

    return res.status(StatusCodes.OK).json({
      ok: true,
      message: "Student deleted successfully",
      ...student,
      hashed_password: "hidden",
    });
  }

  async updateStudent(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const { error, value: data } = this.validate(studentUpdateObject, req.body);

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: error.message });
    }

    const student = await this.db.user.update({ where: { id }, data });

    return res
      .status(StatusCodes.OK)
      .json({
        ok: true,
        message: "Student updated successfully",
        ...student,
        hashed_password: "hidden",
      });
  }

  private validate(
    validator: Joi.ObjectSchema<StudentUpdatePayload>,
    payload: any
  ) {
    return validator.validate(payload);
  }
}
