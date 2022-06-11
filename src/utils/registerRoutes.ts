import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../../doc/openapi.json";
import { AuthRoutes } from "../components/auth/routes";

export const version = "/api/v1";

export function registerRoutes(router: Router, queryClient: PrismaClient) {
  const authRouter = new AuthRoutes({ db: queryClient }).setup();

  router.use(`${version}/doc`, swaggerUi.serve);
  router.get(`${version}/doc`, swaggerUi.setup(swaggerDocument));

  router.get(version, (_, res) => {
    res.json({
      version: version.split("/")[2],
      rootPath: version,
    });
  });

  router.use(version, authRouter);
}
