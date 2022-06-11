import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

// This is not meant to be used in production! Why?
//   - No control after tokens are generated. How do we revoke access.
//   - Anyone with the token can access on behalf of the user for 7 days.
// A long lived refresh_token + short lived access_token would be more secure.
// More information about jwt auth:
//   - https://www.reddit.com/r/node/comments/kjx0dz/how_to_handle_auth_with_jwt_in_mern_stack_the/ggzff4r/?context=3
//   - Use Auth0 in a headless server like Hasura for access control (https://hasura.io/docs/latest/graphql/core/guides/integrations/auth0-jwt)
export function createToken(
  payload: Pick<Prisma.userGetPayload<true>, "id" | "name" | "kind" | "email">
) {
  return jwt.sign({ ...payload, hashed_password: "hidden" }, process.env.SECRET!, {
    expiresIn: "7d",
  });
}
