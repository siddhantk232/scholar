import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { requireAdminAuth } from "../shared/middlewares/requireAdminAuth";
import { requireTeacherAuth } from "../shared/middlewares/requireTeacherAuth";
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
    (this.router.get as any)(
      "/admin/subject",
      requireTeacherAuth,
      this.subjectController.getSubjects.bind(this.subjectController)
    );
    (this.router.get as any)(
      "/admin/subject/:id",
      requireTeacherAuth,
      this.subjectController.getSubject.bind(this.subjectController)
    );
    (this.router.post as any)(
      "/admin/subject",
      requireAdminAuth,
      this.subjectController.createSubject.bind(this.subjectController)
    );
    (this.router.delete as any)(
      "/admin/subject/:id",
      requireAdminAuth,
      this.subjectController.deleteSubject.bind(this.subjectController)
    );
    (this.router.put as any)(
      "/admin/subject/:id",
      requireAdminAuth,
      this.subjectController.updateSubject.bind(this.subjectController)
    );

    (this.router.get as any)(
      "/admin/teacher",
      requireAdminAuth,
      this.teacherController.getTeachers.bind(this.teacherController)
    );
    (this.router.get as any)(
      "/admin/teacher/:id",
      requireAdminAuth,
      this.teacherController.getTeacher.bind(this.teacherController)
    );
    (this.router.post as any)(
      "/admin/teacher",
      requireAdminAuth,
      this.teacherController.createTeacher.bind(this.teacherController)
    );
    (this.router.delete as any)(
      "/admin/teacher/:id",
      requireAdminAuth,
      this.teacherController.deleteTeacher.bind(this.teacherController)
    );
    (this.router.put as any)(
      "/admin/teacher/:id",
      requireAdminAuth,
      this.teacherController.updateTeacher.bind(this.teacherController)
    );

    (this.router.post as any)(
      "/admin/teacher/:teacherId/subject/:subjectId",
      requireAdminAuth,
      this.adminController.mapTeacherToSubject.bind(this.adminController)
    );

    (this.router.get as any)(
      "/admin/student",
      requireTeacherAuth,
      this.studentController.getStudents.bind(this.studentController)
    );
    (this.router.get as any)(
      "/admin/student/:id",
      requireTeacherAuth,
      this.studentController.getStudent.bind(this.studentController)
    );
    (this.router.delete as any)(
      "/admin/student/:id",
      requireAdminAuth,
      this.studentController.deleteStudent.bind(this.studentController)
    );
    (this.router.put as any)(
      "/admin/student/:id",
      requireAdminAuth,
      this.studentController.updateStudent.bind(this.studentController)
    );

    (this.router.post as any)(
      "/admin/student/:studentId/subject/:subjectId",
      requireAdminAuth,
      this.adminController.mapStudentToSubject.bind(this.adminController)
    );

    return this.router;
  }
}
