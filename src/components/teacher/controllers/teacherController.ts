import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class TeacherController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  getTeachers(_: Request, res: Response) {
    res.send("not implemented");
    console.log(typeof this.db);
  }
  getTeacher(_: Request, res: Response) {
    res.send("not implemented");
  }
  deleteTeacher(_: Request, res: Response) {
    res.send("not implemented");
  }
  createTeacher(_: Request, res: Response) {
    res.send("not implemented");
  }
  updateTeacher(_: Request, res: Response) {
    res.send("not implemented");
  }
}
