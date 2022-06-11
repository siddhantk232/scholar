import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AdminController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  async mapTeacherToSubject(req: Request, res: Response) {
    const teacherId = parseInt(req.params.teacherId);
    const subjectId = parseInt(req.params.teacherId);

    if (!teacherId && !subjectId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const subject = await this.db.subject.update({
      where: { id: subjectId },
      data: { teacherId },
    });

    return res.status(StatusCodes.OK).json({
      ok: true,
      message: "Mapped teacher to subject successfully",
      subject,
    });
  }

  async mapStudentToSubject(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId);
    const subjectId = parseInt(req.params.teacherId);

    if (!studentId && !subjectId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ok: false, message: "Invalid id" });
    }

    const subject = await this.db.subjectsOnUsers.create({
      data: { userId: studentId, subjectId },
    });

    return res.status(StatusCodes.OK).json({
      ok: true,
      message: "Mapped teacher to subject successfully",
      subject,
    });
  }
}
