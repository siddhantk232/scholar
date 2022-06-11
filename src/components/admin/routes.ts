import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { StudentController } from "../student/controllers/studentController";
import { SubjectController } from "../subject/controller/subjectController";
import { TeacherController } from "../teacher/controllers/teacherController";
import { AdminController } from "./controllers/adminController";

export class AdminRoutes {
  private router: Router;
  private adminController: AdminController;
  private teacherController: TeacherController;
  private studentController: StudentController;
  private subjectController: SubjectController;

  constructor({ db }: { db: PrismaClient }) {
    this.router = Router();
    this.adminController = new AdminController({ db });
    this.teacherController = new TeacherController({ db });
    this.studentController = new StudentController({ db });
    this.subjectController = new SubjectController({ db });
  }

  setup(): Router {
    this.router.get(
      "/subject",
      this.subjectController.getSubjects.bind(this.subjectController)
    );
    this.router.get(
      "/subject/:id",
      this.subjectController.getSubjects.bind(this.subjectController)
    );
    this.router.post(
      "/subject",
      this.subjectController.createSubject.bind(this.subjectController)
    );
    this.router.delete(
      "/subject/:id",
      this.subjectController.deleteSubject.bind(this.subjectController)
    );
    this.router.put(
      "/subject/:id",
      this.subjectController.updateSubject.bind(this.subjectController)
    );

    this.router.get(
      "/admin/teacher",
      this.teacherController.getTeachers.bind(this.teacherController)
    );
    this.router.get(
      "/admin/teacher/:id",
      this.teacherController.getTeacher.bind(this.teacherController)
    );
    this.router.post(
      "/admin/teacher",
      this.teacherController.createTeacher.bind(this.teacherController)
    );
    this.router.delete(
      "/admin/teacher/:id",
      this.teacherController.deleteTeacher.bind(this.teacherController)
    );
    this.router.put(
      "/admin/teacher/:id",
      this.teacherController.updateTeacher.bind(this.teacherController)
    );

    this.router.post(
      "/admin/teacher/:teacherId/subject/:subjectId",
      this.adminController.mapTeacherToClass.bind(this.adminController)
    );

    this.router.get(
      "/admin/student",
      this.studentController.getStudents.bind(this.studentController)
    );
    this.router.get(
      "/admin/student/:id",
      this.studentController.getStudent.bind(this.studentController)
    );
    this.router.post(
      "/admin/student",
      this.studentController.createStudent.bind(this.studentController)
    );
    this.router.delete(
      "/admin/student/:id",
      this.studentController.deleteStudent.bind(this.studentController)
    );
    this.router.put(
      "/admin/student/:id",
      this.studentController.updateStudent.bind(this.studentController)
    );

    this.router.post(
      "/admin/student/:studentId/subject/:subjectId",
      this.adminController.mapStudentToClass.bind(this.adminController)
    );

    return this.router;
  }
}
