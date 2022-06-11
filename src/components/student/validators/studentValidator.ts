import Joi from "joi";
import { Role, user } from "@prisma/client";

export type StudentUpdatePayload = Pick<user, "name"|"email"|"kind">

export const studentUpdateObject = Joi.object<StudentUpdatePayload>({
  name: Joi.string(),
  email: Joi.string().email(),
  kind: Joi.string().valid(Role.TEACHER, Role.STUDENT, Role.ADMIN).required(),
});
