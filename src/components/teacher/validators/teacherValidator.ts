import Joi from "joi";
import { Role, user } from "@prisma/client";

export type TeacherUpdatePayload = Pick<user, "name" | "email" | "kind">;

export const teacherUpdateObject = Joi.object<TeacherUpdatePayload>({
  name: Joi.string(),
  email: Joi.string().email(),
  kind: Joi.string().valid(Role.TEACHER, Role.STUDENT, Role.ADMIN).required(),
});
