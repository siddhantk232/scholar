import { PrismaClient } from "@prisma/client";
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
    const subjects = await this.db.user.findMany();
    res.status(StatusCodes.OK).json({ ok: true, subjects });
  }

  async getStudent(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const student = await this.db.user.findFirst({ where: { id } });

    return res.status(StatusCodes.OK).json({ ok: true, student });
  }

  async deleteStudent(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const subject = await this.db.user.delete({ where: { id } });

    return res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Student deleted successfully", subject });
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
      .json({ ok: true, message: "Student updated successfully", student });
  }

  private validate(
    validator: Joi.ObjectSchema<StudentUpdatePayload>,
    payload: any
  ) {
    return validator.validate(payload);
  }
}
