import { Router } from "express";
import { AuthRoutes } from "../components/auth/routes";

export function registerRoutes(router: Router) {
  const version = "/api/v1";

  const authRouter = new AuthRoutes().setup();

  router.get(version, (_, res) => {
    res.json({
      version: version.split("/")[2],
      rootPath: version,
    });
  });

  router.use(version, authRouter);
}
