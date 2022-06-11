import { PrismaClient, subject } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { subjectObject } from "../validators/subjectValidator";

export class SubjectController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  async getSubjects(_: Request, res: Response) {
    const subjects = await this.db.subject.findMany();
    res.status(StatusCodes.OK).json({ ok: true, subjects });
  }

  async getSubject(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const subject = await this.db.subject.findFirst({ where: { id } });

    return res
      .status(StatusCodes.OK)
      .json({ ok: true, subject, message: "successfully fetched subjects" });
  }

  async createSubject(req: Request, res: Response) {
    const { error, value: data } = this.validate(subjectObject, req.body);

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: error.message });
    }

    const subject = await this.db.subject.create({ data });

    return res
      .status(StatusCodes.CREATED)
      .json({ ok: true, subject, message: "successfully fetched subject" });
  }

  async deleteSubject(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const subject = await this.db.subject.delete({ where: { id } });

    return res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Subject deleted successfully", subject });
  }

  async updateSubject(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const { error, value: data } = this.validate(subjectObject, req.body);

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: error.message });
    }

    const subject = await this.db.subject.update({ where: { id }, data });

    return res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Subject updated successfully", subject });
  }

  private validate(validator: Joi.ObjectSchema<subject>, payload: any) {
    return validator.validate(payload);
  }
}
