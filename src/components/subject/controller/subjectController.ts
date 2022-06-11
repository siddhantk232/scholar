import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class SubjectController {
  private db: PrismaClient;

  constructor({ db }: { db: PrismaClient }) {
    this.db = db;
  }

  getSubjects(_: Request, res: Response) {
    res.send("not implemented");
  }
  createSubject(_: Request, res: Response) {
    console.log(typeof this.db);
    res.send("not implemented");
  }
  deleteSubject(_: Request, res: Response) {
    res.send("not implemented");
  }
  updateSubject(_: Request, res: Response) {
    res.send("not implemented");
  }
}
