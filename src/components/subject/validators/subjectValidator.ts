import Joi from "joi";
import { subject } from "@prisma/client";

export const subjectObject = Joi.object<subject>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.number().min(1).required(),
});
