import Router, { Application } from "express";
import { contactRouter } from "./contact";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use("/", contactRouter);

  app.use("/", apiRouter);
};
