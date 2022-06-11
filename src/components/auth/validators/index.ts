import { Role } from "@prisma/client";
import Joi from "joi";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  kind: Role;
}

const commonValidator = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
};

export const signupValidator = Joi.object<User>({
  name: Joi.string().min(1).required(),
  kind: Joi.string().valid(Role.ADMIN, Role.STUDENT, Role.TEACHER).required(),
  ...commonValidator,
});

export const loginValidator = Joi.object<User>(commonValidator);
