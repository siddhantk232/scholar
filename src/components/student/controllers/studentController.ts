import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class StudentController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  getStudents(_: Request, res: Response) {
    res.send("not implemented");
    console.log(typeof this.db);
  }
  getStudent(_: Request, res: Response) {
    res.send("not implemented");
  }
  createStudent(_: Request, res: Response) {
    res.send("not implemented");
  }
  deleteStudent(_: Request, res: Response) {
    res.send("not implemented");
  }
  updateStudent(_: Request, res: Response) {
    res.send("not implemented");
  }
}
