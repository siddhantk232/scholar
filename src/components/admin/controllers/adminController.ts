import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class AdminController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  mapTeacherToClass(_: Request, res: Response) {
    console.log(typeof this.db);
    res.send("not implemented");
  }

  mapStudentToClass(_: Request, res: Response) {
    res.send("not implemented");
  }
}
