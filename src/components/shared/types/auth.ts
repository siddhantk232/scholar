import { user } from "@prisma/client";

export interface AuthenticatedRequest extends Request {
  user: user | null;
}
